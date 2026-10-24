// Experiment routing (Next.js 16 proxy, Node.js runtime).
//
// For a URL with a live experiment, assigns the visitor to an arm (stable per visitor cookie) and
// rewrites to the experiment route, which renders that arm at the same public URL with
// `Cache-Control: private, no-store` so no shared cache can hand one visitor's variant to another.
// Every other request passes straight through. Admin previews use `?exp_preview=<id>:<arm>`.
// Bots are routed like everyone else (no crawler-specific content); they are excluded from
// evaluation, not from the page. See docs/EXPERIMENTS.md.
import { NextResponse } from 'next/server';
import { getLiveConfig } from '@/lib/experiments/live';
import {
    VISITOR_COOKIE,
    PARTICIPATION_COOKIE,
    PARTICIPATING_FLAG_COOKIE,
    assign,
    isValidVisitorId,
    newVisitorId,
    normalizeSurface,
    parseParticipation,
    serializeParticipation,
} from '@/lib/experiments/assignment';

const EXPERIMENT_ROUTE = '/exp-view';
const YEAR = 365 * 86400;

function variantPath(id, arm, surface) {
    return `${EXPERIMENT_ROUTE}/${id}/${arm}${surface === '/' ? '' : surface}`;
}

export async function proxy(request) {
    const { pathname, searchParams } = request.nextUrl;

    // The experiment route is reachable only through this rewrite, never as a public URL.
    if (pathname === EXPERIMENT_ROUTE || pathname.startsWith(`${EXPERIMENT_ROUTE}/`)) {
        return new NextResponse('Not Found', { status: 404 });
    }
    // Static files (anything with an extension) never take part in experiments.
    if (/\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();

    const surface = normalizeSurface(pathname);
    const preview = searchParams.get('exp_preview');
    if (preview) {
        const [id, arm] = preview.split(':');
        if (!/^[a-z0-9-]{1,40}$/.test(id || '') || !/^[ABC]$/.test(arm || '')) return NextResponse.next();
        const url = request.nextUrl.clone();
        url.pathname = variantPath(id, arm, surface);
        url.searchParams.set('exp_preview', '1');
        const res = NextResponse.rewrite(url);
        res.headers.set('Cache-Control', 'private, no-store');
        res.headers.set('X-Robots-Tag', 'noindex, nofollow');
        return res;
    }

    const live = (await getLiveConfig()).bySurface[surface];
    if (!live) return NextResponse.next();

    const existing = request.cookies.get(VISITOR_COOKIE)?.value;
    const visitorId = isValidVisitorId(existing) ? existing : newVisitorId();
    const arm = assign(visitorId, live);
    if (!arm) return NextResponse.next();

    const url = request.nextUrl.clone();
    url.pathname = variantPath(live.id, arm, surface);
    const res = NextResponse.rewrite(url);
    res.headers.set('Cache-Control', 'private, no-store');
    res.headers.set('Vary', 'Cookie');

    const secure = request.nextUrl.protocol === 'https:';
    const cookieOptions = { path: '/', sameSite: 'lax', secure, maxAge: YEAR };
    if (visitorId !== existing) res.cookies.set(VISITOR_COOKIE, visitorId, { ...cookieOptions, httpOnly: true });
    if (live.status === 'running') {
        const participation = parseParticipation(request.cookies.get(PARTICIPATION_COOKIE)?.value).filter(
            (e) => e.id !== live.id
        );
        participation.push({ id: live.id, version: live.version, arm });
        res.cookies.set(PARTICIPATION_COOKIE, serializeParticipation(participation), {
            ...cookieOptions,
            httpOnly: true,
            maxAge: 60 * 86400,
        });
        res.cookies.set(PARTICIPATING_FLAG_COOKIE, '1', { ...cookieOptions, httpOnly: false, maxAge: 60 * 86400 });
    }
    return res;
}

export const config = {
    // Pages only: API routes, admin, Next.js assets and public folders are skipped. Next.js also
    // applies this matcher to /_next/data requests, so client-side navigation is routed the same way.
    matcher: ['/((?!api/|admin|_next/static|_next/image|assets/|images/|img/|js/|pdf/|lotties/|favicon).*)'],
};
