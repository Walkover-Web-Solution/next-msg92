// Research actions: save/remove a watchlist entry, run monitoring now, record a finding.
import { withAdmin, httpError } from '@/lib/admin/auth';
import { saveEntry, removeEntry, runResearch, addFinding } from '@/lib/admin/research';

export default withAdmin(
    (req) => (req.body?.action === 'run' ? 'research.run' : 'research.edit'),
    async (req, res, session) => {
        if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
        const { action } = req.body || {};
        if (action === 'save') return res.status(200).json(await saveEntry(session, req.body.entry || {}));
        if (action === 'remove') {
            await removeEntry(session, req.body.id);
            return res.status(200).json({ ok: true });
        }
        if (action === 'run')
            return res.status(200).json(await runResearch({ trigger: 'manual', ids: req.body.ids, by: session.email }));
        if (action === 'finding') return res.status(200).json(await addFinding(session, req.body.finding || {}));
        throw httpError(400, 'Unknown action.');
    }
);
