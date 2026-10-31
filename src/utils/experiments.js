// A/B experiments through the middleware. Never awaits the network: the page never waits for it.
// Both values come from the site's public environment variables MW_EVENTS_URL and MW_KEY, read the way
// this framework reads them (the next.config.mjs `env` block); never write the values here.
// Unset: the control is shown and nothing is sent.
//
// A page picks a variant during render and records later, from an effect or an event handler:
//   import { mwVariant, mwSend } from '@/utils/experiments';
//   const variant = mwVariant('experiment-key', [['control', 50], ['b', 50]]);
//   mwSend({ event: 'exposure', experiment: 'experiment-key', variant });
//   mwSend({ event: 'conversion', experiment: 'experiment-key', variant, goal: 'signup' });
// Do not call mwSend during render. No experiment is assigned in this file.

const MW_EVENTS = process.env.MW_EVENTS_URL || '';
const MW_KEY = process.env.MW_KEY || '';
const mwConfigured = Boolean(MW_EVENTS && MW_KEY);
let mwId;
let mwOff = !mwConfigured;

function mwVisitor() {
    if (mwId) return mwId;
    // One Node process serves every visitor. Never mint or remember an id on the server.
    if (typeof window === 'undefined') return '';
    try {
        mwId = localStorage.getItem('mw_visitor');
    } catch {
        /* private mode or a blocked storage API */
    }
    if (!mwId) {
        const bytes = new Uint8Array(16);
        try {
            crypto.getRandomValues(bytes);
        } catch {
            for (let i = 0; i < 16; i++) bytes[i] = Math.random() * 256;
        }
        mwId = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
        try {
            localStorage.setItem('mw_visitor', mwId);
        } catch {
            /* the id still works for this page view */
        }
    }
    return mwId;
}

function mwBucket(experiment, visitorId, variants) {
    let h = 0x811c9dc5;
    const s = `${experiment}:${visitorId}`;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
    h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    h = (h ^ (h >>> 16)) >>> 0;
    let n = h % variants.reduce((sum, [, w]) => sum + w, 0);
    for (const [key, w] of variants) if ((n -= w) < 0) return key;
}

// The variant to render, at once and locally. variants exactly as defined on the middleware, in order:
// [['control', 50], ['b', 50]]. On any error: the control (the first), or undefined if there is none.
export function mwVariant(experiment, variants) {
    try {
        // Unset env, or the server: the control. A later send failure must not change this.
        if (!mwConfigured || typeof window === 'undefined') return variants?.[0]?.[0];
        return mwBucket(experiment, mwVisitor(), variants) ?? variants[0][0];
    } catch {
        return variants?.[0]?.[0];
    }
}

// Fire and forget: returns nothing, never throws, never waits. Do not await it or chain on it.
export function mwSend(event) {
    // { event: 'exposure' | 'conversion', experiment, variant, goal? }
    if (mwOff || typeof window === 'undefined') return;
    try {
        const body = JSON.stringify({ key: MW_KEY, visitor_id: mwVisitor(), ...event });
        if (navigator.sendBeacon?.(MW_EVENTS, body)) return;
        const signal =
            typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined;
        fetch(MW_EVENTS, { method: 'POST', body, keepalive: true, credentials: 'omit', signal }).catch(() => {
            mwOff = true;
        });
    } catch {
        mwOff = true;
    }
}

if (typeof window !== 'undefined') {
    window.mwVariant = mwVariant;
    window.mwSend = mwSend;
}
