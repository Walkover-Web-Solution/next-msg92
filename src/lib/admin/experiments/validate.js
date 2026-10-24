// Server-only tracking validation: sends synthetic exposure and outcome events for every arm
// through the real public endpoint (/api/exp/event), then confirms they were recorded, attributed
// to the right arm and classified `synthetic` (so they never reach customer results).
import { assign, newVisitorId, serializeParticipation } from '@/lib/experiments/assignment';
import { aggregate } from '@/lib/experiments/events';

function visitorForArm(exp, armKey) {
    const live = { id: exp.id, version: exp.version, status: 'running', arms: exp.arms };
    for (let i = 0; i < 500; i++) {
        const id = newVisitorId();
        if (assign(id, live) === armKey) return id;
    }
    return null;
}

export async function validateTracking(exp, origin) {
    const before = await aggregate(exp);
    const steps = [];
    for (const arm of exp.arms) {
        const visitorId = visitorForArm(exp, arm.key);
        if (!visitorId) {
            steps.push({
                arm: arm.key,
                ok: false,
                detail: 'Could not find a visitor id for this arm (weight too small?).',
            });
            continue;
        }
        const cookie = `msg91_vid=${visitorId}; msg91_exp=${encodeURIComponent(serializeParticipation([{ id: exp.id, version: exp.version, arm: arm.key }]))}`;
        const headers = {
            'Content-Type': 'application/json',
            Cookie: cookie,
            'x-msg91-synthetic': '1',
            'User-Agent': 'msg91-admin-tracking-validation',
        };
        const post = async (body) => {
            const res = await fetch(`${origin}/api/exp/event`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
                signal: AbortSignal.timeout(10_000),
            });
            return { status: res.status, body: await res.json().catch(() => ({})) };
        };
        const exposure = await post({
            type: 'exposure',
            exp: exp.id,
            version: exp.version,
            arm: arm.key,
            path: exp.surface,
        });
        const outcome = await post({ type: 'outcome', metric: exp.primaryMetric });
        steps.push({ arm: arm.key, exposure, outcome });
    }
    const after = await aggregate(exp);
    const synthetic = after.byClass.synthetic || {};
    const prior = before.byClass.synthetic || {};
    const customerUnchanged =
        JSON.stringify(after.byClass.customer || {}) === JSON.stringify(before.byClass.customer || {});
    for (const step of steps) {
        if (step.ok === false) continue;
        const exposed = (synthetic[step.arm]?.n || 0) > (prior[step.arm]?.n || 0);
        const converted =
            (synthetic[step.arm]?.metrics?.[exp.primaryMetric] || 0) >
            (prior[step.arm]?.metrics?.[exp.primaryMetric] || 0);
        step.ok = exposed && converted;
        step.detail = step.ok
            ? 'Exposure and outcome recorded as synthetic.'
            : `Exposure ${exposed ? 'ok' : 'missing'} (${step.exposure.body.reason || step.exposure.status}); outcome ${converted ? 'ok' : 'missing'} (${step.outcome.body.reason || step.outcome.status}).`;
    }
    return { ok: steps.every((s) => s.ok) && customerUnchanged, customerUnchanged, steps, origin };
}
