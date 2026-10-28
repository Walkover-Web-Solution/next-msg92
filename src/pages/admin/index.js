import Link from 'next/link';
import AdminLayout, { Badge, Card, formatDate } from '@/components/Admin/AdminLayout';
import { withAdminPage } from '@/lib/admin/auth';

const JOURNEY = [
    { step: 'Visit a product or landing page', measured: 'Not connected (GTM/GA data stays in Google)' },
    { step: 'Click a sign-up CTA', measured: 'Not connected (GTM selectors only)' },
    { step: 'Start sign-up on /signup', measured: 'Experiment participants only (signup_started)' },
    { step: 'Verify email/GitHub and mobile', measured: 'Experiment participants only (signup_verified)' },
    { step: 'Complete registration', measured: 'Experiment participants only (signup_completed)' },
    { step: 'Activate in the MSG91 dashboard', measured: 'Not connected (MSG91 backend)' },
];

export default function Overview({
    adminState,
    session,
    attention,
    experiments,
    health,
    missing,
    recent,
    writeback,
    launchAllowed,
    schedulerLastTick,
}) {
    return (
        <AdminLayout title='Overview' session={session} adminState={adminState}>
            {adminState === 'ok' && (
                <div className='grid gap-4 md:grid-cols-2'>
                    <Card title='Needs attention' className='md:col-span-2'>
                        {attention.length ? (
                            <ul className='space-y-2'>
                                {attention.map((item) => (
                                    <li key={item.text} className='flex flex-wrap items-start gap-2'>
                                        <Badge status={item.severity} />
                                        <span className='flex-1'>{item.text}</span>
                                        {item.href && (
                                            <Link className='text-accent underline' href={item.href}>
                                                Open
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className='text-gray-600'>Nothing needs attention right now.</p>
                        )}
                    </Card>

                    <Card title='Conversion journey'>
                        <ol className='space-y-2 text-sm'>
                            {JOURNEY.map((j, i) => (
                                <li key={j.step}>
                                    <span className='font-medium'>
                                        {i + 1}. {j.step}
                                    </span>
                                    <span className='block text-gray-600'>{j.measured}</span>
                                </li>
                            ))}
                        </ol>
                        <p className='mt-3 text-xs text-gray-500'>
                            Definitions: docs/MEASUREMENT.md. Unconnected steps show no numbers rather than zeros.
                        </p>
                    </Card>

                    <Card
                        title='Site health'
                        actions={
                            <Link className='btn btn-outline btn-xs' href='/admin/analyses'>
                                All analyses
                            </Link>
                        }
                    >
                        <ul className='space-y-2 text-sm'>
                            {health.map((h) => (
                                <li key={h.id} className='flex flex-wrap items-center justify-between gap-2'>
                                    <span>{h.title}</span>
                                    <span className='flex items-center gap-2'>
                                        <Badge status={h.state} />
                                        <span className='text-gray-500'>{h.summary}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className='mt-3 text-xs text-gray-500'>
                            Last scheduler tick: {formatDate(schedulerLastTick)}
                        </p>
                    </Card>

                    <Card
                        title='Active experiments'
                        actions={
                            <Link className='btn btn-outline btn-xs' href='/admin/experiments'>
                                Manage
                            </Link>
                        }
                    >
                        {experiments.length ? (
                            <ul className='space-y-2 text-sm'>
                                {experiments.map((e) => (
                                    <li key={e.id} className='flex flex-wrap items-center justify-between gap-2'>
                                        <Link className='text-accent underline' href={`/admin/experiments/${e.id}`}>
                                            {e.name}
                                        </Link>
                                        <span className='flex items-center gap-2'>
                                            <code className='text-xs'>{e.surface}</code>
                                            <Badge status={e.status} />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className='text-sm text-gray-600'>No experiment is routing traffic.</p>
                        )}
                        <p className='mt-3 text-xs text-gray-500'>
                            Launching is{' '}
                            {launchAllowed ? 'allowed for owners' : 'switched off (Settings → Experiments)'}.
                        </p>
                    </Card>

                    <Card title='Missing data'>
                        <ul className='space-y-2 text-sm'>
                            {missing.map((m) => (
                                <li key={m.title}>
                                    <span className='font-medium'>{m.title}</span>
                                    <span className='block text-gray-600'>{m.detail}</span>
                                </li>
                            ))}
                        </ul>
                        <p className='mt-3 text-xs text-gray-500'>Knowledge writeback: {writeback.label}</p>
                    </Card>

                    <Card title='Recent changes' className='md:col-span-2'>
                        {recent.length ? (
                            <ul className='divide-y divide-gray-100 text-sm'>
                                {recent.map((r, i) => (
                                    <li key={i} className='flex flex-wrap justify-between gap-2 py-1.5'>
                                        <span>
                                            <code className='text-xs'>{r.action}</code> {r.target}
                                        </span>
                                        <span className='text-gray-500'>
                                            {r.by} · {formatDate(r.at)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className='text-sm text-gray-600'>No admin changes recorded yet.</p>
                        )}
                    </Card>
                </div>
            )}
        </AdminLayout>
    );
}

export const getServerSideProps = withAdminPage('view', async () => {
    const [
        { getSettings },
        { listDocs, listChanges },
        { listExperiments },
        { ANALYSES },
        runner,
        { recentAudit },
        { repoConfig },
        { researchOverview },
        { read },
    ] = await Promise.all([
        import('@/lib/admin/settings'),
        import('@/lib/admin/knowledge/service'),
        import('@/lib/admin/experiments/service'),
        import('@/lib/admin/analyses/definitions'),
        import('@/lib/admin/analyses/runner'),
        import('@/lib/admin/audit'),
        import('@/lib/admin/repo'),
        import('@/lib/admin/research'),
        import('@/lib/admin/store'),
    ]);
    const settings = await getSettings();
    const [docs, changes, experiments, runs, recent, research, scheduler] = await Promise.all([
        listDocs(settings.knowledge.freshnessDays),
        listChanges((c) => ['conflict', 'sync_failed', 'pending', 'draft'].includes(c.status)),
        listExperiments(),
        runner.listRuns(),
        recentAudit(12),
        researchOverview(),
        read('scheduler-state', {}),
    ]);
    const latest = runner.latestRuns(runs);
    const attention = [];
    docs.filter((d) => !d.exists).forEach((d) =>
        attention.push({ severity: 'high', text: `${d.path} is missing.`, href: `/admin/knowledge/${d.id}` })
    );
    const stale = docs.filter((d) => d.exists && d.stale);
    if (stale.length)
        attention.push({
            severity: 'medium',
            text: `${stale.length} knowledge document(s) not verified in ${settings.knowledge.freshnessDays} days.`,
            href: '/admin/knowledge',
        });
    changes
        .filter((c) => ['conflict', 'sync_failed'].includes(c.status))
        .forEach((c) =>
            attention.push({
                severity: 'high',
                text: `Knowledge change to ${c.path} is ${c.status.replace('_', ' ')}.`,
                href: `/admin/knowledge/${c.docId}`,
            })
        );
    const pending = changes.filter((c) => c.status === 'pending');
    if (pending.length)
        attention.push({
            severity: 'info',
            text: `${pending.length} knowledge change(s) waiting for review/merge.`,
            href: '/admin/knowledge',
        });
    ANALYSES.forEach((def) => {
        const run = latest[def.id];
        const state = runner.runState(def, run, settings);
        if (state === 'failed')
            attention.push({
                severity: 'high',
                text: `Analysis "${def.title}" failed: ${run.error}`,
                href: '/admin/analyses',
            });
        if (run?.status === 'succeeded' && run.findings?.some((f) => f.severity === 'high')) {
            attention.push({
                severity: 'high',
                text: `"${def.title}": ${run.findings.filter((f) => f.severity === 'high').length} high-severity finding(s).`,
                href: '/admin/analyses',
            });
        }
    });
    if (research.recentChanges.length)
        attention.push({
            severity: 'medium',
            text: `${research.recentChanges.length} competitor page change(s) to review.`,
            href: '/admin/research',
        });
    experiments
        .filter((e) => e.status === 'running' && e.reviewBy && new Date(e.reviewBy) < new Date())
        .forEach((e) =>
            attention.push({
                severity: 'medium',
                text: `Experiment ${e.name} is past its review date.`,
                href: `/admin/experiments/${e.id}`,
            })
        );

    const healthIds = [
        'page-registry',
        'seo-metadata',
        'http-status',
        'core-web-vitals',
        'experiment-health',
        'competitor-monitor',
    ];
    const health = healthIds.map((id) => {
        const def = ANALYSES.find((a) => a.id === id);
        const run = latest[id];
        const state = runner.runState(def, run, settings);
        const summary = run?.finishedAt
            ? `${run.findings?.length ?? 0} finding(s) · ${formatDateServer(run.finishedAt)}`
            : run?.status === 'running'
              ? 'running'
              : 'no run yet';
        return { id, title: def.title, state, summary };
    });
    const missing = ANALYSES.filter(
        (def) =>
            latest[def.id]?.status === 'not_connected' ||
            ['search-console', 'conversion-funnel'].includes(def.id) ||
            (def.id === 'core-web-vitals' && !process.env.CRUX_API_KEY)
    ).map((def) => ({
        title: def.title,
        detail: latest[def.id]?.nextAction || 'Not connected. Run the analysis to see the exact next step.',
    }));
    return {
        props: {
            attention,
            experiments: experiments
                .filter((e) => ['running', 'paused', 'rolling_out'].includes(e.status))
                .map(({ id, name, surface, status }) => ({ id, name, surface, status })),
            health,
            missing,
            recent,
            writeback: repoConfig(),
            launchAllowed: settings.experiments.allowLaunch,
            schedulerLastTick: scheduler.lastTickAt || null,
        },
    };
});

function formatDateServer(value) {
    return new Date(value).toISOString().slice(0, 10);
}
