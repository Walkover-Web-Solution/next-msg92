// Server-only view of the experiment registry used on the request path (proxy, experiment route,
// event API). The admin service owns writes; this module only reads, with a short cache.
import { read } from '@/lib/admin/store';

export const EXPERIMENTS_DOC = 'experiments';
export const LIVE_DOC = 'experiments-live';
// Statuses that route visitors. `rolling_out` sends everyone to the promoted arm until retirement.
export const LIVE_STATUSES = ['running', 'rolling_out'];
const TTL_MS = 5000;

let cache = { at: 0, value: null };

// { bySurface: { '/path': { id, version, status, arms: [{ key, weight }], rolloutArm } }, updatedAt }
export async function getLiveConfig() {
    if (cache.value && Date.now() - cache.at < TTL_MS) return cache.value;
    let value;
    try {
        value = await read(LIVE_DOC, { bySurface: {}, updatedAt: null });
    } catch (error) {
        // A broken store must never break the public site: route nobody into experiments.
        console.error('[experiments] live config unreadable', error);
        value = { bySurface: {}, updatedAt: null };
    }
    cache = { at: Date.now(), value };
    return value;
}

export function compileLive(experiments) {
    const bySurface = {};
    for (const exp of experiments) {
        if (!LIVE_STATUSES.includes(exp.status) || exp.synthetic) continue;
        bySurface[exp.surface] = {
            id: exp.id,
            version: exp.version,
            status: exp.status,
            arms: exp.arms.map((arm) => ({ key: arm.key, weight: arm.weight })),
            rolloutArm: exp.rolloutArm || null,
        };
    }
    return { bySurface, updatedAt: new Date().toISOString() };
}

export async function getExperiment(id) {
    const experiments = await read(EXPERIMENTS_DOC, []);
    return experiments.find((exp) => exp.id === id) || null;
}

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

function deepMerge(base, patch) {
    if (!isObject(base) || !isObject(patch)) return patch;
    const out = { ...base };
    for (const [key, value] of Object.entries(patch))
        out[key] = isObject(value) && isObject(base[key]) ? deepMerge(base[key], value) : value;
    return out;
}

// overrides: { [sectionKey]: { mode: 'merge' | 'replace' | 'remove', data } }. Section order is kept.
export function applyOverrides(data, overrides = {}) {
    const out = {};
    for (const [key, value] of Object.entries(data)) {
        const override = overrides[key];
        if (!override) out[key] = value;
        else if (override.mode === 'remove') continue;
        else if (override.mode === 'replace') out[key] = override.data;
        else out[key] = deepMerge(value, override.data);
    }
    return out;
}
