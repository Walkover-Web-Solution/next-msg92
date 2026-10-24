// Catch-all route for JSON-driven pages. URL → src/data/<country>/<page>.json → sections listed in
// src/components/PageRenderer/sectionRegistry.js. See docs/ARCHITECTURE.md.
import PageRenderer from '@/components/PageRenderer/PageRenderer';
import loadPageProps from '@/utils/loadPageProps';

export default PageRenderer;

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps = async (context) => {
    const props = await loadPageProps(context?.params?.slug);
    if (!props) {
        return {
            notFound: true,
        };
    }
    return { props };
};
