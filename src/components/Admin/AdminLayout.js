import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const NAV = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/knowledge', label: 'Knowledge' },
    { href: '/admin/research', label: 'Research' },
    { href: '/admin/analyses', label: 'Analyses' },
    { href: '/admin/experiments', label: 'Experiments' },
    { href: '/admin/settings', label: 'Settings & history' },
];

// Calls an admin API route with the CSRF header. Throws Error(message) on a non-2xx response.
export async function adminFetch(url, { method = 'POST', body } = {}) {
    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-admin-request': '1' },
        body: body === undefined ? undefined : JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const error = new Error(data.error || `Request failed (${res.status})`);
        error.code = data.code;
        throw error;
    }
    return data;
}

// Runs an async action with busy/error state; `onDone` receives the result.
export function useAction() {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);
    const run = async (fn, onDone) => {
        setBusy(true);
        setError(null);
        try {
            const result = await fn();
            onDone?.(result);
            return result;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setBusy(false);
        }
    };
    return { busy, error, run, setError };
}

const TONES = {
    good: 'bg-green-50 text-green-800 border-green-200',
    warn: 'bg-amber-50 text-amber-900 border-amber-200',
    bad: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    muted: 'bg-gray-50 text-gray-700 border-gray-200',
};

const STATUS_TONES = {
    fresh: 'good',
    succeeded: 'good',
    effective: 'good',
    running: 'info',
    ok: 'good',
    better: 'good',
    confirmed: 'good',
    pending: 'info',
    draft: 'muted',
    paused: 'warn',
    rolling_out: 'info',
    completed: 'muted',
    archived: 'muted',
    unchanged: 'good',
    stale: 'warn',
    collecting: 'muted',
    insufficient_data: 'muted',
    inconclusive: 'muted',
    candidate: 'muted',
    never_run: 'muted',
    not_connected: 'warn',
    budget_exhausted: 'warn',
    conflict: 'bad',
    sync_failed: 'bad',
    failed: 'bad',
    harmful: 'bad',
    worse: 'bad',
    invalid: 'bad',
    rejected: 'muted',
    superseded: 'muted',
    discarded: 'muted',
    high: 'bad',
    medium: 'warn',
    low: 'muted',
};

export function Badge({ status, children, tone }) {
    const label = children || String(status || '').replace(/_/g, ' ');
    return (
        <span
            className={`inline-block rounded border px-2 py-0.5 text-xs font-medium ${TONES[tone || STATUS_TONES[status] || 'muted']}`}
        >
            {label}
        </span>
    );
}

export function Card({ title, actions, children, className = '' }) {
    return (
        <section className={`rounded-lg border border-gray-200 bg-white p-4 md:p-5 ${className}`}>
            {(title || actions) && (
                <div className='mb-3 flex flex-wrap items-center justify-between gap-2'>
                    {title && <h2 className='text-lg font-semibold'>{title}</h2>}
                    {actions && <div className='flex flex-wrap gap-2'>{actions}</div>}
                </div>
            )}
            {children}
        </section>
    );
}

export function ErrorNote({ error }) {
    if (!error) return null;
    return (
        <p role='alert' className='mt-2 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800'>
            {error}
        </p>
    );
}

export function formatDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
}

export default function AdminLayout({ title, session, adminState, children }) {
    const router = useRouter();
    const signOut = async () => {
        await adminFetch('/api/admin/session', { method: 'DELETE' }).catch(() => {});
        router.push('/admin/login');
    };
    return (
        <>
            <Head>
                <title>{`${title} · MSG91 website admin`}</title>
                <meta name='robots' content='noindex, nofollow' />
            </Head>
            <div className='min-h-screen bg-neutral text-primary'>
                <header className='border-b border-gray-200 bg-white'>
                    <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3'>
                        <Link href='/admin' className='font-semibold'>
                            MSG91 website admin
                        </Link>
                        {session && (
                            <div className='flex items-center gap-3 text-sm text-gray-600'>
                                <span>
                                    {session.email} · {session.role}
                                </span>
                                <button type='button' className='btn btn-outline btn-xs' onClick={signOut}>
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                    {session && (
                        <nav aria-label='Admin sections' className='mx-auto max-w-6xl overflow-x-auto px-4'>
                            <ul className='flex gap-1 text-sm'>
                                {NAV.map((item) => {
                                    const active =
                                        item.href === '/admin'
                                            ? router.pathname === '/admin'
                                            : router.pathname.startsWith(item.href);
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                aria-current={active ? 'page' : undefined}
                                                className={`block whitespace-nowrap border-b-2 px-3 py-2 ${active ? 'border-accent font-medium text-primary' : 'border-transparent text-gray-600 hover:text-primary'}`}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    )}
                </header>
                <main className='mx-auto max-w-6xl px-4 py-6'>
                    {adminState === 'not_configured' ? (
                        <Card title='Admin is not configured'>
                            <p className='text-gray-700'>
                                Set <code>ADMIN_SESSION_SECRET</code> (32+ characters) and <code>ADMIN_USERS</code> on
                                the server. See docs/DEVELOPMENT.md → Admin.
                            </p>
                        </Card>
                    ) : adminState === 'forbidden' ? (
                        <Card title='Not allowed'>
                            <p className='text-gray-700'>Your role ({session?.role}) cannot open this page.</p>
                        </Card>
                    ) : (
                        <>
                            <h1 className='mb-4 text-2xl font-bold'>{title}</h1>
                            {children}
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
