// Server-only experiment event ingestion and aggregation.
//
// Assignment happens in the proxy; *exposure* is recorded only when the assigned variant actually
// rendered in the browser; *outcomes* come from real conversion points (see METRICS). Events are
// appended to one JSONL log per experiment version and de-duplicated per visitor when aggregated,
// so retries and double beacons never inflate counts.
import crypto from 'node:crypto';
import { appendLog, readLog } from '@/lib/admin/store';
import { readCookie, INTERNAL_COOKIE } from '@/lib/admin/auth';
import { getExperiment } from '@/lib/experiments/live';
import {
    VISITOR_COOKIE,
    PARTICIPATION_COOKIE,
    assign,
    classifyTraffic,
    isValidVisitorId,
    parseParticipation,
} from '@/lib/experiments/assignment';

// Outcome metrics the site can actually observe. Keep in step with docs/MEASUREMENT.md.
export const METRICS = {
    signup_completed: {
        label: 'Sign-up completed',
        description: 'MSG91 finalRegister returned success (account and company created).',
        source: 'src/components/signupComp/SignUp.js finalSubmit',
        primaryEligible: true,
    },
    signup_verified: {
        label: 'Sign-up identity verified',
        description: 'validateEmailSignUp / validateGithubSignUp returned success after OTP verification.',
        source: 'src/components/signupComp/SignUp.js validateUserForCompany',
        primaryEligible: true,
    },
    signup_started: {
        label: 'Sign-up started',
        description: 'Visitor chose a sign-up method on /signup (step 2 opened or GitHub chosen).',
        source: 'src/components/signupComp/SignUp.js setStep',
        primaryEligible: false,
    },
};

export const logName = (id, version) => `exp/${id}/v${version}`;

function unitHash(visitorId) {
    const key = process.env.EXPERIMENT_HASH_SECRET || process.env.ADMIN_SESSION_SECRET || 'msg91-experiments';
    return crypto.createHmac('sha256', key).update(visitorId).digest('hex').slice(0, 20);
}

const seen = new Set();
function firstTime(key) {
    if (seen.has(key)) return false;
    if (seen.size > 50_000) seen.clear();
    seen.add(key);
    return true;
}

function expectedArm(exp, visitorId) {
    return assign(visitorId, {
        id: exp.id,
        version: exp.version,
        status: exp.status,
        arms: exp.arms,
        rolloutArm: exp.rolloutArm,
    });
}

// Returns { accepted, reason } — never throws for bad client input.
export async function ingest(body, req) {
    const visitorId = readCookie(req, VISITOR_COOKIE);
    if (!isValidVisitorId(visitorId)) return { accepted: false, reason: 'no_visitor' };
    const cls = classifyTraffic({
        userAgent: req.headers['user-agent'],
        internalCookie: readCookie(req, INTERNAL_COOKIE),
        syntheticHeader: req.headers['x-msg91-synthetic'] === '1',
        preview: Boolean(body?.preview),
    });
    if (cls === 'preview') return { accepted: false, reason: 'preview' };
    const unit = unitHash(visitorId);
    const at = new Date().toISOString();

    if (body?.type === 'exposure') {
        const exp = await getExperiment(String(body.exp || ''));
        if (!exp || exp.status === 'archived') return { accepted: false, reason: 'unknown_experiment' };
        const live = exp.status === 'running';
        if (!live && cls !== 'synthetic') return { accepted: false, reason: 'not_running' };
        if (Number(body.version) !== exp.version) return { accepted: false, reason: 'stale_version' };
        if (body.arm !== expectedArm(exp, visitorId)) return { accepted: false, reason: 'arm_mismatch' };
        if (!firstTime(`${exp.id}:${exp.version}:x:${unit}`)) return { accepted: true, reason: 'duplicate' };
        await appendLog(logName(exp.id, exp.version), {
            k: 'x',
            u: unit,
            a: body.arm,
            c: cls,
            t: at,
            p: String(body.path || '').slice(0, 200),
        });
        return { accepted: true };
    }

    if (body?.type === 'outcome') {
        const metric = String(body.metric || '');
        if (!METRICS[metric]) return { accepted: false, reason: 'unknown_metric' };
        const participation = parseParticipation(readCookie(req, PARTICIPATION_COOKIE));
        let recorded = 0;
        let duplicates = 0;
        for (const entry of participation) {
            const exp = await getExperiment(entry.id);
            if (!exp || exp.version !== entry.version || exp.status === 'archived') continue;
            if (exp.status === 'draft' && cls !== 'synthetic') continue;
            if (exp.status === 'running' && entry.arm !== expectedArm(exp, visitorId)) continue;
            if (!firstTime(`${exp.id}:${exp.version}:o:${metric}:${unit}`)) {
                duplicates++;
                continue;
            }
            await appendLog(logName(exp.id, exp.version), { k: 'o', u: unit, m: metric, c: cls, t: at });
            recorded++;
        }
        if (recorded) return { accepted: true };
        return { accepted: false, reason: duplicates ? 'duplicate' : 'no_participation' };
    }
    return { accepted: false, reason: 'unknown_type' };
}

// Counts unique exposed visitors and attributed conversions per traffic class and arm.
export async function aggregate(exp, version = exp.version, attributionDays = 30) {
    const records = await readLog(logName(exp.id, version));
    const exposures = new Map();
    const conflicts = new Set();
    const outcomes = new Map();
    const daily = {};
    let lastEventAt = null;
    for (const r of records) {
        if (!lastEventAt || r.t > lastEventAt) lastEventAt = r.t;
        if (r.k === 'x') {
            const prior = exposures.get(r.u);
            if (prior && prior.a !== r.a) conflicts.add(r.u);
            if (!prior || r.t < prior.t) exposures.set(r.u, { a: r.a, t: r.t, c: r.c });
            if (r.c === 'customer' && !prior) daily[r.t.slice(0, 10)] = (daily[r.t.slice(0, 10)] || 0) + 1;
        } else if (r.k === 'o') {
            const key = `${r.m}:${r.u}`;
            if (!outcomes.has(key) || r.t < outcomes.get(key).t) outcomes.set(key, { m: r.m, u: r.u, t: r.t });
        }
    }
    const byClass = {};
    const windowMs = attributionDays * 86_400_000;
    for (const [unit, exposure] of exposures) {
        if (conflicts.has(unit)) continue;
        const cls = (byClass[exposure.c] ||= {});
        const arm = (cls[exposure.a] ||= { n: 0, metrics: {} });
        arm.n++;
        for (const metric of Object.keys(METRICS)) {
            const outcome = outcomes.get(`${metric}:${unit}`);
            if (!outcome) continue;
            const delta = new Date(outcome.t) - new Date(exposure.t);
            if (delta >= 0 && delta <= windowMs) arm.metrics[metric] = (arm.metrics[metric] || 0) + 1;
        }
    }
    return { byClass, conflicts: conflicts.size, lastEventAt, daily, records: records.length };
}
