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
        return plansForTab.map((plan) => simplifiedPlanToCard(plan, tabtype, symbol, pageData));
    }, [pricingData, tabtype, symbol, pageData]);

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

function formatPrice(symbol, amount) {
    if (amount === 0) return 'Free';
    return `${symbol}${amount.toLocaleString('en-US')}`;
}

function calculateDiscountedAmount(numAmount, discount) {
    const typeId = discount.type_id;
    const discountValue = Number(discount.value);

    if (typeId === 1) {
        return Math.max(0, numAmount - discountValue);
    }

    if (typeId === 2) {
        return discountValue >= 100 ? 0 : Math.max(0, numAmount * (1 - discountValue / 100));
    }

    return numAmount;
}

function getDiscountLabel(discount, symbol) {
    const typeId = discount.type_id;
    const discountValue = Number(discount.value);
    const discountDuration = discount.duration ?? 0;
    const monthText = `month${discountDuration !== 1 ? 's' : ''}`;

    if (typeId === 1) {
        return `${symbol}${discountValue.toLocaleString('en-US')} for ${discountDuration} ${monthText}`;
    }

    if (typeId === 2) {
        const percentage = discountValue >= 100 ? 100 : discountValue;
        return `${percentage}% off for ${discountDuration} ${monthText}`;
    }

    return null;
}

function getDiscountPriceAndLabel(amount, discount, symbol) {
    const numAmount = amount != null && !Number.isNaN(Number(amount)) ? Number(amount) : 0;
    const originalPrice = formatPrice(symbol, numAmount);

    if (!discount || discount.value == null || numAmount <= 0) {
        return { originalPrice, price: originalPrice, discountLabel: null, hasDiscount: false };
    }

    const finalAmount = calculateDiscountedAmount(numAmount, discount);
    const discountLabel = getDiscountLabel(discount, symbol);

    if (!discountLabel) {
        return { originalPrice, price: originalPrice, discountLabel: null, hasDiscount: false };
    }

    return {
        originalPrice: numAmount === 0 ? null : originalPrice,
        price: formatPrice(symbol, finalAmount),
        discountLabel,
        hasDiscount: true,
    };
}

function formatServiceDisplayText(service) {
    const serviceAmount = service?.amount;
    const serviceName = service?.service_name;
    const isUnlimited = serviceAmount === -1 || serviceAmount === '-1';
    return isUnlimited ? `Unlimited ${serviceName}` : `${Number(serviceAmount)} ${serviceName}/month`;
}

function transformIncludedServices(plan) {
    return (plan?.included ?? []).map((service) => {
        const dialPlan = service?.dial_plan;
        const serviceName = service?.service_name;
        return {
            displayText: formatServiceDisplayText(service),
            hasDialPlan: Boolean(dialPlan?.data?.length > 0),
            service_name: serviceName,
        };
    });
}

function transformExtraServices(plan, symbol) {
    const servicesList = plan?.extras?.servicesList;
    const postpaidAllowed = plan?.extras?.postpaidAllowed;

    return (
        servicesList
            ?.filter((service) => {
                const freeCredits = service?.free_credits;
                return freeCredits !== -1 && freeCredits !== '-1';
            })
            ?.map((service) => {
                const followUpRate = service?.follow_up_rate;
                const serviceName = service?.servicename;
                const showRate = followUpRate && postpaidAllowed;
                return showRate
                    ? { label: `${symbol}${followUpRate}/${serviceName}/month`, isNoExtra: false }
                    : { label: `No extra ${serviceName}`, isNoExtra: true };
            }) ?? []
    );
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

function simplifiedPlanToCard(plan, tabtype, symbol, plansPageData) {
    const isMonthly = tabtype === 'Monthly';
    const planAmount = plan?.amount;
    const amount = isMonthly ? planAmount?.monthly : planAmount?.yearly;
    const period = isMonthly ? 'Monthly' : 'Yearly';

    const included = transformIncludedServices(plan);
    const extra = transformExtraServices(plan, symbol);
    const features = transformFeatures(plan);
    const title = getPlanTitle(plan);
    const hasDialPlan =
        plan?.included?.some((item) => {
            const dialPlan = item?.dial_plan;
            return dialPlan?.data?.length > 0;
        }) ?? false;

    const { originalPrice, price, discountLabel, hasDiscount } = getDiscountPriceAndLabel(
        amount,
        plan?.discount,
        symbol
    );

    return {
        slug: plan?.slug,
        title,
        price,
        originalPrice: hasDiscount ? originalPrice : null,
        discountLabel: hasDiscount ? discountLabel : null,
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
