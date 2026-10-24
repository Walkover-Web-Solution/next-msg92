// GET: diff of a change against the current revision. POST { action }: submit | refresh | discard | rebase.
import { withAdmin, httpError } from '@/lib/admin/auth';
import { diffChange, submitChange, refresh, discard, rebase } from '@/lib/admin/knowledge/service';
import { triggerEvent } from '@/lib/admin/analyses/runner';

const actions = { submit: submitChange, refresh, discard, rebase };

export default withAdmin(
    (req) => (req.method === 'GET' ? 'view' : 'knowledge.edit'),
    async (req, res, session) => {
        if (req.method === 'GET') return res.status(200).json(await diffChange(req.query.id));
        const action = actions[req.body?.action];
        if (!action) throw httpError(400, 'Unknown action.');
        const change = await action(session, req.query.id);
        if (change?.status === 'effective') triggerEvent('knowledge.effective');
        return res.status(200).json(change);
    }
);
