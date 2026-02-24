import { useRef, useMemo, useEffect, useCallback, useState } from 'react';
import { MdCheck, MdChevronLeft, MdChevronRight, MdClose } from 'react-icons/md';
import { SCROLL_DISTANCE, EMPTY_ARRAY, MIN_PLANS_FOR_SCROLL } from '../constants';
import { checkHasYearlyPlans, getPlansCountForTab } from '../PricingSubscription/utils/helpers';
import getURL from '@/utils/getURL';
import { formatServiceDisplayText } from './utils/transformers';

export default function PricingPlans({
    pricingData,
    tabtype,
    setTabtype,
    symbol,
    setScrollApi,
    onViewCallingRates,
    onCalculateClick,
    pageData,
    product,
}) {
    const scrollRef = useRef(null);
    const [scrollApi, setScrollApiInternal] = useState(null);
    const [hasYearly, setHasYearly] = useState(false);

    const scrollLeft = useCallback(() => {
        scrollRef.current?.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
    }, []);

    const scrollRight = useCallback(() => {
        scrollRef.current?.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
    }, []);

    // Check if pricing data has yearly plans
    useEffect(() => {
        const hasYearlyPlans = checkHasYearlyPlans(pricingData);
        setHasYearly(hasYearlyPlans);
    }, [pricingData]);

    // Calculate plans count for current tab
    const plansCountForTab = useMemo(() => {
        return getPlansCountForTab(pricingData, tabtype);
    }, [pricingData, tabtype]);

    // Determine if scroll arrows should be shown
    const showScrollArrows = scrollApi && plansCountForTab > MIN_PLANS_FOR_SCROLL;

    useEffect(() => {
        const api = {
            scrollLeft,
            scrollRight,
        };
        setScrollApiInternal(api);

        // Also expose to parent if needed
        if (setScrollApi) {
            setScrollApi(api);
        }
    }, [setScrollApi, scrollLeft, scrollRight]);

    const plans = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) return EMPTY_ARRAY;
        const hasAmountForTab = (plan) =>
            tabtype === 'Monthly' ? plan?.amount?.monthly != null : plan?.amount?.yearly != null;
        return pricingData.filter(hasAmountForTab);
    }, [pricingData, tabtype]);

    const hasFeatures = useMemo(
        () =>
            Array.isArray(pricingData) &&
            pricingData.some(
                (plan) => (plan?.plan_features?.filter((feature) => feature?.is_visible)?.length ?? 0) > 0
            ),
        [pricingData]
    );

    const shouldShowCalculateButton = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) return false;

        // Check if all services across all plans have dialplan
        const allServicesHaveDialPlan = pricingData.every((plan) => {
            const services = plan?.services ?? [];
            if (services.length === 0) return true; // No services means no calculation needed
            return services.every((service) => {
                const dialPlan = service?.dialplan;
                return dialPlan != null && dialPlan?.data?.length > 0;
            });
        });

        // If all services have dialplan, no need for calculate button
        if (allServicesHaveDialPlan) return false;

        // Check if any plan has extra services (services without dialplan and not unlimited)
        const hasAnyExtraServices = pricingData.some((plan) => {
            const services = plan?.services ?? [];
            return services.some((service) => {
                const freeCredits = service?.included;
                const hasDialPlan = service?.dialplan != null && service?.dialplan?.data?.length > 0;
                // Service is calculable if it doesn't have dialplan and is not unlimited
                return !hasDialPlan && freeCredits !== -1 && freeCredits !== '-1';
            });
        });

        return hasAnyExtraServices;
    }, [pricingData]);

    if (plans.length === 0) return null;

    return (
        <section className='w-full py-4'>
            <div className='flex items-center justify-between gap-4 mb-4'>
                <div>
                    <PlanToggle tabtype={tabtype} setTabtype={setTabtype} hasYearly={hasYearly} />
                </div>
                {showScrollArrows && (
                    <div className='flex items-center gap-2'>
                        <button
                            type='button'
                            onClick={scrollLeft}
                            className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
                            aria-label='Scroll left to view previous pricing plans'
                        >
                            <MdChevronLeft aria-hidden='true' />
                        </button>

                        <button
                            type='button'
                            onClick={scrollRight}
                            className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
                            aria-label='Scroll right to view more pricing plans'
                        >
                            <MdChevronRight aria-hidden='true' />
                        </button>
                    </div>
                )}
            </div>
            <div className='w-full overflow-hidden'>
                <div ref={scrollRef} className='overflow-x-auto scroll-smooth '>
                    <div className='flex gap-6 pb-4 w-fit'>
                        {plans.map((plan, index) => {
                            const planKey = plan.slug ?? plan.name ?? `plan-${index}`;
                            return (
                                <PlanCard
                                    key={planKey}
                                    plan={plan}
                                    tabtype={tabtype}
                                    symbol={symbol}
                                    pageData={pageData}
                                    onViewCallingRates={onViewCallingRates}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            {(shouldShowCalculateButton || hasFeatures) && (
                <div className='mt-6 flex items-center justify-between text-sm'>
                    {shouldShowCalculateButton && (
                        <button type='button' onClick={() => onCalculateClick?.()} className='text-link active-link'>
                            {pageData?.calculatePricingText}
                        </button>
                    )}
                    {hasFeatures && (
                        <button
                            type='button'
                            onClick={() =>
                                document.getElementById('compare-plans')?.scrollIntoView({ behavior: 'smooth' })
                            }
                            className='text-link active-link'
                        >
                            {pageData?.compareAllFeaturesText}
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}

function PlanToggle({ tabtype, setTabtype, hasYearly }) {
    const PLAN_TYPES = {
        MONTHLY: 'Monthly',
        YEARLY: 'Yearly',
    };
    if (!hasYearly) return null;

    const isMonthly = tabtype === PLAN_TYPES.MONTHLY;
    const isYearly = tabtype === PLAN_TYPES.YEARLY;

    const getButtonClassName = (isActive) => {
        const baseClasses = 'px-4 py-2 text-sm font-medium rounded transition';
        const activeClass = isActive ? 'bg-secondary' : '';
        return `${baseClasses} ${activeClass}`;
    };

    return (
        <div className='inline-flex w-fit rounded bg-white p-1'>
            <button
                type='button'
                onClick={() => setTabtype(PLAN_TYPES.MONTHLY)}
                className={getButtonClassName(isMonthly)}
                aria-pressed={isMonthly}
            >
                {PLAN_TYPES.MONTHLY}
            </button>
            <button
                type='button'
                onClick={() => setTabtype(PLAN_TYPES.YEARLY)}
                className={getButtonClassName(isYearly)}
                aria-pressed={isYearly}
            >
                {PLAN_TYPES.YEARLY}
            </button>
        </div>
    );
}

function PlanCard({ plan, tabtype, symbol, pageData, onViewCallingRates, product }) {
    // Extract pricing based on tab type
    const isMonthly = tabtype === 'Monthly';
    const pricing = isMonthly ? plan?.pricing?.monthly : plan?.pricing?.yearly;
    const price = pricing?.price ?? 'Free';
    const originalPrice = pricing?.originalPrice ?? null;
    const discountLabel = pricing?.discountLabel ?? null;
    const period = isMonthly ? 'Monthly' : 'Yearly';

    // Get plan title
    const title =
        plan?.name || (plan?.slug ? String(plan.slug).charAt(0).toUpperCase() + String(plan.slug).slice(1) : 'Plan');

    // Get visible features (limit to 5)
    const visibleFeatures = plan?.plan_features?.filter((f) => f?.is_visible)?.slice(0, 5) ?? [];

    // Get services for included section
    const services = plan?.services ?? [];

    function renderIncludedItem(service, index, symbol) {
        const serviceName = service?.serviceName;
        const included = service?.included;
        const hasDialPlan = service?.dialplan?.data?.length > 0;

        // Determine display text based on scenario
        let displayText;
        let secondaryText;
        if (included === -1 || included === '-1') {
            displayText = `Unlimited ${serviceName}`;
        } else if (included === 0 && hasDialPlan) {
            displayText = `${serviceName}`;
            secondaryText = '(Usage Based Pricing)';
        } else if (included != 0 && hasDialPlan) {
            displayText = `${symbol}${Number(included)} ${serviceName} Credits`;
        } else {
            displayText = `${Number(included)} ${serviceName}/month`;
        }
        return (
            <div key={index} className='flex flex-nowrap items-center gap-2 text-sm'>
                <span className='text-gray-600 truncate shrink-0'>
                    {displayText} {secondaryText && <span className='text-xs text-gray-500'>{secondaryText}</span>}
                </span>

                {hasDialPlan && (
                    <button
                        type='button'
                        onClick={() => {
                            if (onViewCallingRates) onViewCallingRates(plan?.slug, serviceName);
                        }}
                        className='text-link active-link text-xs font-medium'
                    >
                        {pageData?.viewCallingRatesText}
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className='min-w-[360px] max-w-[360px] rounded border border-gray-200 min-h-full bg-white px-6 py-6 sm:px-7 sm:py-7'>
            <h3 className=' text-2xl font-semibold'>{title}</h3>

            <div className='flex flex-col gap-0.5'>
                <div className='flex items-center gap-1 flex-wrap'>
                    {originalPrice != null && (
                        <span className='text-xl font-medium text-gray-500 line-through'>{originalPrice}</span>
                    )}
                    <span className='text-2xl font-semibold text-green-700'>{price}</span>
                    {price !== 'Free' && <span className='text-md text-gray-500 mt-1'>{period}</span>}
                </div>
                <span className='text-sm text-gray-600 min-h-[20px] block'>{discountLabel ?? '\u00A0'}</span>
            </div>

            <div className='py-2'>
                <a
                    href={getURL('signup', product)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full btn btn-primary btn-sm btn-outline text-center'
                >
                    {pageData?.ctaText}
                </a>
            </div>

            {services.length > 0 && (
                <div className='my-2'>
                    <h4 className='mb-1 text-sm font-semibold text-gray-900'>Included</h4>
                    <div className='flex flex-col'>
                        {services.map((service, index) => renderIncludedItem(service, index, symbol))}
                    </div>
                </div>
            )}

            {visibleFeatures.length > 0 && (
                <div className='my-2'>
                    <h4 className='mb-1 text-sm font-semibold text-gray-900'>Features</h4>
                    <div className=''>
                        {visibleFeatures.map((feature, index) => {
                            const featureName = feature?.name ?? '';
                            const isIncluded = feature?.is_included;

                            return (
                                <div key={index} className='flex items-center gap-2 text-sm text-gray-600'>
                                    {isIncluded === 0 || isIncluded === false ? (
                                        <MdClose className='shrink-0 text-red-500' />
                                    ) : (
                                        <MdCheck className='shrink-0 text-green-600' />
                                    )}
                                    <span>{featureName}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {(() => {
                // Calculate extra services (services without dial plan and not unlimited)
                const extraServices = services.filter((service) => {
                    const freeCredits = service?.included;
                    const hasDialPlan = service?.dialplan != null;
                    return !hasDialPlan && freeCredits !== -1 && freeCredits !== '-1';
                });

                if (extraServices.length === 0) return null;

                const postpaidAllowed = plan?.postpaidAllowed;

                return (
                    <div className='my-2 flex flex-col gap-1'>
                        <h4 className='text-sm font-semibold text-gray-900'>Extra @</h4>
                        <div className=''>
                            {extraServices.map((service, index) => {
                                const followUpRate = service?.extra;
                                const serviceName = service?.serviceName;
                                const showRate = followUpRate && postpaidAllowed;
                                const label = showRate
                                    ? `${symbol}${followUpRate}/${serviceName}/month`
                                    : `No extra ${serviceName}`;
                                const isNoExtra = !showRate;

                                return (
                                    <div key={index} className='flex items-center gap-2 text-sm text-gray-600'>
                                        {isNoExtra ? (
                                            <MdClose className='shrink-0 text-red-500' />
                                        ) : (
                                            <MdCheck className='shrink-0 text-green-600' />
                                        )}
                                        <span>{label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
