import { useState, useMemo } from 'react';
import contvertToLocal from '@/utils/convertToLocal';
import { MdClose } from 'react-icons/md';

export default function CalculatePricingModal({ plans, symbol, tabtype, currency, onClose }) {
    const visibleServiceNames = useMemo(() => getServiceNamesInAllPlans(plans), [plans]);

    const [usageByService, setUsageByService] = useState(() => {
        const init = {};
        for (const name of visibleServiceNames) init[name] = '';
        return init;
    });
    const [validationError, setValidationError] = useState('');

    const handleUsageChange = (servicename, value) => {
        setUsageByService((prev) => ({ ...prev, [servicename]: value }));
        setValidationError('');
    };

    const hasAnyFilledField = useMemo(
        () =>
            visibleServiceNames.some((name) => {
                const value = usageByService[name];
                return value != null && String(value).trim() !== '';
            }),
        [visibleServiceNames, usageByService]
    );

    const filledServiceNames = useMemo(
        () =>
            visibleServiceNames.filter((name) => {
                const value = usageByService[name];
                return value != null && String(value).trim() !== '';
            }),
        [visibleServiceNames, usageByService]
    );

    const usageAsNumbers = useMemo(() => {
        const normalizedUsageByService = {};
        for (const name of visibleServiceNames) {
            normalizedUsageByService[name] = Math.max(0, Number(usageByService[name]));
        }
        return normalizedUsageByService;
    }, [visibleServiceNames, usageByService]);

    const results = useMemo(() => {
        if (!Array.isArray(plans) || plans.length === 0) return [];
        const hasAmountForTab = (plan) =>
            tabtype === 'Monthly' ? plan?.amount?.monthly != null : plan?.amount?.yearly != null;
        const plansForTab = plans.filter(hasAmountForTab);
        return plansForTab.map((plan) => ({
            plan,
            slug: plan?.slug,
            title: plan?.name ?? (plan?.slug ? plan.slug.charAt(0).toUpperCase() + plan.slug.slice(1) : 'Plan'),
            ...computePlanTotal(plan, tabtype, usageAsNumbers),
        }));
    }, [plans, tabtype, usageAsNumbers]);

    const handleClose = () => {
        setUsageByService(() => {
            const init = {};
            for (const name of visibleServiceNames) init[name] = '';
            return init;
        });
        setValidationError('');
        onClose?.();
    };

    return (
        <div className='modal-box max-w-[900px] max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-6'>
            <button
                type='button'
                onClick={handleClose}
                className='btn btn-md btn-circle btn-ghost absolute right-2 top-2'
                aria-label='Close'
            >
                <MdClose className='' />
            </button>

            <div className='flex flex-col'>
                <h3 className='text-lg sm:text-2xl font-semibold'>Calculate pricing</h3>
                <p className='text-md'>Enter your expected usage to compare plan costs.</p>
            </div>

            {visibleServiceNames.length > 0 ? (
                <div className='flex flex-wrap gap-4 items-end'>
                    {visibleServiceNames.map((name) => (
                        <label key={name} className='flex flex-col gap-1 w-full max-w-[200px]'>
                            <span className='text-xs font-medium'>{name}</span>
                            <input
                                type='number'
                                min={0}
                                placeholder='Usage'
                                value={usageByService[name] ?? ''}
                                onChange={(e) => handleUsageChange(name, e.target.value)}
                                className={`
                                    input input-bordered h-9 text-sm focus:outline-none
                                    ${validationError && (!usageByService[name] || String(usageByService[name]).trim() === '') ? 'input-error' : ''}
                                `}
                                aria-invalid={
                                    validationError &&
                                    (!usageByService[name] || String(usageByService[name]).trim() === '')
                                }
                            />
                        </label>
                    ))}

                    {validationError && (
                        <p className='text-sm text-error w-full' role='alert'>
                            {validationError}
                        </p>
                    )}
                </div>
            ) : (
                <p className='text-sm text-gray-500'>No usage-based services in the current plans.</p>
            )}

            {hasAnyFilledField && results.length > 0 && (
                <div className='space-y-3'>
                    <h4 className='text-sm font-semibold text-gray-700'>Plan comparison</h4>

                    <div className='overflow-x-auto rounded-lg border border-gray-200 bg-white'>
                        <table className='w-full min-w-[600px] table-fixed text-sm'>
                            <thead className='bg-gray-50'>
                                <tr className='border-b border-gray-200'>
                                    <th className='w-[140px] min-w-[140px] px-4 py-3 text-left text-xs font-semibold whitespace-nowrap'>
                                        Plan
                                    </th>
                                    <th className='w-[80px] min-w-[80px] px-4 py-3 text-left text-xs font-semibold whitespace-nowrap'>
                                        Plan Amount
                                    </th>
                                    <th className='w-[160px] min-w-[160px] px-4 py-3 text-left text-xs font-semibold whitespace-nowrap'>
                                        Included
                                    </th>
                                    {filledServiceNames.map((name) => (
                                        <th
                                            key={name}
                                            className='w-[140px] min-w-[140px] px-4 py-3 text-left text-xs font-semibold whitespace-nowrap'
                                        >
                                            Extra {name}
                                        </th>
                                    ))}
                                    <th className='w-[100px] min-w-[100px] px-4 py-3 text-left text-xs font-semibold whitespace-nowrap'>
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {results?.length > 0 &&
                                    results.map((result) => (
                                        <tr key={result.slug} className='border-b border-gray-100 last:border-b-0'>
                                            <td
                                                className='w-[140px] min-w-[140px] px-4 py-3 text-gray-700 truncate'
                                                title={result.title}
                                            >
                                                {result.title}
                                            </td>
                                            <td className='w-[80px] min-w-[80px] px-4 py-3 text-gray-700'>
                                                {formatPrice(symbol, result?.base)}
                                            </td>
                                            <td className='w-[160px] min-w-[160px] px-4 py-3 text-gray-600 align-top'>
                                                <div className='flex flex-col gap-0.5'>
                                                    {filledServiceNames
                                                        .filter((name) => result?.calculationByService?.[name] != null)
                                                        .map((name) => (
                                                            <span key={name} className='text-xs'>
                                                                {name}:{' '}
                                                                {result?.includedByService?.[name] == null
                                                                    ? 'Unlimited'
                                                                    : result?.includedByService?.[name]}
                                                            </span>
                                                        ))}
                                                </div>
                                            </td>
                                            {filledServiceNames.map((name) => {
                                                const calculation = result?.calculationByService?.[name];
                                                const inPlan = calculation != null;
                                                const isUnlimitedIncluded = result?.includedByService?.[name] == null;
                                                const includedCount = result?.includedByService?.[name];
                                                const isWithinLimit =
                                                    inPlan && !isUnlimitedIncluded && calculation?.extra === 0;
                                                const hasOverageCharge =
                                                    calculation != null &&
                                                    !calculation?.isIncluded &&
                                                    calculation.overage > 0;
                                                const formula = hasOverageCharge
                                                    ? `${calculation.extra} × ${calculation.rate} = ${calculation.overage}`
                                                    : null;
                                                return (
                                                    <td
                                                        key={name}
                                                        className='w-[140px] min-w-[140px] px-4 py-3 text-gray-700 align-top'
                                                    >
                                                        <div className='flex flex-col gap-0.5'>
                                                            {!inPlan ? (
                                                                <span className='text-gray-500'>
                                                                    Not included in the plan
                                                                </span>
                                                            ) : isUnlimitedIncluded ? (
                                                                <span className='text-gray-600'>Unlimited</span>
                                                            ) : isWithinLimit ? (
                                                                <div className='flex flex-col gap-0.5'>
                                                                    <span className='text-gray-600'>
                                                                        {formatPrice(symbol, 0)}
                                                                    </span>
                                                                    <span className='text-xs text-gray-500'>
                                                                        Included ({includedCount})
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <span>
                                                                        {formatPrice(symbol, result?.overages?.[name])}
                                                                    </span>
                                                                    {formula != null && (
                                                                        <span className='text-xs text-gray-500'>
                                                                            {formula}
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                            <td className='w-[100px] min-w-[100px] px-4 py-3 font-semibold text-green-600 whitespace-nowrap'>
                                                {symbol}
                                                {result?.total != null && !Number.isNaN(Number(result?.total))
                                                    ? contvertToLocal(result.total)
                                                    : '—'}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

function formatPrice(symbol, amount) {
    if (amount == null) return '—';
    const num = Number(amount);
    if (Number.isNaN(num)) return '—';
    if (num === 0 || Object.is(num, -0)) return `${symbol}0`;
    return `${symbol}${num.toLocaleString('en-US')}`;
}

function getUniqueServiceNames(plans) {
    const names = new Set();
    for (const plan of plans) {
        for (const service of plan?.extras?.servicesList) {
            if (service?.servicename) names.add(service.servicename);
        }
    }
    return Array.from(names);
}

function getServiceNamesInAllPlans(plans) {
    const allNames = getUniqueServiceNames(plans);
    if (allNames.length === 0) return [];
    return allNames.filter((name) =>
        plans.every((plan) => plan?.extras?.servicesList?.some((service) => service?.servicename === name))
    );
}

function computePlanTotal(plan, tabtype, usageByService) {
    const validBase = Number(tabtype === 'Monthly' ? plan?.amount?.monthly : plan?.amount?.yearly) || 0;
    const overages = {},
        includedByService = {},
        calculationByService = {};
    let totalExtraCharges = 0;

    for (const service of plan?.extras?.servicesList) {
        const name = service?.servicename;
        if (!name) continue;
        const free = service?.free_credits,
            isUnlimited = free === -1 || free === '-1';
        const included = isUnlimited ? null : Number(free);
        includedByService[name] = included;
        const usage = Number(usageByService[name]);
        const extra = isUnlimited ? 0 : Math.max(0, usage - included);
        const rawRate = service?.follow_up_rate;
        const rate = Number(rawRate);
        const isNoExtraRate = rate === -1;
        const overage = isNoExtraRate ? 0 : extra * rate;
        overages[name] = overage;
        calculationByService[name] = {
            extra,
            rate: isNoExtraRate ? 0 : rate,
            overage,
            isIncluded: isNoExtraRate,
        };
        totalExtraCharges += overage;
    }
    return { base: validBase, overages, includedByService, calculationByService, total: validBase + totalExtraCharges };
}
