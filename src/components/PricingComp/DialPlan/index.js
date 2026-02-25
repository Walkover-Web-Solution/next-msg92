import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { DEBOUNCE_DELAY, SEARCHABLE_FIELDS, MAX_TABLE_HEIGHT, EMPTY_ARRAY } from '../constants';

function useDebouncedValue(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (value === debouncedValue) return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (value === '') {
            setDebouncedValue('');
            return;
        }

        timeoutRef.current = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, delay, debouncedValue]);

    return debouncedValue;
}

function getSearchableKeys(columns) {
    return columns.filter((col) => SEARCHABLE_FIELDS.includes(col.key)).map((col) => col.key);
}

function matchesSearchQuery(row, searchableKeys, query) {
    return searchableKeys.some((key) => {
        const value = String(row[key] ?? '').toLowerCase();
        return value.includes(query);
    });
}

function filterRowsBySearch(data, columns, searchTerm) {
    if (!searchTerm?.trim() || !data?.length) {
        return data;
    }

    const query = searchTerm.trim().toLowerCase();
    const searchableKeys = getSearchableKeys(columns);

    if (searchableKeys.length === 0) {
        return data;
    }

    return data.filter((row) => matchesSearchQuery(row, searchableKeys, query));
}

function extractAllDialPlans(pricingData) {
    const seen = new Set();
    const result = [];
    for (const plan of pricingData) {
        for (const service of plan?.services ?? []) {
            const dialPlan = service?.dialPlan;
            const serviceName = service?.serviceName ?? service?.name;
            if (serviceName && !seen.has(serviceName) && dialPlan?.columns?.length > 0 && dialPlan?.data?.length > 0) {
                seen.add(serviceName);
                result.push({ serviceName, columns: dialPlan.columns, data: dialPlan.data });
            }
        }
    }
    return result;
}

const DialPlanTable = React.memo(function DialPlanTable({ columns, data, noResultsText }) {
    const hasData = data.length > 0;

    return (
        <div className='flex flex-col gap-2'>
            <div className='max-w-7xl'>
                <div className='w-full overflow-x-auto'>
                    <div
                        style={{ maxHeight: MAX_TABLE_HEIGHT }}
                        className='overflow-y-auto border border-gray-200 rounded'
                    >
                        <table className='min-w-full border-collapse text-sm'>
                            <thead className='sticky top-0 z-10 bg-gray-100'>
                                <tr>
                                    {columns.map((column) => (
                                        <th
                                            key={column.key}
                                            className='px-4 py-3 text-left text-xs font-semibold tracking-wide border-b border-r border-gray-300 whitespace-nowrap'
                                        >
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {hasData ? (
                                    data.map((row, index) => {
                                        const rowKey = row.id ?? row.country_name ?? `row-${index}`;
                                        return (
                                            <tr key={rowKey} className='border-b border-gray-200 last:border-b-0'>
                                                {columns.map((col) => (
                                                    <td
                                                        key={col.key}
                                                        className='px-4 py-3 text-gray-700 whitespace-nowrap border-r border-gray-100 last:border-r-0'
                                                    >
                                                        {row[col.key] ?? '-'}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={columns.length}
                                            className='px-4 py-6 text-center text-sm text-gray-500'
                                        >
                                            {noResultsText}
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
});

export default function DialPlan({ pricingData, selectedServiceName, pageData }) {
    const [search, setSearch] = useState('');
    const [activeService, setActiveService] = useState('');
    const debouncedSearch = useDebouncedValue(search, DEBOUNCE_DELAY);

    const dialPlans = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) return EMPTY_ARRAY;
        return extractAllDialPlans(pricingData);
    }, [pricingData]);

    // Default to selectedServiceName if present in dialPlans, else first dialPlan service found
    useEffect(() => {
        if (dialPlans.length === 0) return;
        const serviceNames = dialPlans.map((d) => d.serviceName);
        const preferred =
            selectedServiceName && serviceNames.includes(selectedServiceName) ? selectedServiceName : serviceNames[0];
        setActiveService(preferred);
        setSearch('');
    }, [dialPlans, selectedServiceName]);

    const filteredDataByPlan = useMemo(() => {
        return dialPlans.map((dialPlan) => filterRowsBySearch(dialPlan.data, dialPlan.columns, debouncedSearch));
    }, [dialPlans, debouncedSearch]);

    const handleSearchChange = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    if (dialPlans.length === 0) {
        return null;
    }

    const activeIndex = dialPlans.findIndex((d) => d.serviceName === activeService);
    const activeDialPlan = dialPlans[activeIndex] ?? dialPlans[0];
    const activeData = filteredDataByPlan[activeIndex] ?? filteredDataByPlan[0] ?? [];

    return (
        <section className='w-full py-4 flex flex-col gap-6'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <h3 className='text-lg sm:text-xl font-semibold'>{pageData?.dialplanRatesHeading}</h3>
                    {activeDialPlan?.serviceName && (
                        <p className='text-md'>
                            {pageData?.showingRatesFor} <span className='font-bold'>{activeDialPlan.serviceName}</span>
                        </p>
                    )}
                </div>

                <div className='w-full sm:w-64'>
                    <input
                        type='text'
                        placeholder={pageData?.searchPlaceholder}
                        value={search}
                        onChange={handleSearchChange}
                        className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1'
                        autoComplete='off'
                        aria-label='Search dial plan rates'
                    />
                </div>
            </div>

            {dialPlans.length > 1 && (
                <div className='inline-flex w-fit rounded border border-gray-200 bg-white p-1'>
                    {dialPlans.map((dp) => (
                        <button
                            key={dp.serviceName}
                            type='button'
                            onClick={() => {
                                setActiveService(dp.serviceName);
                                setSearch('');
                            }}
                            className={`px-4 py-1.5 text-sm font-medium rounded transition ${activeService === dp.serviceName ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            {dp.serviceName}
                        </button>
                    ))}
                </div>
            )}

            {activeDialPlan && (
                <DialPlanTable columns={activeDialPlan.columns} data={activeData} noResultsText={pageData?.noResults} />
            )}
        </section>
    );
}
