import Link from 'next/link';
import AdminLayout, { Badge, Card, formatDate } from '@/components/Admin/AdminLayout';
import { withAdminPage } from '@/lib/admin/auth';

function DocTable({ docs }) {
    return (
        <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm'>
                <thead className='text-gray-500'>
                    <tr>
                        <th className='py-2 pr-3 font-medium'>Document</th>
                        <th className='py-2 pr-3 font-medium'>Status</th>
                        <th className='py-2 pr-3 font-medium'>Owner</th>
                        <th className='py-2 pr-3 font-medium'>Verified</th>
                        <th className='py-2 font-medium'>Open changes</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                    {docs.map((d) => (
                        <tr key={d.id}>
                            <td className='py-2 pr-3'>
                                <Link href={`/admin/knowledge/${d.id}`} className='font-medium text-accent underline'>
                                    {d.title}
                                </Link>
                                <span className='block text-xs text-gray-500'>
                                    {d.path} — {d.owns}
                                </span>
                            </td>
                            <td className='py-2 pr-3 text-xs text-gray-700'>
                                {d.exists ? d.status || '—' : <Badge status='failed'>missing</Badge>}
                            </td>
                            <td className='py-2 pr-3 text-xs text-gray-700'>
                                {d.owner || <span className='text-amber-700'>unassigned</span>}
                            </td>
                            <td className='py-2 pr-3'>
                                {d.verifiedOn || '—'} {d.exists && d.stale && <Badge status='stale' />}
                            </td>
                            <td className='py-2'>
                                {d.openChanges?.length ? (
                                    d.openChanges.map((c) => <Badge key={c.id} status={c.status} />)
                                ) : (
                                    <span className='text-gray-400'>—</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function KnowledgeIndex({ adminState, session, docs, writeback, pending }) {
    return (
        <AdminLayout title='Knowledge' session={session} adminState={adminState}>
            {adminState === 'ok' && (
                <div className='space-y-4'>
                    <Card>
                        <p className='text-sm text-gray-700'>
                            These documents live in the repository; agents and developers read the same files. Edits are
                            saved as drafts and become effective only through the writeback path:{' '}
                            <strong>{writeback.label}</strong>.
                        </p>
                        {writeback.problem && <p className='mt-2 text-sm text-red-700'>{writeback.problem}</p>}
                        {pending.length > 0 && (
                            <p className='mt-2 text-sm text-gray-700'>
                                Pending: {pending.map((c) => `${c.path} (${formatDate(c.submittedAt)})`).join(', ')}
                            </p>
                        )}
                    </Card>
                    <Card title='Marketing'>
                        <DocTable docs={docs.filter((d) => d.group === 'marketing')} />
                    </Card>
                    <Card title='Engineering'>
                        <DocTable docs={docs.filter((d) => d.group === 'engineering')} />
                    </Card>
                </div>
            )}
        </AdminLayout>
    );
}

export const getServerSideProps = withAdminPage('view', async (context, session) => {
    const [{ getSettings }, knowledge, { repoConfig }] = await Promise.all([
        import('@/lib/admin/settings'),
        import('@/lib/admin/knowledge/service'),
        import('@/lib/admin/repo'),
    ]);
    const settings = await getSettings();
    // Opening the list re-checks pending changes, so merged PRs show as effective.
    await knowledge.refreshPending(session).catch(() => {});
    const [docs, pending] = await Promise.all([
        knowledge.listDocs(settings.knowledge.freshnessDays),
        knowledge.listChanges((c) => c.status === 'pending'),
    ]);
    return {
        props: {
            docs,
            writeback: repoConfig(),
            pending: pending.map(({ path, submittedAt }) => ({ path, submittedAt })),
        },
    };
});
