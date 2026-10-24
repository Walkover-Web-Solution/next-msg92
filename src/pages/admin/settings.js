import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout, { Badge, Card, ErrorNote, adminFetch, formatDate, useAction } from '@/components/Admin/AdminLayout';
import { withAdminPage, can } from '@/lib/admin/auth';

const GROUPS = [
    {
        title: 'Experiments',
        fields: [
            ['experiments.allowLaunch', 'Release authority: allow owners to launch on live traffic', 'bool'],
            ['experiments.maxChallengers', 'Max challengers per URL (1–2)', 'number'],
            ['experiments.alpha', 'Significance level (alpha)', 'number'],
            ['experiments.power', 'Statistical power', 'number'],
            ['experiments.defaultMdeRelative', 'Default minimum detectable effect (relative)', 'number'],
            ['experiments.maxDays', 'Default maximum days', 'number'],
            ['experiments.attributionDays', 'Outcome attribution window (days)', 'number'],
            ['experiments.interimZ', 'Interim stop boundary |z|', 'number'],
            ['experiments.autoStopHarmful', 'Auto-pause an arm that crosses the harmful boundary', 'bool'],
            ['experiments.consentLockedLocales', 'Locales that need consent first (comma-separated)', 'list'],
        ],
    },
    {
        title: 'Analyses & budgets',
        fields: [
            ['analyses.paused', 'Pause all scheduled analyses', 'bool'],
            ['analyses.maxRetries', 'Retries after a failure', 'number'],
            ['analyses.budget.maxRunsPerDay', 'Max analysis runs per day', 'number'],
            ['analyses.budget.maxUrlFetchesPerRun', 'Max URL fetches per status run', 'number'],
            ['analyses.budget.maxAiCallsPerDay', 'Max AI interpretation calls per day', 'number'],
            ['knowledge.freshnessDays', 'Knowledge is stale after (days)', 'number'],
        ],
    },
    {
        title: 'Research',
        fields: [
            ['research.paused', 'Pause scheduled competitor monitoring', 'bool'],
            ['research.maxFetchesPerRun', 'Max source fetches per run', 'number'],
        ],
    },
    {
        title: 'AI interpretation',
        fields: [
            ['ai.enabled', 'Interpret findings with AI (needs ANTHROPIC_API_KEY)', 'bool'],
            ['ai.model', 'Model', 'text'],
            ['ai.effort', 'Effort (low / medium / high)', 'text'],
        ],
    },
];

const get = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);

function setPath(obj, path, value) {
    const keys = path.split('.');
    const out = { ...obj };
    let cursor = out;
    keys.slice(0, -1).forEach((k) => {
        cursor[k] = { ...(cursor[k] || {}) };
        cursor = cursor[k];
    });
    cursor[keys[keys.length - 1]] = value;
    return out;
}

export default function SettingsPage({
    adminState,
    session,
    settings,
    analyses,
    connections,
    audit,
    canEdit,
    scheduler,
    knowledgeDocs,
    writeback,
}) {
    const router = useRouter();
    const action = useAction();
    const [draft, setDraft] = useState(settings || {});
    const [patch, setPatch] = useState({});
    if (adminState !== 'ok')
        return <AdminLayout title='Settings & history' session={session} adminState={adminState} />;

    const change = (path, type) => (e) => {
        const raw = type === 'bool' ? e.target.checked : e.target.value;
        const value =
            type === 'number'
                ? Number(raw)
                : type === 'list'
                  ? raw
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean)
                  : raw;
        setDraft(setPath(draft, path, value));
        setPatch(setPath(patch, path, value));
    };
    const save = () =>
        action.run(
            () => adminFetch('/api/admin/settings', { method: 'PATCH', body: patch }),
            () => {
                setPatch({});
                router.replace(router.asPath);
            }
        );
    const tickNow = () =>
        action.run(
            () => adminFetch('/api/admin/cron/tick'),
            () => router.replace(router.asPath)
        );

    return (
        <AdminLayout title='Settings & history' session={session} adminState={adminState}>
            <div className='space-y-4'>
                <ErrorNote error={action.error} />
                <div className='grid gap-4 md:grid-cols-2'>
                    {GROUPS.map((group) => (
                        <Card key={group.title} title={group.title}>
                            <div className='space-y-2'>
                                {group.fields.map(([path, label, type]) => {
                                    const value = get(draft, path);
                                    return (
                                        <label key={path} className='flex items-center justify-between gap-3 text-sm'>
                                            <span>{label}</span>
                                            {type === 'bool' ? (
                                                <input
                                                    type='checkbox'
                                                    className='toggle toggle-sm'
                                                    checked={Boolean(value)}
                                                    disabled={!canEdit}
                                                    onChange={change(path, type)}
                                                />
                                            ) : (
                                                <input
                                                    type={type === 'number' ? 'number' : 'text'}
                                                    step='any'
                                                    className='input input-bordered input-xs w-40'
                                                    value={type === 'list' ? (value || []).join(', ') : (value ?? '')}
                                                    disabled={!canEdit}
                                                    onChange={change(path, type)}
                                                />
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                        </Card>
                    ))}
                    <Card title='Analysis schedules'>
                        <div className='space-y-2'>
                            {analyses.map((a) => {
                                const current = draft.analyses?.schedules?.[a.id] || {};
                                const enabled = current.enabled ?? true;
                                const everyHours = current.everyHours ?? a.everyHours;
                                const update = (next) => {
                                    const value = { enabled, everyHours, ...next };
                                    setDraft(setPath(draft, `analyses.schedules.${a.id}`, value));
                                    setPatch(setPath(patch, `analyses.schedules.${a.id}`, value));
                                };
                                return (
                                    <div
                                        key={a.id}
                                        className='flex flex-wrap items-center justify-between gap-2 text-sm'
                                    >
                                        <span>{a.title}</span>
                                        <span className='flex items-center gap-2'>
                                            <input
                                                type='checkbox'
                                                aria-label={`${a.title} enabled`}
                                                className='toggle toggle-xs'
                                                checked={enabled}
                                                disabled={!canEdit}
                                                onChange={(e) => update({ enabled: e.target.checked })}
                                            />
                                            every
                                            <input
                                                type='number'
                                                aria-label={`${a.title} hours`}
                                                className='input input-bordered input-xs w-20'
                                                value={everyHours}
                                                disabled={!canEdit}
                                                onChange={(e) => update({ everyHours: Number(e.target.value) })}
                                            />
                                            h
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
                {canEdit ? (
                    <button
                        type='button'
                        className='btn btn-primary btn-sm'
                        disabled={action.busy || !Object.keys(patch).length}
                        onClick={save}
                    >
                        Save settings
                    </button>
                ) : (
                    <p className='text-sm text-gray-600'>Only owners can change settings.</p>
                )}

                <div className='grid gap-4 md:grid-cols-2'>
                    <Card
                        title='Scheduler'
                        actions={
                            <button
                                type='button'
                                className='btn btn-outline btn-xs'
                                disabled={action.busy}
                                onClick={tickNow}
                            >
                                Run due work now
                            </button>
                        }
                    >
                        <p className='text-sm text-gray-700'>
                            Mode: {scheduler.mode}. Last tick: {formatDate(scheduler.lastTickAt)}.
                        </p>
                        <p className='mt-1 text-xs text-gray-500'>
                            External cron: <code>POST /api/admin/cron/tick</code> with{' '}
                            <code>Authorization: Bearer $CRON_SECRET</code> (
                            {scheduler.cronSecretSet ? 'secret set' : 'CRON_SECRET not set'}). Add{' '}
                            <code>?event=deploy</code> after each deploy.
                        </p>
                    </Card>
                    <Card title='Data connections'>
                        <ul className='space-y-1 text-sm'>
                            {connections.map((c) => (
                                <li key={c.name} className='flex flex-wrap items-center justify-between gap-2'>
                                    <span>{c.name}</span>
                                    <span className='flex items-center gap-2'>
                                        <Badge status={c.connected ? 'ok' : 'not_connected'}>
                                            {c.connected ? 'connected' : 'not connected'}
                                        </Badge>
                                        <span className='text-xs text-gray-500'>{c.detail}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                    <Card title='Knowledge sources & agent guidance'>
                        <p className='mb-2 text-sm text-gray-700'>Writeback: {writeback.label}.</p>
                        <p className='mb-2 text-sm text-gray-700'>
                            Additional guidance for agents is part of{' '}
                            <Link className='text-accent underline' href='/admin/knowledge/agents'>
                                AGENTS.md
                            </Link>{' '}
                            and is versioned like any other doc. Guidance text never grants access: roles are set in{' '}
                            <code>ADMIN_USERS</code>.
                        </p>
                        <ul className='text-xs text-gray-600'>
                            {knowledgeDocs.map((d) => (
                                <li key={d.id}>
                                    {d.path} — {d.owns}
                                </li>
                            ))}
                        </ul>
                    </Card>
                    <Card title='Notifications'>
                        <p className='text-sm text-gray-700'>
                            Not connected. Attention items appear on the Overview page; no email or chat channel is
                            configured on this server.
                        </p>
                    </Card>
                </div>

                <Card title='Admin history'>
                    {audit.length ? (
                        <ul className='divide-y divide-gray-100 text-sm'>
                            {audit.map((a, i) => (
                                <li key={i} className='py-1.5'>
                                    <code className='text-xs'>{a.action}</code> {a.target}{' '}
                                    <span className='text-gray-500'>
                                        · {a.by} · {formatDate(a.at)}
                                    </span>
                                    {a.detail && Object.keys(a.detail).length > 0 && (
                                        <details className='text-xs text-gray-600'>
                                            <summary>Details</summary>
                                            <pre className='overflow-auto'>{JSON.stringify(a.detail, null, 2)}</pre>
                                        </details>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='text-sm text-gray-600'>No admin actions yet.</p>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
}

export const getServerSideProps = withAdminPage('view', async (context, session) => {
    const [{ getSettings }, { ANALYSES }, { recentAudit }, { read }, { KNOWLEDGE_DOCS }, { repoConfig }, { aiStatus }] =
        await Promise.all([
            import('@/lib/admin/settings'),
            import('@/lib/admin/analyses/definitions'),
            import('@/lib/admin/audit'),
            import('@/lib/admin/store'),
            import('@/lib/admin/knowledge/registry'),
            import('@/lib/admin/repo'),
            import('@/lib/admin/ai'),
        ]);
    const settings = await getSettings();
    const scheduler = await read('scheduler-state', {});
    const writeback = repoConfig();
    const ai = aiStatus(settings);
    const connections = [
        { name: 'Repository writeback', connected: writeback.mode !== 'off', detail: writeback.label },
        { name: 'Experiment events (first-party)', connected: true, detail: '/api/exp/event → admin store' },
        {
            name: 'Google Tag Manager (site analytics)',
            connected: false,
            detail: 'Loads on the site; data is not readable here',
        },
        { name: 'Google Search Console', connected: false, detail: 'No connector (docs/CONTRACTS.md)' },
        {
            name: 'Chrome UX Report (field Web Vitals)',
            connected: Boolean(process.env.CRUX_API_KEY),
            detail: process.env.CRUX_API_KEY ? 'CRUX_API_KEY set' : 'Set CRUX_API_KEY',
        },
        {
            name: 'MSG91 sign-up/CRM backend',
            connected: false,
            detail: 'Qualified-lead and activation data not exposed to the site',
        },
        { name: 'AI interpretation', connected: ai.connected, detail: ai.connected ? ai.model : ai.reason },
    ];
    return {
        props: {
            settings,
            analyses: ANALYSES.map(({ id, title, everyHours }) => ({ id, title, everyHours })),
            connections,
            audit: await recentAudit(60),
            canEdit: can(session.role, 'settings.edit'),
            scheduler: {
                mode: process.env.ADMIN_SCHEDULER === 'inprocess' ? 'in-process timer' : 'external cron (or manual)',
                lastTickAt: scheduler.lastTickAt || null,
                cronSecretSet: (process.env.CRON_SECRET || '').length >= 16,
            },
            knowledgeDocs: KNOWLEDGE_DOCS,
            writeback,
        },
    };
});
