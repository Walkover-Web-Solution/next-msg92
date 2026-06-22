import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import normalizeDialPlanInfo from '@/utils/pricing/normalizeDialPlanInfo';
import { DEBOUNCE_DELAY, DIAL_PLAN_PER_PAGE, EMPTY_ARRAY } from '../constants';

const SCROLL_DISTANCE = 400;

function hasDialPlanServices(pricingData) {
    if (!Array.isArray(pricingData)) return false;
    return pricingData.some((plan) =>
        (plan?.services ?? []).some((s) => s?.dialPlan?.serviceId && s?.dialPlan?.dialPlanId)
    );
}

function findActivePlan(pricingData, selection) {
    if (!selection?.serviceName || !selection?.planName || !Array.isArray(pricingData)) return null;

    const serviceName = selection.serviceName.trim().toLowerCase();
    const planName = selection.planName.trim().toLowerCase();
    const planType = selection.planType?.trim().toLowerCase();

    for (const plan of pricingData) {
        if (plan?.name?.trim().toLowerCase() !== planName) continue;
        if (planType && plan?.type?.trim().toLowerCase() !== planType) continue;

        for (const service of plan?.services ?? []) {
            const { serviceId, dialPlanId } = service?.dialPlan ?? {};
            if (service?.name?.trim().toLowerCase() === serviceName && serviceId && dialPlanId) {
                return {
                    serviceName: service.name,
                    planName: plan.name,
                    serviceId,
                    dialPlanId,
                };
            }
        }
    }

    return null;
}

async function fetchDialPlanData({ serviceId, dialPlanId, currency, pageNo, search }) {
    const params = new URLSearchParams({
        service_id: String(serviceId),
        dial_plan_id: String(dialPlanId),
        currency: String(currency),
        page_no: String(pageNo),
        per_page: String(DIAL_PLAN_PER_PAGE),
    });
    if (search) params.set('search', search);

    const res = await fetch(`/api/pricing/fetchDialPlanInfo?${params}`);
    const json = await res.json();
    if (!res.ok || json.hasError) throw json;
    return json;
}

function getDialPlanErrorMessage(err) {
    if (err?.message) return err.message;
    return Object.values(err?.errors ?? {}).flat()[0];
}

function formatCellValue(col, row, currency) {
    if (col.key === 'country_name' && (row['prefix'] || row['country_prefix'])) {
        return `${row[col.key] ?? '-'} (${row['prefix'] ?? row['country_prefix']})`;
    }
    const val = row[col.key];
    if (col.key === 'country_name' || val == null || val === '' || val === '-') return val ?? '-';
    const num = Number(val);
    if (!Number.isNaN(num) && currency && !col.key.toLowerCase().includes('id')) {
        return `${val} ${currency}`;
    }
    return val;
}

function DialPlanTable({
    columns,
    data,
    search,
    onSearchChange,
    searchPlaceholder,
    currency,
    pagination,
    onPageChange,
    loading,
    loaded,
}) {
    const visibleColumns = columns.filter((col) => col.key !== 'prefix' && col.key !== 'country_prefix');
    const tableRef = useRef(null);
    const { total_pages: totalPages, current_page: currentPage } = pagination ?? {};
    const colSpan = visibleColumns.length || 1;

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
                <div className='hidden sm:flex items-center gap-2'>
                    <button
                        type='button'
                        onClick={() => tableRef.current?.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' })}
                        aria-label='Scroll left'
                        className='w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors'
                    >
                        <MdChevronLeft size={20} />
                    </button>
                    <button
                        type='button'
                        onClick={() => tableRef.current?.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' })}
                        aria-label='Scroll right'
                        className='w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors'
                    >
                        <MdChevronRight size={20} />
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
                                            colIndex === 0 ? 'min-w-[140px] sticky left-0 bg-slate-50 z-40' : ''
                                        }`}
                                    >
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={colSpan} className='px-5 py-8 text-center text-sm text-slate-400'>
                                        Loading...
                                    </td>
                                </tr>
                            ) : data.length > 0 ? (
                                data.map((row, index) => {
                                    const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-50';
                                    return (
                                        <tr
                                            key={`row-${index}`}
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
                                                    {formatCellValue(col, row, currency)}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                            ) : loaded ? (
                                <tr>
                                    <td colSpan={colSpan} className='px-5 py-8 text-center text-sm text-slate-400'>
                                        No data available
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </div>
            {totalPages > 1 && (
                <div className='flex items-center justify-center gap-3'>
                    <button
                        type='button'
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1 || loading}
                        className='flex items-center gap-1 px-3 py-2 rounded border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed'
                        aria-label='Previous page'
                    >
                        <MdChevronLeft size={18} />
                        Previous
                    </button>
                    <span className='text-sm text-slate-500'>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        type='button'
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || loading}
                        className='flex items-center gap-1 px-3 py-2 rounded border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed'
                        aria-label='Next page'
                    >
                        Next
                        <MdChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default function DialPlan({ pricingData, selection, pageData, currency }) {
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [pageNo, setPageNo] = useState(1);
    const [columns, setColumns] = useState(EMPTY_ARRAY);
    const [data, setData] = useState(EMPTY_ARRAY);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const activePlan = useMemo(() => findActivePlan(pricingData, selection), [pricingData, selection]);

    useEffect(() => {
        if (search.trim() === '') {
            setSearchQuery('');
            return;
        }
        const timeout = setTimeout(() => setSearchQuery(search.trim()), DEBOUNCE_DELAY);
        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        setSearch('');
        setSearchQuery('');
        setPageNo(1);
        setLoaded(false);
    }, [selection]);

    useEffect(() => {
        setPageNo(1);
        setLoaded(false);
    }, [searchQuery]);

    useEffect(() => {
        if (!activePlan?.serviceId || !activePlan?.dialPlanId || !currency) return;

        let cancelled = false;
        setLoading(true);

        fetchDialPlanData({
            serviceId: activePlan.serviceId,
            dialPlanId: activePlan.dialPlanId,
            currency,
            pageNo,
            search: searchQuery,
        })
            .then((json) => {
                if (cancelled) return;
                const normalized = normalizeDialPlanInfo(json.data);
                setColumns(normalized.columns);
                setData(normalized.data);
                setPagination(json.data.pagination);
                setLoaded(true);
            })
            .catch((err) => {
                if (!cancelled) toast.error(getDialPlanErrorMessage(err));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [activePlan?.serviceId, activePlan?.dialPlanId, currency, pageNo, searchQuery]);

    const handleSearchChange = useCallback((e) => setSearch(e.target.value), []);

    if (!hasDialPlanServices(pricingData) || !activePlan) return null;

    return (
        <section className='w-full py-4 flex flex-col gap-4'>
            <div>
                <h3 className='text-2xl font-semibold text-slate-900'>{pageData?.dialplanRatesHeading}</h3>
                {activePlan?.serviceName && (
                    <p className='text-sm text-slate-500 mt-1'>
                        {pageData?.showingRatesFor}{' '}
                        <span className='font-semibold text-slate-700'>{activePlan.serviceName}</span>
                        {activePlan.planName && (
                            <span className='font-semibold text-slate-700'> ({activePlan.planName})</span>
                        )}
                    </p>
                )}
            </div>
            <DialPlanTable
                columns={columns}
                data={data}
                search={search}
                onSearchChange={handleSearchChange}
                searchPlaceholder={pageData?.searchPlaceholder}
                currency={currency}
                pagination={pagination}
                onPageChange={setPageNo}
                loading={loading}
                loaded={loaded}
            />
        </section>
    );
}
