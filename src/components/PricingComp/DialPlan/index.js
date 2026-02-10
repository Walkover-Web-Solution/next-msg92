import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';

const DEBOUNCE_DELAY = 400;
const SEARCHABLE_FIELDS = ['country_name', 'prefix'];
const MAX_TABLE_HEIGHT = '600px';
const EMPTY_ARRAY = [];

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

function findSelectedPlan(pricingData, selectedPlanSlug) {
    return (
        pricingData.find((plan) => plan.slug === selectedPlanSlug) ||
        pricingData.find((plan) =>
            plan?.services?.some((service) => {
                const dialPlan = service?.dialplan;
                return dialPlan?.data?.length > 0;
            })
        ) ||
        pricingData[0]
    );
}

function extractDialPlans(selectedPlan) {
    return (selectedPlan.services ?? [])
        .filter((service) => {
            const dialPlan = service?.dialplan;
            const hasColumns = dialPlan?.columns?.length > 0;
            const hasData = dialPlan?.data?.length > 0;
            return hasColumns && hasData;
        })
        .map((service) => {
            const dialPlan = service.dialplan;
            const serviceName = service.serviceName;
            return {
                serviceName,
                columns: dialPlan.columns,
                data: dialPlan.data,
            };
        });
}

const DialPlanTable = React.memo(function DialPlanTable({ columns, data, noResultsText }) {
    const hasData = data.length > 0;

    return (
        <div className='flex flex-col gap-2'>
            <div className='rounded border border-gray-200 bg-white max-w-7xl'>
                <div className='w-full overflow-x-auto'>
                    <div
                        style={{ maxHeight: MAX_TABLE_HEIGHT }}
                        className='overflow-y-auto border border-gray-300 rounded'
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

export default function DialPlan({ pricingData, selectedPlanSlug, selectedServiceName, pageData }) {
    const [search, setSearch] = useState('');
    const [activeService, setActiveService] = useState(selectedServiceName || '');
    const debouncedSearch = useDebouncedValue(search, DEBOUNCE_DELAY);

    useEffect(() => {
        setSearch('');
    }, [selectedPlanSlug]);

    useEffect(() => {
        if (selectedServiceName) {
            setActiveService(selectedServiceName);
        }
    }, [selectedServiceName]);

    const { dialPlans, planName } = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) {
            return { dialPlans: EMPTY_ARRAY, planName: null };
        }

        const selectedPlan = findSelectedPlan(pricingData, selectedPlanSlug);

        if (!selectedPlan) {
            return { dialPlans: EMPTY_ARRAY, planName: null };
        }

        const plans = extractDialPlans(selectedPlan);

        return {
            dialPlans: plans,
            planName: selectedPlan.name ?? selectedPlan.slug ?? null,
        };
    }, [pricingData, selectedPlanSlug]);

    useEffect(() => {
        if (dialPlans.length > 0 && !activeService) {
            setActiveService(dialPlans[0].serviceName);
        }
    }, [dialPlans, activeService]);

    const filteredDataByPlan = useMemo(() => {
        return dialPlans.map((dialPlan) => filterRowsBySearch(dialPlan.data, dialPlan.columns, debouncedSearch));
    }, [dialPlans, debouncedSearch]);

    const handleSearchChange = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    if (dialPlans.length === 0) {
        return null;
    }

    return (
        <section className='w-full py-4 flex flex-col gap-6'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <h3 className='text-lg sm:text-xl font-semibold'>{pageData?.dialplanRatesHeading}</h3>
                    {planName && activeService && (
                        <p className='text-md'>
                            {pageData?.showingRatesFor}{' '}
                            <span className='font-medium text-blue-600'>
                                {activeService} ({planName})
                            </span>{' '}
                        </p>
                    )}
                </div>

                <div className='w-full sm:w-64'>
                    <input
                        type='text'
                        placeholder={pageData?.searchPlaceholder}
                        value={search}
                        onChange={handleSearchChange}
                        className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        autoComplete='off'
                        aria-label='Search dial plan rates'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-8'>
                {dialPlans.map((dialPlan, planIndex) => {
                    const isActive = activeService === dialPlan.serviceName;
                    return (
                        <div
                            key={dialPlan.serviceName ?? `plan-${planIndex}`}
                            className={isActive ? 'block' : 'hidden'}
                            aria-hidden={!isActive}
                        >
                            <DialPlanTable
                                columns={dialPlan.columns}
                                data={filteredDataByPlan[planIndex] ?? []}
                                noResultsText={pageData?.noResults}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
