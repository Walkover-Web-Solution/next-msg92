// PATCH: edit fields (new version when material). POST { action }: lifecycle and tooling actions.
// Launch, resume, promote, stop and retire need the owner role; pausing and rolling back to the
// baseline are safety actions any editor may take.
import { withAdmin, httpError } from '@/lib/admin/auth';
import * as experiments from '@/lib/admin/experiments/service';
import { validateTracking } from '@/lib/admin/experiments/validate';
import { triggerEvent } from '@/lib/admin/analyses/runner';

const OWNER_ACTIONS = {
    launch: 'experiments.launch',
    resume: 'experiments.launch',
    promote: 'experiments.decide',
    stop: 'experiments.decide',
    retire: 'experiments.decide',
};

function capability(req) {
    if (req.method === 'GET') return 'view';
    return OWNER_ACTIONS[req.body?.action] || 'experiments.edit';
}

function originOf(req) {
    const proto = req.headers['x-forwarded-proto'] || 'http';
    return `${proto}://${req.headers['x-forwarded-host'] || req.headers.host}`;
}

export default withAdmin(capability, async (req, res, session) => {
    const id = req.query.id;
    if (req.method === 'GET') {
        const exp = await experiments.getExperimentOrThrow(id);
        if (req.query.brief)
            return res.status(200).json({ brief: await experiments.changeBrief(exp, req.query.brief) });
        return res.status(200).json({
            experiment: exp,
            checklist: await experiments.getChecklist(exp),
            results: await experiments.results(exp),
        });
    }
    if (req.method === 'PATCH')
        return res.status(200).json(await experiments.updateExperiment(session, id, req.body || {}));
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { action, note, arm, challenger } = req.body || {};
    switch (action) {
        case 'launch':
        case 'resume': {
            const exp = await experiments.launch(session, id);
            triggerEvent('experiment.launch');
            return res.status(200).json(exp);
        }
        case 'pause':
            return res.status(200).json(await experiments.pause(session, id, note));
        case 'rollback':
            return res.status(200).json(await experiments.rollback(session, id, note));
        case 'stop':
            return res.status(200).json(await experiments.stop(session, id, note));
        case 'promote':
            return res.status(200).json(await experiments.promote(session, id, arm, note));
        case 'retire':
            return res.status(200).json(await experiments.retire(session, id, note));
        case 'challenger':
            return res.status(200).json(await experiments.addChallenger(session, id, challenger || {}));
        case 'validate-tracking': {
            const exp = await experiments.getExperimentOrThrow(id);
            const result = await validateTracking(exp, originOf(req));
            await experiments.recordInstrumentation(session, id, result);
            return res.status(200).json(result);
        }
        default:
            throw httpError(400, 'Unknown action.');
    }
});
