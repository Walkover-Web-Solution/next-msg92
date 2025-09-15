import { useState, useEffect } from 'react';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import PricingHello from './PricingHello';
import PricingSegmento from './PricingSegmento';
import PricingEmail from './PricingEmail';

export default function PricingSubscription({ pageData, pricingData, pageInfo }) {
    const { symbol } = GetCurrencySymbol(pageInfo?.country);
    const [tabtype, setTabtype] = useState('Monthly');
    const [hasyYarly, setHasYearly] = useState(false);

    useEffect(() => {
        const yearlyPlan = pricingData?.find((plan) => plan.amount.plan_type === 'Yearly');
        if (yearlyPlan) {
            setHasYearly(true);
        }
    }, [pricingData]);

    return (
        <>
            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-2xl font-semibold capitalize'>{`${pageInfo?.product} Pricing`}</h1>
                <div className='flex flex-col w-full gap-6'>
                    {hasyYarly && (
                        <div role='tablist' className='tabs tabs-boxed p-0 w-fit'>
                            <span
                                role='tab'
                                className={`tab ${tabtype === 'Monthly' && 'tab-active'}`}
                                onClick={() => {
                                    setTabtype('Monthly');
                                }}
                            >
                                Monthly
                            </span>
                            <span
                                role='tab'
                                className={`tab ${tabtype === 'Yearly' && 'tab-active'}`}
                                onClick={() => {
                                    setTabtype('Yearly');
                                }}
                            >
                                Yearly (20% off)
                            </span>
                        </div>
                    )}
                    {pageInfo?.product === 'hello' && (
                        <PricingHello pricingData={pricingData} symbol={symbol} tabtype={tabtype} />
                    )}
                    {pageInfo?.product === 'segmento' && (
                        <PricingSegmento
                            pricingData={pricingData}
                            symbol={symbol}
                            tabtype={tabtype}
                            pageInfo={pageInfo}
                        />
                    )}
                    {pageInfo?.product === 'email' && (
                        <PricingEmail pricingData={pricingData} symbol={symbol} tabtype={tabtype} pageInfo={pageInfo} />
                    )}

                    {pageInfo?.country === 'in' || pageInfo?.country === 'gb' ? (
                        <p className='text-gray-500 '>
                            {`*Prices are exclusive of ${pageInfo?.country === 'in' ? '18% GST' : 'VAT'}`}
                        </p>
                    ) : null}

                    <ConnectWithTeam
                        product={pageInfo?.product}
                        href={pageInfo?.product}
                        pageData={pageData?.connectComp}
                        isPlan={true}
                    />
                    <FaqsComp data={pageData?.faqComp} notCont={true} />
                </div>
            </div>
        </>
    );
}
