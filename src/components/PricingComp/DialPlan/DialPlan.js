import React, { useEffect, useMemo, useState } from 'react';

export default function DialPlan({ pricingData, selectedPlanSlug, pageData }) {
    const [search, setSearch] = useState('');

    useEffect(() => {
        setSearch('');
    }, [selectedPlanSlug]);

    const { dialPlans, planName } = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) {
            return { dialPlans: [], planName: null };
        }

        const selectedPlan =
            pricingData.find((plan) => plan.slug === selectedPlanSlug) ||
            pricingData.find((plan) => plan?.included?.some((item) => item?.dial_plan?.data?.length > 0)) ||
            pricingData[0];

        const plans = (selectedPlan?.included ?? [])
            .filter((item) => item?.dial_plan?.columns?.length && item?.dial_plan?.data?.length)
            .map((item) => ({
                service_name: item.service_name,
                columns: item.dial_plan.columns,
                data: item.dial_plan.data,
            }));
        return {
            dialPlans: plans,
            planName: selectedPlan?.slug ?? null,
        };
    }, [pricingData, selectedPlanSlug]);

    const filteredDataByPlan = useMemo(
        () => dialPlans.map((dialPlan) => filterRowsBySearch(dialPlan.data, dialPlan.columns, search)),
        [dialPlans, search]
    );

    if (!dialPlans.length) return null;

    return (
        <section className='w-full py-4 flex flex-col gap-6'>
            <div className='flex flex-col'>
                <h2 className='text-2xl sm:text-3xl font-semibold'>{pageData?.heading}</h2>
                <p className='text-md text-gray-600'>{pageData?.description}</p>
            </div>

            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <h3 className='text-lg sm:text-xl font-semibold'>{pageData?.dialplanRatesHeading}</h3>
                    {planName && (
                        <p className='text-md'>
                            {pageData?.showingRatesFor} <span className='font-medium text-blue-600'>{planName}</span>{' '}
                            {pageData?.planLabelSuffix}
                        </p>
                    )}
                </div>

                <input
                    type='text'
                    placeholder={pageData?.searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full sm:w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                />
            </div>

            <div className='flex flex-col gap-8'>
                {dialPlans.map((dialPlan, planIndex) => {
                    const { service_name, columns } = dialPlan;
                    const filteredData = filteredDataByPlan[planIndex] || [];

                    return (
                        <div key={planIndex} className='flex flex-col gap-2'>
                            {service_name && <h4 className='text-base font-semibold text-gray-800'>{service_name}</h4>}
                            <div className='rounded border border-gray-200 bg-white max-w-7xl'>
                                <div className='w-full overflow-x-auto'>
                                    <div className='max-h-[400px] overflow-y-auto border border-gray-300 rounded'>
                                        <table className='min-w-full border-collapse text-sm'>
                                            <thead className='sticky top-0 z-10 bg-gray-100'>
                                                <tr>
                                                    {columns.map((col) => (
                                                        <th
                                                            key={col.key}
                                                            className='px-4 py-3 text-left text-xs font-semibold tracking-wide border-b border-r border-gray-300 whitespace-nowrap'
                                                        >
                                                            {col.label}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className='bg-white'>
                                                {filteredData.map((row, index) => (
                                                    <tr
                                                        key={index}
                                                        className='border-b border-gray-200 last:border-b-0'
                                                    >
                                                        {columns.map((col) => (
                                                            <td
                                                                key={col.key}
                                                                className='px-4 py-3 text-gray-700 whitespace-nowrap border-r border-gray-100 last:border-r-0'
                                                            >
                                                                {row[col.key] ?? '-'}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                                {filteredData.length === 0 && (
                                                    <tr>
                                                        <td
                                                            colSpan={columns.length}
                                                            className='px-4 py-6 text-center text-sm text-gray-500'
                                                        >
                                                            {pageData?.noResults}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function filterRowsBySearch(data, columns, search) {
    if (!search?.trim() || !data?.length) return data;
    const searchLower = search.trim().toLowerCase();
    return data.filter((row) =>
        columns.some((col) =>
            String(row[col.key] ?? '')
                .toLowerCase()
                .includes(searchLower)
        )
    );
}
