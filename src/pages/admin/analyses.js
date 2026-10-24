import { useRouter } from 'next/router';
import AdminLayout, { Badge, Card, ErrorNote, adminFetch, formatDate, useAction } from '@/components/Admin/AdminLayout';
import { withAdminPage, can } from '@/lib/admin/auth';

function RunDetail({ run }) {
    if (!run) return <p className='text-sm text-gray-600'>Never run.</p>;
    return (
        <div className='space-y-2 text-sm'>
            <p className='text-xs text-gray-600'>
                {run.trigger} run by {run.by} · started {formatDate(run.startedAt)} · finished{' '}
                {formatDate(run.finishedAt)} · data window: {run.dataWindow || '—'}
                {run.inputRevision && ` · input revision ${run.inputRevision}`}
                {run.attempt > 1 && ` · attempt ${run.attempt}`}
            </p>
            {run.status === 'unchanged' && (
                <p className='text-gray-700'>
                    Inputs unchanged since run {run.reusedRunId}; previous result still applies.
                </p>
            )}
            {run.error && (
                <p className='text-red-700'>
                    {run.error}
                    {run.nextRetryAt && ` — retry after ${formatDate(run.nextRetryAt)}`}
                </p>
            )}
            {run.facts && Object.keys(run.facts).length > 0 && (
                <details>
                    <summary className='cursor-pointer text-gray-700'>Observed facts</summary>
                    <pre className='mt-1 overflow-auto rounded bg-gray-50 p-2 text-xs'>
                        {JSON.stringify(run.facts, null, 2)}
                    </pre>
                </details>
            )}
            {run.findings?.length > 0 && (
                <ul className='space-y-1'>
                    {run.findings.slice(0, 25).map((f, i) => (
                        <li key={i} className='flex gap-2'>
                            <Badge
                                status={f.severity === 'info' ? undefined : f.severity}
                                tone={f.severity === 'info' ? 'info' : undefined}
                            >
                                {f.severity}
                            </Badge>
                            <span className='flex-1 break-words'>{f.text}</span>
                        </li>
                    ))}
                    {run.findings.length > 25 && (
                        <li className='text-xs text-gray-500'>…and {run.findings.length - 25} more</li>
                    )}
                </ul>
            )}
            {run.nextAction && (
                <p>
                    <span className='font-medium'>Proposed next action:</span> {run.nextAction}
                </p>
            )}
            {run.interpretation && run.interpretation.status !== 'not_requested' && (
                <div className='rounded border border-blue-100 bg-blue-50 p-2'>
                    <p className='text-xs font-medium text-blue-900'>
                        AI interpretation (recommendation, not approved strategy) ·{' '}
                        <Badge status={run.interpretation.status === 'ok' ? 'ok' : run.interpretation.status} />
                        {run.interpretation.model && ` · ${run.interpretation.model}`}
                        {run.interpretation.costUsd !== undefined && ` · $${run.interpretation.costUsd.toFixed(4)}`}
                    </p>
                    <p className='whitespace-pre-wrap text-sm text-blue-950'>
                        {run.interpretation.text || run.interpretation.reason}
                    </p>
                </div>
            )}
        </div>
    );
}

export default function Analyses({ adminState, session, analyses, paused, canRun, aiState, spend }) {
    const router = useRouter();
    const action = useAction();
    const runNow = (id) =>
        action.run(
            () => adminFetch(`/api/admin/analyses/${id}`),
            () => router.replace(router.asPath)
        );
    return (
        <AdminLayout title='Analyses' session={session} adminState={adminState}>
            {adminState === 'ok' && (
                <div className='space-y-4'>
                    <Card>
                        <p className='text-sm text-gray-700'>
                            Deterministic checks establish facts; AI only interprets them (
                            {aiState.connected ? `connected: ${aiState.model}` : `not connected — ${aiState.reason}`};
                            last 30 days: {spend.calls} call(s), ${spend.costUsd.toFixed(2)}). Schedules run when the
                            scheduler ticks (cron or in-process; see Settings).{' '}
                            {paused && <strong>Scheduled runs are paused.</strong>}
                        </p>
                        <ErrorNote error={action.error} />
                    </Card>
                    {analyses.map((a) => (
                        <Card
                            key={a.id}
                            title={
                                <span className='flex flex-wrap items-center gap-2'>
                                    {a.title} <Badge status={a.state} />
                                </span>
                            }
                            actions={
                                canRun && (
                                    <button
                                        type='button'
                                        className='btn btn-outline btn-xs'
                                        disabled={action.busy}
                                        onClick={() => runNow(a.id)}
                                    >
                                        Run now
                                    </button>
                                )
                            }
                        >
                            <p className='mb-2 text-sm text-gray-700'>{a.question}</p>
                            <p className='mb-2 text-xs text-gray-500'>
                                Schedule:{' '}
                                {a.schedule.enabled && a.schedule.everyHours
                                    ? `every ${a.schedule.everyHours} h`
                                    : 'manual only'}{' '}
                                · last {a.recent.length} run(s): {a.recent.map((r) => r.status).join(', ') || 'none'}
                            </p>
                            <RunDetail run={a.latest} />
                        </Card>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}

export const getServerSideProps = withAdminPage('view', async (context, session) => {
    const [{ ANALYSES }, runner, { getSettings }, { aiStatus, aiSpend }] = await Promise.all([
        import('@/lib/admin/analyses/definitions'),
        import('@/lib/admin/analyses/runner'),
        import('@/lib/admin/settings'),
        import('@/lib/admin/ai'),
    ]);
    const settings = await getSettings();
    const runs = await runner.listRuns();
    const analyses = ANALYSES.map((def) => {
        const mine = runs.filter((r) => r.analysisId === def.id);
        const latest = mine[0] || null;
        return {
            id: def.id,
            title: def.title,
            question: def.question,
            schedule: runner.scheduleFor(def, settings),
            state: runner.runState(def, latest, settings),
            latest,
            recent: mine.slice(0, 5).map((r) => ({ id: r.id, status: r.status })),
        };
    });
    return {
        props: {
            analyses,
            paused: settings.analyses.paused,
            canRun: can(session.role, 'analyses.run'),
            aiState: aiStatus(settings),
            spend: await aiSpend(),
        },
    };
});
