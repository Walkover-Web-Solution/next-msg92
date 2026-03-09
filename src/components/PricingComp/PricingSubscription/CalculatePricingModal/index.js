import { useState, useMemo, useCallback } from 'react';
import { MdClose, MdInfoOutline } from 'react-icons/md';

const EMPTY_ARRAY = [];
const UNLIMITED_CREDIT_VALUE = -1;
const UNLIMITED_CREDIT_STRING = '-1';

const INPUT_MIN = 0;
const INPUT_MAX = 9999999999;
const DEFAULT_FALLBACK_VALUE = 100;

const SERVICE_DEFAULTS = {
    'Inbox': 5,
    'Tickets': 100000,
    'Emails': 100000,
    'Email Validations': 50000,
    'Contacts': 100000,
};

export default function CalculatePricingModal({ plans, symbol, tabtype, locale = 'en-US', onClose }) {
    const plansForTab = useMemo(() => getPlansForTab(plans, tabtype), [plans, tabtype]);

    const visibleServiceNames = useMemo(() => getServiceNamesInAllPlans(plansForTab), [plansForTab]);

    const [usageByService, setUsageByService] = useState(() => initializeUsageState(visibleServiceNames));
    const [validationError, setValidationError] = useState('');

    const handleUsageChange = useCallback((serviceName, value) => {
        if (value === '') {
            setUsageByService((prev) => ({ ...prev, [serviceName]: value }));
            setValidationError('');
            return;
        }
        const numValue = Number(value);
        if (!Number.isNaN(numValue) && numValue >= INPUT_MIN && numValue <= INPUT_MAX) {
            setUsageByService((prev) => ({ ...prev, [serviceName]: value }));
        }
        setValidationError('');
    }, []);

    const usageAsNumbers = useMemo(
        () => normalizeUsageToNumbers(visibleServiceNames, usageByService),
        [visibleServiceNames, usageByService]
    );

    const results = useMemo(() => {
        if (!Array.isArray(plansForTab) || plansForTab.length === 0) return EMPTY_ARRAY;
        return plansForTab.map((plan) => ({
            plan,
            title: getPlanTitle(plan),
            ...computePlanTotal(plan, tabtype, usageAsNumbers),
        }));
    }, [plansForTab, tabtype, usageAsNumbers]);

    const handleClose = useCallback(() => {
        setUsageByService(initializeUsageState(visibleServiceNames));
        setValidationError('');
        onClose?.();
    }, [visibleServiceNames, onClose]);

    return (
        <div className='modal-box max-w-[900px] max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-6'>
            <button
                type='button'
                onClick={handleClose}
                className='btn btn-md btn-circle btn-ghost absolute right-2 top-2'
                aria-label='Close'
            >
                <MdClose aria-hidden='true' />
            </button>

            <div className='flex flex-col gap-1'>
                <h3 className='text-xl font-semibold text-slate-900'>Calculate pricing</h3>
                <p className='text-sm text-slate-500'>Enter your expected usage to compare plan costs.</p>
            </div>

            {visibleServiceNames.length > 0 ? (
                <div className='flex flex-wrap gap-4 items-end'>
                    {visibleServiceNames.map((serviceName) => {
                        const inputValue = usageByService[serviceName] ?? DEFAULT_FALLBACK_VALUE;
                        const hasError = validationError && !isFieldFilled(inputValue);

                        return (
                            <label key={serviceName} className='flex flex-col gap-1.5 w-full max-w-[200px]'>
                                <span className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>
                                    {serviceName}
                                </span>
                                <input
                                    type='number'
                                    min={INPUT_MIN}
                                    max={INPUT_MAX}
                                    step='1'
                                    placeholder={serviceName}
                                    value={inputValue}
                                    onChange={(e) => handleUsageChange(serviceName, e.target.value)}
                                    onKeyDown={(e) => {
                                        // Prevent decimal point and minus sign
                                        if (e.key === '.' || e.key === '-' || e.key === 'e' || e.key === 'E') {
                                            e.preventDefault();
                                        }
                                    }}
                                    className={`input input-bordered h-9 text-sm focus:outline-none rounded-lg border-slate-200 focus:border-indigo-400 ${hasError ? 'border-red-400' : ''}`}
                                    aria-invalid={hasError}
                                    aria-label={`Enter usage for ${serviceName}`}
                                />
                            </label>
                        );
                    })}

                    {validationError && (
                        <p className='text-sm text-red-500 w-full' role='alert'>
                            {validationError}
                        </p>
                    )}
                </div>
            ) : (
                <p className='text-sm text-slate-400'>No usage-based services in the current plans.</p>
            )}

            {visibleServiceNames.length > 0 && results.length > 0 && (
                <div className='flex flex-col gap-3'>
                    <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Plan comparison</p>

                    {/* Mobile card view */}
                    <div className='flex flex-col gap-3 sm:hidden'>
                        {results.map((result) => (
                            <div
                                key={result.title}
                                className='rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-3'
                            >
                                <div className='flex items-center justify-between'>
                                    <span className='font-semibold text-slate-900'>{result.title}</span>
                                    <span className='font-bold text-indigo-600'>
                                        {formatTotalPrice(symbol, result?.total, locale)}
                                    </span>
                                </div>
                                <div className='grid grid-cols-2 gap-3'>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-[10px] font-semibold text-slate-400 uppercase tracking-wider'>
                                            Included
                                        </span>
                                        {visibleServiceNames
                                            .filter((s) => result?.calculationByService?.[s] != null)
                                            .map((serviceName) => {
                                                const includedAmount = result?.includedByService?.[serviceName];
                                                const displayText =
                                                    includedAmount == null
                                                        ? 'Unlimited'
                                                        : Number(includedAmount).toLocaleString(locale, {
                                                              notation: 'standard',
                                                          });
                                                return (
                                                    <span
                                                        key={serviceName}
                                                        className='text-xs text-slate-700 font-medium'
                                                    >
                                                        {displayText} {serviceName}
                                                    </span>
                                                );
                                            })}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-[10px] font-semibold text-slate-400 uppercase tracking-wider'>
                                            Extra Cost
                                        </span>
                                        {visibleServiceNames.map((serviceName) => {
                                            const calculation = result?.calculationByService?.[serviceName];
                                            if (!calculation) return null;
                                            const isUnlimited = result?.includedByService?.[serviceName] == null;
                                            const isWithin = !isUnlimited && calculation.extra === 0;
                                            const isNotAllowed = calculation.isIncluded && calculation.extra > 0;
                                            let valueText;
                                            if (isUnlimited) valueText = 'Unlimited';
                                            else if (isWithin) valueText = formatPrice(symbol, 0, locale);
                                            else if (isNotAllowed) valueText = 'Not allowed';
                                            else
                                                valueText = formatPrice(
                                                    symbol,
                                                    result?.overages?.[serviceName],
                                                    locale
                                                );
                                            return (
                                                <span key={serviceName} className='text-xs text-slate-700'>
                                                    {serviceName}: {valueText}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop table view */}
                    <div className='hidden sm:block overflow-x-auto rounded-xl border border-slate-200 bg-white'>
                        <table className='w-full min-w-[600px] table-fixed text-sm'>
                            <thead className='bg-slate-50'>
                                <tr className='border-b border-slate-200 text-left text-xs font-medium text-slate-400 whitespace-wrap'>
                                    <th className='w-[180px] min-w-[180px] px-4 py-3 sticky left-0 bg-slate-50 z-10 lg:static lg:bg-transparent lg:z-auto'>
                                        Plan
                                    </th>
                                    <th className='w-[180px] min-w-[180px] px-4 py-3 '>Plan Amount</th>
                                    <th className='w-[180px] min-w-[160px] px-4 py-3 '>Included</th>
                                    {visibleServiceNames.map((serviceName) => (
                                        <th key={serviceName} className='w-[180px] min-w-[180px] px-4 py-3 '>
                                            Extra {serviceName}
                                        </th>
                                    ))}
                                    <th className='w-[180px] min-w-[180px] px-4 py-3 '>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {results.map((result, resultIndex) => {
                                    const rowKey = result.title ?? 'unknown';
                                    return (
                                        <tr
                                            key={rowKey}
                                            className={`border-b border-slate-100 last:border-b-0 ${resultIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                                        >
                                            <td
                                                className={`w-[180px] min-w-[180px] px-4 py-3 text-sm font-medium text-slate-900 truncate sticky left-0 z-10 lg:static lg:z-auto ${resultIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                                                title={result.title}
                                            >
                                                {result.title}
                                            </td>
                                            <td className='w-[180px] min-w-[180px] px-4 py-3 text-slate-700'>
                                                <div className='flex flex-col gap-0.5'>
                                                    {result?.originalAmount != null && (
                                                        <span className='text-xs text-slate-400 line-through'>
                                                            {formatPrice(symbol, result.originalAmount, locale)}
                                                        </span>
                                                    )}
                                                    <span className='font-semibold text-slate-900'>
                                                        {formatPrice(symbol, result?.base, locale)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='w-[160px] min-w-[160px] px-4 py-3 text-slate-600 align-top'>
                                                <div className='flex flex-col gap-0.5'>
                                                    {(() => {
                                                        const includedServices = visibleServiceNames.filter(
                                                            (serviceName) =>
                                                                result?.calculationByService?.[serviceName] != null
                                                        );

                                                        if (includedServices.length === 0) {
                                                            return <span className='text-xs text-slate-400'>--</span>;
                                                        }

                                                        return includedServices.map((serviceName) => {
                                                            const includedAmount =
                                                                result?.includedByService?.[serviceName];
                                                            const displayText =
                                                                includedAmount == null
                                                                    ? 'Unlimited'
                                                                    : Number(includedAmount).toLocaleString(locale, {
                                                                          notation: 'standard',
                                                                      });
                                                            return (
                                                                <span
                                                                    key={serviceName}
                                                                    className='text-xs text-slate-600'
                                                                >
                                                                    {displayText} {serviceName}
                                                                </span>
                                                            );
                                                        });
                                                    })()}
                                                </div>
                                            </td>
                                            {visibleServiceNames.map((serviceName) =>
                                                renderExtraServiceCell(serviceName, result, symbol, locale)
                                            )}
                                            <td className='w-[180px] min-w-[100px] px-4 py-3 font-bold text-indigo-600 whitespace-nowrap'>
                                                {formatTotalPrice(symbol, result?.total, locale)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

function initializeUsageState(serviceNames) {
    const state = {};
    for (const name of serviceNames) {
        // Use default value from SERVICE_DEFAULTS if available, otherwise use DEFAULT_FALLBACK_VALUE
        state[name] = SERVICE_DEFAULTS[name] ?? DEFAULT_FALLBACK_VALUE;
    }
    return state;
}

function isFieldFilled(value) {
    return value != null && String(value).trim() !== '';
}

function normalizeUsageToNumbers(serviceNames, usageByService) {
    const normalized = {};
    for (const name of serviceNames) {
        const rawValue = usageByService[name];
        const numValue = Number(rawValue);
        // Handle NaN, negative, and ensure integer
        normalized[name] = Number.isNaN(numValue) || numValue < 0 ? 0 : Math.floor(numValue);
    }
    return normalized;
}

function getPlansForTab(plans, tabtype) {
    return plans.filter((plan) => plan?.type === tabtype);
}

function getPlanTitle(plan) {
    if (plan?.name) return plan.name;
    if (plan?.slug) {
        return plan.slug.charAt(0).toUpperCase() + plan.slug.slice(1);
    }
    return 'Plan';
}

function formatPrice(symbol, numAmount, locale = 'en-US') {
    if (numAmount == null || Number.isNaN(numAmount)) return `${symbol}0`;
    if (numAmount === 0 || Object.is(numAmount, -0)) return `${symbol}0`;
    return `${symbol}${numAmount.toLocaleString(locale, { notation: 'standard', minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
}

function formatTotalPrice(symbol, total, locale = 'en-US') {
    const numTotal = Number(total);
    if (total == null || Number.isNaN(numTotal) || !Number.isFinite(numTotal)) return '—';
    // Round to 2 decimal places before converting to local
    return `${symbol}${numTotal.toLocaleString(locale, { notation: 'standard', minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
}

function renderExtraServiceCell(serviceName, result, symbol, locale = 'en-US') {
    const calculation = result?.calculationByService?.[serviceName];
    const inPlan = calculation != null;
    const isUnlimitedIncluded = result?.includedByService?.[serviceName] == null;
    const includedCount = result?.includedByService?.[serviceName];
    const isWithinLimit = inPlan && !isUnlimitedIncluded && calculation?.extra === 0;
    const isExtraNotAllowed = inPlan && calculation?.isIncluded && calculation?.extra > 0;
    const hasOverageCharge = calculation != null && !calculation?.isIncluded && calculation.overage > 0;

    const chunkSize = calculation?.chunkSize ?? 1;
    const extraChunks = calculation?.extraChunks ?? calculation?.extra ?? 0;
    const tooltipText =
        chunkSize > 1
            ? `${extraChunks.toLocaleString(locale, { notation: 'standard' })} Chunks × ${symbol}${calculation?.rate?.toLocaleString(locale, { notation: 'standard' })} (Chunk = ${chunkSize} Units)`
            : `${extraChunks.toLocaleString(locale, { notation: 'standard' })} × ${symbol}${calculation?.rate?.toLocaleString(locale, { notation: 'standard' })}`;

    return (
        <td key={serviceName} className='w-[140px] min-w-[140px] px-4 py-3 text-gray-700 align-top'>
            <div className='flex flex-col gap-0.5'>
                {!inPlan ? (
                    <span className='text-gray-500 text-xs'>Not included</span>
                ) : isUnlimitedIncluded ? (
                    <span className='text-gray-600 text-xs'>Unlimited</span>
                ) : isWithinLimit ? (
                    <span className='text-gray-600 text-xs'>
                        {formatPrice(symbol, 0, locale)} <span className='text-xs text-gray-500'>(Included)</span>
                    </span>
                ) : isExtraNotAllowed ? (
                    <span className='text-gray-500 text-xs'>Not allowed</span>
                ) : (
                    <>
                        <span className='text-xs font-medium'>
                            {formatPrice(symbol, result?.overages?.[serviceName], locale)}
                        </span>
                        {hasOverageCharge && (
                            <span className='flex items-center gap-1 text-xs text-gray-500'>
                                {extraChunks.toLocaleString(locale, { notation: 'standard' })}
                                {chunkSize > 1 && (
                                    <span className='relative group cursor-pointer'>
                                        <MdInfoOutline size={12} className='text-slate-400' />
                                        <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-max max-w-[200px] rounded-md bg-slate-800 px-2 py-1 text-[11px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-normal text-center '>
                                            {tooltipText}
                                        </span>
                                    </span>
                                )}
                                × {symbol}
                                {calculation?.rate?.toLocaleString(locale, {
                                    notation: 'standard',
                                })}
                            </span>
                        )}
                    </>
                )}
            </div>
        </td>
    );
}

function getUniqueServiceNames(plans) {
    const serviceNames = new Set();
    for (const plan of plans) {
        const servicesList = plan?.services ?? [];
        for (const service of servicesList) {
            const serviceName = service?.name;
            const hasDialPlan = service?.dialPlan != null && service?.dialPlan?.data?.length > 0;
            if (serviceName && !hasDialPlan) {
                serviceNames.add(serviceName);
            }
        }
    }
    return Array.from(serviceNames);
}

function getServiceNamesInAllPlans(plans) {
    const allServiceNames = getUniqueServiceNames(plans);
    if (allServiceNames.length === 0) return EMPTY_ARRAY;

    // Return only services WITHOUT dial plans
    // Services with dial plans have their own dedicated Dial Plan section with country-specific pricing
    // This keeps the calculation modal simple with only follow-up rate services
    return allServiceNames;
}

function getAllCountriesFromDialPlans(plans) {
    const allCountries = new Set();

    for (const plan of plans) {
        const servicesList = plan?.services ?? [];
        for (const service of servicesList) {
            const dialplan = service?.dialPlan;
            if (dialplan?.data?.length > 0 && dialplan?.columns?.length > 0) {
                const countryColumn = dialplan.columns.find(
                    (col) =>
                        col.key === 'country_name' ||
                        col.key === 'country' ||
                        col.key === 'Country' ||
                        col.key === 'Country Name' ||
                        col.label?.toLowerCase().includes('country')
                );

                if (countryColumn) {
                    dialplan.data.forEach((row) => {
                        const country = row[countryColumn.key];
                        if (country) allCountries.add(country);
                    });
                }
            }
        }
    }

    return Array.from(allCountries).sort();
}

function getDialPlanForService(plans, serviceName) {
    for (const plan of plans) {
        const service = plan?.services?.find((s) => s?.name === serviceName);
        const dialplan = service?.dialPlan;

        if (dialplan?.data?.length > 0 && dialplan?.columns?.length > 0) {
            // Extract unique countries from dialplan data
            // Try multiple possible column names for country
            const countryColumn = dialplan.columns.find(
                (col) =>
                    col.key === 'country_name' ||
                    col.key === 'country' ||
                    col.key === 'Country' ||
                    col.key === 'Country Name' ||
                    col.label?.toLowerCase().includes('country')
            );

            // Try multiple possible column names for rate
            const rateColumn = dialplan.columns.find(
                (col) =>
                    col.key === 'rate' ||
                    col.key === 'price' ||
                    col.key === 'cost' ||
                    col.key === 'Rate' ||
                    col.key === 'Price' ||
                    col.label?.toLowerCase().includes('rate') ||
                    col.label?.toLowerCase().includes('price')
            );

            if (countryColumn && rateColumn) {
                const countries = dialplan.data.map((row) => row[countryColumn.key]).filter(Boolean);
                return {
                    columns: dialplan.columns,
                    data: dialplan.data,
                    countries: [...new Set(countries)],
                    countryKey: countryColumn.key,
                    rateKey: rateColumn.key,
                };
            }
        }
    }
    return null;
}

function isUnlimitedCredit(freeCredits) {
    return freeCredits === UNLIMITED_CREDIT_VALUE || freeCredits === UNLIMITED_CREDIT_STRING;
}

function getDiscountedBase(amount, discounts) {
    if (!amount || !discounts || discounts.length === 0) return Number(amount) || 0;
    const discount = discounts[0];
    const typeId = discount?.discount_type_id ?? discount?.type_id;
    const value = Number(discount?.value ?? 0);
    const numAmount = Number(amount);
    if (typeId === 1) return Math.max(0, numAmount - value);
    if (typeId === 2) return value >= 100 ? 0 : Math.max(0, numAmount * (1 - value / 100));
    return numAmount;
}

function computePlanTotal(plan, tabtype, usageByService) {
    const rawAmount = Number(plan?.amount) || 0;
    const baseAmount = getDiscountedBase(plan?.amount, plan?.discount);
    const originalAmount = baseAmount < rawAmount ? rawAmount : null;

    const overages = {};
    const includedByService = {};
    const calculationByService = {};
    let totalExtraCharges = 0;

    const servicesList = plan?.services ?? [];

    for (const service of servicesList) {
        const serviceName = service?.name;
        if (!serviceName) continue;

        const hasDialPlan = service?.dialPlan != null && service?.dialPlan?.data?.length > 0;
        if (hasDialPlan) continue;

        const freeCredits = service?.freeCredit;
        const chunkSize = Math.max(1, Number(service?.chunkSize) || 1);
        const isUnlimited = isUnlimitedCredit(freeCredits);
        const includedAmount = isUnlimited ? null : Math.max(0, Number(freeCredits) || 0);

        includedByService[serviceName] = includedAmount;

        const usageAmount = Math.max(0, Number(usageByService[serviceName]) || 0);
        const extraUsage = isUnlimited ? 0 : Math.max(0, usageAmount - (includedAmount || 0));

        const followUpRate = service?.followUpRate;
        const rateValue = Number(followUpRate);
        const isNotAllowed = service?.postPaidAllowed === false;
        const hasNoExtraRate =
            isNotAllowed ||
            followUpRate == null ||
            Number.isNaN(rateValue) ||
            rateValue === UNLIMITED_CREDIT_VALUE ||
            rateValue < 0;
        const validRate = hasNoExtraRate ? 0 : Math.max(0, rateValue);

        const extraChunks = chunkSize > 1 ? Math.ceil(extraUsage / chunkSize) : extraUsage;
        const overageCharge = extraChunks * validRate;

        overages[serviceName] = overageCharge;
        calculationByService[serviceName] = {
            extra: extraUsage,
            extraChunks,
            chunkSize,
            rate: validRate,
            overage: overageCharge,
            isIncluded: hasNoExtraRate,
        };

        totalExtraCharges += overageCharge;
    }

    const total = baseAmount + totalExtraCharges;

    return {
        base: baseAmount,
        originalAmount,
        overages,
        includedByService,
        calculationByService,
        total,
    };
}
