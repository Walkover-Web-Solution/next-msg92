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
        if (!search || !data.length) return data;

        const firstKey = columns[0]?.key;
        if (!firstKey) return data;

        return data.filter((row) =>
            String(row[firstKey] ?? '')
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [data, columns, search]);

    if (!data.length || !columns.length) return null;

    return (
        <section className='w-full my-16'>
            <div className='mx-auto'>
                <div className='mb-8'>
                    <h2 className='text-2xl font-semibold text-gray-900'>{pageData?.heading}</h2>
                    <p className='mt-2 text-sm text-gray-600'>{pageData?.description}</p>
                </div>

                <div className='mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900'>{pageData?.dialplanRatesHeading}</h3>
                        {planName && (
                            <p className='text-sm text-gray-600'>
                                {pageData?.showingRatesFor}{' '}
                                <span className='font-medium text-blue-600'>{planName}</span>{' '}
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

                <div className='rounded-xl border border-gray-200 bg-white'>
                    <div className='max-h-[420px] overflow-x-auto overflow-y-auto'>
                        <table className='min-w-max w-full border-collapse text-sm'>
                            <thead className='sticky top-0 bg-gray-50 z-10'>
                                <tr className='border-b border-gray-200'>
                                    {columns.map((col) => (
                                        <th
                                            key={col.key}
                                            className='px-4 py-3 text-left font-medium text-gray-500 uppercase whitespace-nowrap text-xs tracking-wide'
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.map((row, idx) => (
                                    <tr key={idx} className='border-b border-gray-200 last:border-b-0'>
                                        {columns.map((col) => (
                                            <td key={col.key} className='px-4 py-3 text-gray-600 whitespace-nowrap'>
                                                {row[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan={columns.length} className='px-4 py-6 text-center text-gray-500'>
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
