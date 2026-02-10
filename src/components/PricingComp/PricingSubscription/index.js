import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ConnectWithTeam from '../ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/pricing/getCurrencySymbol';
import PlanToggle from '../PlanToggle';
import PricingPlans from '../PricingPlans';
import DialPlan from '../DialPlan';
import ComparePlans from '../ComparePlans';
import CalculatePricingModal from './CalculatePricingModal';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const MIN_PLANS_FOR_SCROLL = 3;

function checkHasYearlyPlans(pricingData) {
    if (!Array.isArray(pricingData)) return false;
    return pricingData.some((plan) => plan?.amount?.yearly != null);
}

function getPlansCountForTab(pricingData, tabtype) {
    if (!Array.isArray(pricingData)) return 0;
    const hasAmountForTab = (plan) =>
        tabtype === 'Monthly' ? plan?.amount?.monthly != null : plan?.amount?.yearly != null;
    return pricingData.filter(hasAmountForTab).length;
}

export default function PricingSubscription({ pageData, pricingData, pageInfo }) {
    const { symbol, currency } = GetCurrencySymbol(pageInfo?.country);
    const [tabtype, setTabtype] = useState('Monthly');
    const [hasYearly, setHasYearly] = useState(false);
    const [scrollApi, setScrollApi] = useState();
    const [selectedPlanSlug, setSelectedPlanSlug] = useState(null);
    const [selectedServiceName, setSelectedServiceName] = useState(null);
    const [showDialPlan, setShowDialPlan] = useState(false);
    const dialPlanRef = useRef(null);
    const calculateModalRef = useRef(null);

    const onViewCallingRates = useCallback((slug, serviceName) => {
        setSelectedPlanSlug(slug);
        setSelectedServiceName(serviceName || null);
        setShowDialPlan(true);

        // Scroll after state update
        setTimeout(() => {
            dialPlanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    }, []);

    const onOpenCalculateModal = useCallback(() => {
        calculateModalRef.current?.showModal();
    }, []);

    const onCloseCalculateModal = useCallback(() => {
        calculateModalRef.current?.close();
    }, []);

    useEffect(() => {
        const hasYearlyPlans = checkHasYearlyPlans(pricingData);
        setHasYearly(hasYearlyPlans);
    }, [pricingData]);

    const plansCountForTab = useMemo(() => {
        return getPlansCountForTab(pricingData, tabtype);
    }, [pricingData, tabtype]);

    const showScrollArrows = scrollApi && plansCountForTab > MIN_PLANS_FOR_SCROLL;

    return (
        <>
            <div className='flex flex-col gap-4 w-full'>
                <h1 className='text-2xl md:text-3xl font-bold capitalize '>{pageData?.heading}</h1>
                <div className='flex flex-col w-full gap-6'>
                    <div className='flex items-center justify-between gap-4'>
                        <PlanToggle tabtype={tabtype} setTabtype={setTabtype} hasYearly={hasYearly} />
                        {showScrollArrows && (
                            <div className='flex items-center gap-2'>
                                <button
                                    type='button'
                                    onClick={() => scrollApi.scrollLeft()}
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
                                    aria-label='Scroll left to view previous pricing plans'
                                >
                                    <MdChevronLeft aria-hidden='true' />
                                </button>

                                <button
                                    type='button'
                                    onClick={() => scrollApi.scrollRight()}
                                    className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
                                    aria-label='Scroll right to view more pricing plans'
                                >
                                    <MdChevronRight aria-hidden='true' />
                                </button>
                            </div>
                        )}
                    </div>

                    <PricingPlans
                        pricingData={pricingData}
                        tabtype={tabtype}
                        symbol={symbol}
                        setScrollApi={setScrollApi}
                        onViewCallingRates={onViewCallingRates}
                        onCalculateClick={onOpenCalculateModal}
                        pageData={pageData?.pricingPlans}
                        product={pageInfo?.product}
                    />
                    {showDialPlan && (
                        <div ref={dialPlanRef}>
                            <DialPlan
                                pricingData={pricingData}
                                selectedPlanSlug={selectedPlanSlug}
                                selectedServiceName={selectedServiceName}
                                pageData={pageData?.dialPlan}
                            />
                        </div>
                    )}
                    <ComparePlans
                        pricingData={pricingData}
                        symbol={symbol}
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
                    onClose={onCloseCalculateModal}
                />
            </dialog>
        </>
    );
}
