import PricingNav from './PricingNavComp/PricingNavComp';
import PricingCampaign from './PricingCampaign/PricingCampaign';
import PricingOtp from './PricingOtp/PricingOtp';
import PricingSMSOTP from './PricingSMS/PricingSMSOTP';
import PricingVoice from './PricingVoice/PricingVoice';
import PricingRCS from './PricingRCS/PricingRCS';
import PricingWhatsApp from './PricingWhatsApp/PricingWhatsApp';
import NotFoundComp from '../NotFoundComp/NotFoundComp';
import HeadComp from '../HeadComp/HeadComp';
import NotificationBarComp from '../NavigationComp/notificationBarComp/notificationBarComp';
import MenuBarComp from '../NavigationComp/menuBarComp/menuBarComp';
import FooterComp from '../FooterComp/FooterComp';
import PricingSubscription from './PricingSubscription';

export default function PricingComp({ pricingData, pageInfo, pageData, products, commonData, country }) {
    if (pricingData) {
        return (
            <>
                <HeadComp data={pageData?.HeadComp} pageInfo={pageInfo} />
                <NotificationBarComp
                    componentData={commonData?.notification}
                    country={pageInfo?.country}
                    pageInfo={{ country: country, page: 'pricing' }}
                />

                <MenuBarComp componentData={commonData?.menu} pageInfo={pageInfo} />
                <div className='bg-neutral py-3'>
                    <div className='container md:my-10 my-4 flex md:gap-12 gap-6 md:flex-row flex-col '>
                        <PricingNav products={products} page={pageInfo?.product} />

                        {pageInfo?.product === 'campaign' && <PricingCampaign pageData={pageData} />}

                        {(pageInfo?.product === 'hello' ||
                            pageInfo?.product === 'segmento' ||
                            pageInfo?.product === 'email') && (
                            <PricingSubscription pricingData={pricingData} pageData={pageData} pageInfo={pageInfo} />
                        )}

                        {pageInfo?.product === 'otpwidget' && <PricingOtp pageData={pageData} />}

                        {pageInfo?.product === 'sms' && (
                            <PricingSMSOTP data={pageData} type={'sms'} country={pageInfo?.country} />
                        )}

                        {pageInfo?.product === 'otp' && (
                            <PricingSMSOTP data={pageData} type={'otp'} country={pageInfo?.country} />
                        )}

                        {pageInfo?.product === 'whatsapp' && (
                            <PricingWhatsApp pricingData={pricingData} pageData={pageData} pageInfo={pageInfo} />
                        )}

                        {pageInfo?.product === 'voice' && <PricingVoice data={pageData} country={pageInfo?.country} />}

                        {pageInfo?.product === 'rcs' && (
                            <PricingRCS
                                pricingData={pricingData}
                                pageData={pageData}
                                country={pageInfo?.country}
                                pageInfo={pageInfo}
                            />
                        )}
                    </div>
                </div>
                <FooterComp componentData={commonData?.footer} pageInfo={pageInfo} />
            </>
        );
    } else {
        return <NotFoundComp pageInfo={pageInfo} />;
    }
}
