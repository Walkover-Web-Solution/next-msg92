import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout, { adminFetch, ErrorNote } from '@/components/Admin/AdminLayout';

export default function AdminLogin({ configured }) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [busy, setBusy] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        setBusy(true);
        setError(null);
        try {
            await adminFetch('/api/admin/session', { body: { email, password } });
            const next =
                typeof router.query.next === 'string' && router.query.next.startsWith('/admin')
                    ? router.query.next
                    : '/admin';
            router.push(next);
        } catch (err) {
            setError(err.message);
            setBusy(false);
        }
    };

    return (
        <AdminLayout title='Sign in' adminState={configured ? 'ok' : 'not_configured'}>
            <form onSubmit={submit} className='max-w-sm space-y-4 rounded-lg border border-gray-200 bg-white p-5'>
                <div>
                    <label htmlFor='email' className='mb-1 block text-sm font-medium'>
                        Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        autoComplete='username'
                        required
                        className='input input-bordered w-full'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password' className='mb-1 block text-sm font-medium'>
                        Password
                    </label>
                    <input
                        id='password'
                        type='password'
                        autoComplete='current-password'
                        required
                        className='input input-bordered w-full'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn btn-primary w-full' disabled={busy}>
                    {busy ? 'Signing in…' : 'Sign in'}
                </button>
                <ErrorNote error={error} />
            </form>
        </AdminLayout>
    );
}

export async function getServerSideProps({ req, res }) {
    const { isConfigured, getSession } = await import('@/lib/admin/auth');
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    if (getSession(req)) return { redirect: { destination: '/admin', permanent: false } };
    return { props: { configured: isConfigured() } };
}
