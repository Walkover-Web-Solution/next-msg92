import React, { useState, useMemo } from 'react';

export default function DialPlan({ pricingData, symbol }) {
    const [search, setSearch] = useState('');

    const { headers, data, planName } = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) {
            return { headers: [], data: [], planName: null };
        }
        const planWithDial = pricingData.find((p) => p?.dial_plan?.data?.length > 0) ?? pricingData[0];
        const dp = planWithDial?.dial_plan ?? { headers: [], data: [] };
        let headers = Array.isArray(dp.headers) ? dp.headers : [];
        const data = Array.isArray(dp.data) ? dp.data : [];
        if (headers.length === 0 && data.length > 0 && typeof data[0] === 'object' && data[0] !== null) {
            headers = Object.keys(data[0]);
        }
        const name = planWithDial?.slug
            ? String(planWithDial.slug).charAt(0).toUpperCase() + String(planWithDial.slug).slice(1)
            : null;
        return { headers, data, planName: name };
    }, [pricingData]);
    const searchLower = search.trim().toLowerCase();
    const filteredData = useMemo(() => {
        if (!searchLower || !data?.length) return data ?? [];
        const firstKey =
            headers?.[0] ?? (typeof data[0] === 'object' && data[0] !== null ? Object.keys(data[0])[0] : null);
        if (!firstKey) return data;
        return data.filter((row) => {
            const val = Array.isArray(row) ? row[0] : row[firstKey];
            return String(val ?? '')
                .toLowerCase()
                .includes(searchLower);
        });
    }, [data, headers, searchLower]);

    if (!data?.length) return null;

    const colCount = headers?.length || (data[0] && typeof data[0] === 'object' ? Object.keys(data[0]).length : 0);

    return (
        <section className='w-full my-16'>
            <div className='mx-auto'>
                <div className='mb-8'>
                    <h2 className='text-2xl font-semibold text-gray-900'>Global Calling Rates</h2>
                    <p className='mt-2 text-sm text-gray-600'>
                        Experience premium voice quality with our competitive international calling rates. Connect with
                        customers worldwide without breaking the bank.
                    </p>
                </div>
                <div className='mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900'>Dialplan Rates</h3>
                        {planName && (
                            <p className='text-sm text-gray-600'>
                                Showing rates for <span className='font-medium text-blue-600'>{planName}</span> plan
                            </p>
                        )}
                    </div>
                    <div className='relative w-full sm:w-64'>
                        <input
                            type='text'
                            placeholder='Search...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                        />
                    </div>
                </div>
                <div className='rounded-xl border border-gray-200 bg-white'>
                    <div className='max-h-[420px] overflow-y-scroll scrollbar-none'>
                        <table className='w-full border-collapse text-sm'>
                            <thead className='sticky top-0 bg-gray-50 z-10'>
                                <tr className='border-b border-gray-200'>
                                    {(headers.length ? headers : colCount ? ['—'] : []).map((h, i) => (
                                        <th key={i} className='px-4 py-3 text-left font-medium text-gray-500'>
                                            {typeof h === 'string' ? h.toUpperCase() : h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((row, idx) => (
                                    <tr key={idx} className='border-b border-gray-200 last:border-b-0'>
                                        {Array.isArray(row)
                                            ? row.map((cell, i) => (
                                                  <td
                                                      key={i}
                                                      className={`px-4 py-3 ${i === row.length - 1 ? 'font-medium text-green-600' : 'text-gray-600'}`}
                                                  >
                                                      {cell}
                                                  </td>
                                              ))
                                            : Object.values(row).map((cell, i) => (
                                                  <td
                                                      key={i}
                                                      className={`px-4 py-3 ${i === Object.keys(row).length - 1 ? 'font-medium text-green-600' : 'text-gray-600'}`}
                                                  >
                                                      {cell}
                                                  </td>
                                              ))}
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={colCount || 4}
                                            className='px-4 py-6 text-center text-sm text-gray-500'
                                        >
                                            No results found
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
