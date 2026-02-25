import { useState, useMemo, useRef, useCallback } from 'react';
import { MdArrowDownward, MdCheck, MdChevronLeft, MdChevronRight } from 'react-icons/md';

const PLAN_TITLE_COLORS = ['text-gray-400', 'text-blue-500', 'text-teal-500'];
const FEATURED_INDEX = 2;

const SCROLL_DISTANCE = 360;

export default function PricingCards({
    pricingData,
    symbol,
    locale,
    onViewRateCard,
    onCalculateClick,
    tabtype: tabtypeProp,
    setTabtype: setTabtypeProp,
}) {
    const [localTabtype, setLocalTabtype] = useState('Monthly');
    const tabtype = tabtypeProp ?? localTabtype;
    const setTabtype = setTabtypeProp ?? setLocalTabtype;
    const scrollRef = useRef(null);

    const scrollLeft = useCallback(() => {
        scrollRef.current?.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
    }, []);

    const scrollRight = useCallback(() => {
        scrollRef.current?.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
    }, []);

    const plans = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) return [];
        return pricingData.filter((p) => p?.type === tabtype);
    }, [pricingData, tabtype]);

    const hasYearly = useMemo(
        () =>
            Array.isArray(pricingData) &&
            pricingData.some((p) => p?.type === 'Yearly') &&
            pricingData.some((p) => p?.type === 'Monthly'),
        [pricingData]
    );

    const hasFeatures = useMemo(
        () =>
            Array.isArray(pricingData) &&
            pricingData.some((p) => p?.type === tabtype && (p?.features ?? []).some((f) => f?.included)),
        [pricingData, tabtype]
    );

    if (!plans.length) return null;

    const showArrows = plans.length > 2;

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-between gap-4'>
                {hasYearly ? (
                    <div className='inline-flex w-fit rounded border border-gray-200 bg-white p-1'>
                        {['Monthly', 'Yearly'].map((t) => (
                            <button
                                key={t}
                                type='button'
                                onClick={() => setTabtype(t)}
                                className={`px-4 py-1.5 text-sm font-medium rounded transition ${tabtype === t ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div />
                )}

                {showArrows && (
                    <div className='flex items-center gap-2'>
                        <button
                            type='button'
                            onClick={scrollLeft}
                            aria-label='Scroll left'
                            className='flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition-colors'
                        >
                            <MdChevronLeft size={20} />
                        </button>
                        <button
                            type='button'
                            onClick={scrollRight}
                            aria-label='Scroll right'
                            className='flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition-colors'
                        >
                            <MdChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>

            <div className='w-full overflow-hidden'>
                <div
                    ref={scrollRef}
                    className='flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                >
                    {plans.map((plan, index) => (
                        <PlanCard
                            key={plan?.name ?? index}
                            plan={plan}
                            tabtype={tabtype}
                            symbol={symbol}
                            locale={locale}
                            isFeatured={index === FEATURED_INDEX}
                            colorClass={PLAN_TITLE_COLORS[index] ?? 'text-gray-500'}
                            onViewRateCard={(serviceName) => onViewRateCard?.(serviceName)}
                        />
                    ))}
                </div>
            </div>
            <div className='flex w-full justify-between'>
                {onCalculateClick && (
                    <button
                        type='button'
                        onClick={onCalculateClick}
                        className='text-link active-link text-sm self-start'
                    >
                        Calculate Price
                    </button>
                )}
                {hasFeatures && (
                    <button
                        type='button'
                        onClick={() => document.getElementById('compare-plans')?.scrollIntoView({ behavior: 'smooth' })}
                        className='text-link active-link text-sm self-start flex items-center gap-1'
                    >
                        View all features <MdArrowDownward size={16} />
                    </button>
                )}
            </div>

            <ul className='text-[10px] text-gray-400 flex flex-col gap-0.2 list-disc list-inside'>
                <li>
                    <span>Wallet</span> — amount-based credit deducted per Rate Card; top-up required once exhausted.
                </li>
                <li>
                    <span>Quota</span> — volume-based usage per month; extra rate applies after quota finishes.
                </li>
                <li>
                    <span>Not allowed</span> — extra usage not permitted on this plan; upgrade required.
                </li>
            </ul>
        </div>
    );
}

function getBadgeLabel(service) {
    const name = (service?.name || '').toLowerCase();
    if (name.includes('sms') || name.includes('whatsapp') || name.includes('wallet')) return 'WALLET';
    return 'QUOTA';
}

function formatAmount(amount, symbol, locale) {
    if (!amount || Number(amount) === 0) return 'Free';
    return `${symbol}${Number(amount).toLocaleString(locale || 'en-IN')}`;
}

function getDiscountedAmount(amount, discounts) {
    if (!amount || !discounts || discounts.length === 0) return null;
    const discount = discounts[0];
    const typeId = discount?.discount_type_id ?? discount?.type_id;
    const value = Number(discount?.value ?? 0);
    const numAmount = Number(amount);
    if (typeId === 1) return Math.max(0, numAmount - value);
    if (typeId === 2) return value >= 100 ? 0 : Math.max(0, numAmount * (1 - value / 100));
    return null;
}

function PlanCard({ plan, tabtype, symbol, locale, isFeatured, colorClass, onViewRateCard }) {
    const amount = plan?.amount;
    const discountedAmount = getDiscountedAmount(amount, plan?.discount);
    const displayPrice =
        discountedAmount != null
            ? formatAmount(discountedAmount, symbol, locale)
            : formatAmount(amount, symbol, locale);
    const originalPrice = discountedAmount != null ? formatAmount(amount, symbol, locale) : null;

    const services = plan?.services ?? [];
    const features = plan?.features ?? [];

    const hasDialPlan = (s) => s?.dialPlan != null && s.dialPlan?.data?.length > 0;

    const includedServices = services.filter((s) => s?.freeCredit != null && s?.freeCredit !== 0 && !hasDialPlan(s));

    const dialPlanServicesWithCredit = services.filter(
        (s) => hasDialPlan(s) && s?.freeCredit != null && Number(s?.freeCredit) > 0
    );
    const dialPlanServicesNoCredit = services.filter(
        (s) => hasDialPlan(s) && !(s?.freeCredit != null && Number(s?.freeCredit) > 0)
    );

    const extraServices = services.filter((s) => !hasDialPlan(s));

    const isFree = displayPrice === 'Free';

    const discountLabel = (() => {
        const discount = plan?.discount?.[0];
        if (!discount) return null;
        const typeId = discount?.discount_type_id ?? discount?.type_id;
        const value = Number(discount?.value ?? 0);
        const duration = discount?.duration ?? 0;
        const isStandard = duration === 0;
        const durationText = isStandard ? '' : ` for ${duration} month${duration !== 1 ? 's' : ''}`;
        if (typeId === 1) return `${symbol}${value.toLocaleString(locale || 'en-IN')} off${durationText}`;
        if (typeId === 2) return `${value >= 100 ? 100 : value}% off${durationText}`;
        return null;
    })();

    return (
        <div
            className={`flex flex-col rounded-lg border bg-white ${isFeatured ? 'border-gray-800' : 'border-gray-200'} min-w-[350px] max-w-[500px] p-6 gap-4`}
        >
            {/* Header */}
            <div className='flex flex-col gap-1'>
                <span className={`font-semibold uppercase tracking-widest ${colorClass}`}>{plan?.name || 'Plan'}</span>
                <div className='flex items-end gap-1'>
                    {isFree ? (
                        <span className='text-4xl font-bold text-gray-900'>{symbol}0</span>
                    ) : (
                        <>
                            {originalPrice && (
                                <span className='text-xl font-medium text-gray-400 line-through self-center'>
                                    {originalPrice}
                                </span>
                            )}
                            <span className='text-4xl font-bold text-gray-900'>{displayPrice}</span>
                        </>
                    )}
                    <span className='text-sm text-gray-400 mb-1'>/{tabtype === 'Monthly' ? 'month' : 'year'}</span>
                </div>
                <span className='text-xs text-gray-400 min-h-[16px]'>{discountLabel ?? '\u00A0'}</span>
            </div>

            {/* CTA */}
            <a
                href='#'
                className={` btn-md min-w-full ${isFeatured ? 'btn-primary btn' : 'btn-accent btn-outline btn'}`}
            >
                Get Started
            </a>

            {/* Included */}
            {(includedServices.length > 0 || dialPlanServicesWithCredit.length > 0) && (
                <div className='flex flex-col gap-2'>
                    <span className='text-[10px] font-bold uppercase tracking-widest text-gray-400'>Included</span>

                    {includedServices.map((service, i) => {
                        const badge = getBadgeLabel(service);
                        const badgeColor =
                            badge === 'WALLET' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-500';
                        const qty = service?.freeCredit;
                        const isUnlimited = qty === -1 || qty === '-1';
                        const displayQty = isUnlimited
                            ? 'Unlimited'
                            : qty != null
                              ? `${Number(qty).toLocaleString(locale || 'en-IN')} / month`
                              : '—';

                        return (
                            <div key={i} className='flex items-center justify-between text-sm'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-gray-700'>{service?.name}</span>
                                    <span className={`text-[9px] font-semibold px-1 py-0 rounded ${badgeColor}`}>
                                        {badge}
                                    </span>
                                </div>
                                <span className='text-gray-800 font-medium text-right'>{displayQty}</span>
                            </div>
                        );
                    })}
                    {dialPlanServicesWithCredit.map((service, i) => {
                        const walletCredit = service?.freeCredit;
                        return (
                            <div key={`dp-${i}`} className='flex items-center justify-between text-sm'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-gray-700'>{service?.name}</span>
                                    <span className='text-[9px] font-semibold px-1 py-0 rounded bg-green-100 text-green-700'>
                                        WALLET
                                    </span>
                                </div>
                                <span className='text-gray-800 font-medium text-right'>
                                    {symbol}
                                    {Number(walletCredit).toLocaleString(locale || 'en-IN')}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Extra after finishes */}
            {(extraServices.length > 0 || dialPlanServicesNoCredit.length > 0) && (
                <div className='flex flex-col gap-2'>
                    <span className='text-[10px] font-bold uppercase tracking-widest text-gray-400'>
                        Extra (After Included Finishes)
                    </span>
                    {[...dialPlanServicesWithCredit, ...dialPlanServicesNoCredit].map((service, i) => (
                        <div key={`dp-extra-${i}`} className='flex items-center justify-between text-sm'>
                            <span className='text-gray-700 text-sm'>{service?.name}</span>
                            <button
                                type='button'
                                onClick={() => onViewRateCard?.(service?.name)}
                                className='text-link active-link'
                            >
                                As Per Dial Plan
                            </button>
                        </div>
                    ))}
                    {extraServices.map((service, i) => {
                        const rate = service?.followUpRate;
                        const hasRate = rate != null && Number(rate) > 0;
                        const hasDemo = !hasRate && service?.freeCredit != null && Number(service.freeCredit) > 0;
                        const rateLabel = hasRate
                            ? `${symbol}${Number(rate)} / unit`
                            : hasDemo
                              ? 'Demo only'
                              : 'Not allowed';

                        return (
                            <div key={i} className='flex items-center justify-between text-sm'>
                                <span className={hasRate ? 'text-gray-800 text-sm' : 'text-gray-500'}>
                                    {service?.name}
                                </span>
                                <span className={hasRate ? 'text-gray-800 text-sm' : 'text-gray-400'}>{rateLabel}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Features */}
            {(() => {
                const visibleFeatures = features.filter((f) => f?.included).slice(0, 5);
                if (visibleFeatures.length === 0) return null;
                return (
                    <div className='flex flex-col gap-2'>
                        <span className='text-[10px] font-bold uppercase tracking-widest text-gray-400'>Features</span>
                        {visibleFeatures.map((feature, i) => (
                            <div key={i} className='flex items-center gap-2 text-sm text-gray-700'>
                                <MdCheck className='shrink-0 text-green-500' />
                                <span>{feature?.name}</span>
                            </div>
                        ))}
                    </div>
                );
            })()}
        </div>
    );
}
