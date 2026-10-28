// POST: run one analysis now (manual trigger). Runs are deduplicated and budgeted in the runner.
import { withAdmin } from '@/lib/admin/auth';
import { runAnalysis } from '@/lib/admin/analyses/runner';

export default withAdmin('analyses.run', async (req, res, session) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
    return res.status(200).json(await runAnalysis(req.query.id, { trigger: 'manual', by: session.email, session }));
});
