import { useState, useRef, useCallback, useMemo } from 'react';
import ConnectWithTeam from '../ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/pricing/getCurrencySymbol';
import DialPlan from '../DialPlan';
import ComparePlans from '../ComparePlans';
import CalculatePricingModal from './CalculatePricingModal';
import PricingCards from './PricingCards';

export default function PricingSubscription({ pageData, pricingData, pageInfo }) {
    const { symbol, currency, locale } = GetCurrencySymbol(pageInfo?.country);
    const [tabtype, setTabtype] = useState('Monthly');
    const [selectedPlanSlug, setSelectedPlanSlug] = useState(null);
    const [selectedServiceName, setSelectedServiceName] = useState(null);
    const [showDialPlan, setShowDialPlan] = useState(false);
    const dialPlanRef = useRef(null);
    const calculateModalRef = useRef(null);

    const onViewRateCard = useCallback((planName, serviceName) => {
        setSelectedPlanSlug(planName);
        setSelectedServiceName(serviceName || null);
        setShowDialPlan(true);

        setTimeout(() => {
            dialPlanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    }, []);

    // Normalize pricingData from handlePlanStructure shape to DialPlan-compatible shape
    const dialPlanData = Array.isArray(pricingData)
        ? pricingData.map((plan) => ({
              ...plan,
              slug: plan?.name,
              services: (plan?.services ?? []).map((s) => ({
                  ...s,
                  serviceName: s?.name,
              })),
          }))
        : [];

    const onOpenCalculateModal = useCallback(() => {
        calculateModalRef.current?.showModal();
    }, []);

    const onCloseCalculateModal = useCallback(() => {
        calculateModalRef.current?.close();
    }, []);

    const hasCalculableServices = useMemo(() => {
        if (!Array.isArray(pricingData)) return false;
        return pricingData
            .filter((p) => p?.type === tabtype)
            .some((plan) =>
                (plan?.services ?? []).some((s) => {
                    const hasDialPlan = s?.dialPlan != null && s.dialPlan?.data?.length > 0;
                    return !hasDialPlan;
                })
            );
    }, [pricingData, tabtype]);

    return (
        <>
            <div className='flex flex-col gap-4 w-full overflow-hidden'>
                <h1 className='text-2xl md:text-3xl font-bold capitalize '>{pageData?.heading}</h1>
                <div className='flex flex-col w-full gap-6'>
                    <PricingCards
                        pricingData={pricingData}
                        symbol={symbol}
                        currency={currency}
                        locale={locale}
                        onViewRateCard={onViewRateCard}
                        onCalculateClick={hasCalculableServices ? onOpenCalculateModal : undefined}
                        tabtype={tabtype}
                        setTabtype={setTabtype}
                    />
                    {showDialPlan && (
                        <div ref={dialPlanRef}>
                            <DialPlan
                                pricingData={dialPlanData}
                                selectedServiceName={selectedServiceName}
                                pageData={pageData?.dialPlan}
                            />
                        </div>
                    )}
                    <ComparePlans
                        pricingData={pricingData}
                        symbol={symbol}
                        locale={locale}
                        tabtype={tabtype}
                        pageData={pageData?.comparePlans}
                    />
                    {pageData?.connectComp && (
                        <ConnectWithTeam
                            product={pageInfo?.product}
                            href={pageInfo?.product}
                            pageData={pageData?.connectComp}
                            isPlan={true}
                        />
                    )}
                    <FaqsComp data={pageData?.faqComp} notCont={true} />
                </div>
            </div>

            <dialog ref={calculateModalRef} className='modal'>
                <CalculatePricingModal
                    plans={pricingData}
                    symbol={symbol}
                    tabtype={tabtype}
                    currency={currency}
                    locale={locale}
                    onClose={onCloseCalculateModal}
                />
            </dialog>
        </>
    );
}
