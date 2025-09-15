import PricingNav from './PricingNavComp/PricingNavComp';
import PricingHello from './PricingSubscription/PricingHello';
import PricingCampaign from './PricingCampaign/PricingCampaign';
import PricingSegmento from './PricingSubscription/PricingSegmento';
import PricingOtp from './PricingOtp/PricingOtp';
import PricingSMSOTP from './PricingSMS/PricingSMSOTP';
import PricingVoice from './PricingVoice/PricingVoice';
import PricingRCS from './PricingRCS/PricingRCS';
import PricingEmail from './PricingEmail/PricingEmail';
import PricingWhatsApp from './PricingWhatsApp/PricingWhatsApp';
import NotFoundComp from '../NotFoundComp/NotFoundComp';
import HeadComp from '../HeadComp/HeadComp';
import NotificationBarComp from '../notificationBarComp/notificationBarComp';
import MenuBarComp from '../menuBarComp/menuBarComp';
import FooterComp from '../FooterComp/FooterComp';
import PricingSubscription from './PricingSubscription';

export default function PricingComp({ pricingData, pageInfo, pageData, products, commonData }) {
    if (pricingData) {
        return (
            <>
                <HeadComp data={pageData?.HeadComp} pageInfo={pageInfo} />
                <NotificationBarComp
                    componentData={commonData?.notification}
                    country={pageInfo?.country}
                    pageInfo={pageInfo}
                />

                <MenuBarComp componentData={commonData?.menu} pageInfo={pageInfo} />
                <div className='bg-neutral py-3'>
                    <div className='container md:my-10 my-4 flex md:gap-12 gap-6 md:flex-row flex-col '>
                        <PricingNav products={products} page={pageInfo?.product} />

                        {/* {pageInfo?.product === 'hello' && (
                            <PricingHello pricingData={pricingData} pageData={pageData} country={pageInfo?.country} />
                        )} */}

                        {/* {pageInfo?.product === 'campaign' && (
                            <PricingCampaign
                                pricingData={pricingData}
                                pageData={pageData}
                                country={pageInfo?.country}
                            />
                        )}

                        {pageInfo?.product === 'segmento' && (
                            <PricingSegmento
                                pricingData={pricingData}
                                pageData={pageData}
                                country={pageInfo?.country}
                            />
                        )} */}
                        {(pageInfo?.product === 'hello' || pageInfo?.product === 'segmento') && (
                            <PricingSubscription pricingData={pricingData} pageData={pageData} pageInfo={pageInfo} />
                        )}
                        {/* 
                        {page === 'otpwidget' && <PricingOtp data={data?.otpwidget} country={pageInfo?.country} />}

                        {page === 'sms' && <PricingSMSOTP data={data?.sms} type={'sms'} country={pageInfo?.country} />}

                        {page === 'otp' && <PricingSMSOTP data={data?.otp} type={'otp'} country={pageInfo?.country} />}

                        {page === 'email' && <PricingEmail data={data?.email} country={pageInfo?.country} />}

                        {page === 'whatsapp' && <PricingWhatsApp data={data?.whatsapp} country={pageInfo?.country} />}

                        {page === 'voice' && <PricingVoice data={data?.voice} country={pageInfo?.country} />}

                        {page === 'rcs' && (
                            <PricingRCS data={data?.rcs} country={pageInfo?.country} pageInfo={pageInfo} />
                        )} */}
                    </div>
                </div>
                <FooterComp componentData={commonData?.footer} pageInfo={pageInfo} />
            </>
        );
    } else {
        return <NotFoundComp pageInfo={pageInfo} />;
    }
}
