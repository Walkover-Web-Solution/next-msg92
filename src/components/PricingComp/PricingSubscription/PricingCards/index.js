import getURL from '@/utils/getURL';
import { useMemo, useRef, useCallback, useState } from 'react';
import {
    MdChevronLeft,
    MdChevronRight,
    MdInfoOutline,
    MdArrowForward,
    MdCheckCircleOutline,
    MdCancel,
    MdLaunch,
} from 'react-icons/md';

const FEATURED_INDEX = 3;

const SCROLL_DISTANCE = 360;

export default function PricingCards({
    pricingData,
    symbol,
    locale,
    onViewRateCard,
    onCalculateClick,
    onTabChange,
    pageInfo,
}) {
    console.log('⚡️ ~ :25 ~ PricingCards ~ pricingData:', pricingData);
    const monthlyScrollRef = useRef(null);
    const yearlyScrollRef = useRef(null);
    const [activeTab, setActiveTab] = useState('Monthly');

    const activeScrollRef = activeTab === 'Yearly' ? yearlyScrollRef : monthlyScrollRef;

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

    if (!monthlyPlans.length && !yearlyPlans.length) return null;

    const showArrows = Math.max(monthlyPlans.length, yearlyPlans.length) > 2;

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-between gap-4'>
                {hasYearly ? (
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
                ) : (
                    <div />
                )}

                {showArrows && (
                    <div className='flex items-center gap-2'>
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

            {/* Monthly plans — visible by default */}
            <div data-tabpanel='Monthly' className='w-full'>
                <div
                    ref={monthlyScrollRef}
                    className='flex items-stretch h-full gap-6 overflow-x-auto scroll-smooth pt-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                >
                    {monthlyPlans.map((plan, index) => (
                        <PlanCard
                            key={plan?.name ?? index}
                            plan={plan}
                            tabtype='Monthly'
                            symbol={symbol}
                            locale={locale}
                            isFeatured={index === FEATURED_INDEX}
                            onViewRateCard={(serviceName) => onViewRateCard?.(serviceName)}
                            pageInfo={pageInfo}
                        />
                    ))}
                </div>
            </div>

            {/* Yearly plans — hidden by default, shown when tab switches */}
            {yearlyPlans.length > 0 && (
                <div data-tabpanel='Yearly' className='w-full hidden'>
                    <div
                        ref={yearlyScrollRef}
                        className='flex items-stretch h-full gap-6 overflow-x-auto scroll-smooth pt-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                    >
                        {yearlyPlans.map((plan, index) => (
                            <PlanCard
                                key={plan?.name ?? index}
                                plan={plan}
                                tabtype='Yearly'
                                symbol={symbol}
                                locale={locale}
                                isFeatured={index === FEATURED_INDEX}
                                onViewRateCard={(serviceName) => onViewRateCard?.(serviceName)}
                                pageInfo={pageInfo}
                            />
                        ))}
                    </div>
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

function PlanCard({ plan, tabtype, symbol, locale, isFeatured, onViewRateCard, pageInfo }) {
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

    const saveLabel = (() => {
        const discount = plan?.discount?.[0];
        if (!discount) return null;
        const typeId = discount?.discount_type_id ?? discount?.type_id;
        const value = Number(discount?.value ?? 0);
        const duration = discount?.duration ?? 0;
        const durationText = duration > 0 ? ` for ${duration} month${duration !== 1 ? 's' : ''}` : '';
        if (typeId === 1) return `Save ${symbol}${value.toLocaleString(locale || 'en-IN')}${durationText}`;
        if (typeId === 2) return `Save ${value >= 100 ? 100 : value}%${durationText}`;
        return null;
    })();

    const hasIncluded = includedServices.length > 0 || dialPlanServicesWithCredit.length > 0;
    const hasOverage =
        extraServices.length > 0 || dialPlanServicesNoCredit.length > 0 || dialPlanServicesWithCredit.length > 0;
    const visibleFeatures = features.slice(0, 5);

    return (
        <div className='relative h-full flex flex-col p-6 rounded-xl transition-all duration-300 bg-white min-w-[350px] w-[350px] border border-slate-200 hover:border-indigo-300'>
            {/* Header */}
            <div className='mb-6'>
                <h3 className='text-base font-semibold mb-2 text-slate-900'>{plan?.name || 'Plan'}</h3>
                <div className='flex items-baseline gap-1 mb-3'>
                    {isFree ? (
                        <span className='text-4xl font-bold text-slate-900 tracking-tight'>{symbol}0</span>
                    ) : (
                        <span className='text-4xl font-bold text-slate-900 tracking-tight'>{displayPrice}</span>
                    )}
                    <span className='text-slate-500 font-medium'>{tabtype === 'Monthly' ? '/month' : '/year'}</span>
                </div>
                <div className='flex items-center gap-2 text-sm min-h-[24px]'>
                    {originalPrice && <span className='text-slate-400 text-base line-through'>{originalPrice}</span>}
                    {saveLabel && (
                        <span className='text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-md'>
                            {saveLabel}
                        </span>
                    )}
                </div>
            </div>

            {/* CTA */}
            <a
                href={getURL('signup', pageInfo?.page, pageInfo)}
                target='_blank'
                type='button'
                className='w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all mb-6 flex items-center justify-center gap-2 bg-white text-slate-900 border-2 border-slate-200 hover:border-indigo-600 hover:bg-slate-50'
            >
                Get started <MdArrowForward size={16} />
            </a>

            {/* Divider */}
            <div className='h-px bg-slate-200 w-full mb-6' />

            {/* Content */}
            <div className='flex-1 flex flex-col gap-6'>
                {/* Included */}
                {hasIncluded && (
                    <div>
                        <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3'>Included</p>
                        <div className='flex flex-col gap-3'>
                            {includedServices.map((service, i) => {
                                const badge = getBadgeLabel(service);
                                const isWallet = badge === 'WALLET';
                                const qty = service?.freeCredit;
                                const isUnlimited = qty === -1 || qty === '-1';
                                const displayQty = isUnlimited
                                    ? 'Unlimited'
                                    : qty != null
                                      ? `${Number(qty).toLocaleString(locale || 'en-IN')} / month`
                                      : '—';
                                return (
                                    <div key={i} className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-sm text-slate-600'>{service?.name}</span>
                                            <span
                                                className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                                                    isWallet
                                                        ? 'bg-emerald-50 text-emerald-700'
                                                        : 'bg-blue-50 text-blue-700'
                                                }`}
                                            >
                                                {isWallet ? 'wallet' : 'quota'}
                                            </span>
                                        </div>
                                        <span className='text-sm font-bold text-slate-900'>{displayQty}</span>
                                    </div>
                                );
                            })}
                            {dialPlanServicesWithCredit.map((service, i) => {
                                const walletCredit = service?.freeCredit;
                                const isUnlimited = isUnlimitedFreeCredit(walletCredit);
                                return (
                                    <div key={`dp-${i}`} className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-sm text-slate-600'>{service?.name}</span>
                                            <span className='text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700'>
                                                wallet
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <span className='text-sm font-bold text-slate-900'>
                                                {isUnlimited
                                                    ? 'Unlimited'
                                                    : `${symbol}${Number(walletCredit).toLocaleString(locale || 'en-IN')} / month`}
                                            </span>
                                            {!isUnlimited && (
                                                <span className='relative group cursor-pointer'>
                                                    <MdInfoOutline
                                                        size={13}
                                                        className='text-slate-400 hover:text-indigo-600 transition-colors'
                                                        onClick={() =>
                                                            onViewRateCard?.({
                                                                serviceName: service?.name,
                                                                planName: plan?.name,
                                                            })
                                                        }
                                                    />
                                                    <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-max max-w-[200px] rounded-md bg-slate-800 px-2 py-1 text-[11px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-normal text-center'>
                                                        Click to view Rate Card
                                                    </span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Overage */}
                {hasOverage && (
                    <div>
                        <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3'>
                            Extra (after included finishes)
                        </p>
                        <div className='flex flex-col gap-2.5'>
                            {extraServices.map((service, i) => {
                                const rate = service?.followUpRate;
                                const chunkSize = service?.chunkSize ?? 1;
                                const hasRate = rate != null && Number(rate) > 0;
                                const isNotAllowed = !service?.postPaidAllowed || !hasRate;
                                const unitLabel = chunkSize > 1 ? `${chunkSize} units` : 'unit';
                                return (
                                    <div key={i} className='flex justify-between text-sm'>
                                        <span className='text-slate-600'>{service?.name}</span>
                                        <span
                                            className={`font-medium ${!isNotAllowed ? 'text-slate-900' : 'text-slate-400'}`}
                                        >
                                            {!isNotAllowed
                                                ? `${symbol}${Number(rate)} / ${unitLabel} / month`
                                                : 'Not allowed'}
                                        </span>
                                    </div>
                                );
                            })}
                            {[...dialPlanServicesWithCredit, ...dialPlanServicesNoCredit].map((service, i) => {
                                const hasWalletCredit = service?.freeCredit != null && Number(service.freeCredit) > 0;
                                const isDemoOnly = hasWalletCredit && !service?.postPaidAllowed;
                                return (
                                    <div key={`dp-extra-${i}`} className='flex justify-between text-sm'>
                                        <span className='text-slate-600'>{service?.name}</span>
                                        {isDemoOnly ? (
                                            <span className='font-medium text-slate-400'>Demo only</span>
                                        ) : (
                                            <span className='flex items-center gap-1'>
                                                <span className='font-medium text-slate-900'>As per rate card</span>
                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        onViewRateCard?.({
                                                            serviceName: service?.name,
                                                            planName: plan?.name,
                                                        })
                                                    }
                                                    className='text-indigo-600 hover:text-indigo-800 font-medium text-xs transition-colors'
                                                >
                                                    view
                                                </button>
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Capabilities */}
                {visibleFeatures.length > 0 && (
                    <div>
                        <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3'>Features</p>
                        <ul className='flex flex-col gap-2.5'>
                            {visibleFeatures.map((feature, i) => (
                                <li key={i} className='flex items-center gap-2.5 text-sm text-slate-600'>
                                    {feature?.included ? (
                                        <MdCheckCircleOutline size={16} className='text-indigo-600 shrink-0' />
                                    ) : (
                                        <MdCancel size={16} className='text-slate-300 shrink-0' />
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
