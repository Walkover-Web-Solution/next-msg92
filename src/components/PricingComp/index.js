import PricingNav from './PricingNavComp/PricingNavComp';
import PricingCampaign from './PricingCampaign/PricingCampaign';
import PricingOtp from './PricingOtp/PricingOtp';
import PricingSMSOTP from './PricingSMS/PricingSMSOTP';
import PricingVoice from './PricingVoice/PricingVoice';
import NotFoundComp from '../NotFoundComp/NotFoundComp';
import HeadComp from '../HeadComp/HeadComp';
import FooterComp from '../FooterComp/FooterComp';
import PricingSubscription from './PricingSubscription';
import NavigationComp from '../NavigationComp';

export default function PricingComp({ pricingData, pageInfo, pageData, products, commonData, country }) {
    if (pricingData) {
        return (
            <>
                <HeadComp data={pageData?.HeadComp} pageInfo={pageInfo} />
                <NavigationComp
                    pageInfo={pageInfo}
                    componentData={{
                        menubarData: commonData?.menu,
                        notificationBarData: commonData?.notification,
                    }}
                    country={pageInfo?.country}
                />
                <div className='bg-neutral py-3'>
                    <div className='container md:my-10 my-4 flex md:gap-12 gap-6 md:flex-row flex-col '>
                        <PricingNav products={products} page={pageInfo?.product} />

                        {pageInfo?.product === 'campaign' && <PricingCampaign pageData={pageData} />}

                        {['hello', 'segmento', 'email', 'rcs', 'whatsapp'].includes(pageInfo?.product) && (
                            <PricingSubscription
                                pricingData={pricingData}
                                pageData={pageData}
                                pageInfo={pageInfo}
                                country={country}
                            />
                        )}

                        {pageInfo?.product === 'otpwidget' && <PricingOtp pageData={pageData} />}

                        {pageInfo?.product === 'sms' && (
                            <PricingSMSOTP data={pageData} type={'sms'} country={pageInfo?.country} />
                        )}

                        {pageInfo?.product === 'otp' && (
                            <PricingSMSOTP data={pageData} type={'otp'} country={pageInfo?.country} />
                        )}

                        {pageInfo?.product === 'voice' && <PricingVoice data={pageData} country={pageInfo?.country} />}
                    </div>
                </div>

                <FooterComp componentData={commonData?.footer} pageInfo={pageInfo} />
            </>
        );
    } else {
        return <NotFoundComp pageInfo={pageInfo} />;
    }
}
