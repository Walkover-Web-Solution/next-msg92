import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout, { Badge, Card, ErrorNote, adminFetch, formatDate, useAction } from '@/components/Admin/AdminLayout';
import { withAdminPage, can } from '@/lib/admin/auth';

const EMPTY = {
    name: '',
    status: 'candidate',
    category: 'direct',
    website: '',
    overlap: '',
    relevance: 'medium',
    cadenceDays: 30,
    sourcesText: '',
    notes: '',
};

function toForm(entry) {
    return { ...entry, sourcesText: entry.sources.map((s) => `${s.label} | ${s.url}`).join('\n') };
}

function fromForm(form) {
    const sources = form.sourcesText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [label, url] = line.includes('|') ? line.split('|').map((p) => p.trim()) : ['', line];
            return { label, url };
        });
    const { sourcesText, ...rest } = form;
    return { ...rest, cadenceDays: Number(form.cadenceDays), sources };
}

export default function Research({ adminState, session, data, perms, paused }) {
    const router = useRouter();
    const action = useAction();
    const [editing, setEditing] = useState(null);
    const [finding, setFinding] = useState({
        entryId: '',
        kind: 'observation',
        text: '',
        sourceUrl: '',
        confidence: 'medium',
    });
    const reload = () => router.replace(router.asPath);
    if (adminState !== 'ok') return <AdminLayout title='Research' session={session} adminState={adminState} />;
    const { watchlist, runs, findings, recentChanges } = data;

    const save = () =>
        action.run(
            () => adminFetch('/api/admin/research', { body: { action: 'save', entry: fromForm(editing) } }),
            () => {
                setEditing(null);
                reload();
            }
        );
    const togglePause = (entry) =>
        action.run(
            () =>
                adminFetch('/api/admin/research', {
                    body: { action: 'save', entry: { ...entry, paused: !entry.paused } },
                }),
            reload
        );
    const remove = (id) =>
        window.confirm(`Remove ${id} from the watchlist?`) &&
        action.run(() => adminFetch('/api/admin/research', { body: { action: 'remove', id } }), reload);
    const runNow = (ids) =>
        action.run(() => adminFetch('/api/admin/research', { body: { action: 'run', ids } }), reload);
    const addFinding = () =>
        action.run(
            () => adminFetch('/api/admin/research', { body: { action: 'finding', finding } }),
            () => {
                setFinding({ ...finding, text: '', sourceUrl: '' });
                reload();
            }
        );
    const f = (key) => (e) => setEditing({ ...editing, [key]: e.target.value });

    return (
        <AdminLayout title='Research' session={session} adminState={adminState}>
            <div className='space-y-4'>
                <Card
                    actions={
                        perms.run && (
                            <button
                                type='button'
                                className='btn btn-primary btn-sm'
                                disabled={action.busy}
                                onClick={() => runNow(watchlist.entries.filter((e) => e.due).map((e) => e.id))}
                            >
                                Check due sources now
                            </button>
                        )
                    }
                >
                    <p className='text-sm text-gray-700'>
                        The watchlist says what to monitor and how often. Monitoring fetches each official source page,
                        fingerprints its visible text and flags changes; it never copies competitor content. Conclusions
                        go into docs/COMPETITORS.md through Knowledge, with sources and dates.{' '}
                        {paused && <strong>Scheduled research is paused.</strong>}
                    </p>
                    <p className='mt-1 text-xs text-gray-500'>
                        Seeded from {watchlist.seededFrom || 'nothing'}{' '}
                        {watchlist.seededOn && `(${watchlist.seededOn})`}. Who approves watchlist changes is an open
                        question (docs/OPEN_QUESTIONS.md).
                    </p>
                    <ErrorNote error={action.error} />
                </Card>

                {recentChanges.length > 0 && (
                    <Card title='Changed sources to review'>
                        <ul className='space-y-1 text-sm'>
                            {recentChanges.map((c, i) => (
                                <li key={i}>
                                    {formatDate(c.at)} · <strong>{c.entryId}</strong> ·{' '}
                                    <a className='text-accent underline' href={c.url} target='_blank' rel='noreferrer'>
                                        {c.label || c.url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Card>
                )}

                <Card
                    title={`Watchlist (${watchlist.entries.length})`}
                    actions={
                        perms.edit && (
                            <button
                                type='button'
                                className='btn btn-outline btn-sm'
                                onClick={() => setEditing({ ...EMPTY })}
                            >
                                Add entry
                            </button>
                        )
                    }
                >
                    {editing && (
                        <div className='mb-4 grid gap-2 rounded border border-gray-200 p-3 md:grid-cols-3'>
                            <input
                                aria-label='Name'
                                className='input input-bordered input-sm'
                                placeholder='Name'
                                value={editing.name}
                                onChange={f('name')}
                            />
                            <select
                                aria-label='Status'
                                className='select select-bordered select-sm'
                                value={editing.status}
                                onChange={f('status')}
                            >
                                <option value='confirmed'>confirmed</option>
                                <option value='candidate'>candidate</option>
                            </select>
                            <select
                                aria-label='Category'
                                className='select select-bordered select-sm'
                                value={editing.category}
                                onChange={f('category')}
                            >
                                {['direct', 'indirect', 'substitute', 'workaround'].map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                            <input
                                aria-label='Website'
                                className='input input-bordered input-sm'
                                placeholder='https://…'
                                value={editing.website}
                                onChange={f('website')}
                            />
                            <select
                                aria-label='Relevance'
                                className='select select-bordered select-sm'
                                value={editing.relevance}
                                onChange={f('relevance')}
                            >
                                {['high', 'medium', 'low'].map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                            <label className='flex items-center gap-2 text-sm'>
                                Review every
                                <input
                                    type='number'
                                    min='1'
                                    max='365'
                                    className='input input-bordered input-sm w-20'
                                    value={editing.cadenceDays}
                                    onChange={f('cadenceDays')}
                                />
                                days
                            </label>
                            <input
                                aria-label='Overlap'
                                className='input input-bordered input-sm md:col-span-3'
                                placeholder='Overlapping audience / use case'
                                value={editing.overlap}
                                onChange={f('overlap')}
                            />
                            <textarea
                                aria-label='Sources'
                                className='textarea textarea-bordered text-xs md:col-span-3'
                                rows={3}
                                placeholder={'One per line: Label | https://official.page/pricing'}
                                value={editing.sourcesText}
                                onChange={f('sourcesText')}
                            />
                            <textarea
                                aria-label='Notes'
                                className='textarea textarea-bordered text-xs md:col-span-3'
                                rows={2}
                                placeholder='Notes / corrected assumptions'
                                value={editing.notes}
                                onChange={f('notes')}
                            />
                            <div className='flex gap-2 md:col-span-3'>
                                <button
                                    type='button'
                                    className='btn btn-primary btn-sm'
                                    disabled={action.busy}
                                    onClick={save}
                                >
                                    Save
                                </button>
                                <button type='button' className='btn btn-ghost btn-sm' onClick={() => setEditing(null)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                    <div className='overflow-x-auto'>
                        <table className='w-full text-left text-sm'>
                            <thead className='text-gray-500'>
                                <tr>
                                    <th className='py-2 pr-3 font-medium'>Name</th>
                                    <th className='py-2 pr-3 font-medium'>Category</th>
                                    <th className='py-2 pr-3 font-medium'>Sources (last check)</th>
                                    <th className='py-2 pr-3 font-medium'>Cadence</th>
                                    <th className='py-2 font-medium' />
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100 align-top'>
                                {watchlist.entries.map((e) => (
                                    <tr key={e.id}>
                                        <td className='py-2 pr-3'>
                                            <strong>{e.name}</strong> <Badge status={e.status} />{' '}
                                            {e.paused && <Badge status='paused' />}{' '}
                                            {e.due && !e.paused && <Badge tone='info'>due</Badge>}
                                            <span className='block text-xs text-gray-500'>{e.overlap}</span>
                                        </td>
                                        <td className='py-2 pr-3 text-xs'>
                                            {e.category} · {e.relevance}
                                        </td>
                                        <td className='py-2 pr-3 text-xs'>
                                            {e.sources.length ? (
                                                <ul>
                                                    {e.sources.map((s) => (
                                                        <li key={s.url}>
                                                            <a
                                                                className='text-accent underline'
                                                                href={s.url}
                                                                target='_blank'
                                                                rel='noreferrer'
                                                            >
                                                                {s.label || s.url}
                                                            </a>{' '}
                                                            <span className='text-gray-500'>
                                                                {s.state
                                                                    ? `${formatDate(s.state.checkedAt)} · ${s.state.lastStatus}${s.state.changedAt ? ` · changed ${formatDate(s.state.changedAt)}` : ''}`
                                                                    : 'never checked'}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className='text-gray-500'>No sources (not monitored)</span>
                                            )}
                                        </td>
                                        <td className='py-2 pr-3 text-xs'>{e.cadenceDays} days</td>
                                        <td className='whitespace-nowrap py-2 text-right'>
                                            {perms.run && e.sources.length > 0 && (
                                                <button
                                                    type='button'
                                                    className='btn btn-ghost btn-xs'
                                                    onClick={() => runNow([e.id])}
                                                >
                                                    Check
                                                </button>
                                            )}
                                            {perms.edit && (
                                                <>
                                                    <button
                                                        type='button'
                                                        className='btn btn-ghost btn-xs'
                                                        onClick={() => setEditing(toForm(e))}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn btn-ghost btn-xs'
                                                        onClick={() => togglePause(e)}
                                                    >
                                                        {e.paused ? 'Resume' : 'Pause'}
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn btn-ghost btn-xs'
                                                        onClick={() => remove(e.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card title='Findings'>
                    {perms.edit && (
                        <div className='mb-3 grid gap-2 md:grid-cols-4'>
                            <select
                                aria-label='Competitor'
                                className='select select-bordered select-sm'
                                value={finding.entryId}
                                onChange={(e) => setFinding({ ...finding, entryId: e.target.value })}
                            >
                                <option value=''>General</option>
                                {watchlist.entries.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                aria-label='Kind'
                                className='select select-bordered select-sm'
                                value={finding.kind}
                                onChange={(e) => setFinding({ ...finding, kind: e.target.value })}
                            >
                                <option value='observation'>Observation (what a source says)</option>
                                <option value='interpretation'>Interpretation</option>
                                <option value='recommendation'>Recommendation</option>
                            </select>
                            <select
                                aria-label='Confidence'
                                className='select select-bordered select-sm'
                                value={finding.confidence}
                                onChange={(e) => setFinding({ ...finding, confidence: e.target.value })}
                            >
                                {['high', 'medium', 'low'].map((c) => (
                                    <option key={c} value={c}>
                                        {c} confidence
                                    </option>
                                ))}
                            </select>
                            <input
                                aria-label='Source URL'
                                className='input input-bordered input-sm'
                                placeholder='Source URL (required for observations)'
                                value={finding.sourceUrl}
                                onChange={(e) => setFinding({ ...finding, sourceUrl: e.target.value })}
                            />
                            <textarea
                                aria-label='Finding'
                                className='textarea textarea-bordered text-sm md:col-span-4'
                                rows={2}
                                value={finding.text}
                                onChange={(e) => setFinding({ ...finding, text: e.target.value })}
                            />
                            <button
                                type='button'
                                className='btn btn-outline btn-sm w-fit'
                                disabled={action.busy}
                                onClick={addFinding}
                            >
                                Record finding
                            </button>
                        </div>
                    )}
                    {findings.length ? (
                        <ul className='divide-y divide-gray-100 text-sm'>
                            {findings.map((x) => (
                                <li key={x.id} className='py-2'>
                                    <Badge
                                        tone={
                                            x.kind === 'observation'
                                                ? 'info'
                                                : x.kind === 'recommendation'
                                                  ? 'warn'
                                                  : 'muted'
                                        }
                                    >
                                        {x.kind}
                                    </Badge>{' '}
                                    <strong>{x.entryId || 'general'}</strong> — {x.text}
                                    <span className='block text-xs text-gray-500'>
                                        {x.observedOn} · {x.confidence} confidence · {x.by}
                                        {x.sourceUrl && (
                                            <>
                                                {' '}
                                                ·{' '}
                                                <a
                                                    className='text-accent underline'
                                                    href={x.sourceUrl}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    source
                                                </a>
                                            </>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='text-sm text-gray-600'>
                            No findings recorded in the admin yet. The 2026-10-24 desk research is in
                            docs/COMPETITORS.md.
                        </p>
                    )}
                </Card>

                <Card title='Monitoring runs'>
                    {runs.length ? (
                        <ul className='divide-y divide-gray-100 text-sm'>
                            {runs.slice(0, 15).map((r) => (
                                <li key={r.id} className='py-2'>
                                    <Badge status={r.status} /> {formatDate(r.startedAt)} · {r.trigger} by {r.by} ·{' '}
                                    {r.entries ?? '?'} entries, {r.fetched} fetched, {r.changed?.length || 0} changed,{' '}
                                    {r.unchanged} unchanged, {r.failed?.length || 0} failed
                                    {r.failed?.length > 0 && (
                                        <details className='text-xs text-gray-600'>
                                            <summary>Failures</summary>
                                            <ul>
                                                {r.failed.map((x, i) => (
                                                    <li key={i}>
                                                        {x.entryId}: {x.url} — {x.reason}
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='text-sm text-gray-600'>No monitoring run has happened yet.</p>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
}

export const getServerSideProps = withAdminPage('view', async (context, session) => {
    const [{ researchOverview }, { getSettings }] = await Promise.all([
        import('@/lib/admin/research'),
        import('@/lib/admin/settings'),
    ]);
    const [data, settings] = await Promise.all([researchOverview(), getSettings()]);
    return {
        props: {
            data,
            perms: { edit: can(session.role, 'research.edit'), run: can(session.role, 'research.run') },
            paused: settings.research.paused,
        },
    };
});
