// Save a knowledge draft (create or update). Drafts are proposals; the repository stays the source.
import { withAdmin } from '@/lib/admin/auth';
import { saveDraft, restore } from '@/lib/admin/knowledge/service';

export default withAdmin('knowledge.edit', async (req, res, session) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
    if (req.body?.restoreSha) return res.status(200).json(await restore(session, req.body.docId, req.body.restoreSha));
    return res.status(200).json(await saveDraft(session, req.body || {}));
});
