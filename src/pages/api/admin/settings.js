// PATCH settings (owner only). Every change is audited with its previous value.
import { withAdmin } from '@/lib/admin/auth';
import { updateSettings } from '@/lib/admin/settings';

export default withAdmin('settings.edit', async (req, res, session) => {
    if (req.method !== 'PATCH') return res.status(405).json({ error: 'PATCH only' });
    return res.status(200).json(await updateSettings(session, req.body || {}));
});
