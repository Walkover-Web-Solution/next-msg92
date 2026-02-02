import React, { useEffect, useMemo, useState } from 'react';

export default function DialPlan({ pricingData, selectedPlanSlug, pageData }) {
    const [search, setSearch] = useState('');

    useEffect(() => {
        setSearch('');
    }, [selectedPlanSlug]);

    const { columns, data, planName } = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) {
            return { columns: [], data: [], planName: null };
        }

        const selectedPlan =
            pricingData.find((p) => p.slug === selectedPlanSlug) ||
            pricingData.find((p) => p?.dial_plan?.data?.length) ||
            pricingData[0];

        const dialPlan = selectedPlan?.dial_plan || {};

        return {
            columns: dialPlan.columns || [],
            data: dialPlan.data || [],
            planName: selectedPlan?.slug ?? null,
        };
    }, [pricingData, selectedPlanSlug]);

    const filteredData = useMemo(() => {
        if (!search?.trim() || !data.length) return data;

        const searchLower = search.trim().toLowerCase();
        return data.filter((row) =>
            columns.some((col) =>
                String(row[col.key] ?? '')
                    .toLowerCase()
                    .includes(searchLower)
            )
        );
    }, [data, columns, search]);

    if (!data.length || !columns.length) return null;

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

            <div className='rounded border border-gray-200 bg-white max-w-7xl '>
                <div className='w-full overflow-x-auto'>
                    <div className='max-h-[400px] overflow-y-auto border border-gray-300 rounded  '>
                        <table className='min-w-full border-collapse text-sm'>
                            <thead className='sticky top-0 z-10 bg-gray-100'>
                                <tr>
                                    {columns.map((col) => (
                                        <th
                                            key={col.key}
                                            className='
                px-4 py-3 
                text-left text-xs font-semibold tracking-wide
                border-b border-r border-gray-300
                whitespace-nowrap
              '
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className='bg-white'>
                                {filteredData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className='

              border-b border-gray-200 last:border-b-0
            '
                                    >
                                        {columns.map((col) => (
                                            <td
                                                key={col.key}
                                                className='
                  px-4 py-3 
                  text-gray-700
                  whitespace-nowrap
                  border-r border-gray-100 last:border-r-0
                '
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
        </section>
    );
}
