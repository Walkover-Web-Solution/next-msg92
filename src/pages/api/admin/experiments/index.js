// Create an experiment (always as a draft).
import { withAdmin } from '@/lib/admin/auth';
import { createExperiment } from '@/lib/admin/experiments/service';

export default withAdmin('experiments.edit', async (req, res, session) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
    return res.status(201).json(await createExperiment(session, req.body || {}));
});
