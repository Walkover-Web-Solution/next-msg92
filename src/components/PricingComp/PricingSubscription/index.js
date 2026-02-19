import { useState, useRef, useCallback } from 'react';
import ConnectWithTeam from '../ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/pricing/getCurrencySymbol';
import PricingPlans from '../PricingPlans';
import DialPlan from '../DialPlan';
import ComparePlans from '../ComparePlans';
import CalculatePricingModal from './CalculatePricingModal';

export default function PricingSubscription({ pageData, pricingData, pageInfo }) {
    const { symbol, currency, locale } = GetCurrencySymbol(pageInfo?.country);
    const [tabtype, setTabtype] = useState('Monthly');
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

    return (
        <>
            <div className='flex flex-col gap-4 w-full overflow-hidden'>
                <h1 className='text-2xl md:text-3xl font-bold capitalize '>{pageData?.heading}</h1>
                <div className='flex flex-col w-full gap-6'>
                    <PricingPlans
                        pricingData={pricingData}
                        tabtype={tabtype}
                        setTabtype={setTabtype}
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
                    locale={locale}
                    onClose={onCloseCalculateModal}
                />
            </dialog>
        </>
    );
}
