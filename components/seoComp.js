import IndexSeoComp from './seo/inIndex';
import SmsSeoComp from './seo/inSms';
import VoiceSeoComp from './seo/inVoice';
import CampaignSeoComp from './seo/inCampaign';
import EmailSeoComp from './seo/inEmail';
import HelloSeoComp from './seo/inHello';
import OtpSeoComp from './seo/inOtp';
import InRcs from './seo/inRcs';

const Seo = ({ path, pricingPath, pageData }) => {
    let seoComponent = null;
const country = pricingPath.split('/')[1];
    if (country === 'in') {
        switch (pageData) {
            case 'index':
                seoComponent = <IndexSeoComp />;
                break;
            case '0':
                seoComponent = <IndexSeoComp />;
                break;
            case 'SMS':
                seoComponent = <SmsSeoComp />;
                break;
            case 'voice':
                seoComponent = <VoiceSeoComp />;
                break;
            case 'campaign':
                seoComponent = <CampaignSeoComp />;
                break;
            case 'Email':
                seoComponent = <EmailSeoComp />;
                break;
            case 'hello':
                seoComponent = <HelloSeoComp />;
                break;
            case 'otp':
                seoComponent = <OtpSeoComp />;
                break;
            case 'RCS':
                seoComponent = <InRcs />;
                break;
            default:
                <></>;
                break;
        }
    }

    return <>{seoComponent}</>;
};

export default Seo;
