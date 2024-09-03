import PricingNav from './PricingNavComp/PricingNavComp';
import PricingHello from './PricingHello/PricingHello';
import PricingCampaign from './PricingCampaign/PricingCampaign';
import PricingSegmento from './PricingSegmento/PricingSegmento';
import PricingOtp from './PricingOtp/PricingOtp';
import PricingSMS from './PricingSMS/PricingSMS';
import PricingEmail from './PricingSendOTP/PricingSendOTP';
import PricingVoice from './PricingVoice/PricingVoice';
import PricingRCS from './PricingRCS/PricingRCS';
import PricingSendOTP from './PricingEmail/PricingEmail';

export default function PricingComp({ data, pageInfo }) {
    let page;
    if (pageInfo?.country === 'global') {
        page = pageInfo?.pathArray[1];
    } else {
        page = pageInfo?.pathArray[2];
    }

    return (
        <>
            <div className='container my-10 flex gap-6'>
                <PricingNav products={data?.products} page={page} />
                {page === 'hello' && <PricingHello />}
                {page === 'campaign' && <PricingCampaign />}
                {page === 'segmento' && <PricingSegmento />}
                {page === 'otpwidget' && <PricingOtp />}
                {page === 'sms' && <PricingSMS />}
                {page === 'otp' && <PricingSendOTP />}
                {page === 'email' && <PricingEmail />}
                {page === 'whatsapp' && <PricingHello />}
                {page === 'voice' && <PricingVoice />}
                {page === 'rcs' && <PricingRCS />}
            </div>
        </>
    );
}
