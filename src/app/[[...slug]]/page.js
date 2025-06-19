// Components
import AboutUs from '@/components/AboutUs';
import Banner from '@/components/Banner';

// Utils
import getPageInfo from '@/utils/getPageInfo';
import getData from '@/utils/getData';
import Metadata, { setMetadata, generateMetadata } from '@/components/Metadata';

// Component registry
const Components = {
    AboutUs,
    Metadata,
    Banner,
};

// Export SSR metadata for Next.js
export { generateMetadata };

export default async function Page(props) {
    const params = props.params || {};
    const searchParams = props.searchParams || {};
    const slugArray = params.slug || [];

    const pageInfo = getPageInfo(slugArray, searchParams);
    const data = getData(pageInfo);

    // Inject metadata from data + pageInfo
    setMetadata({ data: data?.MetaData || {}, pageInfo });

    return (
        <>
            <Metadata />
            {data &&
                Object.keys(data).map((key) => {
                    if (key != 'MetaData') {
                        const compData = data[key];
                        const Component = Components[key];
                        if (!Component) {
                            console.error(`Component "${key}" is undefined. Check your imports and registry.`);
                            return null;
                        }

                        return <Component key={`section-${key}`} data={compData} pageInfo={pageInfo} />;
                    }
                })}
        </>
    );
}
