import { useState, useEffect } from 'react';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/pricing/getCurrencySymbol';
import PlanToggle from '../PlanToggle/PlanToggle';
import PricingPlans from '../PricingPlans/PricingPlans';
import DialPlan from '../DialPlan/DialPlan';

export default function PricingSubscription({ pageData, pricingData, pageInfo }) {
    console.log('🚀 ~ PricingSubscription ~ pricingData:', pricingData);
    const { symbol, currency } = GetCurrencySymbol(pageInfo?.country);
    const [tabtype, setTabtype] = useState('Monthly');
    const [hasYearly, setHasYearly] = useState(false);

    useEffect(() => {
        const yearlyPlan = Array.isArray(pricingData)
            ? pricingData.find((plan) => plan?.amount?.plan_type === 'Yearly')
            : undefined;
        setHasYearly(!!yearlyPlan);
    }, [pricingData]);

    return (
        <>
            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-2xl font-semibold capitalize'>{`${pageInfo?.product} Pricing`}</h1>
                <div className='flex flex-col w-full gap-6'>
                    <PlanToggle tabtype={tabtype} setTabtype={setTabtype} hasYearly={hasYearly} />
                    <PricingPlans />
                    <DialPlan />
                    {/* <ComparePlans pricingData={pricingData} pageInfo={pageInfo} tabtype={tabtype} /> */}
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
