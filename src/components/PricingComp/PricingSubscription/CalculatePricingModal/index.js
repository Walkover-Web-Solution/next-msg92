import { useState, useMemo, useCallback } from 'react';
import { MdClose } from 'react-icons/md';

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

            <div className='flex flex-col'>
                <h3 className='text-lg sm:text-2xl font-semibold'>Calculate pricing</h3>
                <p className='text-md'>Enter your expected usage to compare plan costs.</p>
            </div>

            {visibleServiceNames.length > 0 ? (
                <div className='flex flex-wrap gap-4 items-end'>
                    {visibleServiceNames.map((serviceName) => {
                        const defaultValue = SERVICE_DEFAULTS[serviceName] ?? DEFAULT_FALLBACK_VALUE;
                        const inputValue = usageByService[serviceName] ?? DEFAULT_FALLBACK_VALUE;
                        const hasError = validationError && !isFieldFilled(inputValue);

                        return (
                            <label key={serviceName} className='flex flex-col gap-1 w-full max-w-[200px]'>
                                <span className='text-xs font-medium'>{serviceName}</span>
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
                                    className={`input input-bordered h-9 text-sm focus:outline-none ${hasError ? 'input-error' : ''}`}
                                    aria-invalid={hasError}
                                    aria-label={`Enter usage for ${serviceName}`}
                                />
                            </label>
                        );
                    })}

                    {validationError && (
                        <p className='text-sm text-error w-full' role='alert'>
                            {validationError}
                        </p>
                    )}
                </div>
            ) : (
                <p className='text-sm text-gray-500'>No usage-based services in the current plans.</p>
            )}

            {visibleServiceNames.length > 0 && results.length > 0 && (
                <div className='space-y-3'>
                    <h4 className='text-sm font-semibold text-gray-700'>Plan comparison</h4>

                    <div className='overflow-x-auto rounded-lg border border-gray-200 bg-white'>
                        <table className='w-full min-w-[600px] table-fixed text-sm'>
                            <thead className='bg-gray-50'>
                                <tr className='border-b border-gray-200'>
                                    <th className='w-[180px] min-w-[180px] px-4 py-3 text-left text-xs font-semibold whitespace-nowrap'>
                                        Plan
                                    </th>
                                    <th className='w-[180px] min-w-[180px] px-4 py-3 text-left text-xs font-semibold whitespace-nowrap'>
                                        Plan Amount
                                    </th>
                                    <th className='w-[180px] min-w-[160px] px-4 py-3 text-left text-xs font-semibold whitespace-nowrap'>
                                        Included
                                    </th>
                                    {visibleServiceNames.map((serviceName) => (
                                        <th
                                            key={serviceName}
                                            className='w-[180px] min-w-[180px] px-4 py-3 text-left text-xs font-semibold whitespace-nowrap'
                                        >
                                            Extra {serviceName}
                                        </th>
                                    ))}
                                    <th className='w-[180px] min-w-[180px] px-4 py-3 text-left text-xs font-semibold whitespace-nowrap'>
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {results.length > 0 &&
                                    results.map((result) => {
                                        const rowKey = result.title ?? 'unknown';
                                        return (
                                            <tr key={rowKey} className='border-b border-gray-100 last:border-b-0'>
                                                <td
                                                    className='w-[180px] min-w-[180px] px-4 py-3 text-gray-700 truncate'
                                                    title={result.title}
                                                >
                                                    {result.title}
                                                </td>
                                                <td className='w-[180px] min-w-[180px] px-4 py-3 text-gray-700'>
                                                    <div className='flex flex-col gap-0.5'>
                                                        {result?.originalAmount != null && (
                                                            <span className='text-xs text-gray-400 line-through'>
                                                                {formatPrice(symbol, result.originalAmount, locale)}
                                                            </span>
                                                        )}
                                                        <span>{formatPrice(symbol, result?.base, locale)}</span>
                                                    </div>
                                                </td>
                                                <td className='w-[160px] min-w-[160px] px-4 py-3 text-gray-600 align-top'>
                                                    <div className='flex flex-col gap-0.5'>
                                                        {(() => {
                                                            const includedServices = visibleServiceNames.filter(
                                                                (serviceName) =>
                                                                    result?.calculationByService?.[serviceName] != null
                                                            );

                                                            if (includedServices.length === 0) {
                                                                return (
                                                                    <span className='text-xs text-gray-500'>--</span>
                                                                );
                                                            }

                                                            return includedServices.map((serviceName) => {
                                                                const includedAmount =
                                                                    result?.includedByService?.[serviceName];
                                                                const displayText =
                                                                    includedAmount == null
                                                                        ? 'Unlimited'
                                                                        : includedAmount;
                                                                return (
                                                                    <span key={serviceName} className='text-xs'>
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
                                                <td className='w-[180px] min-w-[100px] px-4 py-3 font-semibold text-green-600 whitespace-nowrap'>
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
    // Round to 2 decimal places for currency
    const rounded = Math.round(numAmount * 100) / 100;
    return `${symbol}${rounded.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatTotalPrice(symbol, total, locale = 'en-US') {
    const numTotal = Number(total);
    if (total == null || Number.isNaN(numTotal) || !Number.isFinite(numTotal)) return '—';
    // Round to 2 decimal places before converting to local
    const rounded = Math.round(numTotal * 100) / 100;
    return `${symbol}${rounded.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function renderExtraServiceCell(serviceName, result, symbol, locale = 'en-US') {
    const calculation = result?.calculationByService?.[serviceName];
    const inPlan = calculation != null;
    const isUnlimitedIncluded = result?.includedByService?.[serviceName] == null;
    const includedCount = result?.includedByService?.[serviceName];
    const isWithinLimit = inPlan && !isUnlimitedIncluded && calculation?.extra === 0;
    const isExtraNotAllowed = inPlan && calculation?.isIncluded && calculation?.extra > 0;
    const hasOverageCharge = calculation != null && !calculation?.isIncluded && calculation.overage > 0;

    // Format formula with proper number formatting (without final amount to avoid duplication)
    const formula = hasOverageCharge
        ? `${calculation.extra.toLocaleString(locale)} × ${symbol}${calculation.rate.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : null;

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
                        <span className='text-xs'>{formatPrice(symbol, result?.overages?.[serviceName], locale)}</span>
                        {formula && <span className='text-xs text-gray-500'>{formula}</span>}
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
        const isUnlimited = isUnlimitedCredit(freeCredits);
        const includedAmount = isUnlimited ? null : Math.max(0, Number(freeCredits) || 0);

        includedByService[serviceName] = includedAmount;

        const usageAmount = Math.max(0, Number(usageByService[serviceName]) || 0);
        const extraUsage = isUnlimited ? 0 : Math.max(0, usageAmount - (includedAmount || 0));

        const followUpRate = service?.followUpRate;
        const rateValue = Number(followUpRate);
        const hasNoExtraRate =
            followUpRate == null || Number.isNaN(rateValue) || rateValue === UNLIMITED_CREDIT_VALUE || rateValue < 0;
        const validRate = hasNoExtraRate ? 0 : Math.max(0, rateValue);

        const rawOverageCharge = extraUsage * validRate;
        const overageCharge = Math.round(rawOverageCharge * 100) / 100;

        overages[serviceName] = overageCharge;
        calculationByService[serviceName] = {
            extra: extraUsage,
            rate: validRate,
            overage: overageCharge,
            isIncluded: hasNoExtraRate,
        };

        totalExtraCharges += overageCharge;
    }

    const total = Math.round((baseAmount + totalExtraCharges) * 100) / 100;

    return {
        base: baseAmount,
        originalAmount,
        overages,
        includedByService,
        calculationByService,
        total,
    };
}
