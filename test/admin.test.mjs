import test from 'node:test';
import assert from 'node:assert/strict';

process.env.ADMIN_SESSION_SECRET = 's'.repeat(40);
const auth = await import('../src/lib/admin/auth.js');
const { lineDiff, compactDiff } = await import('../src/lib/admin/diff.js');
const checks = await import('../src/lib/checks/siteContent.js');

const hash = auth.hashPassword('correct horse battery');
process.env.ADMIN_USERS = `Owner@Example.com|owner|${hash},viewer@example.com|viewer|${auth.hashPassword('another password')}`;

const reqWith = (token) => ({ headers: { cookie: `${auth.SESSION_COOKIE}=${token}` } });

test('passwords verify with scrypt and users parse case-insensitively', () => {
    assert.equal(auth.authenticate('owner@example.com', 'correct horse battery')?.role, 'owner');
    assert.equal(auth.authenticate('owner@example.com', 'wrong'), null);
    assert.equal(auth.authenticate('nobody@example.com', 'correct horse battery'), null);
});

test('sessions: valid, tampered, expired and revoked', () => {
    const user = { email: 'owner@example.com', role: 'owner' };
    const token = auth.createSessionToken(user);
    assert.deepEqual(auth.getSession(reqWith(token)), user);
    const [payload, sig] = token.split('.');
    const forged = Buffer.from(JSON.stringify({ e: 'owner@example.com', r: 'owner', exp: Date.now() + 1e9 })).toString(
        'base64url'
    );
    assert.equal(auth.getSession(reqWith(`${forged}.${sig}`)), null);
    assert.equal(auth.getSession(reqWith(`${payload}.${sig.slice(0, -2)}xx`)), null);
    const expired = auth.createSessionToken(user, Date.now() - 9 * 3600_000);
    assert.equal(auth.getSession(reqWith(expired)), null);
    const viewerToken = auth.createSessionToken({ email: 'viewer@example.com', role: 'viewer' });
    process.env.ADMIN_USERS = `owner@example.com|owner|${hash}`;
    assert.equal(auth.getSession(reqWith(viewerToken)), null, 'removed user loses access immediately');
});

test('roles grant capabilities deliberately', () => {
    assert.equal(auth.can('viewer', 'view'), true);
    assert.equal(auth.can('viewer', 'knowledge.edit'), false);
    assert.equal(auth.can('editor', 'experiments.edit'), true);
    assert.equal(auth.can('editor', 'experiments.launch'), false);
    assert.equal(auth.can('editor', 'settings.edit'), false);
    assert.equal(auth.can('owner', 'experiments.launch'), true);
});

test('withAdmin rejects anonymous, under-privileged and cross-site calls', async () => {
    process.env.ADMIN_USERS = `owner@example.com|owner|${hash},viewer@example.com|viewer|${auth.hashPassword('another password')}`;
    const handler = auth.withAdmin('settings.edit', async (req, res) => res.status(200).json({ ok: true }));
    const call = async (req) => {
        const res = {
            code: 0,
            headers: {},
            body: null,
            setHeader(k, v) {
                this.headers[k] = v;
            },
            status(c) {
                this.code = c;
                return this;
            },
            json(b) {
                this.body = b;
                return this;
            },
        };
        await handler({ method: 'PATCH', headers: {}, ...req }, res);
        return res;
    };
    assert.equal((await call({})).code, 401);
    const viewer = auth.createSessionToken({ email: 'viewer@example.com', role: 'viewer' });
    assert.equal((await call({ headers: { cookie: `${auth.SESSION_COOKIE}=${viewer}` } })).code, 403);
    const owner = auth.createSessionToken({ email: 'owner@example.com', role: 'owner' });
    const cookie = `${auth.SESSION_COOKIE}=${owner}`;
    assert.equal((await call({ headers: { cookie } })).code, 403, 'missing CSRF header');
    assert.equal(
        (await call({ headers: { cookie, 'x-admin-request': '1', origin: 'https://evil.test', host: 'msg91.com' } }))
            .code,
        403
    );
    const ok = await call({
        headers: { cookie, 'x-admin-request': '1', origin: 'https://msg91.com', host: 'msg91.com' },
    });
    assert.equal(ok.code, 200);
    assert.equal(ok.headers['X-Robots-Tag'], 'noindex, nofollow');
});

test('line diff marks additions and deletions', () => {
    const diff = lineDiff('a\nb\nc', 'a\nB\nc\nd');
    assert.deepEqual(
        diff.filter((l) => l.type !== 'same').map((l) => `${l.type}:${l.text}`),
        ['del:b', 'add:B', 'add:d']
    );
    assert.ok(
        compactDiff(lineDiff('1\n2\n3\n4\n5\n6\n7\n8\n9', '1\n2\n3\n4\nX\n6\n7\n8\n9'), 1).some(
            (l) => l.type === 'skip'
        )
    );
});

test('every page JSON key is a registered section', () => {
    const result = checks.checkRegistry(process.cwd());
    assert.deepEqual(result.problems, []);
    assert.ok(result.pages > 300);
});
