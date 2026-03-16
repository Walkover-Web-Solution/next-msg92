import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ConnectWithTeam from '../ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/pricing/getCurrencySymbol';
import DialPlan from '../DialPlan';
import ComparePlans from '../ComparePlans';
import CalculatePricingModal from './CalculatePricingModal';
import PricingCards, { FEATURED_PLAN_MAP } from './PricingCards';

export default function PricingSubscription({ pageData, pricingData, pageInfo }) {
    const { symbol, currency, locale } = GetCurrencySymbol(pageInfo?.country);
    const [tabtype, setTabtype] = useState('Monthly');
    const [selectedServiceName, setSelectedServiceName] = useState(() => {
        const featuredPlanName = FEATURED_PLAN_MAP[pageInfo?.product] ?? null;
        if (!featuredPlanName || !Array.isArray(pricingData)) return null;
        const featuredPlan = pricingData.find(
            (p) => p?.name?.toLowerCase() === featuredPlanName.toLowerCase() && p?.type === 'Monthly'
        );
        if (!featuredPlan) return null;
        const firstDialPlanService = (featuredPlan?.services ?? []).find(
            (s) => s?.dialPlan != null && s.dialPlan?.data?.length > 0
        );
        if (!firstDialPlanService) return null;
        return { serviceName: firstDialPlanService.name, planName: featuredPlan.name };
    });
    const [showDialPlan, setShowDialPlan] = useState(true);
    const dialPlanRef = useRef(null);
    const calculateModalRef = useRef(null);
    const pricingWrapperRef = useRef(null);

    const onTabChange = useCallback((tab) => {
        setTabtype(tab);
        if (!pricingWrapperRef.current) return;
        const wrapper = pricingWrapperRef.current;

        // Toggle tabpanel visibility
        wrapper.querySelectorAll('[data-tabpanel]').forEach((el) => {
            el.classList.toggle('hidden', el.dataset.tabpanel !== tab);
        });

        // Toggle active tab button styles
        wrapper.querySelectorAll('[data-tab-btn]').forEach((btn) => {
            const isActive = btn.dataset.tabBtn === tab;
            btn.classList.toggle('bg-indigo-600', isActive);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('text-indigo-600', !isActive);
            btn.classList.toggle('hover:bg-indigo-50', !isActive);
        });
    }, []);

    // Set initial active styles on tab buttons after mount
    useEffect(() => {
        if (!pricingWrapperRef.current) return;
        pricingWrapperRef.current.querySelectorAll('[data-tab-btn]').forEach((btn) => {
            const isActive = btn.dataset.tabBtn === 'Monthly';
            btn.classList.toggle('bg-indigo-600', isActive);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('text-indigo-600', !isActive);
            btn.classList.toggle('hover:bg-indigo-50', !isActive);
        });
    }, []);

    const onViewRateCard = useCallback((selection) => {
        setSelectedServiceName(selection || null);
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
            <div className='flex flex-col gap-6 w-full overflow-hidden' ref={pricingWrapperRef}>
                <PricingCards
                    pricingData={pricingData}
                    symbol={symbol}
                    currency={currency}
                    locale={locale}
                    onViewRateCard={onViewRateCard}
                    onCalculateClick={hasCalculableServices ? onOpenCalculateModal : undefined}
                    onTabChange={onTabChange}
                    pageInfo={pageInfo}
                    heading={pageData?.heading}
                />
                <ComparePlans
                    pricingData={pricingData}
                    symbol={symbol}
                    locale={locale}
                    pageData={pageData?.comparePlans}
                />
                {showDialPlan && (
                    <div ref={dialPlanRef}>
                        <DialPlan
                            pricingData={dialPlanData}
                            selectedServiceName={
                                typeof selectedServiceName === 'object'
                                    ? selectedServiceName?.serviceName
                                    : selectedServiceName
                            }
                            selectedPlanName={
                                typeof selectedServiceName === 'object' ? selectedServiceName?.planName : null
                            }
                            pageData={pageData?.dialPlan}
                            symbol={symbol}
                        />
                    </div>
                )}
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
