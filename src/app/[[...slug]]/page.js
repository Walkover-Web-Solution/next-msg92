//Components
import AboutUsComp from '@/components/AboutUsComp/AboutUsComp';
// import AsSeenComp from '@/components/AsSeenComp/AsSeenComp';
// import BannerComp from '@/components/BannerComp/BannerComp';
// import CaseStudiesComp from '@/components/CaseStudiesComp/CaseStudiesComp';
// import CaseStudyComp from '@/components/CaseStudyComp/CaseStudyComp';
// import CaseStudyPageComp from '@/components/CaseStudyComp/CaseStudyPageComp/CaseStudyPageComp';
// import CaseStudyPageCompOld from '@/components/CaseStudyComp/CaseStudyPageCompOld/CaseStudyPageCompOld';
// import CertificatesComp from '@/components/CertificatesComp/CertificatesComp';
// import CTAMFTL from '@/components/migrateFromTextlocal/ctaMFTL/ctaMFTL';
// import ChannelsComp from '@/components/ChannelsComp/ChannelsComp';
// import ChatBotComp from '@/components/ChatBotComp/ChatBotComp';
// import ChatBotDemoComp from '@/components/ChatBotDemoComp/ChatBotDemoComp';
// import CompareBannerComp from '@/components/compareComp/compareBannerComp/compareBannerComp';
// import CompareGridComp from '@/components/compareComp/compareGridComp/compareGridComp';
// import CompareTableComp from '@/components/compareComp/compareTableComp/compareTableComp';
// import ContactUsComp from '@/components/ContactUsComp/ContactUsComp';
// import DemoChatBotComp from '@/components/DemoChatBotComp/DemoChatBotComp';
// import DevelopersComp from '@/components/DevelopersComp/DevelopersComp';
// import EcommerceStoreComp from '@/components/EcommerceStoreComp/EcommerceStore';
// import FactsComp from '@/components/FactsComp/FactsComp';
// import FaqsComp from '@/components/FaqsComp/FaqsComp';
// import FeatureComp from '@/components/FeatureComp/FeatureComp';
// import FooterComp from '@/components/FooterComp/FooterComp';
// import HeadComp from '@/components/HeadComp/HeadComp';
// import IntegrationAppComp from '@/components/IntegrationsComp/IntegrationAppComp';
// import IntegrationsComp from '@/components/IntegrationsComp/IntegrationsComp';
// import MagicLinkComp from '@/components/MagicLinkComp/MagicLinkComp';
// import MenuBarComp from '@/components/menuBarComp/menuBarComp';
// import MigrateFromTextlocal from '@/components/migrateFromTextlocal/migrateFromTextlocal';
// import MoreServicesComp from '@/components/MoreServicesComp/MoreServicesComp';
// import NewHelloComp from '@/components/NewHelloComp/NewHelloComp';
// import NotFoundComp from '@/components/NotFoundComp/NotFoundComp';
// import NotificationBarComp from '@/components/notificationBarComp/notificationBarComp';
// import PartnersComp from '@/components/PartnersComp/PartnersComp';
// import PreFooterComp from '@/components/PreFooterComp/PreFooterComp';
// import PreFooterMFTL from '@/components/migrateFromTextlocal/preFooterMFTL/preFooterMFTL';
// import PricingComp from '@/components/PricingComp/PricingComp';
// import ProductStatsComp from '@/components/ProductStatsComp/ProductStatsComp';
// import ProductsComp from '@/components/ProductsComp/ProductsComp';
// import SEOComp from '@/components/SEOComp/SEOComp';
// import SLAComp from '@/components/SLAComp/SLAComp';
// import SignUp from '@/components/signupComp/SignUp';
// import StartupComp from '@/components/StartupComp/StartupComp';
// import StartupFormsComp from '@/components/StartupFormsComp/StartupFormsComp';
// import TermsComp from '@/components/TermsComp/TermsComp';
// import ThankYouComp from '@/components/ThankYouComp/ThankYouComp';
// import Themes from '@/components/Themes';
// import TrustedByComp from '@/components/TrustedByComp/TrustedByComp';
// import WhatsappLinkComp from '@/components/WhatsappLinkComp/WhatsappLinkComp';

//Utils
import getPageInfo from '@/utils/getPageInfo';
import getData from '@/utils/getData';

const Components = {
    AboutUsComp,
    //     AsSeenComp,
    //     BannerComp,
    //     CaseStudiesComp,
    //     CaseStudyComp,
    //     CaseStudyPageComp,
    //     CaseStudyPageCompOld,
    //     CertificatesComp,
    //     ChannelsComp,
    //     ChatBotComp,
    //     ChatBotDemoComp,
    //     CompareBannerComp,
    //     CompareGridComp,
    //     CompareTableComp,
    //     ContactUsComp,
    //     CTAMFTL,
    //     DemoChatBotComp,
    //     DevelopersComp,
    //     EcommerceStoreComp,
    //     FactsComp,
    //     FaqsComp,
    //     FeatureComp,
    //     FooterComp,
    //     HeadComp,
    //     IntegrationAppComp,
    //     IntegrationsComp,
    //     MagicLinkComp,
    //     MenuBarComp,
    //     MigrateFromTextlocal,
    //     MoreServicesComp,
    //     NewHelloComp,
    //     NotFoundComp,
    //     NotificationBarComp,
    //     PartnersComp,
    //     PreFooterComp,
    //     PreFooterMFTL,
    //     PricingComp,
    //     ProductStatsComp,
    //     ProductsComp,
    //     SEOComp,
    //     SignUp,
    //     SLAComp,
    //     StartupComp,
    //     StartupFormsComp,
    //     TermsComp,
    //     ThankYouComp,
    //     Themes,
    //     TrustedByComp,
    //     WhatsappLinkComp,
};

export default async function Page(props) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const slugArray = params?.slug || [];
    const queryParams = searchParams || {};
    const pageInfo = getPageInfo(slugArray, queryParams);
    const data = getData(pageInfo);

    return (
        <>
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
                        />
                    );
                })}
        </>
    );
}
