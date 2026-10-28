// Deterministic experiment assignment shared by the proxy (routing), the experiment route
// (rendering) and the event API (validation), so all three always agree on a visitor's arm.
import crypto from 'node:crypto';

export const VISITOR_COOKIE = 'msg91_vid';
export const PARTICIPATION_COOKIE = 'msg91_exp';
// Readable by page scripts only so they know whether to send outcome events; holds no assignment.
export const PARTICIPATING_FLAG_COOKIE = 'msg91_exp_on';

export function newVisitorId() {
    return crypto.randomUUID();
}

export function isValidVisitorId(value) {
    return typeof value === 'string' && /^[0-9a-f-]{36}$/.test(value);
}

// 0..9999, stable for (unit, experiment, version). A new version reshuffles visitors.
export function bucket(unit, experimentId, version) {
    const hex = crypto.createHash('sha256').update(`${unit}:${experimentId}:${version}`).digest('hex');
    return parseInt(hex.slice(0, 8), 16) % 10000;
}

export function chooseArm(arms, value) {
    const total = arms.reduce((sum, arm) => sum + Math.max(0, Number(arm.weight) || 0), 0);
    if (!total) return arms[0]?.key || null;
    let cumulative = 0;
    for (const arm of arms) {
        cumulative += (Math.max(0, Number(arm.weight) || 0) / total) * 10000;
        if (value < cumulative) return arm.key;
    }
    return arms[arms.length - 1].key;
}

// `live` is one entry of the compiled live config: { id, version, status, arms, rolloutArm }.
export function assign(unit, live) {
    if (live.status === 'rolling_out') return live.rolloutArm;
    return chooseArm(live.arms, bucket(unit, live.id, live.version));
}

export function normalizeSurface(pathname) {
    const trimmed = String(pathname || '/')
        .split('?')[0]
        .replace(/\/+$/, '');
    return trimmed === '' ? '/' : trimmed;
}

// Cookie value: `id:version:arm` entries joined by `|`.
export function parseParticipation(value) {
    return String(value || '')
        .split('|')
        .map((entry) => entry.split(':'))
        .filter((parts) => parts.length === 3 && parts[0] && parts[2])
        .map(([id, version, arm]) => ({ id, version: Number(version), arm }));
}

export function serializeParticipation(entries) {
    return entries
        .slice(-5)
        .map((e) => `${e.id}:${e.version}:${e.arm}`)
        .join('|');
}

const BOT_PATTERN =
    /bot|crawl|spider|slurp|bingpreview|mediapartners|facebookexternalhit|embedly|quora link preview|whatsapp|telegrambot|discordbot|lighthouse|pagespeed|headless|phantomjs|python-requests|curl|wget|httpclient|go-http-client|node-fetch|axios|playwright|puppeteer|selenium/i;

// Classifies traffic for reporting. Only `customer` traffic is used to evaluate experiments.
export function classifyTraffic({ userAgent, internalCookie, syntheticHeader, preview }) {
    if (syntheticHeader) return 'synthetic';
    if (preview) return 'preview';
    if (internalCookie) return 'internal';
    if (!userAgent || BOT_PATTERN.test(userAgent)) return 'bot';
    return 'customer';
}
