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
import HeadComp from '@/components/HeadComp/HeadComp';
import FeatureComp from '@/components/FeatureComp/FeatureComp';
import PricingComp from '@/components/PricingComp/PricingComp';
import AboutUsComp from '@/components/AboutUsComp/AboutUsComp';
import DevelopersComp from '@/components/DevelopersComp/DevelopersComp';
import StartupComp from '@/components/StartupComp/StartupComp';
import PartnersComp from '@/components/PartnersComp/PartnersComp';
import CertificatesComp from '@/components/CertificatesComp/CertificatesComp';
import IntegrationsComp from '@/components/IntegrationsComp/IntegrationsComp';
import CaseStudyComp from '@/components/CaseStudyComp/CaseStudyComp';
import NewHelloComp from '@/components/NewHelloComp/NewHelloComp';
import TermsComp from '@/components/TermsComp/TermsComp';
import ContactUsComp from '@/components/ContactUsComp/ContactUsComp';
import getPageInfo from '@/utils/getPageInfo';
import getCommonCompData from '@/utils/getCommonCompData';
import SignUp from '@/components/signupComp/SignUp';
import ChatBotComp from '@/components/ChatBotComp/ChatBotComp';
import MagicLinkComp from '@/components/MagicLinkComp/MagicLinkComp';
import WhatsappLinkComp from '@/components/WhatsappLinkComp/WhatsappLinkComp';
import IntegrationAppComp from '@/components/IntegrationsComp/IntegrationAppComp';
import ThankYouComp from '@/components/ThankYouComp/ThankYouComp';
import StartupFormsComp from '@/components/StartupFormsComp/StartupFormsComp';
import CaseStudyPageComp from '@/components/CaseStudyComp/CaseStudyPageComp/CaseStudyPageComp';
import ChatBotDemoComp from '@/components/ChatBotDemoComp/ChatBotDemoComp';
import AsSeenComp from '@/components/AsSeenComp/AsSeenComp';
import ProductStatsComp from '@/components/ProductStatsComp/ProductStatsComp';

/* files */
import specialPages from '@/data/specialPages.json';

/* utils */
import { useRouter } from 'next/router';

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
    AboutUsComp,
    DevelopersComp,
    StartupComp,
    PartnersComp,
    CertificatesComp,
    IntegrationsComp,
    CaseStudyComp,
    NewHelloComp,
    TermsComp,
    ContactUsComp,
    SignUp,
    ChatBotComp,
    MagicLinkComp,
    WhatsappLinkComp,
    ThankYouComp,
    StartupFormsComp,
    IntegrationAppComp,
    CaseStudyPageComp,
    ChatBotDemoComp,
    AsSeenComp,
    ProductStatsComp,
};

export default function Page({ data, commonData, pageInfo }) {
    const router = useRouter();
    var browserPath = router.asPath;
    var browserPathCase = browserPath;
    return (
        <>
            {pageInfo?.page !== ''}
            <NotificationBarComp
                componentData={commonData?.notification}
                country={pageInfo?.country}
                pageInfo={pageInfo}
            />

            <MenuBarComp componentData={commonData?.menu} pageInfo={pageInfo} />
            {data &&
                Object.keys(data).map((key) => {
                    const pageData = data[key];
                    var Component = Components[key];
                    if (!Component) {
                        console.error(`Component "${key}" is undefined. Check your imports and component exports.`);
                        return;
                    }

                    return (
                        <Component
                            key={`section-${key}`}
                            data={pageData}
                            pageInfo={pageInfo}
                            browserPathCase={browserPathCase}
                        />
                    );
                })}

            <FooterComp componentData={commonData?.footer} pageInfo={pageInfo} />
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
    const isNestedpage = specialPages.nested.includes(pageInfo?.pathURL);
    const commonData = getCommonCompData(pageInfo?.country);
    const fetchData = async (endpoint) => {
        const res = await fetch(`${process.env.BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pageInfo),
        });
        return await res.json();
    };
    const data = isNestedpage ? await fetchData('/api/data') : await fetchData('/api/data');
    return {
        props: {
            data: data || {},
            commonData: commonData || {},
            pageInfo,
        },
    };
};
