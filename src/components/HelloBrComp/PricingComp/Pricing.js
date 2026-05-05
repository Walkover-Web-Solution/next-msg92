import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MdArrowForward, MdCheck, MdStar } from 'react-icons/md';
import getURL from '@/utils/getURL';

const SYMBOL = { USD: '$', BRL: 'R$' };
const LOCALE = { USD: 'en-US', BRL: 'pt-BR' };

function hasDialPlan(s) {
    return s?.dialPlan != null && s.dialPlan?.data?.length > 0;
}

function isUnlimitedFreeCredit(fc) {
    return fc === -1 || fc === '-1';
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

function buildBullets(plan, symbol, locale) {
    const services = plan?.services ?? [];
    const lines = [];
    const includedServices = services.filter((s) => s?.freeCredit != null && s?.freeCredit !== 0 && !hasDialPlan(s));
    for (const s of includedServices) {
        const qty = s?.freeCredit;
        const isUnlimited = isUnlimitedFreeCredit(qty);
        const displayQty = isUnlimited
            ? 'Unlimited'
            : qty != null
              ? `${Number(qty).toLocaleString(locale)} / month`
              : null;
        lines.push(displayQty ? `${displayQty} ${s?.name}` : s?.name);
    }
    const dialPlanServicesWithCredit = services.filter(
        (s) =>
            hasDialPlan(s) &&
            s?.freeCredit != null &&
            (Number(s?.freeCredit) > 0 || isUnlimitedFreeCredit(s?.freeCredit))
    );
    for (const s of dialPlanServicesWithCredit) {
        const wc = s?.freeCredit;
        if (isUnlimitedFreeCredit(wc)) lines.push(`Unlimited ${s?.name}`);
        else lines.push(`${symbol}${Number(wc).toLocaleString(locale)} ${s?.name} wallet`);
    }
    const feats = (plan?.features ?? []).filter((f) => f?.included);
    for (const f of feats) {
        if (f?.name && lines.length < 6) lines.push(f.name);
    }
    return lines.slice(0, 5);
}

function getFeaturedName(product) {
    if (product === 'hello') return 'basic';
    return null;
}

export default function Pricing({ data, pageInfo }) {
    const {
        label,
        heading,
        subheading,
        currencyUsdLabel,
        currencyBrlLabel,
        billingMonthlyLabel,
        billingYearlyLabel,
        yearlyDiscountHint,
        fullPricingPath,
        comparePlansLabel,
        planCopy = {},
        initialPricingData,
        initialCurrency,
    } = data ?? {};

    const ssrUsdRows = useMemo(
        () => (Array.isArray(initialPricingData) ? initialPricingData : []),
        [initialPricingData]
    );
    const ssrUsdRef = useRef(ssrUsdRows);
    ssrUsdRef.current = ssrUsdRows;

    const [currency, setCurrency] = useState(initialCurrency || 'USD');
    const [billing, setBilling] = useState('Monthly');
    const [pricingData, setPricingData] = useState(ssrUsdRows);
    const [loading, setLoading] = useState(ssrUsdRows.length === 0);
    const [apiCurrency, setApiCurrency] = useState(initialCurrency || 'USD');

    const country = pageInfo?.country || 'br';
    const featuredKey = getFeaturedName(pageInfo?.page);

    useEffect(() => {
        if (currency === 'USD' && ssrUsdRef.current.length > 0) {
            setPricingData(ssrUsdRef.current);
            setApiCurrency('USD');
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        fetch(`/api/pricing/hello?currency=${encodeURIComponent(currency)}`)
            .then((res) => res.json())
            .then((json) => {
                if (cancelled) return;
                const rows = Array.isArray(json?.pricingData) ? json.pricingData : [];
                setPricingData(rows);
                setApiCurrency(json?.currency || currency);
                if (json?.brlFallback && currency === 'BRL') setCurrency('USD');
            })
            .catch(() => {
                if (!cancelled) setPricingData([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [currency]);

    const hasYearly = useMemo(
        () =>
            pricingData.some(
                (p) => (p?.type || '').toLowerCase() === 'yearly' || (p?.type || '').toLowerCase().includes('year')
            ),
        [pricingData]
    );

    useEffect(() => {
        if (billing === 'Yearly' && !hasYearly) setBilling('Monthly');
    }, [billing, hasYearly]);

    const plans = useMemo(() => {
        const norm = billing.toLowerCase();
        const byExact = pricingData.filter((p) => (p?.type || '').toLowerCase() === norm);
        if (byExact.length) return byExact;
        const hint = norm === 'monthly' ? 'month' : 'year';
        return pricingData.filter((p) => (p?.type || '').toLowerCase().includes(hint));
    }, [pricingData, billing]);

    const symbol = SYMBOL[apiCurrency] || '$';
    const locale = LOCALE[apiCurrency] || 'en-US';

    const pricingHref =
        country && country !== 'global'
            ? `/${country}/${fullPricingPath || 'pricing/hello'}`
            : `/${fullPricingPath || 'pricing/hello'}`;

    const signupHref = getURL('signup', pageInfo?.page || 'hello', pageInfo);

    return (
        <section className='bg-white'>
            <div className='container cont_p py-16 lg:py-24'>
                <div className='cont mx-auto max-w-6xl'>
                    <header className='mb-10 text-center md:mb-12'>
                        {label && (
                            <p className='mb-3 inline-flex rounded-full bg-indigo-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-700'>
                                {label}
                            </p>
                        )}
                        {heading && (
                            <h2 className='mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl'>
                                {renderHeading(heading)}
                            </h2>
                        )}
                        {subheading && (
                            <p className='mx-auto max-w-2xl text-base text-gray-600 md:text-lg'>{subheading}</p>
                        )}
                    </header>

                    <div className='mb-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:flex-wrap md:mb-12'>
                        <div className='inline-flex rounded-full border border-gray-200 bg-gray-50 p-1'>
                            {['USD', 'BRL'].map((c) => (
                                <button
                                    key={c}
                                    type='button'
                                    onClick={() => setCurrency(c)}
                                    className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                                        currency === c
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    {c === 'USD' ? currencyUsdLabel || 'USD' : currencyBrlLabel || 'BRL'}
                                </button>
                            ))}
                        </div>
                        <div className='inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-1'>
                            {['Monthly', 'Yearly'].map((t) => {
                                const disabled = t === 'Yearly' && !hasYearly;
                                return (
                                    <button
                                        key={t}
                                        type='button'
                                        disabled={disabled}
                                        onClick={() => !disabled && setBilling(t)}
                                        className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                                            billing === t
                                                ? 'bg-indigo-600 text-white shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                        } ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}
                                    >
                                        {t === 'Monthly'
                                            ? billingMonthlyLabel || 'Monthly'
                                            : billingYearlyLabel || 'Yearly'}
                                        {t === 'Yearly' && yearlyDiscountHint && hasYearly && (
                                            <span className='ml-1 text-emerald-600'>{yearlyDiscountHint}</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {loading ? (
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className='h-96 animate-pulse rounded-2xl border border-gray-100 bg-gray-50'
                                />
                            ))}
                        </div>
                    ) : plans.length === 0 ? (
                        <p className='text-center text-gray-600'>
                            {comparePlansLabel || 'View plans on the pricing page.'}{' '}
                            <a href={pricingHref} className='font-semibold text-indigo-600 hover:text-indigo-700'>
                                {fullPricingPath ? 'Hello pricing' : 'Pricing'}
                            </a>
                        </p>
                    ) : (
                        <>
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
                                {plans.map((plan, index) => (
                                    <PricingCard
                                        key={`${plan?.name}-${plan?.type}-${index}`}
                                        plan={plan}
                                        billing={billing}
                                        symbol={symbol}
                                        locale={locale}
                                        signupHref={signupHref}
                                        meta={planCopy[plan?.name] || {}}
                                        featured={featuredKey && plan?.name && plan.name.toLowerCase() === featuredKey}
                                    />
                                ))}
                            </div>
                            <p className='mt-10 text-center text-sm text-gray-600'>
                                <a
                                    href={pricingHref}
                                    className='font-semibold text-indigo-600 underline-offset-2 hover:text-indigo-700 hover:underline'
                                >
                                    {comparePlansLabel || 'View full Hello pricing & compare features'}
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

function renderHeading(raw) {
    const parts = String(raw ?? '')
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean);
    if (parts.length < 2) return parts[0] || '';
    const [lead, accent] = parts;
    return (
        <>
            {lead}
            <span className='text-indigo-600'> {accent}</span>
        </>
    );
}

function PricingCard({ plan, billing, symbol, locale, signupHref, meta, featured }) {
    const amount = plan?.amount;
    const discounted = getDiscountedAmount(amount, plan?.discount);
    const effective = discounted != null ? discounted : amount;
    const isFree = !effective || Number(effective) === 0;
    const suffix = billing === 'Monthly' ? '/mo' : '/yr';

    const bigPrice = isFree ? (
        <>
            <span className='text-xl font-bold text-gray-900'>{symbol}</span>
            <span className='text-4xl font-extrabold tracking-tight text-gray-900'>0</span>
        </>
    ) : (
        <>
            <span className='text-xl font-bold text-gray-900'>{symbol}</span>
            <span className='text-4xl font-extrabold tracking-tight text-gray-900'>
                {Number(effective).toLocaleString(locale)}
            </span>
        </>
    );

    const bullets = buildBullets(plan, symbol, locale);
    const description = meta.description || '';
    const ctaLabel = meta.cta || 'Get started';
    const ctaVariant = meta.ctaVariant || (featured ? 'indigo' : 'dark');

    const btnClass =
        ctaVariant === 'indigo'
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500'
            : 'bg-gray-900 text-white hover:bg-gray-800';

    return (
        <div
            className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition ${
                featured
                    ? 'border-indigo-200 pt-8 shadow-lg shadow-indigo-100 ring-2 ring-indigo-200'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
        >
            {featured && (
                <div className='absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white'>
                    <MdStar className='h-3.5 w-3.5' aria-hidden />
                    {meta.badge || 'Most popular'}
                </div>
            )}
            <h3 className='mb-2 text-lg font-bold text-gray-900'>{plan?.name}</h3>
            <div className='mb-1 flex flex-wrap items-baseline gap-1'>
                {bigPrice}
                <span className='text-sm font-medium text-gray-500'>{suffix}</span>
            </div>
            {discounted != null && !isFree && (
                <p className='mb-3 text-xs text-gray-400 line-through'>
                    {symbol}
                    {Number(amount).toLocaleString(locale)}
                    {suffix}
                </p>
            )}
            {description && <p className='mb-5 text-sm text-gray-600'>{description}</p>}
            {!description && <div className='mb-5' />}

            <ul className='mb-6 flex flex-1 flex-col gap-2.5'>
                {bullets.map((line, i) => (
                    <li key={i} className='flex items-start gap-2 text-sm text-gray-700'>
                        <MdCheck className='mt-0.5 h-4 w-4 shrink-0 text-emerald-600' aria-hidden />
                        <span>{line}</span>
                    </li>
                ))}
            </ul>

            <a
                href={signupHref}
                target='_blank'
                rel='noopener noreferrer'
                className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${btnClass}`}
            >
                {ctaLabel}
                <MdArrowForward className='h-4 w-4' aria-hidden />
            </a>
        </div>
    );
}
