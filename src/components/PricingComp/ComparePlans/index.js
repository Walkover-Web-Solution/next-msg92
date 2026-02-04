import { useRef, useMemo } from 'react';
import { MdCheck, MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function ComparePlans({ pricingData, symbol, tabtype, pageData }) {
    const tableRef = useRef(null);

    const scrollLeft = () => {
        tableRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        tableRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const { planNames, rows } = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) {
            return { planNames: [], rows: [] };
        }
        const currencySymbol = symbol;
        const isMonthly = tabtype === 'Monthly';
        const hasAmountForTab = (plan) => (isMonthly ? plan?.amount?.monthly != null : plan?.amount?.yearly != null);
        const plansForTab = pricingData.filter(hasAmountForTab);

        const planNames = plansForTab.map((plan) => plan?.name ?? plan?.slug ?? 'Plan');

        const priceValues = plansForTab.map((plan) =>
            formatPrice(currencySymbol, isMonthly ? plan?.amount?.monthly : plan?.amount?.yearly)
        );

        const seen = new Set();
        const featureNames = [];
        plansForTab.forEach((plan) => {
            (plan?.plan_features ?? []).forEach((feature) => {
                const name =
                    (feature?.userFriendlyName ?? feature?.name ?? feature?.key ?? '')?.toString?.()?.trim() || '';
                if (name && !seen.has(name)) {
                    seen.add(name);
                    featureNames.push(name);
                }
            });
        });

        const featureLabel = (feature) =>
            (feature?.userFriendlyName ?? feature?.name ?? feature?.key ?? '')?.toString?.()?.trim() || '';
        const isIncluded = (feature) => feature?.feature?.is_included ?? feature?.is_included ?? false;
        const featureRows = featureNames.map((label) => ({
            label,
            values: plansForTab.map(
                (plan) =>
                    isIncluded(plan?.plan_features?.find((feature) => featureLabel(feature) === label) ?? {}) ?? false
            ),
        }));

        const rows = [{ label: 'Price', values: priceValues, isPrice: true }, ...featureRows];

        return { planNames, rows };
    }, [pricingData, symbol, tabtype]);

    const hasFeatures = rows.length > 1;
    if (planNames.length === 0 || !hasFeatures) return null;

    return (
        <section id='compare-plans' className='w-full py-6'>
            <div className='max-w-7xl'>
                <div className='flex py-4 items-center justify-between'>
                    <h3 className='text-2xl font-semibold text-gray-900'>{pageData?.comparePlansHeading}</h3>
                    <div className='flex items-center gap-2'>
                        <button
                            onClick={scrollLeft}
                            aria-label='Scroll left'
                            className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100'
                        >
                            <MdChevronLeft className='text-xl' />
                        </button>
                        <button
                            onClick={scrollRight}
                            aria-label='Scroll right'
                            className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100'
                        >
                            <MdChevronRight className='text-lg' />
                        </button>
                    </div>
                </div>

                <div ref={tableRef} className='h-[600px] overflow-x-auto rounded border border-gray-200 bg-white'>
                    <table className='table-fixed min-w-max w-full border-collapse text-sm'>
                        <thead className='bg-gray-50'>
                            <tr className='border-b border-gray-200'>
                                <th className='w-[200px] px-4 py-4 text-left font-medium text-gray-500 sticky left-0 bg-gray-50 z-20 border-r border-gray-200'>
                                    {pageData?.featuresColumnLabel}
                                </th>
                                {planNames.map((name, index) => (
                                    <th
                                        key={index}
                                        className='w-[150px] px-4 py-4 text-center font-semibold text-gray-900 border-l border-gray-200 capitalize'
                                    >
                                        {name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr key={row.label} className={`border-b border-gray-200 bg-white`}>
                                    <td className='w-[210px] px-4 py-4 text-gray-600 whitespace-nowrap sticky left-0 bg-inherit z-20 border-r border-gray-200'>
                                        {typeof row.label === 'object'
                                            ? String(row.label?.userFriendlyName ?? row.label?.key ?? '')
                                            : row.label}
                                    </td>
                                    {row.values.map((value, index) => (
                                        <td
                                            key={index}
                                            className='w-[180px] px-4 py-4 text-center border-l border-gray-200'
                                        >
                                            {row.isPrice ? (
                                                <span className='font-semibold text-green-600'>{value}</span>
                                            ) : value ? (
                                                <MdCheck className='mx-auto text-green-600 text-lg' />
                                            ) : (
                                                <MdClose className='mx-auto text-red-500 text-lg' />
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

function formatPrice(symbol, amount) {
    if (amount == null) return '—';
    const num = Number(amount);
    if (Number.isNaN(num)) return '—';
    return `${symbol}${num.toLocaleString('en-US')}`;
}
