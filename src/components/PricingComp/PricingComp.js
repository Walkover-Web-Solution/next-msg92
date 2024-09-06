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
    console.log('🚀 ~ PricingComp ~ data:', data);
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

                    {page === 'sms' && <PricingSMS data={data?.sms} />}

                    {page === 'otp' && <PricingSendOTP data={data?.otp} />}

                    {page === 'email' && <PricingEmail data={data?.email} />}

                    {page === 'whatsapp' && <PricingHello data={data?.whatsapp} />}

                    {page === 'voice' && <PricingVoice data={data?.voice} />}

                    {page === 'rcs' && <PricingRCS data={data?.rcs} />}
                </div>
            </div>
        </>
    );
}
