import { useRef, useMemo, useEffect } from 'react';
import PricingPlanCard from './PricingPlanCard';

export default function PricingPlans({
    pricingData,
    tabtype,
    symbol,
    setScrollApi,
    selectedPlanSlug,
    onSelectPlan,
    onViewCallingRates,
    onCalculateClick,
    pageData,
    product,
}) {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -752, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 752, behavior: 'smooth' });
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
        if (!Array.isArray(pricingData) || pricingData.length === 0) return [];
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
                    {cards.map((card, index) => (
                        <PricingPlanCard
                            key={card.title ?? card.slug ?? `card-${index}`}
                            planData={card}
                            isSelected={card.slug === selectedPlanSlug}
                            onSelect={() => onSelectPlan?.(card.title)}
                            onViewCallingRates={onViewCallingRates}
                            product={product}
                        />
                    ))}
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

/**
 * Computes final price and discount label from plan amount and discount.
 * type_id 1 = fixed amount off, type_id 2 = percentage off.
 * Returns { originalPrice, price, discountLabel, hasDiscount } (price strings for display).
 */
function getDiscountPriceAndLabel(amount, discount, symbol) {
    const numAmount = amount != null && !Number.isNaN(Number(amount)) ? Number(amount) : 0;
    const originalPrice = numAmount === 0 ? 'Free' : `${symbol}${numAmount.toLocaleString('en-US')}`;

    if (!discount || discount.value == null || numAmount <= 0) {
        return { originalPrice, price: originalPrice, discountLabel: null, hasDiscount: false };
    }

    const typeId = discount.type_id;
    const value = Number(discount.value);
    const duration = discount.duration ?? 0;

    let finalAmount;
    let discountLabel;

    if (typeId === 1) {
        // Fixed amount off
        finalAmount = Math.max(0, numAmount - value);
        discountLabel = `${symbol}${value.toLocaleString('en-US')} for ${duration} month${duration !== 1 ? 's' : ''}`;
    } else if (typeId === 2) {
        // Percentage off
        if (value >= 100) {
            finalAmount = 0;
            discountLabel = `100% off for ${duration} month${duration !== 1 ? 's' : ''}`;
        } else {
            finalAmount = Math.max(0, numAmount * (1 - value / 100));
            discountLabel = `${value}% off for ${duration} month${duration !== 1 ? 's' : ''}`;
        }
    } else {
        return { originalPrice, price: originalPrice, discountLabel: null, hasDiscount: false };
    }

    const isFree = finalAmount <= 0;
    const price = isFree ? 'Free' : `${symbol}${finalAmount.toLocaleString('en-US')}`;
    return {
        originalPrice: numAmount === 0 ? null : originalPrice,
        price,
        discountLabel,
        hasDiscount: true,
    };
}

function simplifiedPlanToCard(plan, tabtype, symbol, plansPageData) {
    const isMonthly = tabtype === 'Monthly';
    const amount = isMonthly ? plan?.amount?.monthly : plan?.amount?.yearly;
    const period = isMonthly ? 'Monthly' : 'Yearly';

    const included =
        plan?.included?.map((service) => {
            const isUnlimited = service?.amount === -1 || service?.amount === '-1';
            const displayText = isUnlimited
                ? `Unlimited ${service?.service_name}`
                : `${Number(service?.amount)} ${service?.service_name}/month`;
            const hasDialPlan = Boolean(service?.dial_plan?.data?.length > 0);
            return { displayText, hasDialPlan, service_name: service?.service_name };
        }) ?? [];

    const extra =
        plan?.extras?.servicesList
            ?.filter((service) => service?.free_credits !== -1 && service?.free_credits !== '-1')
            ?.map((service) => {
                const rate = service?.follow_up_rate;
                const name = service?.servicename;
                const showRate = rate && plan?.extras?.postpaidAllowed;
                return showRate
                    ? { label: `${symbol}${rate}/${name}/month`, isNoExtra: false }
                    : { label: `No extra ${name}`, isNoExtra: true };
            }) ?? [];

    const features =
        plan?.plan_features
            ?.filter((feature) => feature.is_visible)
            .map((feature) => ({ name: feature.name, is_included: feature.is_included })) ?? [];

    const title =
        plan?.name ?? (plan?.slug ? String(plan.slug).charAt(0).toUpperCase() + String(plan.slug).slice(1) : 'Plan');

    const hasDialPlan = plan?.included?.some((item) => item?.dial_plan?.data?.length > 0) ?? false;

    const { originalPrice, price, discountLabel, hasDiscount } = getDiscountPriceAndLabel(
        amount,
        plan?.discount,
        symbol
    );

    const planCard = {
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

    return planCard;
}
