import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout, { Badge, Card, ErrorNote, adminFetch, formatDate, useAction } from '@/components/Admin/AdminLayout';
import { withAdminPage, can } from '@/lib/admin/auth';

export default function ExperimentsIndex({ adminState, session, experiments, canEdit, policy }) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [surface, setSurface] = useState('/');
    const action = useAction();
    const create = (event) => {
        event.preventDefault();
        action.run(
            () => adminFetch('/api/admin/experiments', { body: { name, surface } }),
            (exp) => router.push(`/admin/experiments/${exp.id}`)
        );
    };
    return (
        <AdminLayout title='Experiments' session={session} adminState={adminState}>
            {adminState === 'ok' && (
                <div className='space-y-4'>
                    <Card>
                        <p className='text-sm text-gray-700'>
                            One baseline and at most {policy.maxChallengers} challenger(s) per URL; one experiment per
                            URL at a time. Results are evaluated on customer traffic only, with a planned sample size,
                            Bonferroni correction and an interim stop rule. Launching needs an owner, a complete
                            checklist, validated tracking and the release switch ({policy.allowLaunch ? 'on' : 'off'}).
                            Policy: docs/EXPERIMENTS.md.
                        </p>
                    </Card>
                    {canEdit && (
                        <Card title='New experiment (draft)'>
                            <form onSubmit={create} className='flex flex-wrap items-end gap-3'>
                                <div>
                                    <label htmlFor='exp-name' className='mb-1 block text-sm font-medium'>
                                        Name
                                    </label>
                                    <input
                                        id='exp-name'
                                        required
                                        className='input input-bordered input-sm w-64'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Home hero headline'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='exp-surface' className='mb-1 block text-sm font-medium'>
                                        Page URL path
                                    </label>
                                    <input
                                        id='exp-surface'
                                        required
                                        className='input input-bordered input-sm w-64'
                                        value={surface}
                                        onChange={(e) => setSurface(e.target.value)}
                                        placeholder='/whatsapp'
                                    />
                                </div>
                                <button type='submit' className='btn btn-primary btn-sm' disabled={action.busy}>
                                    Create draft
                                </button>
                            </form>
                            <ErrorNote error={action.error} />
                        </Card>
                    )}
                    <Card title='All experiments'>
                        {experiments.length ? (
                            <div className='overflow-x-auto'>
                                <table className='w-full text-left text-sm'>
                                    <thead className='text-gray-500'>
                                        <tr>
                                            <th className='py-2 pr-3 font-medium'>Experiment</th>
                                            <th className='py-2 pr-3 font-medium'>URL</th>
                                            <th className='py-2 pr-3 font-medium'>Status</th>
                                            <th className='py-2 pr-3 font-medium'>Version</th>
                                            <th className='py-2 pr-3 font-medium'>Arms</th>
                                            <th className='py-2 font-medium'>Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-100'>
                                        {experiments.map((e) => (
                                            <tr key={e.id}>
                                                <td className='py-2 pr-3'>
                                                    <Link
                                                        className='text-accent underline'
                                                        href={`/admin/experiments/${e.id}`}
                                                    >
                                                        {e.name}
                                                    </Link>
                                                    {e.synthetic && <Badge tone='warn'>synthetic fixture</Badge>}
                                                </td>
                                                <td className='py-2 pr-3'>
                                                    <code className='text-xs'>{e.surface}</code>
                                                </td>
                                                <td className='py-2 pr-3'>
                                                    <Badge status={e.status} />
                                                </td>
                                                <td className='py-2 pr-3'>v{e.version}</td>
                                                <td className='py-2 pr-3'>
                                                    {e.arms.length}
                                                    {e.queuedChallengers?.length
                                                        ? ` (+${e.queuedChallengers.length} queued)`
                                                        : ''}
                                                </td>
                                                <td className='py-2 text-gray-500'>{formatDate(e.updatedAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className='text-sm text-gray-600'>No experiments yet.</p>
                        )}
                    </Card>
                </div>
            )}
        </AdminLayout>
    );
}

export const getServerSideProps = withAdminPage('view', async (context, session) => {
    const [{ listExperiments }, { getSettings }] = await Promise.all([
        import('@/lib/admin/experiments/service'),
        import('@/lib/admin/settings'),
    ]);
    const [experiments, settings] = await Promise.all([listExperiments(), getSettings()]);
    return {
        props: {
            experiments: experiments.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
            canEdit: can(session.role, 'experiments.edit'),
            policy: {
                maxChallengers: settings.experiments.maxChallengers,
                allowLaunch: settings.experiments.allowLaunch,
            },
        },
    };
});
