import { useState, useEffect } from 'react';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/pricing/getCurrencySymbol';
import PlanToggle from '../PlanToggle/PlanToggle';
import PricingPlans from '../PricingPlans/PricingPlans';
import DialPlan from '../DialPlan/DialPlan';
import ComparePlans from '../ComparePlans/ComparePlans';

export default function PricingSubscription({ pageData, pricingData, pageInfo }) {
    const { symbol, currency } = GetCurrencySymbol(pageInfo?.country);
    const [tabtype, setTabtype] = useState('Monthly');
    const [hasYearly, setHasYearly] = useState(false);

    useEffect(() => {
        const hasYearlyPlans = Array.isArray(pricingData)
            ? pricingData.some((plan) => plan?.amount?.yearly != null)
            : false;
        setHasYearly(!!hasYearlyPlans);
    }, [pricingData]);

    return (
        <>
            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-2xl font-semibold capitalize'>{`${pageInfo?.product} Pricing`}</h1>
                <div className='flex flex-col w-full gap-6'>
                    <PlanToggle tabtype={tabtype} setTabtype={setTabtype} hasYearly={hasYearly} />
                    <PricingPlans pricingData={pricingData} tabtype={tabtype} symbol={symbol} />
                    <DialPlan pricingData={pricingData} symbol={symbol} />
                    <ComparePlans pricingData={pricingData} symbol={symbol} tabtype={tabtype} />
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
