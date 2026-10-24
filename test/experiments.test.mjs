import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

process.env.ADMIN_DATA_DIR = await fs.mkdtemp(path.join(os.tmpdir(), 'msg91-admin-test-'));
process.env.ADMIN_SESSION_SECRET = 'x'.repeat(40);

const assignment = await import('../src/lib/experiments/assignment.js');
const stats = await import('../src/lib/experiments/stats.js');
const { applyOverrides, compileLive } = await import('../src/lib/experiments/live.js');
const store = await import('../src/lib/admin/store.js');
const events = await import('../src/lib/experiments/events.js');

const arms = [
    { key: 'A', baseline: true, weight: 50 },
    { key: 'B', weight: 30 },
    { key: 'C', weight: 20 },
];

test('assignment is deterministic and follows weights', () => {
    const live = { id: 'exp', version: 1, status: 'running', arms };
    const id = assignment.newVisitorId();
    assert.equal(assignment.assign(id, live), assignment.assign(id, live));
    const counts = { A: 0, B: 0, C: 0 };
    for (let i = 0; i < 20000; i++) counts[assignment.assign(assignment.newVisitorId(), live)]++;
    assert.ok(Math.abs(counts.A / 20000 - 0.5) < 0.02, JSON.stringify(counts));
    assert.ok(Math.abs(counts.B / 20000 - 0.3) < 0.02, JSON.stringify(counts));
    assert.ok(Math.abs(counts.C / 20000 - 0.2) < 0.02, JSON.stringify(counts));
});

test('a new version reshuffles, rolling out sends everyone to one arm', () => {
    const ids = Array.from({ length: 200 }, () => assignment.newVisitorId());
    const v1 = ids.map((id) => assignment.assign(id, { id: 'e', version: 1, status: 'running', arms }));
    const v2 = ids.map((id) => assignment.assign(id, { id: 'e', version: 2, status: 'running', arms }));
    assert.notDeepEqual(v1, v2);
    assert.ok(
        ids.every(
            (id) => assignment.assign(id, { id: 'e', version: 2, status: 'rolling_out', arms, rolloutArm: 'C' }) === 'C'
        )
    );
});

test('participation cookie round-trips and traffic is classified', () => {
    const entries = [{ id: 'a', version: 2, arm: 'B' }];
    assert.deepEqual(assignment.parseParticipation(assignment.serializeParticipation(entries)), entries);
    assert.equal(assignment.classifyTraffic({ userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1)' }), 'bot');
    assert.equal(assignment.classifyTraffic({ userAgent: 'Mozilla/5.0 Chrome/140', internalCookie: '1' }), 'internal');
    assert.equal(
        assignment.classifyTraffic({ userAgent: 'Mozilla/5.0 Chrome/140', syntheticHeader: true }),
        'synthetic'
    );
    assert.equal(
        assignment.classifyTraffic({ userAgent: 'Mozilla/5.0 (Macintosh) Chrome/140 Safari/537.36' }),
        'customer'
    );
});

test('normal distribution helpers match reference values', () => {
    assert.ok(Math.abs(stats.normalCdf(1.96) - 0.975) < 1e-4);
    assert.ok(Math.abs(stats.normalQuantile(0.975) - 1.959964) < 1e-4);
    assert.ok(Math.abs(stats.normalQuantile(0.8) - 0.841621) < 1e-4);
});

test('sample size matches the standard two-proportion formula', () => {
    const n = stats.sampleSizePerArm({ baselineRate: 0.1, mdeRelative: 0.2, alpha: 0.05, power: 0.8 });
    assert.ok(n > 3800 && n < 3900, String(n));
});

test('evaluation stays honest: collecting, harmful boundary, sample ratio mismatch', () => {
    const settings = { alpha: 0.05, power: 0.8, mdeRelative: 0.2, baselineRate: 0.1, interimZ: 3.29 };
    const small = stats.evaluate(
        [
            { key: 'A', baseline: true, weight: 50, n: 500, x: 50 },
            { key: 'B', weight: 50, n: 500, x: 60 },
        ],
        settings
    );
    assert.equal(small.comparisons[0].verdict, 'collecting');
    assert.equal(small.reachedPlan, false);
    const harmful = stats.evaluate(
        [
            { key: 'A', baseline: true, weight: 50, n: 3000, x: 300 },
            { key: 'B', weight: 50, n: 3000, x: 180 },
        ],
        settings
    );
    assert.equal(harmful.comparisons[0].verdict, 'harmful');
    const srm = stats.evaluate(
        [
            { key: 'A', baseline: true, weight: 50, n: 6000, x: 600 },
            { key: 'B', weight: 50, n: 4000, x: 400 },
        ],
        settings
    );
    assert.equal(srm.comparisons[0].verdict, 'invalid');
    const tiny = stats.evaluate(
        [
            { key: 'A', baseline: true, weight: 50, n: 10, x: 1 },
            { key: 'B', weight: 50, n: 12, x: 2 },
        ],
        settings
    );
    assert.equal(tiny.comparisons[0].verdict, 'insufficient_data');
    const multi = stats.evaluate(
        [
            { key: 'A', baseline: true, weight: 34, n: 0, x: 0 },
            { key: 'B', weight: 33, n: 0, x: 0 },
            { key: 'C', weight: 33, n: 0, x: 0 },
        ],
        settings
    );
    assert.equal(multi.adjustedAlpha, 0.025);
});

test('treatments merge, replace or remove sections and keep order', () => {
    const data = {
        HeadComp: { title: 't' },
        BannerComp: { heading: 'old', sub: 's' },
        FaqsComp: { q: [] },
        PreFooterComp: { a: 1 },
    };
    const out = applyOverrides(data, {
        BannerComp: { mode: 'merge', data: { heading: 'new' } },
        FaqsComp: { mode: 'remove' },
        PreFooterComp: { mode: 'replace', data: { b: 2 } },
    });
    assert.deepEqual(Object.keys(out), ['HeadComp', 'BannerComp', 'PreFooterComp']);
    assert.deepEqual(out.BannerComp, { heading: 'new', sub: 's' });
    assert.deepEqual(out.PreFooterComp, { b: 2 });
});

test('live config contains only running or rolling-out, non-synthetic experiments', () => {
    const live = compileLive([
        { id: 'a', surface: '/x', status: 'running', version: 1, arms },
        { id: 'b', surface: '/y', status: 'draft', version: 1, arms },
        { id: 'c', surface: '/z', status: 'running', version: 1, arms, synthetic: true },
        { id: 'd', surface: '/w', status: 'rolling_out', version: 3, arms, rolloutArm: 'B' },
    ]);
    assert.deepEqual(Object.keys(live.bySurface).sort(), ['/w', '/x']);
    assert.equal(live.bySurface['/w'].rolloutArm, 'B');
});

test('store updates are serialized under the lock', async () => {
    await Promise.all(Array.from({ length: 40 }, () => store.update('counter', { n: 0 }, (doc) => ({ n: doc.n + 1 }))));
    assert.equal((await store.read('counter', { n: 0 })).n, 40);
});

function request(
    visitorId,
    { ua = 'Mozilla/5.0 (Macintosh) Chrome/140 Safari/537.36', participation, synthetic } = {}
) {
    const cookies = [`msg91_vid=${visitorId}`];
    if (participation) cookies.push(`msg91_exp=${encodeURIComponent(participation)}`);
    return {
        headers: { cookie: cookies.join('; '), 'user-agent': ua, ...(synthetic ? { 'x-msg91-synthetic': '1' } : {}) },
    };
}

test('events: exposures are validated, outcomes attributed, duplicates and bots excluded', async () => {
    const exp = {
        id: 'home-hero',
        version: 1,
        status: 'running',
        surface: '/',
        arms: [
            { key: 'A', baseline: true, weight: 50 },
            { key: 'B', weight: 50 },
        ],
    };
    await store.update('experiments', [], () => [exp]);
    const live = { ...exp };
    const visitor = assignment.newVisitorId();
    const arm = assignment.assign(visitor, live);
    const other = arm === 'A' ? 'B' : 'A';

    assert.equal(
        (await events.ingest({ type: 'exposure', exp: exp.id, version: 1, arm: other }, request(visitor))).reason,
        'arm_mismatch'
    );
    assert.equal(
        (await events.ingest({ type: 'exposure', exp: exp.id, version: 2, arm }, request(visitor))).reason,
        'stale_version'
    );
    assert.equal(
        (await events.ingest({ type: 'exposure', exp: exp.id, version: 1, arm }, request(visitor))).accepted,
        true
    );
    assert.equal(
        (await events.ingest({ type: 'exposure', exp: exp.id, version: 1, arm }, request(visitor))).reason,
        'duplicate'
    );

    const participation = `${exp.id}:1:${arm}`;
    assert.equal(
        (await events.ingest({ type: 'outcome', metric: 'signup_completed' }, request(visitor, { participation })))
            .accepted,
        true
    );
    assert.equal(
        (await events.ingest({ type: 'outcome', metric: 'nonsense' }, request(visitor, { participation }))).reason,
        'unknown_metric'
    );

    const bot = assignment.newVisitorId();
    const botArm = assignment.assign(bot, live);
    await events.ingest(
        { type: 'exposure', exp: exp.id, version: 1, arm: botArm },
        request(bot, { ua: 'Googlebot/2.1' })
    );

    const agg = await events.aggregate(exp);
    assert.equal(agg.byClass.customer[arm].n, 1);
    assert.equal(agg.byClass.customer[arm].metrics.signup_completed, 1);
    assert.equal(agg.byClass.bot[botArm].n, 1);
    assert.equal(agg.byClass.customer[other]?.n || 0, 0);
});

test('events: a paused experiment accepts no customer exposures, only synthetic ones', async () => {
    const exp = {
        id: 'paused-exp',
        version: 1,
        status: 'paused',
        surface: '/x',
        arms: [
            { key: 'A', baseline: true, weight: 50 },
            { key: 'B', weight: 50 },
        ],
    };
    await store.update('experiments', [], () => [exp]);
    const visitor = assignment.newVisitorId();
    const arm = assignment.assign(visitor, exp);
    assert.equal(
        (await events.ingest({ type: 'exposure', exp: exp.id, version: 1, arm }, request(visitor))).reason,
        'not_running'
    );
    assert.equal(
        (await events.ingest({ type: 'exposure', exp: exp.id, version: 1, arm }, request(visitor, { synthetic: true })))
            .accepted,
        true
    );
    const agg = await events.aggregate(exp);
    assert.equal(agg.byClass.customer, undefined);
    assert.equal(agg.byClass.synthetic[arm].n, 1);
});
