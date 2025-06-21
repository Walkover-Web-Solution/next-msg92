// Components
import AboutUs from '@/components/AboutUs';
import Banner from '@/components/Banner';
import Channels from '@/components/Index/Channels';
import Facts from '@/components/Index/Facts';
import Faqs from '@/components/Index/Faqs';
import Features from '@/components/Features';
import MoreServices from '@/components/Index/MoreServices';
import Navbar from '@/components/Navbar';
import NotificationBar from '@/components/Notificationbar';
import PreFooter from '@/components/PreFooter';
import Products from '@/components/Index/Products';

// Utils
import getPageInfo from '@/utils/getPageInfo';
import getData from '@/utils/getData';
import Metadata, { setMetadata, generateMetadata } from '@/components/Metadata';

// Component registry
const Components = {
    AboutUs,
    Banner,
    Channels,
    Facts,
    Faqs,
    Features,
    Metadata,
    MoreServices,
    PreFooter,
    Products,
};

// Export SSR metadata for Next.js
export { generateMetadata };

export default async function Page(props) {
    const params = props.params || {};
    const searchParams = props.searchParams || {};
    const slugArray = params.slug || [];

    const pageInfo = getPageInfo(slugArray, searchParams);
    const data = getData(pageInfo);
    const pageData = data?.pageData;
    const commonData = data?.commonData;
    // Inject metadata from data + pageInfo
    setMetadata({ data: pageData?.MetaData || {}, pageInfo });

    return (
        <>
            <Metadata />
            <NotificationBar data={commonData?.notification} pageInfo={pageInfo} />
            <Navbar data={commonData?.menu} pageInfo={pageInfo} />
            {pageData &&
                Object.keys(pageData).map((key) => {
                    if (key != 'MetaData') {
                        const compData = pageData[key];
                        const Component = Components[key];
                        if (!Component) {
                            // console?.log(`Component "${key}" is undefined. Check your imports and registry.`);
                            return null;
                        }

                        return <Component key={`section-${key}`} data={compData} pageInfo={pageInfo} />;
                    }
                })}
        </>
    );
}
