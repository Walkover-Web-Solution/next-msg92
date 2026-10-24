// Server-only operator settings. Stored as overrides on top of DEFAULTS; every change is audited
// with its previous value. Free-text guidance never grants access: permissions live in auth.js.
import { read, update } from '@/lib/admin/store';
import { audit } from '@/lib/admin/audit';
import { httpError } from '@/lib/admin/auth';

export const DEFAULTS = {
    knowledge: { freshnessDays: 90 },
    analyses: {
        paused: false,
        maxRetries: 2,
        budget: { maxRunsPerDay: 60, maxUrlFetchesPerRun: 150, maxAiCallsPerDay: 20 },
        // Per-analysis overrides: { [analysisId]: { enabled: boolean, everyHours: number } }
        schedules: {},
    },
    research: { paused: false, maxFetchesPerRun: 40 },
    experiments: {
        // Release authority: launching on production traffic also needs an owner and this switch.
        allowLaunch: false,
        maxChallengers: 2,
        alpha: 0.05,
        power: 0.8,
        defaultMdeRelative: 0.2,
        maxDays: 42,
        attributionDays: 30,
        // Haybittle–Peto interim boundary (|z| ≥ 3.29 ≈ p < 0.001) for stopping a harmful arm early.
        interimZ: 3.29,
        autoStopHarmful: false,
        // Locales whose visitors need consent before an experiment cookie is set (no consent banner yet).
        consentLockedLocales: ['es', 'gb'],
    },
    automation: { analysesMayProposeChanges: false },
    ai: { enabled: false, model: 'claude-opus-5-5', effort: 'low' },
    notifications: { channel: 'none' },
};

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

function merge(base, overrides) {
    if (!isObject(overrides)) return base;
    const out = { ...base };
    for (const [key, value] of Object.entries(overrides)) {
        out[key] = isObject(value) && isObject(base?.[key]) ? merge(base[key], value) : value;
    }
    return out;
}

export async function getSettings() {
    return merge(DEFAULTS, await read('settings', {}));
}

// Accepts only keys that exist in DEFAULTS (or under the free-form analyses.schedules map) with
// values of the same type.
function validate(patch, schema = DEFAULTS, prefix = '') {
    for (const [key, value] of Object.entries(patch)) {
        const pathKey = `${prefix}${key}`;
        if (pathKey.startsWith('analyses.schedules.')) {
            if (!isObject(value)) throw httpError(400, `${pathKey} must be an object.`);
            continue;
        }
        if (!(key in schema)) throw httpError(400, `Unknown setting ${pathKey}.`);
        const expected = schema[key];
        if (isObject(expected)) {
            if (!isObject(value)) throw httpError(400, `${pathKey} must be an object.`);
            validate(value, expected, `${pathKey}.`);
        } else if (Array.isArray(expected)) {
            if (!Array.isArray(value)) throw httpError(400, `${pathKey} must be a list.`);
        } else if (typeof value !== typeof expected) {
            throw httpError(400, `${pathKey} must be a ${typeof expected}.`);
        }
    }
}

export async function updateSettings(session, patch) {
    if (!isObject(patch)) throw httpError(400, 'Expected an object.');
    validate(patch);
    const before = await getSettings();
    await update('settings', {}, (current) => merge(current, patch));
    const after = await getSettings();
    await audit(session, 'settings.update', 'settings', { patch, before: pick(before, patch) });
    return after;
}

function pick(source, shape) {
    const out = {};
    for (const key of Object.keys(shape))
        out[key] = isObject(shape[key]) && isObject(source?.[key]) ? pick(source[key], shape[key]) : source?.[key];
    return out;
}
