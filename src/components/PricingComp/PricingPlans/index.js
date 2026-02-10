import { useRef, useMemo, useEffect } from 'react';
import PricingPlanCard from './PricingPlanCard';

const SCROLL_DISTANCE = 752;
const EMPTY_ARRAY = [];

export default function PricingPlans({
    pricingData,
    tabtype,
    symbol,
    setScrollApi,
    onViewCallingRates,
    onCalculateClick,
    pageData,
    product,
}) {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
    };

    useEffect(() => {
        if (setScrollApi) {
            setScrollApi({
                scrollLeft,
                scrollRight,
            });
        }
    }, [setScrollApi]);

    const cards = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) return EMPTY_ARRAY;
        const hasAmountForTab = (plan) =>
            tabtype === 'Monthly' ? plan?.amount?.monthly != null : plan?.amount?.yearly != null;
        const plansForTab = pricingData.filter(hasAmountForTab);
        return plansForTab.map((plan) => simplifiedPlanToCard(plan, tabtype, pageData));
    }, [pricingData, tabtype, pageData]);

    const hasFeatures = useMemo(
        () =>
            Array.isArray(pricingData) &&
            pricingData.some(
                (plan) => (plan?.plan_features?.filter((feature) => feature?.is_visible)?.length ?? 0) > 0
            ),
        [pricingData]
    );

    if (cards.length === 0) return null;

    return (
        <section className='w-full py-4'>
            <div className='mx-auto max-w-7xl'>
                <div ref={scrollRef} className='flex gap-6 overflow-x-auto pb-4 scroll-smooth w-full'>
                    {cards.map((card, index) => {
                        const cardKey = card.slug ?? card.title ?? `card-${index}`;
                        return (
                            <PricingPlanCard
                                key={cardKey}
                                planData={card}
                                onViewCallingRates={onViewCallingRates}
                                product={product}
                            />
                        );
                    })}
                </div>
            </div>
            <div className='mt-6 flex items-center justify-between text-sm'>
                <button
                    type='button'
                    onClick={() => onCalculateClick?.()}
                    className='text-blue-600 font-medium hover:underline'
                >
                    {pageData?.calculatePricingText}
                </button>
                {hasFeatures && (
                    <button
                        type='button'
                        onClick={() => document.getElementById('compare-plans')?.scrollIntoView({ behavior: 'smooth' })}
                        className='text-blue-600 font-medium hover:underline'
                    >
                        {pageData?.compareAllFeaturesText}
                    </button>
                )}
            </div>
        </section>
    );
}

function formatServiceDisplayText(serviceName, included) {
    const isUnlimited = included === -1 || included === '-1';
    return isUnlimited ? `Unlimited ${serviceName}` : `${Number(included)} ${serviceName}/month`;
}

function transformIncludedServices(plan) {
    return (plan?.services ?? []).map((service) => {
        const dialPlan = service?.dialplan;
        const serviceName = service?.serviceName;
        return {
            displayText: formatServiceDisplayText(serviceName, service.included),
            hasDialPlan: Boolean(dialPlan?.data?.length > 0),
            service_name: serviceName,
        };
    });
}

function transformExtraServices(plan) {
    const postpaidAllowed = plan?.postpaidAllowed;

    return (plan?.services ?? [])
        .filter((service) => {
            const freeCredits = service?.included;
            const hasDialPlan = service?.dialplan != null;
            return !hasDialPlan && freeCredits !== -1 && freeCredits !== '-1';
        })
        .map((service) => {
            const followUpRate = service?.extra;
            const serviceName = service?.serviceName;
            const showRate = followUpRate && postpaidAllowed;
            return showRate
                ? { label: `${followUpRate}/${serviceName}/month`, isNoExtra: false }
                : { label: `No extra ${serviceName}`, isNoExtra: true };
        });
}

function transformFeatures(plan) {
    const planFeatures = plan?.plan_features;
    if (!planFeatures) return [];

    return planFeatures
        .filter((feature) => {
            const isVisible = feature.is_visible;
            return isVisible;
        })
        .map((feature) => {
            const featureName = feature.name;
            const isIncluded = feature.is_included;
            return { name: featureName, is_included: isIncluded };
        });
}

function getPlanTitle(plan) {
    if (plan?.name) return plan.name;
    if (plan?.slug) {
        return String(plan.slug).charAt(0).toUpperCase() + String(plan.slug).slice(1);
    }
    return 'Plan';
}

function simplifiedPlanToCard(plan, tabtype, plansPageData) {
    const isMonthly = tabtype === 'Monthly';
    const period = isMonthly ? 'Monthly' : 'Yearly';

    // Get pre-computed pricing for the selected tab
    const pricing = isMonthly ? plan?.pricing?.monthly : plan?.pricing?.yearly;

    const included = transformIncludedServices(plan);
    const extra = transformExtraServices(plan);
    const features = transformFeatures(plan);
    const title = getPlanTitle(plan);
    const hasDialPlan =
        plan?.services?.some((service) => {
            const dialPlan = service?.dialplan;
            return dialPlan?.data?.length > 0;
        }) ?? false;

    return {
        slug: plan?.slug,
        title,
        price: pricing?.price ?? 'Free',
        originalPrice: pricing?.originalPrice ?? null,
        discountLabel: pricing?.discountLabel ?? null,
        period,
        ctaText: plansPageData?.ctaText,
        showLink: true,
        linkText: plansPageData?.viewCallingRatesText,
        hasDialPlan,
        included,
        features,
        extra,
    };
}
