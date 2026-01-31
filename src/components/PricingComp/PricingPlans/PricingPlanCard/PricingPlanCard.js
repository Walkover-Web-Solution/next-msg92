import React from 'react';
import { MdCheck, MdClose, MdChevronRight } from 'react-icons/md';

export default function PricingPlanCard({ planData, isSelected = false, onSelect, onViewCallingRates }) {
    const featuresToShow = Array.isArray(planData?.features) && planData?.features?.slice(0, 5);
    const handleCardSelect = () => {
        if (onSelect) onSelect();
    };

    return (
        <div
            role='button'
            tabIndex={0}
            onClick={handleCardSelect}
            onKeyDown={(e) => e.key === 'Enter' && handleCardSelect()}
            className={`min-w-[300px] rounded border bg-white px-6 py-6 sm:px-7 sm:py-7 cursor-pointer ${
                isSelected ? 'border-black border-2' : 'border-gray-200'
            }`}
        >
            <h3 className=' text-2xl font-semibold'>{planData?.title}</h3>

            <div className='flex items-center gap-1'>
                <span className=' text-2xl font-semibold text-green-700'>{planData?.price}</span>
                <span className='text-md text-gray-500 mt-1'>/{planData?.period}</span>
            </div>

            <div className='my-2' onClick={(e) => e.stopPropagation()}>
                <button type='button' className='w-full btn btn-primary btn-sm btn-outline'>
                    {planData?.ctaText ?? 'Get Started'}
                </button>
            </div>

            <div className={`my-2 ${planData?.showLink !== false && planData?.hasDialPlan ? '' : 'hidden'}`}>
                <button
                    type='button'
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onViewCallingRates) onViewCallingRates(planData?.slug);
                        else onSelect?.();
                    }}
                    className='text-sm text-blue-600 font-medium hover:underline'
                >
                    {planData?.linkText ?? 'View Calling Rates'}
                </button>
            </div>

            {Array.isArray(planData?.included) && planData.included.length > 0 && (
                <div className='my-2'>
                    <h4 className='mb-1 text-sm font-semibold text-gray-900'>Included</h4>
                    <div className=''>
                        {planData.included.map((item, idx) => (
                            <p key={idx} className='text-sm text-gray-600'>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {featuresToShow.length > 0 && (
                <div className='my-2'>
                    <h4 className='mb-1 text-sm font-semibold text-gray-900'>Features</h4>
                    <div className=''>
                        {featuresToShow.map((item, idx) => {
                            const text = typeof item === 'string' ? item : (item?.name ?? '');
                            const isIncluded = typeof item === 'object' && item != null ? item.is_included : true;

                            return (
                                <div key={idx} className='flex items-center gap-2 text-sm text-gray-600'>
                                    {isIncluded === 0 || isIncluded === false ? (
                                        <MdClose className='shrink-0 text-red-500' />
                                    ) : (
                                        <MdCheck className='shrink-0 text-green-600' />
                                    )}
                                    <span>{text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {Array.isArray(planData?.extra) && planData.extra.length > 0 && (
                <div className='my-2 flex flex-col gap-1'>
                    <h4 className='text-sm font-semibold text-gray-900'>Extra @</h4>
                    <div className=''>
                        {planData.extra.map((item, idx) => {
                            const isObject = typeof item === 'object' && item != null && 'label' in item;
                            const label = isObject ? item.label : typeof item === 'string' ? item : String(item);
                            const isNoExtra = isObject ? item.isNoExtra : false;
                            return (
                                <div key={idx} className='flex items-center gap-2 text-sm text-gray-600'>
                                    {isNoExtra ? (
                                        <MdClose className='shrink-0 text-red-500' />
                                    ) : (
                                        <MdCheck className='shrink-0 text-green-600' />
                                    )}
                                    <span>{label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
