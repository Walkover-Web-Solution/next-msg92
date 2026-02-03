import { useState, useMemo } from 'react';
import contvertToLocal from '@/utils/convertToLocal';
import { MdClose } from 'react-icons/md';

export default function CalculatePricingModal({ plans, symbol, tabtype, currency, onClose }) {
    const serviceNames = useMemo(() => getUniqueServiceNames(plans), [plans]);

    const [usageByService, setUsageByService] = useState(() => {
        const init = {};
        for (const name of serviceNames) init[name] = '';
        return init;
    });
    const [isCalculate, setIsCalculate] = useState(false);
    const [validationError, setValidationError] = useState('');

    const handleUsageChange = (servicename, value) => {
        setUsageByService((prev) => ({ ...prev, [servicename]: value }));
        setValidationError('');
    };

    const isUsageComplete = () =>
        serviceNames.length > 0 &&
        serviceNames.every((name) => {
            const value = usageByService[name];
            return value != null && String(value).trim() !== '';
        });

    const handleCalculate = () => {
        if (!isUsageComplete()) {
            setValidationError('Please fill in all usage fields.');
            return;
        }
        setValidationError('');
        setIsCalculate(true);
    };

    const usageAsNumbers = useMemo(() => {
        const normalizedUsageByService = {};
        for (const name of serviceNames) {
            normalizedUsageByService[name] = Math.max(0, Number(usageByService[name]));
        }
        return normalizedUsageByService;
    }, [serviceNames, usageByService]);

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
            for (const name of serviceNames) init[name] = '';
            return init;
        });
        setIsCalculate(false);
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

            {serviceNames.length > 0 ? (
                <div className='flex flex-wrap gap-4 items-end'>
                    {serviceNames.map((name) => (
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

                    <button type='button' onClick={handleCalculate} className='btn btn-primary btn-sm my-1'>
                        Calculate
                    </button>
                    {validationError && (
                        <p className='text-sm text-error w-full' role='alert'>
                            {validationError}
                        </p>
                    )}
                </div>
            ) : (
                <p className='text-sm text-gray-500'>No usage-based services in the current plans.</p>
            )}

            {isCalculate && results.length > 0 && (
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
                                        Base
                                    </th>
                                    <th className='w-[160px] min-w-[160px] px-4 py-3 text-left text-xs font-semibold whitespace-nowrap'>
                                        Included
                                    </th>
                                    {serviceNames.map((name) => (
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
                                                    {serviceNames.map((name) => (
                                                        <span key={name} className='text-xs'>
                                                            {name}:{' '}
                                                            {result?.includedByService?.[name] == null
                                                                ? 'Unlimited'
                                                                : result?.includedByService?.[name]}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            {serviceNames.map((name) => {
                                                const calculation = result?.calculationByService?.[name];
                                                const isIncluded = calculation?.isIncluded === true;
                                                const formula =
                                                    calculation != null && !isIncluded && calculation.overage > 0
                                                        ? `${calculation.extra} × ${calculation.rate} = ${calculation.overage}`
                                                        : null;
                                                return (
                                                    <td
                                                        key={name}
                                                        className='w-[140px] min-w-[140px] px-4 py-3 text-gray-700 align-top'
                                                    >
                                                        <div className='flex flex-col gap-0.5'>
                                                            {isIncluded ? (
                                                                <span className='text-gray-500'>Included</span>
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
