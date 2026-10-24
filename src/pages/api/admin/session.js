// Admin sign-in (POST) and sign-out (DELETE). See src/lib/admin/auth.js.
import {
    authenticate,
    clearSessionCookie,
    createSessionToken,
    isConfigured,
    loginThrottled,
    sessionCookies,
} from '@/lib/admin/auth';
import { audit } from '@/lib/admin/audit';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    if (req.method === 'DELETE') {
        res.setHeader('Set-Cookie', clearSessionCookie(req));
        return res.status(200).json({ ok: true });
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST or DELETE only' });
    if (!isConfigured()) return res.status(503).json({ error: 'Admin is not configured on this server.' });
    if (req.headers['x-admin-request'] !== '1') return res.status(403).json({ error: 'Cross-site request rejected.' });
    if (loginThrottled(req)) return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' });
    const user = authenticate(req.body?.email, req.body?.password);
    if (!user) return res.status(401).json({ error: 'Email or password is incorrect.' });
    res.setHeader('Set-Cookie', sessionCookies(req, createSessionToken(user)));
    await audit({ email: user.email }, 'session.login', user.email);
    return res.status(200).json({ ok: true, role: user.role });
}
