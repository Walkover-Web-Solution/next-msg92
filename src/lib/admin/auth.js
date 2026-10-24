// Server-only authentication and authorization for the private admin (/admin, /api/admin/*).
//
// Operators are listed in the ADMIN_USERS env var as comma-separated `email|role|scrypt:salt:hash`
// entries (generate one with `node scripts/admin-user.mjs <email> <role>`). Sessions are HMAC-signed,
// HttpOnly cookies keyed by ADMIN_SESSION_SECRET. Roles are re-read from ADMIN_USERS on every request,
// so removing an entry revokes access immediately. These env vars must never be added to the
// `env` block of next.config.mjs, which would inline them into client bundles.
import crypto from 'node:crypto';

export const SESSION_COOKIE = 'msg91_admin';
export const INTERNAL_COOKIE = 'msg91_internal';
const SESSION_HOURS = 8;

export const ROLES = ['viewer', 'editor', 'owner'];

// Capabilities granted to each role. Owner is the release authority (launch, decide, settings).
const CAPABILITIES = {
    viewer: ['view'],
    editor: ['view', 'knowledge.edit', 'research.edit', 'research.run', 'analyses.run', 'experiments.edit'],
    owner: [
        'view',
        'knowledge.edit',
        'research.edit',
        'research.run',
        'analyses.run',
        'experiments.edit',
        'experiments.launch',
        'experiments.decide',
        'settings.edit',
    ],
};

export function can(role, capability) {
    return Boolean(CAPABILITIES[role]?.includes(capability));
}

function secret() {
    const value = process.env.ADMIN_SESSION_SECRET || '';
    return value.length >= 32 ? value : null;
}

export function parseUsers(raw = process.env.ADMIN_USERS || '') {
    return raw
        .split(/[,\n]/)
        .map((entry) => entry.trim())
        .filter(Boolean)
        .flatMap((entry) => {
            const [email, role, hash] = entry.split('|').map((part) => part?.trim());
            if (!email || !ROLES.includes(role) || !hash?.startsWith('scrypt:')) return [];
            return [{ email: email.toLowerCase(), role, hash }];
        });
}

export function isConfigured() {
    return Boolean(secret()) && parseUsers().length > 0;
}

export function hashPassword(password, salt = crypto.randomBytes(16)) {
    const derived = crypto.scryptSync(password, salt, 32);
    return `scrypt:${salt.toString('base64')}:${derived.toString('base64')}`;
}

export function verifyPassword(password, stored) {
    const [, saltB64, hashB64] = stored.split(':');
    if (!saltB64 || !hashB64) return false;
    const expected = Buffer.from(hashB64, 'base64');
    const actual = crypto.scryptSync(String(password), Buffer.from(saltB64, 'base64'), expected.length);
    return crypto.timingSafeEqual(actual, expected);
}

function sign(payload) {
    return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function createSessionToken(user, now = Date.now()) {
    const payload = Buffer.from(
        JSON.stringify({ e: user.email, r: user.role, iat: now, exp: now + SESSION_HOURS * 3600_000 })
    ).toString('base64url');
    return `${payload}.${sign(payload)}`;
}

export function readCookie(req, name) {
    const header = req?.headers?.cookie || '';
    for (const part of header.split(';')) {
        const [key, ...rest] = part.trim().split('=');
        if (key === name) return decodeURIComponent(rest.join('='));
    }
    return null;
}

// Returns { email, role } for a valid session whose user still exists, otherwise null.
export function getSession(req) {
    if (!secret()) return null;
    const token = readCookie(req, SESSION_COOKIE);
    if (!token || !token.includes('.')) return null;
    const [payload, signature] = token.split('.');
    const expected = sign(payload);
    if (signature.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    let data;
    try {
        data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    } catch {
        return null;
    }
    if (!data?.exp || data.exp < Date.now()) return null;
    const user = parseUsers().find((u) => u.email === data.e);
    if (!user) return null;
    return { email: user.email, role: user.role };
}

function secureFlag(req) {
    const proto = req.headers['x-forwarded-proto'] || (req.socket?.encrypted ? 'https' : 'http');
    return proto === 'https' ? '; Secure' : '';
}

export function sessionCookies(req, token) {
    const secure = secureFlag(req);
    return [
        `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}${secure}`,
        // Marks this browser as internal so experiment reports exclude its traffic.
        `${INTERNAL_COOKIE}=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${365 * 86400}${secure}`,
    ];
}

export function clearSessionCookie(req) {
    return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secureFlag(req)}`;
}

const attempts = new Map();

// Simple per-IP throttle for the login endpoint: 10 attempts per 15 minutes per server process.
export function loginThrottled(req) {
    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0];
    const now = Date.now();
    const entry = attempts.get(ip);
    if (!entry || entry.resetAt < now) {
        attempts.set(ip, { count: 1, resetAt: now + 15 * 60_000 });
        return false;
    }
    entry.count += 1;
    return entry.count > 10;
}

export function authenticate(email, password) {
    const user = parseUsers().find(
        (u) =>
            u.email ===
            String(email || '')
                .toLowerCase()
                .trim()
    );
    // Run scrypt even for unknown users so response time does not reveal which emails exist.
    const ok = verifyPassword(password || '', user?.hash || hashPassword('invalid'));
    return ok && user ? user : null;
}

function sameOrigin(req) {
    const origin = req.headers.origin;
    if (!origin) return false;
    try {
        return new URL(origin).host === (req.headers['x-forwarded-host'] || req.headers.host);
    } catch {
        return false;
    }
}

function noStore(res) {
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
}

// Wraps an API route: requires a configured admin, a session with `capability`, and for any
// non-GET request a same-origin call carrying the `x-admin-request: 1` header (CSRF defence).
export function withAdmin(capability, handler) {
    return async (req, res) => {
        noStore(res);
        if (!isConfigured()) {
            return res.status(503).json({ error: 'Admin is not configured on this server.' });
        }
        const session = getSession(req);
        if (!session) return res.status(401).json({ error: 'Sign in required.' });
        const needed = typeof capability === 'function' ? capability(req) : capability;
        if (!can(session.role, needed)) {
            return res.status(403).json({ error: `Your role (${session.role}) cannot do this (${needed}).` });
        }
        if (req.method !== 'GET' && (req.headers['x-admin-request'] !== '1' || !sameOrigin(req))) {
            return res.status(403).json({ error: 'Cross-site request rejected.' });
        }
        try {
            return await handler(req, res, session);
        } catch (error) {
            const status = error.status || 500;
            if (status >= 500) console.error('[admin api]', error);
            return res
                .status(status)
                .json({ error: error.expose ? error.message : 'Internal error.', code: error.code });
        }
    };
}

// Wraps getServerSideProps for admin pages: redirects to the login page without a session and
// shows a 403 page body when the role lacks `capability`.
export function withAdminPage(capability, getProps) {
    return async (context) => {
        noStore(context.res);
        if (!isConfigured()) return { props: { adminState: 'not_configured' } };
        const session = getSession(context.req);
        if (!session) {
            const next = encodeURIComponent(context.resolvedUrl || '/admin');
            return { redirect: { destination: `/admin/login?next=${next}`, permanent: false } };
        }
        if (!can(session.role, capability)) return { props: { adminState: 'forbidden', session } };
        const result = await getProps(context, session);
        if (result?.notFound || result?.redirect) return result;
        // Round-trip through JSON: drops `undefined` and turns Dates into strings, as Next.js props require.
        return { props: JSON.parse(JSON.stringify({ adminState: 'ok', session, ...(result?.props || {}) })) };
    };
}

// An error whose message is safe to show to an operator.
export function httpError(status, message, code) {
    const error = new Error(message);
    error.status = status;
    error.expose = true;
    error.code = code;
    return error;
}
