import { useRef, useMemo, useState, useEffect } from 'react';
import { MdCheck, MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md';

const SCROLL_DISTANCE = 300;

function formatAmount(amount, symbol, locale) {
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

function getDiscountLabel(discount, symbol, locale) {
    if (!discount) return null;
    const typeId = discount?.discount_type_id ?? discount?.type_id;
    const value = Number(discount?.value ?? 0);
    const duration = discount?.duration ?? 0;
    const durationText = duration === 0 ? '' : ` for ${duration} month${duration !== 1 ? 's' : ''}`;
    if (typeId === 1) return `${symbol}${value.toLocaleString(locale || 'en-IN')} off${durationText}`;
    if (typeId === 2) return `${value >= 100 ? 100 : value}% off${durationText}`;
    return null;
}

function CompareTable({ tableRef, planNames, rows, tabtype, featuresColumnLabel }) {
    return (
        <div ref={tableRef} className='overflow-x-auto overflow-y-auto rounded-xl border border-slate-200 bg-white'>
            <table className='table-fixed min-w-max w-full border-collapse text-sm'>
                <thead className='bg-slate-50 sticky top-0 z-30'>
                    <tr className='border-b border-slate-200'>
                        <th className='w-[130px] px-3 py-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50 z-40 border-r border-slate-200'>
                            {featuresColumnLabel}
                        </th>
                        {planNames.map((name, index) => (
                            <th
                                key={index}
                                className='w-[100px] px-3 py-2 text-center text-sm font-semibold text-slate-900 border-l border-slate-200 capitalize'
                            >
                                {name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={row.label}
                            className={`border-b border-slate-100 last:border-b-0 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                        >
                            <td className='min-w-[160px] px-3 py-2 text-xs text-slate-700 font-semibold sticky left-0 bg-inherit z-20 border-r border-slate-100'>
                                {row.label}
                            </td>
                            {row.values.map((value, index) => (
                                <td key={index} className='w-[160px] px-3 py-2 text-center border-l border-slate-100'>
                                    {row.isPrice ? (
                                        <div className='flex flex-col h-full items-center gap-0.5'>
                                            <span className='text-base font-bold text-slate-900'>
                                                {value.display}
                                                <span className='text-xs font-normal text-slate-400 ml-0.5'>
                                                    /{tabtype === 'Monthly' ? 'mo' : 'yr'}
                                                </span>
                                            </span>
                                            {value.original && (
                                                <span className='text-xs text-slate-400 line-through'>
                                                    {value.original}
                                                </span>
                                            )}
                                            {value.label && (
                                                <span className='text-[10px] font-medium text-emerald-600 text-center'>
                                                    {value.label.split(' for ').map((part, i) => (
                                                        <span key={i}>
                                                            {i > 0 ? (
                                                                <>
                                                                    <br />
                                                                    for {part}
                                                                </>
                                                            ) : (
                                                                part
                                                            )}
                                                        </span>
                                                    ))}
                                                </span>
                                            )}
                                        </div>
                                    ) : row.isDiscount ? (
                                        <span
                                            className={`text-xs font-medium ${value === '—' ? 'text-slate-400' : 'text-emerald-600'}`}
                                        >
                                            {value}
                                        </span>
                                    ) : row.isService ? (
                                        <span
                                            className={`text-xs font-medium ${value === '—' ? 'text-slate-400' : 'text-slate-700'}`}
                                        >
                                            {value}
                                        </span>
                                    ) : value ? (
                                        <MdCheck className='mx-auto text-indigo-600' size={18} />
                                    ) : (
                                        <MdClose className='mx-auto text-slate-300' size={18} />
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function buildTableData(pricingData, tabtype, symbol, locale) {
    if (!Array.isArray(pricingData) || pricingData.length === 0) return null;
    const plans = pricingData.filter((p) => p?.type === tabtype);
    if (plans.length === 0) return null;

    const planNames = plans.map((p) => p?.name ?? 'Plan');
    const seen = new Set();
    const featureNames = [];
    plans.forEach((plan) => {
        (plan?.features ?? []).forEach((f) => {
            if (f?.name && !seen.has(f.name)) {
                seen.add(f.name);
                featureNames.push(f.name);
            }
        });
    });

    const featureRows = featureNames.map((name) => ({
        label: name,
        values: plans.map((plan) => {
            const match = (plan?.features ?? []).find((f) => f?.name === name);
            return match?.included ?? false;
        }),
    }));

    const seenServices = new Set();
    const serviceNames = [];
    plans.forEach((plan) => {
        (plan?.services ?? []).forEach((s) => {
            if (s?.name && !seenServices.has(s.name)) {
                seenServices.add(s.name);
                serviceNames.push(s.name);
            }
        });
    });

    const serviceRows = serviceNames.map((name) => ({
        label: name,
        isService: true,
        values: plans.map((plan) => {
            const s = (plan?.services ?? []).find((sv) => sv?.name === name);
            if (!s) return '—';
            const credit = s?.freeCredit;
            const isUnlimited = credit === -1 || credit === '-1';
            if (isUnlimited) return 'Unlimited';
            if (credit != null && Number(credit) > 0)
                return `${Number(credit).toLocaleString(locale || 'en-IN')} / month`;
            return '—';
        }),
    }));

    if (featureRows.length === 0) return null;

    const priceRow = {
        label: 'Price',
        isPrice: true,
        values: plans.map((plan) => {
            const discountedAmt = getDiscountedAmount(plan?.amount, plan?.discount);
            const display =
                discountedAmt != null
                    ? formatAmount(discountedAmt, symbol, locale)
                    : formatAmount(plan?.amount, symbol, locale);
            const original = discountedAmt != null ? formatAmount(plan?.amount, symbol, locale) : null;
            const label = getDiscountLabel(plan?.discount?.[0], symbol, locale);
            return { display, original, label };
        }),
    };

    const rows = [priceRow, ...serviceRows, ...featureRows];
    return { planNames, rows };
}

export default function ComparePlans({ pricingData, symbol, locale, pageData }) {
    const monthlyRef = useRef(null);
    const yearlyRef = useRef(null);
    const [activeTab, setActiveTab] = useState('Monthly');

    const activeRef = activeTab === 'Yearly' ? yearlyRef : monthlyRef;
    const scrollLeft = () => activeRef.current?.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
    const scrollRight = () => activeRef.current?.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });

    const { monthlyData, yearlyData } = useMemo(
        () => ({
            monthlyData: buildTableData(pricingData, 'Monthly', symbol, locale),
            yearlyData: buildTableData(pricingData, 'Yearly', symbol, locale),
        }),
        [pricingData, symbol, locale]
    );

    // Listen for tab changes from the parent pricing wrapper
    useEffect(() => {
        const section = document.getElementById('compare-plans');
        if (!section) return;
        const observer = new MutationObserver(() => {
            const monthlyPanel = section.querySelector('[data-tabpanel="Monthly"]');
            if (monthlyPanel) {
                setActiveTab(monthlyPanel.classList.contains('hidden') ? 'Yearly' : 'Monthly');
            }
        });
        const monthlyPanel = section.querySelector('[data-tabpanel="Monthly"]');
        if (monthlyPanel) {
            observer.observe(monthlyPanel, { attributes: true, attributeFilter: ['class'] });
        }
        return () => observer.disconnect();
    }, []);

    if (!monthlyData && !yearlyData) return null;

    return (
        <section id='compare-plans' className='w-full'>
            <div className='max-w-7xl'>
                <div className='flex py-4 items-center justify-between'>
                    <h3 className='text-2xl font-semibold text-slate-900'>{pageData?.comparePlansHeading}</h3>
                    <div className='hidden sm:flex items-center gap-2'>
                        <button
                            type='button'
                            onClick={scrollLeft}
                            aria-label='Scroll left to view previous plans'
                            className='w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors'
                        >
                            <MdChevronLeft size={20} aria-hidden='true' />
                        </button>
                        <button
                            type='button'
                            onClick={scrollRight}
                            aria-label='Scroll right to view more plans'
                            className='w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors'
                        >
                            <MdChevronRight size={20} aria-hidden='true' />
                        </button>
                    </div>
                </div>

                {/* Monthly table — visible by default */}
                {monthlyData && (
                    <div data-tabpanel='Monthly'>
                        <CompareTable
                            tableRef={monthlyRef}
                            planNames={monthlyData.planNames}
                            rows={monthlyData.rows}
                            tabtype='Monthly'
                            featuresColumnLabel={pageData?.featuresColumnLabel}
                        />
                    </div>
                )}

                {/* Yearly table — hidden by default */}
                {yearlyData && (
                    <div data-tabpanel='Yearly' className='hidden'>
                        <CompareTable
                            tableRef={yearlyRef}
                            planNames={yearlyData.planNames}
                            rows={yearlyData.rows}
                            tabtype='Yearly'
                            featuresColumnLabel={pageData?.featuresColumnLabel}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
