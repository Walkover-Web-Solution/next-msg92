import PricingNav from './PricingNavComp/PricingNavComp';
import PricingHello from './PricingHello/PricingHello';
import PricingCampaign from './PricingCampaign/PricingCampaign';
import PricingSegmento from './PricingSegmento/PricingSegmento';
import PricingOtp from './PricingOtp/PricingOtp';
import PricingSMSOTP from './PricingSMS/PricingSMSOTP';
import PricingVoice from './PricingVoice/PricingVoice';
import PricingRCS from './PricingRCS/PricingRCS';
import PricingEmail from './PricingEmail/PricingEmail';
import PricingWhatsApp from './PricingWhatsApp/PricingWhatsApp';
import HeadComp from '../headComp';
import NotFoundComp from '../NotFoundComp/NotFoundComp';
import pages from '@/data/specialPages.json';

export default function PricingComp({ data, pageInfo }) {
    let page;
    if (pageInfo?.country === 'global') {
        page = pageInfo?.pathArray[1];
    } else {
        page = pageInfo?.pathArray[2];
    }
    if (pages?.pricing.includes(page)) {
        return (
            <>
                <HeadComp data={data[page]?.HeadComp} pageInfo={pageInfo} />
                <div className='bg-neutral py-3'>
                    <div className='container md:my-10 my-4 flex md:gap-12 gap-6 md:flex-row flex-col '>
                        <PricingNav products={data?.products} page={page} />

                        {page === 'hello' && <PricingHello data={data?.hello} country={pageInfo?.country} />}

                        {page === 'campaign' && <PricingCampaign data={data?.campaign} country={pageInfo?.country} />}

                        {page === 'segmento' && <PricingSegmento data={data?.segmento} country={pageInfo?.country} />}

                        {page === 'otpwidget' && <PricingOtp data={data?.otpwidget} country={pageInfo?.country} />}

                        {page === 'sms' && <PricingSMSOTP data={data?.sms} type={'sms'} country={pageInfo?.country} />}

                        {page === 'otp' && <PricingSMSOTP data={data?.otp} type={'otp'} country={pageInfo?.country} />}

                        {page === 'email' && <PricingEmail data={data?.email} country={pageInfo?.country} />}

                        {page === 'whatsapp' && <PricingWhatsApp data={data?.whatsapp} country={pageInfo?.country} />}

                        {page === 'voice' && <PricingVoice data={data?.voice} country={pageInfo?.country} />}

                        {page === 'rcs' && (
                            <PricingRCS data={data?.rcs} country={pageInfo?.country} pageInfo={pageInfo} />
                        )}
                    </div>
                </div>
            </>
        );
    } else {
        return <NotFoundComp pageInfo={pageInfo} />;
    }
}
