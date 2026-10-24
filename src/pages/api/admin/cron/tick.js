// Scheduler entry point for an external cron: POST with `Authorization: Bearer $CRON_SECRET`.
// Optional `?event=deploy` runs the post-deploy checks. Idempotent: due-ness and dedupe keys
// stop repeated work when ticks overlap.
import crypto from 'node:crypto';
import { getSession, can } from '@/lib/admin/auth';
import { tick } from '@/lib/admin/analyses/runner';

function cronAuthorized(req) {
    const secret = process.env.CRON_SECRET || '';
    const header = String(req.headers.authorization || '');
    if (secret.length < 16 || !header.startsWith('Bearer ')) return false;
    const given = Buffer.from(header.slice(7));
    const expected = Buffer.from(secret);
    return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
    const session = getSession(req);
    const sessionOk = session && can(session.role, 'analyses.run') && req.headers['x-admin-request'] === '1';
    if (!cronAuthorized(req) && !sessionOk) return res.status(401).json({ error: 'Unauthorized' });
    const event = typeof req.query.event === 'string' ? req.query.event : undefined;
    return res.status(200).json(await tick({ event }));
}
