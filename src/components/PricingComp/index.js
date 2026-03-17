import PricingNav from './PricingNavComp/PricingNavComp';
import PricingCampaign from './PricingCampaign/PricingCampaign';
import PricingOtp from './PricingOtp/PricingOtp';
import PricingSMSOTP from './PricingSMS/PricingSMSOTP';
import PricingVoice from './PricingVoice/PricingVoice';
import NotFoundComp from '../NotFoundComp/NotFoundComp';
import HeadComp from '../HeadComp/HeadComp';
import NotificationBarComp from '../notificationBarComp/notificationBarComp';
import MenuBarComp from '../menuBarComp/menuBarComp';
import FooterComp from '../FooterComp/FooterComp';
import PricingSubscription from './PricingSubscription';
import ConnectWithTeam from './ConnectWithTeam';

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
                <div className='bg-white'>
                    <div className='container'>
                        <PricingNav products={products} page={pageInfo?.product} />
                    </div>
                    <div className='container py-8 flex flex-col gap-8'>
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
                            <PricingSMSOTP
                                data={pageData}
                                type={'sms'}
                                country={pageInfo?.country}
                                initialData={pricingData}
                            />
                        )}

                        {pageInfo?.product === 'otp' && (
                            <PricingSMSOTP
                                data={pageData}
                                type={'otp'}
                                country={pageInfo?.country}
                                initialData={pricingData}
                            />
                        )}

                        {pageInfo?.product === 'voice' && (
                            <PricingVoice data={pageData} country={pageInfo?.country} initialData={pricingData} />
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
