import React from 'react';

export default function BillingToggle({
    billing,
    hasYearly,
    onBillingChange,
    billingMonthlyLabel,
    billingYearlyLabel,
    yearlyDiscountHint,
}) {
    return (
        <div className='mb-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:flex-wrap md:mb-12'>
            <div className='inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-1'>
                {['Monthly', 'Yearly'].map((t) => {
                    const disabled = t === 'Yearly' && !hasYearly;
                    return (
                        <button
                            key={t}
                            type='button'
                            disabled={disabled}
                            onClick={() => !disabled && onBillingChange(t)}
                            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                                billing === t
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            } ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}
                        >
                            {t === 'Monthly' ? billingMonthlyLabel || 'Monthly' : billingYearlyLabel || 'Yearly'}
                            {t === 'Yearly' && yearlyDiscountHint && hasYearly && (
                                <span className='ml-1 text-emerald-600'>{yearlyDiscountHint}</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
