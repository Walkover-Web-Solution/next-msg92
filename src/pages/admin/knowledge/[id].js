import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout, { Badge, Card, ErrorNote, adminFetch, formatDate, useAction } from '@/components/Admin/AdminLayout';
import { withAdminPage, can } from '@/lib/admin/auth';

const TABS = ['Read', 'Edit', 'Changes', 'History'];

function DiffView({ diff }) {
    return (
        <pre className='max-h-[480px] overflow-auto rounded border border-gray-200 bg-gray-50 p-2 text-xs leading-5'>
            {diff.map((line, i) => (
                <div
                    key={i}
                    className={
                        line.type === 'add'
                            ? 'bg-green-100 text-green-900'
                            : line.type === 'del'
                              ? 'bg-red-100 text-red-900'
                              : line.type === 'skip'
                                ? 'italic text-gray-400'
                                : ''
                    }
                >
                    {line.type === 'add' ? '+ ' : line.type === 'del' ? '- ' : '  '}
                    {line.text}
                </div>
            ))}
        </pre>
    );
}

export default function KnowledgeDoc({ adminState, session, data, canEdit }) {
    const router = useRouter();
    const [tab, setTab] = useState(router.query.tab && TABS.includes(router.query.tab) ? router.query.tab : 'Read');
    const myDraft = data?.changes.find(
        (c) => ['draft', 'conflict', 'sync_failed'].includes(c.status) && c.createdBy === session?.email
    );
    const [content, setContent] = useState(myDraft?.content ?? data?.file.content ?? '');
    const [summary, setSummary] = useState(myDraft?.summary ?? '');
    const [draft, setDraft] = useState(myDraft || null);
    const [diff, setDiff] = useState(null);
    const action = useAction();
    const reload = () => router.replace(router.asPath);

    if (adminState !== 'ok') return <AdminLayout title='Knowledge' session={session} adminState={adminState} />;
    const { doc, file, history, changes, writeback } = data;

    const save = () =>
        action.run(
            () =>
                adminFetch('/api/admin/knowledge/drafts', {
                    body: {
                        docId: doc.id,
                        changeId: draft?.id,
                        content,
                        summary,
                        baseSha: draft ? undefined : file.sha,
                        expectedUpdatedAt: draft?.updatedAt,
                    },
                }),
            (saved) => setDraft(saved)
        );
    const changeAction = (id, name) =>
        action.run(() => adminFetch(`/api/admin/knowledge/changes/${id}`, { body: { action: name } }), reload);
    const showDiff = (id) =>
        action.run(
            () => adminFetch(`/api/admin/knowledge/changes/${id}`, { method: 'GET' }),
            (result) => setDiff({ id, ...result })
        );
    const restore = (sha) =>
        action.run(
            () => adminFetch('/api/admin/knowledge/drafts', { body: { docId: doc.id, restoreSha: sha } }),
            reload
        );

    return (
        <AdminLayout title={doc.title} session={session} adminState={adminState}>
            <div className='mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-600'>
                <code>{doc.path}</code>
                <span>·</span>
                <span>{file.source}</span>
                {file.meta.status && <Badge tone='info'>{String(file.meta.status)}</Badge>}
                <span>· owner: {file.meta.owner || 'unassigned'}</span>
                <span>· verified {file.meta.verified_on ? String(file.meta.verified_on).slice(0, 10) : 'never'}</span>
                <span>· revision {file.sha ? file.sha.slice(0, 8) : '—'}</span>
            </div>
            <div role='tablist' className='mb-4 flex gap-1 border-b border-gray-200'>
                {TABS.map((t) => (
                    <button
                        key={t}
                        role='tab'
                        type='button'
                        aria-selected={tab === t}
                        onClick={() => setTab(t)}
                        className={`border-b-2 px-3 py-2 text-sm ${tab === t ? 'border-accent font-medium' : 'border-transparent text-gray-600'}`}
                    >
                        {t}
                        {t === 'Changes' && changes.length ? ` (${changes.length})` : ''}
                    </button>
                ))}
            </div>
            <ErrorNote error={action.error} />

            {tab === 'Read' && (
                <div className='grid gap-4 md:grid-cols-[220px_1fr]'>
                    <nav aria-label='Contents' className='hidden text-sm md:block'>
                        <ul className='sticky top-4 space-y-1'>
                            {file.headings
                                .filter((h) => h.level <= 2)
                                .map((h, i) => (
                                    <li key={i} className={h.level === 2 ? 'pl-2 text-gray-600' : 'font-medium'}>
                                        {h.text}
                                    </li>
                                ))}
                        </ul>
                    </nav>
                    <Card>
                        {file.exists ? (
                            <div className='admin-prose' dangerouslySetInnerHTML={{ __html: file.html }} />
                        ) : (
                            <p className='text-gray-600'>
                                This document does not exist yet. Create it from the Edit tab.
                            </p>
                        )}
                    </Card>
                </div>
            )}

            {tab === 'Edit' && (
                <Card
                    title={
                        draft
                            ? `Draft (${draft.status.replace('_', ' ')}) · saved ${formatDate(draft.updatedAt)}`
                            : 'New draft'
                    }
                    actions={
                        canEdit && (
                            <>
                                <button
                                    type='button'
                                    className='btn btn-outline btn-sm'
                                    disabled={action.busy}
                                    onClick={save}
                                >
                                    Save draft
                                </button>
                                {draft && (
                                    <button
                                        type='button'
                                        className='btn btn-primary btn-sm'
                                        disabled={action.busy || writeback.mode === 'off'}
                                        onClick={() => changeAction(draft.id, 'submit')}
                                    >
                                        Submit for review
                                    </button>
                                )}
                            </>
                        )
                    }
                >
                    {!canEdit && <p className='mb-2 text-sm text-amber-800'>Your role can read but not edit.</p>}
                    <p className='mb-2 text-xs text-gray-500'>
                        Writeback: {writeback.label}. A draft is not effective until it is merged; agents keep reading
                        the repository version.
                    </p>
                    <label htmlFor='summary' className='mb-1 block text-sm font-medium'>
                        Change summary
                    </label>
                    <input
                        id='summary'
                        className='input input-bordered input-sm mb-3 w-full'
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder='What changed and why (becomes the commit/PR title)'
                    />
                    <label htmlFor='content' className='sr-only'>
                        Markdown
                    </label>
                    <textarea
                        id='content'
                        className='textarea textarea-bordered h-[60vh] w-full font-mono text-xs leading-5'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        readOnly={!canEdit}
                        spellCheck
                    />
                </Card>
            )}

            {tab === 'Changes' && (
                <div className='space-y-3'>
                    {changes.length === 0 && <p className='text-gray-600'>No changes proposed from the admin yet.</p>}
                    {changes.map((c) => (
                        <Card
                            key={c.id}
                            title={
                                <span className='flex flex-wrap items-center gap-2'>
                                    <Badge status={c.status} /> {c.summary || 'Untitled change'}
                                </span>
                            }
                            actions={
                                <>
                                    <button
                                        type='button'
                                        className='btn btn-outline btn-xs'
                                        onClick={() => showDiff(c.id)}
                                    >
                                        Diff
                                    </button>
                                    {canEdit && c.status === 'pending' && (
                                        <button
                                            type='button'
                                            className='btn btn-outline btn-xs'
                                            onClick={() => changeAction(c.id, 'refresh')}
                                        >
                                            Re-check
                                        </button>
                                    )}
                                    {canEdit && c.status === 'conflict' && (
                                        <button
                                            type='button'
                                            className='btn btn-outline btn-xs'
                                            onClick={() => changeAction(c.id, 'rebase')}
                                        >
                                            Rebase on current
                                        </button>
                                    )}
                                    {canEdit && ['draft', 'sync_failed'].includes(c.status) && (
                                        <button
                                            type='button'
                                            className='btn btn-primary btn-xs'
                                            disabled={writeback.mode === 'off'}
                                            onClick={() => changeAction(c.id, 'submit')}
                                        >
                                            {c.status === 'sync_failed' ? 'Retry submit' : 'Submit'}
                                        </button>
                                    )}
                                    {canEdit && ['draft', 'conflict', 'sync_failed'].includes(c.status) && (
                                        <button
                                            type='button'
                                            className='btn btn-ghost btn-xs'
                                            onClick={() => changeAction(c.id, 'discard')}
                                        >
                                            Discard
                                        </button>
                                    )}
                                </>
                            }
                        >
                            <p className='text-xs text-gray-600'>
                                By {c.createdBy} · updated {formatDate(c.updatedAt)} · base{' '}
                                {c.baseSha ? c.baseSha.slice(0, 8) : 'new file'}
                                {c.prUrl && (
                                    <>
                                        {' '}
                                        ·{' '}
                                        <a
                                            className='text-accent underline'
                                            href={c.prUrl}
                                            target='_blank'
                                            rel='noreferrer'
                                        >
                                            PR #{c.prNumber}
                                        </a>
                                    </>
                                )}
                            </p>
                            {(c.error || c.note) && (
                                <p className={`mt-1 text-sm ${c.error ? 'text-red-700' : 'text-gray-700'}`}>
                                    {c.error || c.note}
                                </p>
                            )}
                            <details className='mt-2 text-xs text-gray-600'>
                                <summary>Status history</summary>
                                <ul className='mt-1 space-y-0.5'>
                                    {(c.events || []).map((e, i) => (
                                        <li key={i}>
                                            {formatDate(e.at)} · {e.status} · {e.by} {e.note && `— ${e.note}`}
                                        </li>
                                    ))}
                                </ul>
                            </details>
                            {diff?.id === c.id && (
                                <div className='mt-3'>
                                    <p className='mb-1 text-xs text-gray-600'>
                                        Against current revision {diff.currentSha?.slice(0, 8)}{' '}
                                        {diff.baseMatches
                                            ? '(same as the draft base)'
                                            : '(the file changed since this draft started)'}
                                    </p>
                                    <DiffView diff={diff.diff} />
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}

            {tab === 'History' && (
                <Card title='Repository history'>
                    {history.error ? (
                        <p className='text-sm text-red-700'>History unavailable: {history.error}</p>
                    ) : history.length ? (
                        <ul className='divide-y divide-gray-100 text-sm'>
                            {history.map((h) => (
                                <li key={h.sha} className='flex flex-wrap items-center justify-between gap-2 py-2'>
                                    <span>
                                        <code className='text-xs'>{h.sha.slice(0, 8)}</code> {h.message}
                                        <span className='block text-xs text-gray-500'>
                                            {h.author} · {formatDate(h.date)}
                                        </span>
                                    </span>
                                    {canEdit && (
                                        <button
                                            type='button'
                                            className='btn btn-outline btn-xs'
                                            onClick={() => restore(h.sha)}
                                        >
                                            Restore as draft
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='text-sm text-gray-600'>No commits touch this file yet (new or uncommitted).</p>
                    )}
                </Card>
            )}
            <style jsx global>{`
                .admin-prose h1 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0.5rem 0 1rem;
                }
                .admin-prose h2 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 1.5rem 0 0.5rem;
                }
                .admin-prose h3 {
                    font-size: 1.05rem;
                    font-weight: 600;
                    margin: 1.25rem 0 0.5rem;
                }
                .admin-prose p,
                .admin-prose ul,
                .admin-prose ol,
                .admin-prose table,
                .admin-prose pre,
                .admin-prose blockquote {
                    margin: 0.6rem 0;
                }
                .admin-prose ul {
                    list-style: disc;
                    padding-left: 1.25rem;
                }
                .admin-prose ol {
                    list-style: decimal;
                    padding-left: 1.25rem;
                }
                .admin-prose code {
                    font-size: 0.85em;
                    background: #f3f4f6;
                    padding: 0 0.25rem;
                    border-radius: 0.2rem;
                }
                .admin-prose pre {
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    padding: 0.75rem;
                    overflow-x: auto;
                    font-size: 0.8rem;
                }
                .admin-prose pre code {
                    background: none;
                    padding: 0;
                }
                .admin-prose table {
                    display: block;
                    overflow-x: auto;
                    border-collapse: collapse;
                    font-size: 0.85rem;
                }
                .admin-prose th,
                .admin-prose td {
                    border: 1px solid #e5e7eb;
                    padding: 0.35rem 0.5rem;
                    vertical-align: top;
                    text-align: left;
                }
                .admin-prose a {
                    color: #1e75ba;
                    text-decoration: underline;
                }
                .admin-prose blockquote {
                    border-left: 3px solid #e5e7eb;
                    padding-left: 0.75rem;
                    color: #4b5563;
                }
            `}</style>
        </AdminLayout>
    );
}

export const getServerSideProps = withAdminPage('view', async (context, session) => {
    const { getDoc } = await import('@/lib/admin/knowledge/service');
    try {
        const data = await getDoc(context.params.id);
        return { props: { data, canEdit: can(session.role, 'knowledge.edit') } };
    } catch (error) {
        if (error.status === 404) return { notFound: true };
        throw error;
    }
});
