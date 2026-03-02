import { useRef, useMemo } from 'react';
import { MdCheckCircleOutline, MdCancel, MdChevronLeft, MdChevronRight } from 'react-icons/md';

const SCROLL_DISTANCE = 300;
const EMPTY_ARRAY = [];

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

export default function ComparePlans({ pricingData, symbol, locale, tabtype, pageData }) {
    const tableRef = useRef(null);

    const scrollLeft = () => tableRef.current?.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
    const scrollRight = () => tableRef.current?.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });

    const { planNames, rows } = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) {
            return { planNames: EMPTY_ARRAY, rows: EMPTY_ARRAY };
        }

        const plans = pricingData.filter((p) => p?.type === tabtype);
        if (plans.length === 0) return { planNames: EMPTY_ARRAY, rows: EMPTY_ARRAY };

        const planNames = plans.map((p) => p?.name ?? 'Plan');

        // Collect all unique feature names
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

        if (featureRows.length === 0) return { planNames: EMPTY_ARRAY, rows: EMPTY_ARRAY };

        const rows = [priceRow, ...featureRows];
        return { planNames, rows };
    }, [pricingData, tabtype, symbol, locale]);

    if (planNames.length === 0 || rows.length === 0) return null;

    return (
        <section id='compare-plans' className='w-full py-6'>
            <div className='max-w-7xl'>
                <div className='flex py-4 items-center justify-between'>
                    <h3 className='text-2xl font-semibold text-slate-900'>{pageData?.comparePlansHeading}</h3>
                    <div className='flex items-center gap-2'>
                        <button
                            type='button'
                            onClick={scrollLeft}
                            aria-label='Scroll left to view previous plans'
                            className='w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors'
                        >
                            <MdChevronLeft size={18} aria-hidden='true' />
                        </button>
                        <button
                            type='button'
                            onClick={scrollRight}
                            aria-label='Scroll right to view more plans'
                            className='w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors'
                        >
                            <MdChevronRight size={18} aria-hidden='true' />
                        </button>
                    </div>
                </div>

                <div
                    ref={tableRef}
                    className='overflow-x-auto overflow-y-auto rounded-xl border border-slate-200 bg-white'
                    style={{ maxHeight: '600px' }}
                >
                    <table className='table-fixed min-w-max w-full border-collapse text-sm'>
                        <thead className='bg-slate-50 sticky top-0 z-30'>
                            <tr className='border-b border-slate-200'>
                                <th className='w-[200px] px-5 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50 z-40 border-r border-slate-200'>
                                    {pageData?.featuresColumnLabel}
                                </th>
                                {planNames.map((name, index) => (
                                    <th
                                        key={index}
                                        className='w-[160px] px-5 py-4 text-center text-sm font-semibold text-slate-900 border-l border-slate-200 capitalize'
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
                                    className={`border-b border-slate-100 last:border-b-0 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                                >
                                    <td className='w-[210px] px-5 py-3.5 text-sm text-slate-600 whitespace-nowrap sticky left-0 bg-inherit z-20 border-r border-slate-100'>
                                        {row.label}
                                    </td>
                                    {row.values.map((value, index) => (
                                        <td
                                            key={index}
                                            className='w-[160px] px-5 py-3.5 text-center border-l border-slate-100'
                                        >
                                            {row.isPrice ? (
                                                <div className='flex flex-col items-center gap-0.5'>
                                                    {value.original && (
                                                        <span className='text-xs text-slate-400 line-through'>
                                                            {value.original}
                                                        </span>
                                                    )}
                                                    <span className='font-bold text-slate-900'>
                                                        {value.display}
                                                        <span className='text-xs font-normal text-slate-400 ml-0.5'>
                                                            /{tabtype === 'Monthly' ? 'mo' : 'yr'}
                                                        </span>
                                                    </span>
                                                    {value.label && (
                                                        <span className='text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md'>
                                                            {value.label}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : value ? (
                                                <MdCheckCircleOutline className='mx-auto text-indigo-600' size={18} />
                                            ) : (
                                                <MdCancel className='mx-auto text-slate-300' size={18} />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
