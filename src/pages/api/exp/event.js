// Public endpoint for experiment exposure and outcome events (see src/utils/experimentEvents.js).
// Accepts small JSON bodies only; every event is validated against the visitor's assignment.
export const config = { api: { bodyParser: { sizeLimit: '2kb' } } };

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
    const { ingest } = await import('@/lib/experiments/events');
    let body = req.body;
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch {
            return res.status(400).json({ accepted: false, reason: 'bad_json' });
        }
    }
    try {
        const result = await ingest(body || {}, req);
        return res.status(202).json(result);
    } catch (error) {
        console.error('[exp event]', error);
        return res.status(500).json({ accepted: false, reason: 'error' });
    }
}
