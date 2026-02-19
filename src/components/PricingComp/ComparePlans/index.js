import { useRef, useMemo } from 'react';
import { MdCheck, MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md';

const SCROLL_DISTANCE = 300;
const EMPTY_ARRAY = [];

function formatPrice(symbol, amount, locale = 'en-US') {
    if (amount == null) return '—';
    const num = Number(amount);
    if (Number.isNaN(num)) return '—';
    return `${symbol}${num.toLocaleString(locale)}`;
}

function getFeatureLabel(feature) {
    const userFriendlyName = feature?.userFriendlyName;
    const featureName = feature?.name;
    const featureKey = feature?.key;
    return (userFriendlyName ?? featureName ?? featureKey ?? '')?.toString?.()?.trim() || '';
}

function isFeatureIncluded(feature) {
    const nestedIncluded = feature?.feature?.is_included;
    const directIncluded = feature?.is_included;
    return nestedIncluded ?? directIncluded ?? false;
}

function extractUniqueFeatureNames(plans) {
    const seen = new Set();
    const featureNames = [];

    plans.forEach((plan) => {
        const planFeatures = plan?.plan_features ?? [];
        planFeatures.forEach((feature) => {
            const featureLabel = getFeatureLabel(feature);
            if (featureLabel && !seen.has(featureLabel)) {
                seen.add(featureLabel);
                featureNames.push(featureLabel);
            }
        });
    });

    return featureNames;
}

function buildFeatureRows(featureNames, plans) {
    return featureNames.map((featureLabel) => ({
        label: featureLabel,
        values: plans.map((plan) => {
            const planFeatures = plan?.plan_features;
            const matchingFeature = planFeatures?.find((f) => getFeatureLabel(f) === featureLabel);
            return isFeatureIncluded(matchingFeature ?? {});
        }),
    }));
}

function getPlansForTab(pricingData, tabtype) {
    const isMonthly = tabtype === 'Monthly';
    const hasAmountForTab = (plan) => {
        const planAmount = plan?.amount;
        return isMonthly ? planAmount?.monthly != null : planAmount?.yearly != null;
    };
    return pricingData.filter(hasAmountForTab);
}

export default function ComparePlans({ pricingData, symbol, tabtype, pageData }) {
    const tableRef = useRef(null);

    const scrollLeft = () => {
        tableRef.current?.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
    };

    const scrollRight = () => {
        tableRef.current?.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
    };

    const { planNames, rows } = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) {
            return { planNames: EMPTY_ARRAY, rows: EMPTY_ARRAY };
        }

        const isMonthly = tabtype === 'Monthly';
        const plansForTab = getPlansForTab(pricingData, tabtype);

        const planNames = plansForTab.map((plan) => {
            const planName = plan?.name;
            const planSlug = plan?.slug;
            return planName ?? planSlug ?? 'Plan';
        });

        // Use pre-computed discounted pricing
        const priceValues = plansForTab.map((plan) => {
            const pricing = isMonthly ? plan?.pricing?.monthly : plan?.pricing?.yearly;
            return pricing?.price ?? '—';
        });

        // Get discount labels for display
        const discountLabels = plansForTab.map((plan) => {
            const pricing = isMonthly ? plan?.pricing?.monthly : plan?.pricing?.yearly;
            return pricing?.discountLabel ?? null;
        });

        const uniqueFeatureNames = extractUniqueFeatureNames(plansForTab);
        const featureRows = buildFeatureRows(uniqueFeatureNames, plansForTab);

        const priceRow = { label: 'Price', values: priceValues, discountLabels, isPrice: true };
        const rows = [priceRow, ...featureRows];

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
                            type='button'
                            onClick={scrollLeft}
                            aria-label='Scroll left to view previous plans'
                            className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100'
                        >
                            <MdChevronLeft className='text-xl' aria-hidden='true' />
                        </button>
                        <button
                            type='button'
                            onClick={scrollRight}
                            aria-label='Scroll right to view more plans'
                            className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100'
                        >
                            <MdChevronRight className='text-lg' aria-hidden='true' />
                        </button>
                    </div>
                </div>

                <div
                    ref={tableRef}
                    className='overflow-x-auto overflow-y-auto rounded border border-gray-200 bg-white'
                    style={{ maxHeight: '600px' }}
                >
                    <table className='table-fixed min-w-max w-full border-collapse text-sm'>
                        <thead className='bg-gray-50 sticky top-0 z-30'>
                            <tr className='border-b border-gray-200'>
                                <th className='w-[200px] px-4 py-4 text-left font-medium text-gray-500 sticky left-0 bg-gray-50 z-40 border-r border-gray-200'>
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
                                        {row.label}
                                    </td>
                                    {row.values.map((value, index) => (
                                        <td
                                            key={index}
                                            className='w-[180px] px-4 py-4 text-center border-l border-gray-200'
                                        >
                                            {row.isPrice ? (
                                                <div className='flex flex-col gap-0.5'>
                                                    <span className='font-semibold text-green-600'>
                                                        {value}
                                                        {tabtype === 'Monthly' ? '/month' : '/year'}
                                                    </span>
                                                    {row.discountLabels?.[index] && (
                                                        <span className='text-xs text-gray-500'>
                                                            {row.discountLabels[index]}
                                                        </span>
                                                    )}
                                                </div>
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
