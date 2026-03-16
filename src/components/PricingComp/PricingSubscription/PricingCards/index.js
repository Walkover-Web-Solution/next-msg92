import getURL from '@/utils/getURL';
import { useMemo, useRef, useCallback, useState } from 'react';
import {
    MdChevronLeft,
    MdChevronRight,
    MdInfoOutline,
    MdArrowForward,
    MdCheck,
    MdClose,
    MdLaunch,
} from 'react-icons/md';

export const FEATURED_PLAN_MAP = {
    hello: 'Basic',
    segmento: 'Cruiser',
    email: 'Basic',
    whatsapp: 'Titan',
    rcs: 'Build',
};

const SCROLL_DISTANCE = 360;

export default function PricingCards({
    pricingData,
    symbol,
    locale,
    onViewRateCard,
    onCalculateClick,
    onTabChange,
    pageInfo,
    heading,
}) {
    const featuredPlanName = FEATURED_PLAN_MAP[pageInfo?.product] ?? null;
    const monthlyScrollRef = useRef(null);
    const yearlyScrollRef = useRef(null);
    const [activeTab, setActiveTab] = useState('Monthly');
    const [monthlyShowFade, setMonthlyShowFade] = useState(false);
    const [yearlyShowFade, setYearlyShowFade] = useState(false);
    const [selectedPlanName, setSelectedPlanName] = useState(featuredPlanName);

    const activeScrollRef = activeTab === 'Yearly' ? yearlyScrollRef : monthlyScrollRef;

    const checkFade = useCallback((el, setFade) => {
        if (!el) return;
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
        setFade(!atEnd && el.scrollWidth > el.clientWidth);
    }, []);

    const scrollLeft = useCallback(() => {
        activeScrollRef.current?.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
    }, [activeScrollRef]);

    const scrollRight = useCallback(() => {
        activeScrollRef.current?.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
    }, [activeScrollRef]);

    const { monthlyPlans, yearlyPlans, hasYearly } = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0)
            return { monthlyPlans: [], yearlyPlans: [], hasYearly: false };
        const monthly = pricingData.filter((p) => p?.type === 'Monthly');
        const yearly = pricingData.filter((p) => p?.type === 'Yearly');
        return {
            monthlyPlans: monthly,
            yearlyPlans: yearly,
            hasYearly: monthly.length > 0 && yearly.length > 0,
        };
    }, [pricingData]);

    const monthlyHasDiscount = useMemo(() => monthlyPlans.some((p) => p?.discount?.length > 0), [monthlyPlans]);
    const yearlyHasDiscount = useMemo(() => yearlyPlans.some((p) => p?.discount?.length > 0), [yearlyPlans]);

    const hasFeatures = useMemo(
        () => Array.isArray(pricingData) && pricingData.some((p) => (p?.features ?? []).some((f) => f?.included)),
        [pricingData]
    );

    const legendFlags = useMemo(() => {
        const flags = { hasWallet: false, hasQuota: false, hasNotAllowed: false, hasDemoOnly: false };
        if (!Array.isArray(pricingData)) return flags;
        for (const plan of pricingData) {
            for (const s of plan?.services ?? []) {
                const hasDP = s?.dialPlan != null && s.dialPlan?.data?.length > 0;
                if (hasDP) {
                    const hasCredit = s?.freeCredit != null && Number(s.freeCredit) > 0;
                    if (hasCredit && !s?.postPaidAllowed) flags.hasDemoOnly = true;
                    if (hasCredit) flags.hasWallet = true;
                } else {
                    if (s?.freeCredit != null && s?.freeCredit !== 0) flags.hasQuota = true;
                    const rate = s?.followUpRate;
                    const hasRate = rate != null && Number(rate) > 0;
                    const isUnlimited = s?.freeCredit === -1 || s?.freeCredit === '-1';
                    if ((!hasRate || !s?.postPaidAllowed) && !isUnlimited) flags.hasNotAllowed = true;
                }
            }
        }
        return flags;
    }, [pricingData]);

    const { useEffect } = require('react');

    useEffect(() => {
        const el = monthlyScrollRef.current;
        if (!el) return;
        const handler = () => checkFade(el, setMonthlyShowFade);
        handler();
        el.addEventListener('scroll', handler);
        window.addEventListener('resize', handler);
        return () => {
            el.removeEventListener('scroll', handler);
            window.removeEventListener('resize', handler);
        };
    }, [monthlyPlans, checkFade]);

    useEffect(() => {
        const el = yearlyScrollRef.current;
        if (!el) return;
        const handler = () => checkFade(el, setYearlyShowFade);
        handler();
        el.addEventListener('scroll', handler);
        window.addEventListener('resize', handler);
        return () => {
            el.removeEventListener('scroll', handler);
            window.removeEventListener('resize', handler);
        };
    }, [yearlyPlans, checkFade]);

    if (!monthlyPlans.length && !yearlyPlans.length) return null;

    const showArrows = activeTab === 'Yearly' ? yearlyShowFade : monthlyShowFade;

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between gap-4'>
                <h1 className='text-2xl md:text-3xl font-bold capitalize'>{heading}</h1>
                {showArrows && (
                    <div className='hidden sm:flex items-center gap-2 shrink-0'>
                        <button
                            type='button'
                            onClick={scrollLeft}
                            aria-label='Scroll left'
                            className='w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors'
                        >
                            <MdChevronLeft size={20} />
                        </button>
                        <button
                            type='button'
                            onClick={scrollRight}
                            aria-label='Scroll right'
                            className='w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors'
                        >
                            <MdChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
            {hasYearly && (
                <div className='inline-flex w-fit rounded-lg border border-slate-200 bg-white overflow-hidden'>
                    {['Monthly', 'Yearly'].map((t) => (
                        <button
                            key={t}
                            type='button'
                            data-tab-btn={t}
                            onClick={() => {
                                setActiveTab(t);
                                onTabChange?.(t);
                            }}
                            className={`px-4 py-2 text-sm font-medium transition-colors tab-btn-${t.toLowerCase()}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            )}

            {/* Monthly plans — visible by default */}
            <div data-tabpanel='Monthly' className='w-full relative'>
                <div
                    ref={monthlyScrollRef}
                    className='flex items-stretch h-full gap-3 md:gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-5'
                >
                    {monthlyPlans.map((plan, index) => (
                        <PlanCard
                            key={plan?.name ?? index}
                            plan={plan}
                            tabtype='Monthly'
                            symbol={symbol}
                            locale={locale}
                            isFeatured={false}
                            isSelected={selectedPlanName === plan?.name}
                            onSelect={() => setSelectedPlanName(plan?.name)}
                            onViewRateCard={(serviceName) => onViewRateCard?.(serviceName)}
                            pageInfo={pageInfo}
                            hasDiscount={monthlyHasDiscount}
                            isOverflow={monthlyShowFade}
                        />
                    ))}
                </div>
                {monthlyShowFade && (
                    <div className='hidden sm:block pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent' />
                )}
            </div>

            {/* Yearly plans — hidden by default, shown when tab switches */}
            {yearlyPlans.length > 0 && (
                <div data-tabpanel='Yearly' className='w-full hidden relative'>
                    <div
                        ref={yearlyScrollRef}
                        className='flex items-stretch h-full gap-3 md:gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-5'
                    >
                        {yearlyPlans.map((plan, index) => (
                            <PlanCard
                                key={plan?.name ?? index}
                                plan={plan}
                                tabtype='Yearly'
                                symbol={symbol}
                                locale={locale}
                                isSelected={selectedPlanName === plan?.name}
                                onSelect={() => setSelectedPlanName(plan?.name)}
                                onViewRateCard={(serviceName) => onViewRateCard?.(serviceName)}
                                pageInfo={pageInfo}
                                hasDiscount={yearlyHasDiscount}
                                isOverflow={yearlyShowFade}
                            />
                        ))}
                    </div>
                    {yearlyShowFade && (
                        <div className='hidden sm:block pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent' />
                    )}
                </div>
            )}

            <div className='flex items-center justify-between'>
                {onCalculateClick && (
                    <span
                        type='button'
                        onClick={onCalculateClick}
                        className='inline-flex items-center gap-2 text-sm font-medium text-link active-link capitalize'
                    >
                        <MdLaunch className='text-base' />
                        Calculate Price
                    </span>
                )}
                {hasFeatures && (
                    <span
                        type='button'
                        onClick={() => document.getElementById('compare-plans')?.scrollIntoView({ behavior: 'smooth' })}
                        className='inline-flex items-center gap-2 text-sm font-medium text-link active-link capitalize'
                    >
                        <MdLaunch className='text-base' />
                        View all features
                    </span>
                )}
            </div>

            {(legendFlags.hasWallet ||
                legendFlags.hasQuota ||
                legendFlags.hasNotAllowed ||
                legendFlags.hasDemoOnly) && (
                <div className='rounded-lg p-4 border bg-indigo-50/50 border-indigo-100'>
                    <div className='flex flex-col gap-1.5 text-xs text-slate-600'>
                        {legendFlags.hasWallet && (
                            <p>
                                <span className='font-medium text-gray-900'>Wallet</span> — amount-based credit deducted
                                per Rate Card; top-up required once exhausted.
                            </p>
                        )}
                        {legendFlags.hasQuota && (
                            <p>
                                <span className='font-medium text-gray-900'>Quota</span> — volume-based usage per month;
                                extra rate applies after quota finishes.
                            </p>
                        )}
                        {legendFlags.hasNotAllowed && (
                            <p>
                                <span className='font-medium text-gray-900'>Not allowed</span> — extra usage not
                                permitted on this plan; upgrade required.
                            </p>
                        )}
                        {legendFlags.hasDemoOnly && (
                            <p>
                                <span className='font-medium text-gray-900'>Demo only</span> — service available for
                                testing only; postpaid usage not enabled on this plan.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {pageInfo?.country === 'in' && (
                <p className='text-xs text-slate-400'>* All prices are exclusive of 18% GST.</p>
            )}
        </div>
    );
}

function getBadgeLabel(service) {
    if (
        service?.dialPlan != null &&
        service.dialPlan?.data?.length > 0 &&
        service?.freeCredit != null &&
        Number(service.freeCredit) > 0
    )
        return 'WALLET';
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

function PlanCard({
    plan,
    tabtype,
    symbol,
    locale,
    isFeatured,
    isSelected,
    onSelect,
    onViewRateCard,
    pageInfo,
    hasDiscount,
    isOverflow,
}) {
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
    const isUnlimitedFreeCredit = (fc) => fc === -1 || fc === '-1';
    const dialPlanServicesWithCredit = services.filter(
        (s) =>
            hasDialPlan(s) &&
            s?.freeCredit != null &&
            (Number(s?.freeCredit) > 0 || isUnlimitedFreeCredit(s?.freeCredit))
    );
    const dialPlanServicesNoCredit = services.filter(
        (s) =>
            hasDialPlan(s) &&
            !(s?.freeCredit != null && (Number(s?.freeCredit) > 0 || isUnlimitedFreeCredit(s?.freeCredit)))
    );
    const extraServices = services.filter((s) => !hasDialPlan(s) && !(s?.freeCredit === -1 || s?.freeCredit === '-1'));

    const isFree = displayPrice === 'Free';

    const discountDuration = plan?.discount?.[0]?.duration ?? 0;
    const saveLabel = (() => {
        const discount = plan?.discount?.[0];
        if (!discount) return null;
        const typeId = discount?.discount_type_id ?? discount?.type_id;
        const value = Number(discount?.value ?? 0);
        const durationText =
            discountDuration > 0 ? ` for first ${discountDuration} month${discountDuration !== 1 ? 's' : ''}` : '';
        if (typeId === 1) return `${symbol}${value.toLocaleString(locale || 'en-IN')} off${durationText}`;
        if (typeId === 2) return `${value >= 100 ? 100 : value}% off${durationText}`;
        return null;
    })();

    const hasIncluded = includedServices.length > 0 || dialPlanServicesWithCredit.length > 0;
    const hasOverage =
        extraServices.length > 0 || dialPlanServicesNoCredit.length > 0 || dialPlanServicesWithCredit.length > 0;
    const visibleFeatures = features.slice(0, 5);

    const firstDialPlanService = services.find((s) => hasDialPlan(s));

    return (
        <div
            onClick={() => {
                onSelect?.();
                if (firstDialPlanService) {
                    onViewRateCard?.({ serviceName: firstDialPlanService.name, planName: plan?.name });
                }
            }}
            className={`group relative flex flex-col p-6 rounded-2xl transition-all duration-300 cursor-pointer ${isOverflow ? 'min-w-[280px] w-[280px] md:min-w-[290px] md:w-[290px]' : 'flex-1 min-w-[290px] max-w-[320px]'} ${isSelected ? 'bg-indigo-50 border-2 border-indigo-300 shadow-lg shadow-indigo-100' : 'bg-white border border-slate-200 hover:shadow-md hover:border-slate-300'}`}
        >
            {/* Header */}
            <div className={`mb-5 ${hasDiscount ? 'min-h-[148px]' : 'min-h-[108px]'}`}>
                <h3 className='text-lg font-bold mb-3 text-slate-900'>{plan?.name || 'Plan'}</h3>
                {saveLabel && (
                    <span
                        className={`inline-block mb-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${isSelected ? 'border-indigo-400 text-indigo-700 bg-indigo-100' : 'border-blue-300 text-blue-600 bg-blue-50'}`}
                    >
                        {saveLabel}
                    </span>
                )}
                <div className='flex items-baseline gap-1.5 mb-1'>
                    <span className='text-4xl font-extrabold tracking-tight text-slate-900'>
                        {isFree ? `${symbol}0` : displayPrice}
                    </span>
                    <span className='text-sm font-medium text-slate-400'>
                        {discountDuration > 0
                            ? `/ mo for ${discountDuration}mo`
                            : tabtype === 'Monthly'
                              ? '/ month'
                              : '/ year'}
                    </span>
                </div>
                {originalPrice && <p className='text-xs mt-0.5 text-slate-400'>Then {originalPrice}/month</p>}
            </div>

            {/* CTA */}
            <a
                href={getURL('signup', pageInfo?.page, pageInfo)}
                target='_blank'
                type='button'
                onClick={(e) => e.stopPropagation()}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-center transition-all mb-5 block ${isSelected ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-50 text-indigo-600 border border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600'}`}
            >
                Get started
            </a>

            {/* Divider */}
            <div className='h-px w-full mb-4 bg-slate-100' />

            {/* Content */}
            <div className='flex-1 flex flex-col gap-4'>
                {/* Included services */}
                {hasIncluded && (
                    <div>
                        <p className='text-[11px] font-semibold uppercase tracking-wider mb-2 text-slate-400'>
                            Included
                        </p>
                        <ul className='flex flex-col gap-1.5'>
                            {includedServices.map((service, i) => {
                                const qty = service?.freeCredit;
                                const isUnlimited = qty === -1 || qty === '-1';
                                const displayQty = isUnlimited
                                    ? 'Unlimited'
                                    : qty != null
                                      ? `${Number(qty).toLocaleString(locale || 'en-IN')} / month`
                                      : null;
                                return (
                                    <li key={i} className='flex items-start gap-2 text-sm text-slate-600'>
                                        <MdCheck size={15} className='text-indigo-400 shrink-0 mt-0.5' />
                                        {displayQty ? `${displayQty} ${service?.name}` : service?.name}
                                    </li>
                                );
                            })}
                            {dialPlanServicesWithCredit.map((service, i) => {
                                const walletCredit = service?.freeCredit;
                                const isUnlimited = isUnlimitedFreeCredit(walletCredit);
                                return (
                                    <li key={`dp-${i}`} className='flex items-start gap-2 text-sm text-slate-600'>
                                        <MdCheck size={15} className='text-indigo-400 shrink-0 mt-0.5' />
                                        <span className='flex items-center gap-1'>
                                            {isUnlimited
                                                ? `Unlimited ${service?.name}`
                                                : `${symbol}${Number(walletCredit).toLocaleString(locale || 'en-IN')} ${service?.name} wallet`}
                                            {!isUnlimited && (
                                                <MdInfoOutline
                                                    size={13}
                                                    className='text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors'
                                                    onClick={() =>
                                                        onViewRateCard?.({
                                                            serviceName: service?.name,
                                                            planName: plan?.name,
                                                        })
                                                    }
                                                />
                                            )}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {/* Overage */}
                {hasOverage && (
                    <div>
                        <p className='text-[11px] font-semibold uppercase tracking-wider mb-2 text-slate-400'>
                            Extra charges
                        </p>
                        <ul className='flex flex-col gap-1.5'>
                            {extraServices.map((service, i) => {
                                const rate = service?.followUpRate;
                                const chunkSize = service?.chunkSize ?? 1;
                                const hasRate = rate != null && Number(rate) > 0;
                                const isNotAllowed = !service?.postPaidAllowed || !hasRate;
                                const unitLabel = chunkSize > 1 ? `${chunkSize} units` : 'unit';
                                return (
                                    <li key={i} className='flex items-start gap-2 text-sm text-slate-600'>
                                        <MdCheck size={15} className='text-indigo-400 shrink-0 mt-0.5' />
                                        {isNotAllowed
                                            ? `${service?.name}: Not allowed`
                                            : `${service?.name}: ${symbol}${Number(rate)} / ${unitLabel} / month`}
                                    </li>
                                );
                            })}
                            {[...dialPlanServicesWithCredit, ...dialPlanServicesNoCredit].map((service, i) => {
                                const hasWalletCredit = service?.freeCredit != null && Number(service.freeCredit) > 0;
                                const isDemoOnly = hasWalletCredit && !service?.postPaidAllowed;
                                return (
                                    <li key={`dp-extra-${i}`} className='flex items-start gap-2 text-sm text-slate-600'>
                                        <MdCheck size={15} className='text-indigo-400 shrink-0 mt-0.5' />
                                        <span className='flex items-center gap-1'>
                                            {service?.name}:{' '}
                                            {isDemoOnly ? (
                                                'Demo only'
                                            ) : (
                                                <>
                                                    As per rate card
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            onViewRateCard?.({
                                                                serviceName: service?.name,
                                                                planName: plan?.name,
                                                            })
                                                        }
                                                        className='font-medium text-xs text-indigo-600 hover:text-indigo-800 transition-colors'
                                                    >
                                                        view
                                                    </button>
                                                </>
                                            )}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {/* Features */}
                {visibleFeatures.length > 0 && (
                    <div>
                        <p className='text-[11px] font-semibold uppercase tracking-wider mb-2 text-slate-400'>
                            Features
                        </p>
                        <ul className='flex flex-col gap-1.5'>
                            {visibleFeatures.map((feature, i) => (
                                <li key={i} className='flex items-start gap-2 text-sm text-slate-600'>
                                    {feature?.included ? (
                                        <MdCheck size={15} className='text-indigo-400 shrink-0 mt-0.5' />
                                    ) : (
                                        <MdClose size={15} className='text-slate-300 shrink-0 mt-0.5' />
                                    )}
                                    {feature?.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
