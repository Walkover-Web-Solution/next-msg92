/* components */
import BannerComp from '@/components/BannerComp/BannerComp';
import CaseStudiesComp from '@/components/CaseStudiesComp/CaseStudiesComp';
import ChannelsComp from '@/components/ChannelsComp/ChannelsComp';
import FactsComp from '@/components/FactsComp/FactsComp';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import FooterComp from '@/components/FooterComp/FooterComp';
import MenuBarComp from '@/components/menuBarComp/menuBarComp';
import MoreServicesComp from '@/components/MoreServicesComp/MoreServicesComp';
import NotFoundComp from '@/components/NotFoundComp/NotFoundComp';
import NotificationBarComp from '@/components/notificationBarComp/notificationBarComp';
import PreFooterComp from '@/components/PreFooterComp/PreFooterComp';
import ProductsComp from '@/components/ProductsComp/ProductsComp';
import SEOComp from '@/components/SEOComp/SEOComp';
import TrustedByComp from '@/components/TrustedByComp/TrustedByComp';
import HeadComp from '@/components/headComp';
import FeatureComp from '@/components/FeatureComp/FeatureComp';
import PricingComp from '@/components/PricingComp/PricingComp';

//Functions to fetch data
import getPageInfo from '@/utils/getPageInfo';
import getCommonCompData from '@/utils/getCommonCompData';

const Components = {
    BannerComp,
    CaseStudiesComp,
    ChannelsComp,
    FactsComp,
    FaqsComp,
    FooterComp,
    MenuBarComp,
    MoreServicesComp,
    NotFoundComp,
    NotificationBarComp,
    PreFooterComp,
    ProductsComp,
    SEOComp,
    TrustedByComp,
    HeadComp,
    FeatureComp,
    PricingComp,
};

export default function Page({ data, commonData, pageInfo }) {
    return (
        <>
            <NotificationBarComp componentData={commonData?.notification} country={pageInfo?.country} />

            <MenuBarComp componentData={commonData?.menu} />

            {data &&
                Object.keys(data).map((key) => {
                    const pageData = data[key];
                    var Component = Components[key];
                    if (!Component) {
                        console.error(`Component "${key}" is undefined. Check your imports and component exports.`);
                        return;
                    }

                    return <Component key={`section-${key}`} data={pageData} pageInfo={pageInfo} />;
                })}

            <FooterComp componentData={commonData?.footer} />
        </>
    );
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps = async (context) => {
    const params = context?.params;
    const pageInfo = getPageInfo(params);
    const commonData = getCommonCompData(pageInfo?.country);

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageInfo),
    });
    const data = await res.json();
    return {
        props: {
            data,
            commonData,
            pageInfo,
        },
    };
};
