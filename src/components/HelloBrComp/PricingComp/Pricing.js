import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import getURL from '@/utils/getURL';
import BillingToggle from './BillingToggle';
import CalculateDialog from './CalculateDialog';
import CompareDialog from './CompareDialog';
import PlansActions from './PlansActions';
import PlansEmpty from './PlansEmpty';
import PlansSkeleton from './PlansSkeleton';
import PricingCard from './PricingCard';
import SectionHeader from './SectionHeader';
import {
    LOCALE,
    SYMBOL,
    hasComparablePlanFeatures,
    resolveFeaturedPlanKey,
    setCompareModalBillingPanels,
} from './pricingUtils';

export default function Pricing({ data, pageInfo }) {
    const {
        label,
        heading,
        subheading,
        billingMonthlyLabel,
        billingYearlyLabel,
        yearlyDiscountHint,
        fullPricingPath,
        comparePlansLabel,
        comparePlans,
        planCopy = {},
        initialPricingData,
        initialCurrency,
    } = data ?? {};

    const calculateModalRef = useRef(null);
    const compareModalRef = useRef(null);

    const comparePageData = comparePlans ?? {
        comparePlansHeading: 'Compare plans',
        featuresColumnLabel: 'Features',
    };

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
    const featuredKey = resolveFeaturedPlanKey(pageInfo?.page);

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

    const hasCalculableServices = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) return false;
        return pricingData
            .filter((p) => p?.type === billing)
            .some((plan) =>
                (plan?.services ?? []).some((s) => {
                    const dp = s?.dialPlan != null && s.dialPlan?.data?.length > 0;
                    return !dp;
                })
            );
    }, [pricingData, billing]);

    const hasCompareData = useMemo(
        () => hasComparablePlanFeatures(pricingData, 'Monthly') || hasComparablePlanFeatures(pricingData, 'Yearly'),
        [pricingData]
    );

    const openCompareModal = useCallback(() => {
        compareModalRef.current?.showModal();
        requestAnimationFrame(() => {
            setCompareModalBillingPanels(compareModalRef.current, billing);
        });
    }, [billing]);

    const closeCalculateModal = useCallback(() => {
        calculateModalRef.current?.close();
    }, []);

    const openCalculateModal = useCallback(() => {
        calculateModalRef.current?.showModal();
    }, []);

    useEffect(() => {
        const dlg = compareModalRef.current;
        if (!dlg?.open) return;
        setCompareModalBillingPanels(dlg, billing);
        const id = requestAnimationFrame(() => setCompareModalBillingPanels(dlg, billing));
        return () => cancelAnimationFrame(id);
    }, [billing, pricingData, loading]);

    return (
        <>
            <section className='bg-white'>
                <div className='container cont_p py-16 lg:py-24'>
                    <div className='cont mx-auto max-w-6xl'>
                        <SectionHeader label={label} heading={heading} subheading={subheading} />

                        <BillingToggle
                            billing={billing}
                            hasYearly={hasYearly}
                            onBillingChange={setBilling}
                            billingMonthlyLabel={billingMonthlyLabel}
                            billingYearlyLabel={billingYearlyLabel}
                            yearlyDiscountHint={yearlyDiscountHint}
                        />

                        {loading ? (
                            <PlansSkeleton />
                        ) : plans.length === 0 ? (
                            <PlansEmpty
                                comparePlansLabel={comparePlansLabel}
                                pricingHref={pricingHref}
                                fullPricingPath={fullPricingPath}
                            />
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
                                            featured={
                                                featuredKey && plan?.name && plan.name.toLowerCase() === featuredKey
                                            }
                                        />
                                    ))}
                                </div>
                                <PlansActions
                                    hasCalculableServices={hasCalculableServices}
                                    hasCompareData={hasCompareData}
                                    onCalculateClick={openCalculateModal}
                                    onCompareClick={openCompareModal}
                                />
                            </>
                        )}
                    </div>
                </div>
            </section>

            <CalculateDialog
                ref={calculateModalRef}
                pricingData={pricingData}
                symbol={symbol}
                billing={billing}
                locale={locale}
                onClose={closeCalculateModal}
            />

            <CompareDialog
                ref={compareModalRef}
                pricingData={pricingData}
                symbol={symbol}
                locale={locale}
                comparePageData={comparePageData}
            />
        </>
    );
}
