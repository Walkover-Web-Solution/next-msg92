import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { DEBOUNCE_DELAY, SEARCHABLE_FIELDS, MAX_TABLE_HEIGHT, EMPTY_ARRAY } from '../constants';

const SCROLL_DISTANCE = 400;

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
        const planName = plan?.name ?? plan?.slug ?? '';
        for (const service of plan?.services ?? []) {
            const dialPlan = service?.dialPlan;
            const serviceName = service?.serviceName ?? service?.name;
            if (serviceName && !seen.has(serviceName) && dialPlan?.columns?.length > 0 && dialPlan?.data?.length > 0) {
                seen.add(serviceName);
                result.push({ serviceName, planName, columns: dialPlan.columns, data: dialPlan.data });
            }
        }
    }
    return result;
}

const DialPlanTable = React.memo(function DialPlanTable({
    columns,
    data,
    noResultsText,
    search,
    onSearchChange,
    searchPlaceholder,
}) {
    const hasData = data.length > 0;
    const visibleColumns = columns.filter((col) => col.key !== 'prefix');
    const tableRef = useRef(null);

    const scrollLeft = () => tableRef.current?.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
    const scrollRight = () => tableRef.current?.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between gap-4'>
                <input
                    type='text'
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={onSearchChange}
                    className='w-full max-w-xs rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 transition-colors'
                    autoComplete='off'
                    aria-label='Search dial plan rates'
                />
                <div className='flex items-center gap-2'>
                    <button
                        type='button'
                        onClick={scrollLeft}
                        aria-label='Scroll left'
                        className='w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors'
                    >
                        <MdChevronLeft size={18} />
                    </button>
                    <button
                        type='button'
                        onClick={scrollRight}
                        aria-label='Scroll right'
                        className='w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors'
                    >
                        <MdChevronRight size={18} />
                    </button>
                </div>
            </div>
            <div className='w-full overflow-x-auto'>
                <div className='overflow-y-auto rounded-xl border border-slate-200 bg-white' ref={tableRef}>
                    <table className='table-fixed min-w-max w-full border-collapse text-sm'>
                        <thead className='sticky top-0 z-30 bg-slate-50'>
                            <tr className='border-b border-slate-200'>
                                {visibleColumns.map((column, colIndex) => (
                                    <th
                                        key={column.key}
                                        className={`min-w-[130px] px-3 py-2 text-left text-[10px] md:text-[12px] leading-3 md:leading-4 font-medium text-slate-400 border-r border-slate-200 last:border-r-0 ${
                                            colIndex === 0 ? 'w-[140px] sticky left-0 bg-slate-50 z-40' : ''
                                        }`}
                                    >
                                        {column?.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hasData ? (
                                data.map((row, index) => {
                                    const rowKey = row.id ?? row.country_name ?? `row-${index}`;
                                    const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-50';
                                    return (
                                        <tr
                                            key={rowKey}
                                            className={`border-b border-slate-100 last:border-b-0 ${rowBg}`}
                                        >
                                            {visibleColumns.map((col, colIndex) => (
                                                <td
                                                    key={col.key}
                                                    className={`px-3 py-2 text-xs text-slate-600 border-r border-slate-100 last:border-r-0 ${
                                                        colIndex === 0
                                                            ? `sticky left-0 ${rowBg} z-20 font-medium text-slate-700 border-r`
                                                            : ''
                                                    }`}
                                                >
                                                    {col.key === 'country_name' && row['prefix']
                                                        ? `${row[col.key] ?? '-'} (${row['prefix']})`
                                                        : (row[col.key] ?? '-')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={visibleColumns.length}
                                        className='px-5 py-8 text-center text-sm text-slate-400'
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
    );
});

export default function DialPlan({ pricingData, selectedServiceName, pageData }) {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search, DEBOUNCE_DELAY);

    const dialPlans = useMemo(() => {
        if (!Array.isArray(pricingData) || pricingData.length === 0) return EMPTY_ARRAY;
        return extractAllDialPlans(pricingData);
    }, [pricingData]);

    const filteredDataByPlan = useMemo(() => {
        return dialPlans.map((dialPlan) => filterRowsBySearch(dialPlan.data, dialPlan.columns, debouncedSearch));
    }, [dialPlans, debouncedSearch]);

    useEffect(() => {
        setSearch('');
    }, [selectedServiceName]);

    const handleSearchChange = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    if (dialPlans.length === 0) {
        return null;
    }

    const normalizedSelected = selectedServiceName?.trim().toLowerCase();
    const activeIndex = normalizedSelected
        ? dialPlans.findIndex((d) => d.serviceName?.trim().toLowerCase() === normalizedSelected)
        : -1;
    const activePlan = dialPlans[activeIndex >= 0 ? activeIndex : 0];
    const activeData = filteredDataByPlan[activeIndex >= 0 ? activeIndex : 0] ?? [];

    return (
        <section className='w-full py-4 flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <h3 className='text-2xl font-semibold text-slate-900'>{pageData?.dialplanRatesHeading}</h3>
                    {activePlan?.serviceName && (
                        <p className='text-sm text-slate-500 mt-1'>
                            {pageData?.showingRatesFor}{' '}
                            <span className='font-semibold text-slate-700'>{activePlan.serviceName}</span>
                            {activePlan?.planName && (
                                <>
                                    <span className='font-semibold text-slate-700'> ({activePlan.planName})</span>
                                </>
                            )}
                        </p>
                    )}
                </div>
            </div>

            <DialPlanTable
                columns={activePlan.columns}
                data={activeData}
                noResultsText={pageData?.noResults}
                search={search}
                onSearchChange={handleSearchChange}
                searchPlaceholder={pageData?.searchPlaceholder}
            />
        </section>
    );
}
