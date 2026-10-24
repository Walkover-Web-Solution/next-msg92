// Experiment route: renders one arm of an experiment at the original public URL. Reached only
// through the rewrite in src/proxy.js (direct requests get a 404 there). Server-rendered per
// request with `private, no-store` so a shared cache never serves one visitor's arm to another.
// The page keeps its own HeadComp, so canonical, hreflang and robots match the original URL.
import PageRenderer from '@/components/PageRenderer/PageRenderer';

export default PageRenderer;

export async function getServerSideProps({ params, query, req, res }) {
    const [{ default: loadPageProps }, { getExperiment, applyOverrides, LIVE_STATUSES }, { getSession }] =
        await Promise.all([
            import('@/utils/loadPageProps'),
            import('@/lib/experiments/live'),
            import('@/lib/admin/auth'),
        ]);
    res.setHeader('Cache-Control', 'private, no-store');

    const preview = query.exp_preview === '1';
    if (preview) {
        res.setHeader('X-Robots-Tag', 'noindex, nofollow');
        if (!getSession(req)) return { notFound: true };
    }

    const exp = await getExperiment(params.id);
    const slug = params.slug || [];
    const surface = `/${slug.join('/')}`;
    const arm = exp?.arms.find((a) => a.key === params.arm);
    if (!exp || !arm || exp.surface !== surface) return { notFound: true };
    if (!preview && !LIVE_STATUSES.includes(exp.status)) {
        // The proxy's live config can lag the registry by a few seconds: serve the baseline.
        const props = await loadPageProps(slug);
        return props ? { props } : { notFound: true };
    }

    const props = await loadPageProps(slug);
    if (!props) return { notFound: true };
    return {
        props: {
            ...props,
            data: applyOverrides(props.data, arm.overrides),
            experiment: {
                id: exp.id,
                version: exp.version,
                arm: arm.key,
                preview,
                // Exposure is tracked only while the experiment runs and never for previews.
                track: exp.status === 'running' && !preview,
            },
        },
    };
}
