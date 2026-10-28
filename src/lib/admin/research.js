// Server-only competitor research: an editable watchlist, change monitoring of official source
// pages, and operator-recorded findings. A monitoring run fetches each due source, fingerprints its
// visible text, and records whether it changed since the last run, so unchanged pages are not
// re-researched. It does not copy competitor content: only a hash, title and length are stored.
// Durable conclusions belong in docs/COMPETITORS.md (edited through Knowledge).
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { read, update, appendLog, readLog, newId } from '@/lib/admin/store';
import { audit } from '@/lib/admin/audit';
import { httpError } from '@/lib/admin/auth';
import { getSettings } from '@/lib/admin/settings';

const WATCHLIST = 'research-watchlist';
const STATE = 'research-state';
const RUNS = 'research-runs';
const FINDINGS = 'research-findings';
const CATEGORIES = ['direct', 'indirect', 'substitute', 'workaround'];

async function seed() {
    try {
        const file = path.join(process.cwd(), 'docs/research/watchlist.seed.json');
        const data = JSON.parse(await fs.readFile(file, 'utf8'));
        return {
            seededFrom: 'docs/research/watchlist.seed.json',
            seededOn: data.seededOn || null,
            entries: data.entries || [],
        };
    } catch {
        return { seededFrom: null, entries: [] };
    }
}

export async function getWatchlist() {
    const current = await read(WATCHLIST, null);
    if (current) return current;
    const initial = await seed();
    return update(WATCHLIST, null, (existing) => existing || initial);
}

function cleanEntry(input, existing = {}) {
    const name = String(input.name ?? existing.name ?? '')
        .trim()
        .slice(0, 80);
    if (!name) throw httpError(400, 'Name is required.');
    const category = input.category ?? existing.category ?? 'direct';
    if (!CATEGORIES.includes(category)) throw httpError(400, `Category must be one of ${CATEGORIES.join(', ')}.`);
    const sources = (input.sources ?? existing.sources ?? [])
        .map((s) => ({ label: String(s.label || '').slice(0, 80), url: String(s.url || '').trim() }))
        .filter((s) => /^https:\/\//.test(s.url));
    return {
        ...existing,
        id:
            existing.id ||
            String(input.id || name)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, ''),
        name,
        status: ['confirmed', 'candidate'].includes(input.status) ? input.status : existing.status || 'candidate',
        category,
        website: String(input.website ?? existing.website ?? '').slice(0, 200),
        overlap: String(input.overlap ?? existing.overlap ?? '').slice(0, 500),
        relevance: ['high', 'medium', 'low'].includes(input.relevance)
            ? input.relevance
            : existing.relevance || 'medium',
        cadenceDays: Math.max(1, Math.min(365, Number(input.cadenceDays ?? existing.cadenceDays ?? 30))),
        scope: Array.isArray(input.scope) ? input.scope.slice(0, 10) : existing.scope || ['pricing', 'positioning'],
        sources,
        paused: Boolean(input.paused ?? existing.paused ?? false),
        notes: String(input.notes ?? existing.notes ?? '').slice(0, 2000),
    };
}

export async function saveEntry(session, input) {
    await getWatchlist();
    let saved;
    await update(WATCHLIST, { entries: [] }, (list) => {
        const index = list.entries.findIndex((e) => e.id === input.id);
        saved = cleanEntry(input, index >= 0 ? list.entries[index] : {});
        if (index >= 0) list.entries[index] = saved;
        else {
            if (list.entries.some((e) => e.id === saved.id)) throw httpError(409, 'An entry with this id exists.');
            list.entries.push(saved);
        }
        return list;
    });
    await audit(session, 'research.watchlist.save', saved.id, {
        status: saved.status,
        cadenceDays: saved.cadenceDays,
        paused: saved.paused,
    });
    return saved;
}

export async function removeEntry(session, id) {
    await update(WATCHLIST, { entries: [] }, (list) => ({ ...list, entries: list.entries.filter((e) => e.id !== id) }));
    await audit(session, 'research.watchlist.remove', id);
}

function visibleText(html) {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;|&#160;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

async function fetchSource(url) {
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'MSG91-website-research-monitor/1.0 (change detection of public pages)',
            Accept: 'text/html',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(15_000),
    });
    const html = await res.text();
    const text = visibleText(html);
    return {
        status: res.status,
        ok: res.ok,
        title: (html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '').trim().slice(0, 160),
        length: text.length,
        hash: crypto.createHash('sha256').update(text).digest('hex').slice(0, 16),
        // A page whose visible text is tiny is probably rendered client-side; treat as unverifiable.
        thin: text.length < 500,
    };
}

export function isDue(entry, state, now = Date.now()) {
    if (entry.paused || !entry.sources?.length) return false;
    const last = entry.sources
        .map((s) => state[s.url]?.checkedAt)
        .filter(Boolean)
        .sort()[0];
    return !last || now - new Date(last).getTime() >= entry.cadenceDays * 86_400_000;
}

// Runs change monitoring. `ids` limits it to some entries; otherwise only due entries run.
export async function runResearch({ trigger, ids, by }) {
    const settings = await getSettings();
    if (settings.research.paused && trigger !== 'manual')
        return { status: 'skipped', reason: 'Research is paused in Settings.' };
    const runs = await read(RUNS, []);
    const active = runs.find(
        (r) => r.status === 'running' && Date.now() - new Date(r.startedAt).getTime() < 10 * 60_000
    );
    if (active) return { status: 'skipped', reason: `Run ${active.id} is still in progress.` };

    const run = {
        id: newId('rr'),
        trigger,
        by: by || 'system',
        startedAt: new Date().toISOString(),
        status: 'running',
        fetched: 0,
        changed: [],
        failed: [],
        unchanged: 0,
    };
    await update(RUNS, [], (list) => [run, ...list].slice(0, 50));
    const { entries } = await getWatchlist();
    const state = await read(STATE, {});
    const targets = entries.filter((e) => (ids ? ids.includes(e.id) && e.sources?.length : isDue(e, state)));
    const budget = settings.research.maxFetchesPerRun;
    let budgetHit = false;
    for (const entry of targets) {
        for (const source of entry.sources) {
            if (run.fetched >= budget) {
                budgetHit = true;
                break;
            }
            run.fetched++;
            const previous = state[source.url];
            let observation;
            try {
                const result = await fetchSource(source.url);
                const changed = Boolean(previous?.hash && result.ok && !result.thin && previous.hash !== result.hash);
                observation = {
                    at: new Date().toISOString(),
                    entryId: entry.id,
                    url: source.url,
                    label: source.label,
                    ...result,
                    changed,
                    firstSeen: !previous?.hash,
                };
                if (!result.ok || result.thin)
                    run.failed.push({
                        entryId: entry.id,
                        url: source.url,
                        reason: result.thin
                            ? 'page text too short to compare (client-rendered or blocked)'
                            : `HTTP ${result.status}`,
                    });
                else if (changed) run.changed.push({ entryId: entry.id, url: source.url, label: source.label });
                else run.unchanged++;
                state[source.url] = {
                    checkedAt: observation.at,
                    hash: result.ok && !result.thin ? result.hash : previous?.hash || null,
                    changedAt: changed ? observation.at : previous?.changedAt || null,
                    lastStatus: result.status,
                    title: result.title,
                };
            } catch (error) {
                observation = {
                    at: new Date().toISOString(),
                    entryId: entry.id,
                    url: source.url,
                    ok: false,
                    error: error.message,
                };
                run.failed.push({
                    entryId: entry.id,
                    url: source.url,
                    reason: error.name === 'TimeoutError' ? 'timed out' : error.message,
                });
                state[source.url] = { ...(previous || {}), checkedAt: observation.at, lastStatus: 'error' };
            }
            await appendLog('research/observations', observation);
        }
    }
    await update(STATE, {}, () => state);
    const finished = {
        ...run,
        finishedAt: new Date().toISOString(),
        status: budgetHit
            ? 'budget_exhausted'
            : run.failed.length && !run.unchanged && !run.changed.length
              ? 'failed'
              : 'succeeded',
        entries: targets.length,
    };
    await update(RUNS, [], (list) => list.map((r) => (r.id === run.id ? finished : r)));
    return finished;
}

export async function researchOverview() {
    const [watchlist, state, runs, findings, observations] = await Promise.all([
        getWatchlist(),
        read(STATE, {}),
        read(RUNS, []),
        read(FINDINGS, []),
        readLog('research/observations'),
    ]);
    const now = Date.now();
    const entries = watchlist.entries.map((entry) => ({
        ...entry,
        due: isDue(entry, state, now),
        sources: entry.sources.map((s) => ({ ...s, state: state[s.url] || null })),
    }));
    return {
        watchlist: { ...watchlist, entries },
        runs,
        findings,
        recentChanges: observations
            .filter((o) => o.changed)
            .slice(-20)
            .reverse(),
    };
}

export async function addFinding(session, input) {
    const kind = ['observation', 'interpretation', 'recommendation'].includes(input.kind) ? input.kind : null;
    if (!kind) throw httpError(400, 'Kind must be observation, interpretation or recommendation.');
    if (!String(input.text || '').trim()) throw httpError(400, 'Text is required.');
    if (kind === 'observation' && !/^https:\/\//.test(input.sourceUrl || ''))
        throw httpError(400, 'An observation needs a source URL.');
    const finding = {
        id: newId('rf'),
        entryId: String(input.entryId || ''),
        kind,
        text: String(input.text).slice(0, 2000),
        sourceUrl: String(input.sourceUrl || ''),
        observedOn: String(input.observedOn || new Date().toISOString().slice(0, 10)),
        confidence: ['high', 'medium', 'low'].includes(input.confidence) ? input.confidence : 'medium',
        by: session.email,
        at: new Date().toISOString(),
    };
    await update(FINDINGS, [], (list) => [finding, ...list]);
    await audit(session, 'research.finding.add', finding.entryId, { kind });
    return finding;
}
