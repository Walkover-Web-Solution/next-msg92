import { useRef, useMemo, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import PricingPlanCard from './PricingPlanCard/PricingPlanCard';

const FIXED_LOCALE = 'en-US';

function formatPrice(symbol, amount) {
    if (amount == null) return '—';
    const num = Number(amount);
    if (Number.isNaN(num)) return '—';
    return `${symbol}${num.toLocaleString(FIXED_LOCALE)}`;
}

function simplifiedPlanToCard(plan, tabtype, symbol) {
    const isMonthly = tabtype === 'Monthly';
    const amount = isMonthly ? plan?.amount?.monthly : plan?.amount?.yearly;
    const period = isMonthly ? 'Monthly' : 'Yearly';

    const included =
        plan?.extras?.servicesList?.map((s) =>
            s.free_credits === -1
                ? `Unlimited ${s.servicename}`
                : `${Number(s.free_credits).toLocaleString(FIXED_LOCALE)} ${s.servicename}`
        ) ?? [];

    const features =
        plan?.plan_features?.filter((f) => f.is_visible).map((f) => ({ name: f.name, is_included: f.is_included })) ??
        [];

    const extra =
        plan?.extras?.servicesList?.map((s) => `${formatPrice(symbol, s.follow_up_rate)} / ${s.servicename}`) ?? [];

    const title = plan?.slug ? String(plan.slug).charAt(0).toUpperCase() + String(plan.slug).slice(1) : 'Plan';

    const hasDialPlan = plan?.dial_plan?.data?.length > 0;

    return {
        slug: plan?.slug,
        title,
        price: formatPrice(symbol, amount),
        period,
        ctaText: 'Get Started',
        showLink: true,
        linkText: 'View Calling Rates',
        hasDialPlan,
        included,
        features,
        extra,
    };
}

export default function PricingPlans({ pricingData, tabtype, symbol, setScrollApi }) {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
    };

    // 👇 expose controls to parent
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
        const sym = symbol ?? '₹';
        const tab = tabtype ?? 'Monthly';
        return pricingData.map((plan) => simplifiedPlanToCard(plan, tab, sym));
    }, [pricingData, tabtype, symbol]);

    if (cards.length === 0) return null;

    return (
        <section className='w-full py-4'>
            <div className='mx-auto max-w-7xl'>
                <div ref={scrollRef} className='flex gap-6 overflow-x-auto pb-4 scroll-smooth'>
                    {cards.map((card, index) => (
                        <PricingPlanCard key={card.slug ?? `card-${index}`} planData={card} />
                    ))}
                </div>

                <div className='mt-6 flex items-center justify-between text-sm'>
                    <button className='text-blue-600 hover:underline'>Calculate pricing</button>
                    <button
                        type='button'
                        onClick={() => document.getElementById('compare-plans')?.scrollIntoView({ behavior: 'smooth' })}
                        className='text-blue-600 hover:underline'
                    >
                        Compare all features ↓
                    </button>
                </div>
            </div>
        </section>
    );
}
