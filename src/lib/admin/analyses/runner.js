// Server-only analysis runner and scheduler.
//
// Runs are durable records (doc `analysis-runs`). A run is claimed under a lock with a dedupe key
// (scheduled slot or manual request), so overlapping ticks or double clicks never run the same
// work twice. Failures retry with backoff up to `analyses.maxRetries`; budgets cap runs per day.
// Scheduling is driven by `tick()`, called by an external cron (POST /api/admin/cron/tick) or by the
// optional in-process timer in src/instrumentation.js. No LLM session waits for anything.
import { read, update, newId } from '@/lib/admin/store';
import { getSettings } from '@/lib/admin/settings';
import { audit } from '@/lib/admin/audit';
import { httpError } from '@/lib/admin/auth';
import { interpret } from '@/lib/admin/ai';
import { refreshPending } from '@/lib/admin/knowledge/service';
import { ANALYSES, EVENT_TRIGGERS, findAnalysis } from '@/lib/admin/analyses/definitions';

const RUNS = 'analysis-runs';
const KEEP = 300;
const SYSTEM = { email: 'scheduler', role: 'owner' };

export function scheduleFor(def, settings) {
    const override = settings.analyses.schedules?.[def.id] || {};
    return { enabled: override.enabled ?? true, everyHours: Number(override.everyHours ?? def.everyHours) };
}

export async function listRuns(filter) {
    const runs = await read(RUNS, []);
    return filter ? runs.filter(filter) : runs;
}

export function latestRuns(runs) {
    const latest = {};
    for (const run of runs)
        if (!latest[run.analysisId] || run.startedAt > latest[run.analysisId].startedAt) latest[run.analysisId] = run;
    return latest;
}

// Freshness label for display: never turns a missing or failed run into "ok".
export function runState(def, run, settings) {
    if (!run) return 'never_run';
    if (run.status === 'running') return 'running';
    if (['failed', 'not_connected', 'insufficient_data', 'budget_exhausted'].includes(run.status)) return run.status;
    const { everyHours } = scheduleFor(def, settings);
    const age = (Date.now() - new Date(run.finishedAt || run.startedAt)) / 3_600_000;
    return everyHours && age > everyHours * 2 ? 'stale' : 'fresh';
}

async function claim(def, { trigger, dedupeKey, by, revision }) {
    let claimed = null;
    let reason = null;
    await update(RUNS, [], (runs) => {
        const duplicate = runs.find(
            (r) => r.dedupeKey === dedupeKey && ['running', 'succeeded', 'unchanged'].includes(r.status)
        );
        const running = runs.find(
            (r) => r.analysisId === def.id && r.status === 'running' && Date.now() - new Date(r.startedAt) < 15 * 60_000
        );
        if (duplicate) reason = `Already ran for ${dedupeKey}.`;
        else if (running) reason = `Run ${running.id} is still in progress.`;
        if (reason) return runs;
        const previous = runs
            .filter((r) => r.analysisId === def.id)
            .sort((a, b) => b.startedAt.localeCompare(a.startedAt));
        const lastFailed = previous[0]?.status === 'failed' ? previous[0] : null;
        claimed = {
            id: newId('ar'),
            analysisId: def.id,
            trigger,
            dedupeKey,
            by,
            inputRevision: revision,
            attempt: lastFailed && trigger === 'retry' ? (lastFailed.attempt || 1) + 1 : 1,
            status: 'running',
            startedAt: new Date().toISOString(),
        };
        return [claimed, ...runs].slice(0, KEEP);
    });
    return { claimed, reason };
}

async function finish(runId, patch) {
    let saved;
    await update(RUNS, [], (runs) =>
        runs.map((r) => {
            if (r.id !== runId) return r;
            saved = { ...r, ...patch, finishedAt: new Date().toISOString() };
            return saved;
        })
    );
    return saved;
}

export async function runAnalysis(id, { trigger = 'manual', by = 'system', session } = {}) {
    const def = findAnalysis(id);
    if (!def) throw httpError(404, 'Unknown analysis.');
    const settings = await getSettings();
    if (trigger !== 'manual' && settings.analyses.paused) return { skipped: true, reason: 'Analyses are paused.' };

    const today = new Date().toISOString().slice(0, 10);
    const runsToday = (await listRuns((r) => r.startedAt.startsWith(today) && r.status !== 'unchanged')).length;
    if (runsToday >= settings.analyses.budget.maxRunsPerDay) {
        return {
            skipped: true,
            reason: `Daily run budget (${settings.analyses.budget.maxRunsPerDay}) reached.`,
            status: 'budget_exhausted',
        };
    }

    const revision = def.revision ? def.revision() : null;
    const { everyHours } = scheduleFor(def, settings);
    const slot = everyHours ? Math.floor(Date.now() / (everyHours * 3_600_000)) : today;
    const dedupeKey = trigger === 'schedule' ? `${id}:slot:${slot}` : `${id}:${trigger}:${Date.now()}`;
    const { claimed, reason } = await claim(def, { trigger, dedupeKey, by, revision });
    if (!claimed) return { skipped: true, reason };

    // Unchanged inputs: point at the previous result instead of recomputing (scheduled runs only).
    if (revision && trigger === 'schedule') {
        const previous = (
            await listRuns((r) => r.analysisId === id && r.status === 'succeeded' && r.inputRevision === revision)
        )[0];
        if (previous)
            return finish(claimed.id, {
                status: 'unchanged',
                reusedRunId: previous.id,
                nextAction: previous.nextAction,
            });
    }

    try {
        const result = await def.run({ settings, trigger, by, system: session || SYSTEM });
        let interpretation = { status: 'not_requested' };
        if (def.interpret && result.status === 'succeeded' && result.findings?.length) {
            interpretation = await interpret(
                { task: def.question, findings: { facts: result.facts, findings: result.findings.slice(0, 40) } },
                settings
            );
        }
        const saved = await finish(claimed.id, { ...result, interpretation });
        if (session) await audit(session, 'analysis.run', id, { status: saved.status });
        return saved;
    } catch (error) {
        const retryable = claimed.attempt <= settings.analyses.maxRetries;
        return finish(claimed.id, {
            status: 'failed',
            error: String(error.message || error).slice(0, 500),
            nextRetryAt: retryable
                ? new Date(Date.now() + 5 * 60_000 * 2 ** (claimed.attempt - 1)).toISOString()
                : null,
        });
    }
}

// Runs whatever is due. Safe to call often; due-ness and dedupe keys prevent repeated work.
export async function tick({ event } = {}) {
    const settings = await getSettings();
    const summary = { at: new Date().toISOString(), ran: [], skipped: [], knowledge: null };
    if (settings.analyses.paused && !event) {
        summary.skipped.push({ id: '*', reason: 'Analyses are paused.' });
        return summary;
    }
    const runs = await listRuns();
    const latest = latestRuns(runs);
    const ids = event ? EVENT_TRIGGERS[event] || [] : ANALYSES.map((a) => a.id);
    for (const id of ids) {
        const def = findAnalysis(id);
        const schedule = scheduleFor(def, settings);
        const last = latest[id];
        let trigger = event ? 'event' : 'schedule';
        if (!event) {
            if (!schedule.enabled || !schedule.everyHours) continue;
            const retryDue = last?.status === 'failed' && last.nextRetryAt && new Date(last.nextRetryAt) <= new Date();
            const age = last ? (Date.now() - new Date(last.startedAt)) / 3_600_000 : Infinity;
            if (retryDue) trigger = 'retry';
            else if (age < schedule.everyHours) continue;
        }
        const result = await runAnalysis(id, { trigger, by: 'scheduler' });
        (result.skipped ? summary.skipped : summary.ran).push({ id, status: result.status, reason: result.reason });
    }
    try {
        const refreshed = await refreshPending(SYSTEM);
        summary.knowledge = {
            checked: refreshed.length,
            effective: refreshed.filter((c) => c.status === 'effective').length,
        };
    } catch (error) {
        summary.knowledge = { error: error.message };
    }
    await update('scheduler-state', {}, () => ({ lastTickAt: summary.at, lastSummary: summary }));
    return summary;
}

// Fire-and-forget event trigger from an API route. Errors are logged, never thrown at the caller.
export function triggerEvent(event) {
    tick({ event }).catch((error) => console.error(`[analyses] event ${event} failed`, error));
}
