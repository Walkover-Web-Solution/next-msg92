// Server-only experiment registry and lifecycle. This module is the single owner of experiment
// state: the registry document, the compiled live config read by the proxy, and decision history.
//
// Lifecycle: draft → running ⇄ paused → (promote) rolling_out → archived
//                                      → (stop)    completed   → archived
// A material change (arms, weights, treatments, primary metric) to an experiment that has run
// starts a new version; results are kept per version and never mixed.
import getPageInfo from '@/utils/getPageInfo';
import { read, update, withLock } from '@/lib/admin/store';
import { audit } from '@/lib/admin/audit';
import { httpError } from '@/lib/admin/auth';
import { getSettings } from '@/lib/admin/settings';
import { readRepoFile, proposeChange, repoConfig } from '@/lib/admin/repo';
import { EXPERIMENTS_DOC, LIVE_DOC, compileLive, applyOverrides } from '@/lib/experiments/live';
import { normalizeSurface } from '@/lib/experiments/assignment';
import { METRICS, aggregate } from '@/lib/experiments/events';
import { evaluate } from '@/lib/experiments/stats';

const ARM_KEYS = ['A', 'B', 'C'];
const MATERIAL_FIELDS = ['arms', 'primaryMetric', 'surface'];
const BLOCKING_STATUSES = ['running', 'paused', 'rolling_out'];

// Maps a public catch-all URL to the page JSON that renders it (mirrors src/pages/api/data.js).
export function surfaceDataPath(surface) {
    const slug = normalizeSurface(surface).split('/').filter(Boolean);
    const info = getPageInfo(slug.length ? { slug } : {});
    if (info.page === 'pricing' || slug.includes('pricing')) return null;
    if (info.country === 'global')
        return info.page === 'home' ? 'src/data/global/home.json' : `src/data/global/${info.pathURL}.json`;
    return info.page === 'home' ? `src/data/${info.country}/home.json` : `src/data/${info.pathURL}.json`;
}

export async function loadSurfaceJson(surface) {
    const file = surfaceDataPath(surface);
    if (!file) throw httpError(400, 'Experiments can target JSON-driven pages only (not pricing routes).');
    const source = await readRepoFile(file);
    if (!source.exists) throw httpError(400, `No page JSON for ${surface} (${file}).`);
    const data = JSON.parse(source.content);
    if (data.show === false || data.common) throw httpError(400, `${surface} is unpublished.`);
    return { file, data, sha: source.sha };
}

async function saveAll(mutator) {
    // One lock covers the registry and the live config so slot checks and routing never disagree.
    return withLock('experiments-registry', async () => {
        let result;
        const experiments = await update(EXPERIMENTS_DOC, [], async (list) => {
            result = await mutator(list);
            return list;
        });
        await update(LIVE_DOC, {}, () => compileLive(experiments));
        return result;
    });
}

export async function listExperiments() {
    return read(EXPERIMENTS_DOC, []);
}

export async function getExperimentOrThrow(id) {
    const exp = (await listExperiments()).find((e) => e.id === id);
    if (!exp) throw httpError(404, 'Experiment not found.');
    return exp;
}

function slugId(name) {
    return String(name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 40);
}

function normalizeArms(arms, maxChallengers) {
    if (!Array.isArray(arms) || arms.length < 2)
        throw httpError(400, 'An experiment needs a baseline and at least one challenger.');
    if (arms.length > 1 + maxChallengers) {
        throw httpError(
            409,
            `At most ${maxChallengers} challenger(s) per surface. Queue additional challengers instead.`,
            'slot_limit'
        );
    }
    return arms.map((arm, index) => ({
        key: ARM_KEYS[index],
        name: String(arm.name || (index === 0 ? 'Baseline' : `Challenger ${ARM_KEYS[index]}`)).slice(0, 80),
        baseline: index === 0,
        weight: Math.max(1, Math.min(100, Number(arm.weight) || Math.floor(100 / arms.length))),
        description: String(arm.description || '').slice(0, 2000),
        overrides: index === 0 ? {} : arm.overrides || {},
    }));
}

function validateOverrides(arms, pageData) {
    const problems = [];
    for (const arm of arms) {
        for (const [key, override] of Object.entries(arm.overrides || {})) {
            if (!(key in pageData)) problems.push(`Arm ${arm.key}: section "${key}" is not on this page.`);
            if (!['merge', 'replace', 'remove'].includes(override?.mode))
                problems.push(`Arm ${arm.key}: section "${key}" needs mode merge, replace or remove.`);
            if (override?.mode !== 'remove' && (override?.data === undefined || override?.data === null))
                problems.push(`Arm ${arm.key}: section "${key}" has no data.`);
        }
    }
    return problems;
}

const EDITABLE = [
    'name',
    'hypothesis',
    'audience',
    'exposureDefinition',
    'primaryMetric',
    'guardrails',
    'baselineRate',
    'mdeRelative',
    'reviewBy',
    'maxDays',
    'owner',
    'approver',
    'rollbackPlan',
    'notes',
    'arms',
];

function pickEditable(input) {
    const out = {};
    for (const key of EDITABLE) if (input[key] !== undefined) out[key] = input[key];
    return out;
}

export async function createExperiment(session, input) {
    const settings = await getSettings();
    const surface = normalizeSurface(input.surface);
    const page = await loadSurfaceJson(surface);
    const id = slugId(input.id || input.name);
    if (!id) throw httpError(400, 'Name is required.');
    const arms = normalizeArms(
        input.arms?.length
            ? input.arms
            : [
                  { name: 'Baseline', weight: 50 },
                  { name: 'Challenger B', weight: 50 },
              ],
        settings.experiments.maxChallengers
    );
    const problems = validateOverrides(arms, page.data);
    if (problems.length) throw httpError(400, problems.join(' '));
    const now = new Date().toISOString();
    const exp = {
        id,
        name: String(input.name).slice(0, 120),
        surface,
        dataFile: page.file,
        status: 'draft',
        version: 1,
        hypothesis: '',
        audience: 'All visitors to this URL (bots and internal traffic are excluded from evaluation).',
        assignmentUnit: 'First-party visitor cookie (msg91_vid), stable across pages and visits.',
        exposureDefinition: 'The assigned variant of the page rendered and hydrated in the browser.',
        primaryMetric: 'signup_completed',
        guardrails: ['signup_verified'],
        baselineRate: null,
        mdeRelative: settings.experiments.defaultMdeRelative,
        reviewBy: null,
        maxDays: settings.experiments.maxDays,
        owner: session.email,
        approver: '',
        rollbackPlan:
            'Pause the experiment: every visitor immediately gets the baseline (live config refreshes within 5 seconds).',
        notes: '',
        ...pickEditable(input),
        arms,
        queuedChallengers: [],
        versions: [{ version: 1, createdAt: now, startedAt: null, endedAt: null, reason: 'created', arms }],
        instrumentation: null,
        decisions: [{ at: now, by: session.email, action: 'create', note: '' }],
        synthetic: Boolean(input.synthetic),
        createdAt: now,
        updatedAt: now,
    };
    exp.arms = arms;
    await saveAll((list) => {
        if (list.some((e) => e.id === exp.id)) throw httpError(409, `An experiment with id "${exp.id}" exists.`);
        list.push(exp);
    });
    await audit(session, 'experiment.create', exp.id, { surface });
    return exp;
}

// Updates fields. Material changes on an experiment that has started need `newVersion: true`.
export async function updateExperiment(session, id, input) {
    const settings = await getSettings();
    const patch = pickEditable(input);
    if (patch.arms) patch.arms = normalizeArms(patch.arms, settings.experiments.maxChallengers);
    if (patch.primaryMetric && !METRICS[patch.primaryMetric]?.primaryEligible)
        throw httpError(400, 'Unknown or ineligible primary metric.');
    let saved;
    await saveAll(async (list) => {
        const exp = list.find((e) => e.id === id);
        if (!exp) throw httpError(404, 'Experiment not found.');
        if (['archived', 'completed', 'rolling_out'].includes(exp.status))
            throw httpError(409, `A ${exp.status} experiment cannot be edited.`);
        const material = MATERIAL_FIELDS.filter(
            (f) => patch[f] !== undefined && JSON.stringify(patch[f]) !== JSON.stringify(exp[f])
        );
        const started = exp.versions.some((v) => v.startedAt);
        if (material.length && exp.status === 'running')
            throw httpError(409, 'Pause the experiment before changing its treatments, weights or metric.');
        if (material.length && started && !input.newVersion) {
            throw httpError(
                409,
                `Changing ${material.join(', ')} after launch starts a new version with fresh results. Confirm a new version.`,
                'needs_new_version'
            );
        }
        if (patch.arms) {
            const page = await loadSurfaceJson(exp.surface);
            const problems = validateOverrides(patch.arms, page.data);
            if (problems.length) throw httpError(400, problems.join(' '));
        }
        const now = new Date().toISOString();
        Object.assign(exp, patch, { updatedAt: now });
        if (material.length && started) {
            const current = exp.versions[exp.versions.length - 1];
            if (!current.endedAt) current.endedAt = now;
            exp.version += 1;
            exp.versions.push({
                version: exp.version,
                createdAt: now,
                startedAt: null,
                endedAt: null,
                reason: input.versionReason || `changed ${material.join(', ')}`,
                arms: exp.arms,
            });
            exp.instrumentation = null;
            exp.decisions.push({
                at: now,
                by: session.email,
                action: 'new_version',
                note: `v${exp.version}: ${material.join(', ')}`,
            });
        } else if (material.length) {
            exp.versions[exp.versions.length - 1].arms = exp.arms;
            exp.instrumentation = null;
        }
        saved = exp;
    });
    await audit(session, 'experiment.update', id, {
        fields: Object.keys(patch),
        newVersion: Boolean(input.newVersion),
    });
    return saved;
}

// Adds a challenger if a slot is free, otherwise queues it. Reservation happens under the lock,
// so concurrent agents can never exceed the limit.
export async function addChallenger(session, id, challenger) {
    const settings = await getSettings();
    let outcome;
    await saveAll(async (list) => {
        const exp = list.find((e) => e.id === id);
        if (!exp) throw httpError(404, 'Experiment not found.');
        const entry = {
            name: String(challenger.name || 'Challenger').slice(0, 80),
            description: String(challenger.description || '').slice(0, 2000),
            overrides: challenger.overrides || {},
            proposedBy: session.email,
            proposedAt: new Date().toISOString(),
        };
        const page = await loadSurfaceJson(exp.surface);
        const problems = validateOverrides([{ key: 'new', overrides: entry.overrides }], page.data);
        if (problems.length) throw httpError(400, problems.join(' '));
        const slotFree = exp.arms.length < 1 + settings.experiments.maxChallengers;
        if (slotFree && exp.status === 'draft' && !exp.versions.some((v) => v.startedAt)) {
            const arms = [...exp.arms, { ...entry, weight: exp.arms[0].weight }];
            exp.arms = normalizeArms(arms, settings.experiments.maxChallengers);
            exp.versions[exp.versions.length - 1].arms = exp.arms;
            exp.instrumentation = null;
            outcome = { placed: 'arm', key: exp.arms[exp.arms.length - 1].key };
        } else {
            exp.queuedChallengers.push(entry);
            outcome = {
                placed: 'queue',
                position: exp.queuedChallengers.length,
                reason: slotFree
                    ? 'Experiment has started; a new arm needs a new version.'
                    : 'All challenger slots are taken.',
            };
        }
        exp.updatedAt = new Date().toISOString();
    });
    await audit(session, 'experiment.challenger', id, outcome);
    return outcome;
}

export function checklist(exp, settings, { overlapping = [], pageProblems = [] } = {}) {
    const locale = exp.surface.split('/')[1];
    const items = [
        [
            'Hypothesis states the change, the audience and the expected effect',
            (exp.hypothesis || '').trim().length >= 30,
        ],
        ['Audience defined', Boolean((exp.audience || '').trim())],
        ['Stable assignment unit', Boolean(exp.assignmentUnit)],
        ['Exposure definition', Boolean((exp.exposureDefinition || '').trim())],
        ['Primary outcome is a completed conversion', Boolean(METRICS[exp.primaryMetric]?.primaryEligible)],
        ['At least one guardrail metric', Array.isArray(exp.guardrails) && exp.guardrails.some((g) => METRICS[g])],
        [
            'Baseline conversion rate entered (plans the sample size)',
            Number(exp.baselineRate) > 0 && Number(exp.baselineRate) < 1,
        ],
        ['Minimum detectable effect set', Number(exp.mdeRelative) > 0],
        ['Review date set', Boolean(exp.reviewBy)],
        ['End condition (max days)', Number(exp.maxDays) > 0 && Number(exp.maxDays) <= 90],
        ['Approver named', Boolean((exp.approver || '').trim())],
        ['Rollback plan', Boolean((exp.rollbackPlan || '').trim())],
        [
            'Every challenger changes something',
            exp.arms.slice(1).every((a) => Object.keys(a.overrides || {}).length > 0),
        ],
        ['Treatments match the current page JSON', pageProblems.length === 0, pageProblems.join(' ')],
        [
            'Tracking validated for this version (synthetic round trip)',
            exp.instrumentation?.version === exp.version && exp.instrumentation?.ok,
        ],
        ['No other experiment on this surface', overlapping.length === 0, overlapping.join(', ')],
        [
            'Surface does not need a consent banner first',
            !settings.experiments.consentLockedLocales.includes(locale),
            `Locale "${locale}" is consent-locked in Settings.`,
        ],
    ];
    return items.map(([label, ok, detail]) => ({ label, ok: Boolean(ok), detail: ok ? '' : detail || '' }));
}

export async function getChecklist(exp) {
    const settings = await getSettings();
    const list = await listExperiments();
    const overlapping = list
        .filter((e) => e.id !== exp.id && e.surface === exp.surface && BLOCKING_STATUSES.includes(e.status))
        .map((e) => e.id);
    let pageProblems = [];
    try {
        const page = await loadSurfaceJson(exp.surface);
        pageProblems = validateOverrides(exp.arms, page.data);
    } catch (error) {
        pageProblems = [error.message];
    }
    return checklist(exp, settings, { overlapping, pageProblems });
}

async function transition(session, id, action, apply) {
    let saved;
    await saveAll(async (list) => {
        const exp = list.find((e) => e.id === id);
        if (!exp) throw httpError(404, 'Experiment not found.');
        await apply(exp, list);
        const now = new Date().toISOString();
        exp.updatedAt = now;
        exp.decisions.push({ at: now, by: session.email, action, note: exp._note || '' });
        delete exp._note;
        saved = exp;
    });
    await audit(session, `experiment.${action}`, id, { status: saved.status, version: saved.version });
    return saved;
}

export async function launch(session, id) {
    const settings = await getSettings();
    if (!settings.experiments.allowLaunch) {
        throw httpError(
            403,
            'Launching is switched off in Settings → Experiments (release authority).',
            'launch_disabled'
        );
    }
    const exp = await getExperimentOrThrow(id);
    if (exp.synthetic) throw httpError(409, 'Synthetic fixture experiments cannot be launched.');
    const items = await getChecklist(exp);
    const missing = items.filter((i) => !i.ok);
    if (missing.length)
        throw httpError(409, `Launch checklist incomplete: ${missing.map((i) => i.label).join('; ')}.`, 'checklist');
    return transition(session, id, 'launch', (e, list) => {
        if (!['draft', 'paused'].includes(e.status)) throw httpError(409, `Cannot launch a ${e.status} experiment.`);
        if (list.some((o) => o.id !== e.id && o.surface === e.surface && BLOCKING_STATUSES.includes(o.status)))
            throw httpError(409, 'Another experiment holds this surface.');
        const current = e.versions[e.versions.length - 1];
        if (!current.startedAt) current.startedAt = new Date().toISOString();
        e.status = 'running';
    });
}

export const pause = (session, id, note) =>
    transition(session, id, 'pause', (e) => {
        if (!['running', 'rolling_out'].includes(e.status))
            throw httpError(409, `Cannot pause a ${e.status} experiment.`);
        e.status = 'paused';
        e.rolloutArm = null;
        e._note = note || '';
    });

export const resume = (session, id) => launch(session, id);

export const stop = (session, id, note) =>
    transition(session, id, 'stop', (e) => {
        if (!['running', 'paused'].includes(e.status)) throw httpError(409, `Cannot stop a ${e.status} experiment.`);
        e.status = 'completed';
        e.versions[e.versions.length - 1].endedAt = new Date().toISOString();
        e.outcome = { decision: 'keep_baseline', note: note || '' };
        e._note = note || '';
    });

// Sends all traffic to the chosen arm and proposes the treatment as a permanent page JSON change.
export async function promote(session, id, armKey, note) {
    const exp = await getExperimentOrThrow(id);
    const arm = exp.arms.find((a) => a.key === armKey && !a.baseline);
    if (!arm) throw httpError(400, 'Choose a challenger to promote.');
    const page = await loadSurfaceJson(exp.surface);
    const promotedData = applyOverrides(page.data, arm.overrides);
    let promotion = {
        status: 'brief_only',
        note: 'Writeback is off: apply the change below by hand.',
        file: page.file,
    };
    if (repoConfig().mode !== 'off') {
        try {
            const result = await proposeChange({
                file: page.file,
                baseSha: page.sha,
                content: `${JSON.stringify(promotedData, null, 4)}\n`,
                id: `${exp.id}-${armKey}`.slice(0, 30),
                title: `content: promote ${exp.id} arm ${armKey} on ${exp.surface}`,
                body: `Experiment ${exp.id} v${exp.version} promoted arm ${armKey} (${arm.name}).\n\n${note || ''}\n\nRetire the experiment in the admin after this is deployed.`,
            });
            promotion = { ...result, file: page.file };
        } catch (error) {
            promotion = { status: 'sync_failed', error: error.message, file: page.file };
        }
    }
    return transition(session, id, 'promote', (e) => {
        if (!['running', 'paused'].includes(e.status))
            throw httpError(409, `Cannot promote from a ${e.status} experiment.`);
        e.status = 'rolling_out';
        e.rolloutArm = armKey;
        e.versions[e.versions.length - 1].endedAt = new Date().toISOString();
        e.outcome = { decision: 'promote', arm: armKey, note: note || '' };
        e.promotion = promotion;
        e._note = note || '';
    });
}

export const retire = (session, id, note) =>
    transition(session, id, 'retire', (e) => {
        if (!['completed', 'rolling_out', 'draft', 'paused'].includes(e.status))
            throw httpError(409, `Cannot retire a ${e.status} experiment.`);
        e.status = 'archived';
        e.rolloutArm = null;
        e._note = note || '';
    });

// Stops routing everyone to a promoted arm (for example when the promotion PR was rejected).
export const rollback = (session, id, note) =>
    transition(session, id, 'rollback', (e) => {
        if (!['rolling_out', 'running'].includes(e.status))
            throw httpError(409, `Cannot roll back a ${e.status} experiment.`);
        e.status = 'paused';
        e.rolloutArm = null;
        e._note = note || 'rolled back to baseline';
    });

export async function recordInstrumentation(session, id, result) {
    let saved;
    await saveAll((list) => {
        const exp = list.find((e) => e.id === id);
        if (!exp) throw httpError(404, 'Experiment not found.');
        exp.instrumentation = {
            ...result,
            version: exp.version,
            validatedAt: new Date().toISOString(),
            by: session.email,
        };
        saved = exp;
    });
    await audit(session, 'experiment.validate_tracking', id, { ok: result.ok });
    return saved;
}

export async function results(exp, version = exp.version) {
    const settings = await getSettings();
    const agg = await aggregate(exp, version, settings.experiments.attributionDays);
    const versionArms = exp.versions.find((v) => v.version === version)?.arms || exp.arms;
    const customer = agg.byClass.customer || {};
    const metricRows = [exp.primaryMetric, ...(exp.guardrails || [])].filter(
        (m, i, all) => METRICS[m] && all.indexOf(m) === i
    );
    const evaluations = {};
    for (const metric of metricRows) {
        const arms = versionArms.map((arm) => ({
            key: arm.key,
            baseline: arm.baseline,
            weight: arm.weight,
            n: customer[arm.key]?.n || 0,
            x: customer[arm.key]?.metrics?.[metric] || 0,
        }));
        evaluations[metric] = {
            arms,
            ...evaluate(arms, {
                alpha: settings.experiments.alpha,
                power: settings.experiments.power,
                mdeRelative: Number(exp.mdeRelative) || settings.experiments.defaultMdeRelative,
                baselineRate: Number(exp.baselineRate) || null,
                interimZ: settings.experiments.interimZ,
            }),
        };
    }
    const excluded = Object.fromEntries(
        Object.entries(agg.byClass)
            .filter(([cls]) => cls !== 'customer')
            .map(([cls, arms]) => [cls, Object.values(arms).reduce((s, a) => s + a.n, 0)])
    );
    return {
        version,
        primaryMetric: exp.primaryMetric,
        evaluations,
        excluded,
        conflicts: agg.conflicts,
        lastEventAt: agg.lastEventAt,
        daily: agg.daily,
        records: agg.records,
    };
}

// A concrete brief for a coding agent or developer. No generation service is connected.
export async function changeBrief(exp, armKey) {
    const arm = exp.arms.find((a) => a.key === armKey) || exp.arms[1];
    let sections = '';
    try {
        const page = await loadSurfaceJson(exp.surface);
        sections = Object.keys(page.data).join(', ');
    } catch (error) {
        sections = `unavailable (${error.message})`;
    }
    return [
        `# Challenger brief: ${exp.name} — arm ${arm?.key || '?'}`,
        '',
        `- Surface: \`${exp.surface}\` (page JSON \`${exp.dataFile}\`)`,
        `- Sections on the page, in order: ${sections}`,
        `- Hypothesis: ${exp.hypothesis || '(missing)'}`,
        `- Audience: ${exp.audience}`,
        `- Primary outcome: ${METRICS[exp.primaryMetric]?.label || exp.primaryMetric}; guardrails: ${(exp.guardrails || []).join(', ')}`,
        `- Arm description: ${arm?.description || '(describe the intended change)'}`,
        '',
        '## Constraints',
        '- Express the treatment as section overrides `{ "<SectionKey>": { "mode": "merge" | "replace" | "remove", "data": {...} } }` against the page JSON. Do not edit the page JSON itself while the experiment runs.',
        '- Use only components registered in `src/components/PageRenderer/sectionRegistry.js` and Tailwind classes that already exist in scanned files (docs/DESIGN.md).',
        '- Claims must appear in the claim register in docs/POSITIONING.md with evidence; no new numbers, logos or testimonials.',
        '- Keep CTA destinations and the sign-up contract unchanged (docs/CONTRACTS.md). Keep HeadComp (title, canonical, analytics) unchanged.',
        '- Follow docs/EXPERIMENTS.md. Preview the arm from the admin before proposing it.',
        '',
        '## Acceptance',
        '- Overrides validate in the admin, preview renders at 375px and 1280px with no console errors, and the copy follows docs/DESIGN.md voice.',
    ].join('\n');
}
