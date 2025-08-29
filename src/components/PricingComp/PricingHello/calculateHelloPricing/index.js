import { useEffect, useMemo, useState } from 'react';

export default function CalculateHelloPricing({ plan, currency, symbol, tabtype = 'Monthly' }) {
    const [isCalculationModalOpen, setIsCalculationModalOpen] = useState(false);
    const [serviceUsageMap, setServiceUsageMap] = useState({});
    const [usage, setUsage] = useState({});

    // Build serviceUsageMap from plan for the selected currency
    useEffect(() => {
        const services = (plan?.plan_services || []).filter((service) => {
            const rate = service?.service_credit?.service_credit_rates?.find(
                (r) => r?.currency?.short_name === currency
            );
            if (!rate) return false;
            const free = Number(rate.free_credits);
            const follow = Number(rate.follow_up_rate);
            // Only include services that have finite free credits and a valid follow-up rate
            return free !== -1 && follow > 0;
        });

        const map = {};
        services.forEach((svc) => {
            const name = svc?.service_credit?.service?.name;
            const rate = svc?.service_credit?.service_credit_rates?.find((r) => r?.currency?.short_name === currency);
            if (name && rate) {
                map[name] = {
                    free_credit: Number(rate?.free_credits),
                    follow_us_rates: Number(rate?.follow_up_rate),
                };
            }
        });
        setServiceUsageMap(map);
        // reset usage when plan or currency changes
        setUsage({});
    }, [plan, currency]);

    const serviceNames = useMemo(() => Object.keys(serviceUsageMap), [serviceUsageMap]);

    const planAmount = useMemo(() => {
        const amountObj = plan?.plan_amounts?.find(
            (a) => a?.currency?.short_name === currency && a?.plan_type?.name === tabtype
        );
        return Number(amountObj?.plan_amount || 0);
    }, [plan, currency, tabtype]);

    const perServiceCalc = useMemo(() => {
        const result = {};
        serviceNames.forEach((name) => {
            const meta = serviceUsageMap[name];
            const used = Number(usage[name] ?? 0);
            const free = Number(meta?.free_credit ?? 0);
            const rate = Number(meta?.follow_us_rates ?? 0);
            const extras = Math.max(0, used - free);
            const extra_charges = extras * rate;
            result[name] = {
                free_credit: free,
                follow_us_rates: rate,
                usage: used,
                extras,
                extra_charges,
            };
        });
        return result;
    }, [serviceNames, serviceUsageMap, usage]);

    const extrasTotal = useMemo(() => {
        return serviceNames.reduce((sum, name) => sum + Number(perServiceCalc[name]?.extra_charges || 0), 0);
    }, [serviceNames, perServiceCalc]);

    const grandTotal = useMemo(() => planAmount + extrasTotal, [planAmount, extrasTotal]);

    function formatNumber(n) {
        return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(Number(n || 0));
    }

    return (
        <>
            <button
                className=' btn btn-accent btn-outline btn-sm w-fit mt-auto'
                onClick={() => setIsCalculationModalOpen(true)}
            >
                Calculate
            </button>
            {isCalculationModalOpen && (
                <dialog className='modal' open={isCalculationModalOpen}>
                    <div className='modal-box flex flex-col gap-4'>
                        <div className='flex justify-between items-center'>
                            <h2 className='font-bold text-xl'>Calculate</h2>
                            <button
                                onClick={() => setIsCalculationModalOpen(false)}
                                className='btn btn-sm btn-circle btn-ghost right-2 top-2'
                            >
                                ✕
                            </button>
                        </div>

                        <p>Calculate your monthly expense based on your usage.</p>

                        {/* Dynamic usage inputs */}
                        <div className='flex flex-wrap gap-4 items-end'>
                            {serviceNames.length === 0 ? (
                                <span className='text-gray-500'>No services available for current currency.</span>
                            ) : (
                                serviceNames.map((name) => (
                                    <label key={name} className='form-control w-full max-w-xs flex flex-col gap-1'>
                                        <span className='label-text'>Monthly {name} usage</span>
                                        <input
                                            type='number'
                                            inputMode='numeric'
                                            step='1'
                                            min='0'
                                            placeholder={`Monthly ${name} usage`}
                                            className='input input-bordered w-full'
                                            value={usage[name] ?? ''}
                                            onChange={(e) => {
                                                const v = e.target.value;
                                                const n = v === '' ? '' : Math.max(0, Math.floor(Number(v)));
                                                setUsage((prev) => ({
                                                    ...prev,
                                                    [name]: n === '' || isNaN(n) ? '' : n,
                                                }));
                                            }}
                                        />
                                        <span className='text-xs text-gray-500'>
                                            Included: {serviceUsageMap[name]?.free_credit} | Extra @ {symbol}
                                            {formatNumber(serviceUsageMap[name]?.follow_us_rates)} per unit
                                        </span>
                                    </label>
                                ))
                            )}
                        </div>

                        {/* Plan details */}
                        <div className='flex flex-col gap-1 py-2 border rounded'>
                            <h3 className='px-4 font-medium text-gray-500'>Plan details</h3>
                            <div className='grid grid-cols-1 md:grid-cols-3 bg-gray'>
                                <div className='p-4 border-e-2 flex flex-col gap-2'>
                                    <span className='font-semibold'>
                                        {plan?.name} ({tabtype})
                                    </span>
                                    <span className='font-bold text-green-600'>
                                        {symbol}
                                        {formatNumber(planAmount)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Included benefits */}
                        <div className='flex flex-col gap-1 py-2 border rounded'>
                            <h3 className='px-4 font-medium text-gray-500'>Included benefits</h3>
                            <div className='overflow-x-auto'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Service</th>
                                            <th>Included credits</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceNames.map((name) => (
                                            <tr key={name}>
                                                <td className='font-medium'>{name}</td>
                                                <td>{formatNumber(serviceUsageMap[name]?.free_credit)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Calculations */}
                        <div className='flex flex-col gap-1 py-2 border rounded'>
                            <h3 className='px-4 font-medium text-gray-500'>Calculations</h3>
                            <div className='overflow-x-auto'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Service</th>
                                            <th>Extras</th>
                                            <th>Charge</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceNames.map((name) => {
                                            const s = perServiceCalc[name];
                                            return (
                                                <tr key={name}>
                                                    <td className='font-medium'>{name}</td>
                                                    <td>{formatNumber(s?.extras)}</td>
                                                    <td>
                                                        {symbol}
                                                        {formatNumber(s?.extra_charges)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className='flex flex-col gap-1 pt-2 border rounded'>
                            <h3 className='px-4 font-medium text-gray-500'>Total</h3>
                            <div className='grid grid-cols-1 md:grid-cols-3 bg-gray'>
                                <div className='p-4 border-e-2 flex flex-col gap-1'>
                                    <span className='text-sm'>Monthly recurring charges</span>
                                    <span className='font-bold text-green-600'>
                                        {symbol}
                                        {formatNumber(grandTotal)}
                                    </span>
                                    <span className='text-xs'>
                                        {currency === 'INR'
                                            ? 'Excluding 18% GST'
                                            : currency === 'GBP'
                                              ? 'Excluding VAT'
                                              : ''}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}
