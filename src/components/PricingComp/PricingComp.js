import PricingNav from './PricingNavComp/PricingNavComp';
import PricingHello from './PricingHello/PricingHello';
import PricingCampaign from './PricingCampaign/PricingCampaign';
import PricingSegmento from './PricingSegmento/PricingSegmento';
import PricingOtp from './PricingOtp/PricingOtp';
import PricingSMSOTP from './PricingSMS/PricingSMSOTP';
import PricingSendOTP from './PricingSendOTP/PricingSendOTP';
import PricingVoice from './PricingVoice/PricingVoice';
import PricingRCS from './PricingRCS/PricingRCS';
import PricingEmail from './PricingEmail/PricingEmail';
import PricingWhatsApp from './PricingWhatsApp/PricingWhatsApp';

export default function PricingComp({ data, pageInfo }) {
    let page;
    if (pageInfo?.country === 'global') {
        page = pageInfo?.pathArray[1];
    } else {
        page = pageInfo?.pathArray[2];
    }

    return (
        <>
            <div className='bg-neutral py-3'>
                <div className='container my-10 flex gap-12 '>
                    <PricingNav products={data?.products} page={page} />

                    {page === 'hello' && <PricingHello data={data?.hello} />}

                    {page === 'campaign' && <PricingCampaign data={data?.campaign} />}

                    {page === 'segmento' && <PricingSegmento data={data?.segmento} />}

                    {page === 'otpwidget' && <PricingOtp data={data?.otpwidget} />}

                    {page === 'sms' && <PricingSMSOTP data={data?.sms} type={'sms'} />}

                    {page === 'otp' && <PricingSMSOTP data={data?.otp} type={'otp'} />}

                    {page === 'email' && <PricingEmail data={data?.email} />}

                    {page === 'whatsapp' && <PricingWhatsApp data={data?.whatsapp} />}

                    {page === 'voice' && <PricingVoice data={data?.voice} />}

                    {page === 'rcs' && <PricingRCS data={data?.rcs} />}
                </div>
            </div>
        </>
    );
}
