import { useState, useMemo } from 'react';
import contvertToLocal from '@/utils/convertToLocal';

const FIXED_LOCALE = 'en-US';

function formatPrice(symbol, amount) {
    if (amount == null) return '—';
    const num = Number(amount);
    if (Number.isNaN(num)) return '—';
    return `${symbol}${num.toLocaleString(FIXED_LOCALE)}`;
}

function getUniqueServiceNames(plans) {
    const names = new Set();
    for (const plan of plans ?? []) {
        for (const s of plan?.extras?.servicesList ?? []) {
            if (s?.servicename) names.add(s.servicename);
        }
    }
    return Array.from(names);
}

function computePlanTotal(plan, tabtype, usageByService) {
    const isMonthly = tabtype === 'Monthly';
    const base = isMonthly ? plan?.amount?.monthly : plan?.amount?.yearly;
    const baseNum = Number(base);
    const validBase = Number.isNaN(baseNum) ? 0 : baseNum;

    const servicesList = plan?.extras?.servicesList ?? [];
    const overages = {};
    let overageSum = 0;

    for (const s of servicesList) {
        const name = s?.servicename;
        if (!name) continue;

        const free = s?.free_credits;
        const rate = Number(s?.follow_up_rate) || 0;
        const usage = Number(usageByService[name]) || 0;

        let overage = 0;
        if (free !== -1 && free !== '-1') {
            const included = Number(free) || 0;
            const extra = Math.max(0, usage - included);
            overage = extra * rate;
        }

        overages[name] = overage;
        overageSum += overage;
    }

    return { base: validBase, overages, total: validBase + overageSum };
}

export default function CalculatePricingModal({ plans, symbol, tabtype, currency, onClose }) {
    const serviceNames = useMemo(() => getUniqueServiceNames(plans), [plans]);

    const [usageByService, setUsageByService] = useState(() => {
        const init = {};
        for (const name of serviceNames) init[name] = '';
        return init;
    });
    const [isCalculate, setIsCalculate] = useState(false);

    const handleUsageChange = (servicename, value) => {
        setUsageByService((prev) => ({ ...prev, [servicename]: value }));
    };

    const usageAsNumbers = useMemo(() => {
        const out = {};
        for (const name of serviceNames) {
            const v = usageByService[name];
            const n = v === '' ? 0 : Number(v);
            out[name] = Number.isNaN(n) ? 0 : Math.max(0, n);
        }
        return out;
    }, [serviceNames, usageByService]);

    const results = useMemo(() => {
        if (!Array.isArray(plans) || plans.length === 0) return [];
        return plans.map((plan) => ({
            plan,
            slug: plan?.slug,
            title: plan?.slug ? plan.slug.charAt(0).toUpperCase() + plan.slug.slice(1) : 'Plan',
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
        onClose?.();
    };

    const hasServices = serviceNames.length > 0;

    return (
        <div className='modal-box max-w-[900px] max-h-[90vh] overflow-y-auto p-6 space-y-6'>
            {/* Close */}
            <button
                type='button'
                onClick={handleClose}
                className='absolute right-3 top-3 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition'
                aria-label='Close'
            >
                ✕
            </button>

            {/* Header */}
            <div className='space-y-1'>
                <h3 className='text-lg font-semibold text-gray-900'>Calculate pricing</h3>
                <p className='text-sm text-gray-500'>Enter your expected usage to compare plan costs.</p>
            </div>

            {/* Usage inputs */}
            {hasServices ? (
                <div className='flex flex-wrap gap-4 items-end'>
                    {serviceNames.map((name) => (
                        <label key={name} className='flex flex-col gap-1 w-full max-w-[200px]'>
                            <span className='text-xs font-medium text-gray-600'>{name}</span>
                            <input
                                type='number'
                                min={0}
                                placeholder='Usage'
                                value={usageByService[name] ?? ''}
                                onChange={(e) => handleUsageChange(name, e.target.value)}
                                className='
                                    input input-bordered
                                    h-9
                                    text-sm
                                    focus:outline-none
                                '
                            />
                        </label>
                    ))}

                    <button type='button' onClick={() => setIsCalculate(true)} className='btn btn-primary h-9 px-6'>
                        Calculate
                    </button>
                </div>
            ) : (
                <p className='text-sm text-gray-500'>No usage-based services in the current plans.</p>
            )}

            {/* Results */}
            {isCalculate && results.length > 0 && (
                <div className='space-y-3'>
                    <h4 className='text-sm font-semibold text-gray-700'>Plan comparison</h4>

                    <div className='overflow-x-auto rounded-lg border border-gray-200 bg-white'>
                        <table className='w-full text-sm'>
                            <thead className='bg-gray-50'>
                                <tr className='border-b border-gray-200'>
                                    <th className='px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap'>
                                        Plan
                                    </th>
                                    <th className='px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap'>
                                        Base
                                    </th>
                                    {serviceNames.map((name) => (
                                        <th
                                            key={name}
                                            className='px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap'
                                        >
                                            Extra {name}
                                        </th>
                                    ))}
                                    <th className='px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap'>
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {results.map((r) => (
                                    <tr
                                        key={r.slug}
                                        className='border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition'
                                    >
                                        <td className='px-4 py-3 text-gray-700'>{r.title}</td>
                                        <td className='px-4 py-3 text-gray-700'>{formatPrice(symbol, r.base)}</td>
                                        {serviceNames.map((name) => (
                                            <td key={name} className='px-4 py-3 text-gray-700'>
                                                {formatPrice(symbol, r.overages[name] ?? 0)}
                                            </td>
                                        ))}
                                        <td className='px-4 py-3 font-semibold text-green-600 whitespace-nowrap'>
                                            {symbol}
                                            {contvertToLocal(r.total ?? 0, currency)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className='text-xs text-gray-500'>
                        {currency === 'INR' && '+18% GST may apply.'}
                        {currency === 'GBP' && 'VAT may apply.'}
                    </p>
                </div>
            )}
        </div>
    );
}
