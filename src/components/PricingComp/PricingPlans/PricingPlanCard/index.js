import React from 'react';
import { MdCheck, MdClose, MdChevronRight } from 'react-icons/md';
import getURL from '@/utils/getURL';

export default function PricingPlanCard({ planData, isSelected = false, onSelect, onViewCallingRates, product }) {
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
            className={`min-w-[360px] max-w-[360px] rounded border min-h-full bg-white px-6 py-6 sm:px-7 sm:py-7 cursor-pointer ${
                isSelected ? 'border-black border-2' : 'border-gray-200'
            }`}
        >
            <h3 className=' text-2xl font-semibold'>{planData?.title}</h3>

            <div className='flex flex-col gap-0.5'>
                <div className='flex items-center gap-1 flex-wrap'>
                    {planData?.originalPrice != null && (
                        <span className='text-xl font-medium text-gray-500 line-through'>{planData.originalPrice}</span>
                    )}
                    <span className='text-2xl font-semibold text-green-700'>{planData?.price}</span>
                    {planData?.price !== 'Free' && (
                        <span className='text-md text-gray-500 mt-1'>{planData?.period}</span>
                    )}
                </div>
                <span className='text-sm text-gray-600 min-h-[20px] block'>{planData?.discountLabel ?? '\u00A0'}</span>
            </div>

            <div className='py-2' onClick={(e) => e.stopPropagation()}>
                <a
                    href={getURL('signup', product)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full btn btn-primary btn-sm btn-outline text-center'
                >
                    {planData?.ctaText}
                </a>
            </div>

            {Array.isArray(planData?.included) && planData.included.length > 0 && (
                <div className='my-2'>
                    <h4 className='mb-1 text-sm font-semibold text-gray-900'>Included</h4>
                    <div className='flex flex-col'>
                        {planData.included.map((item, index) => {
                            const displayText =
                                typeof item === 'object' && item != null
                                    ? (item.displayText ?? item.service_name ?? '')
                                    : String(item);
                            const hasDialPlan = typeof item === 'object' && item != null && item.hasDialPlan === true;
                            const serviceName = typeof item === 'object' && item != null ? item.service_name : null;
                            return (
                                <div key={index} className='flex flex-nowrap items-center gap-2 text-sm'>
                                    <span className='text-gray-600 truncate shrink-0'>{displayText}</span>
                                    {hasDialPlan && (
                                        <>
                                            <span className='text-gray-400 shrink-0' aria-hidden>
                                                ·
                                            </span>
                                            <button
                                                type='button'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (onViewCallingRates)
                                                        onViewCallingRates(planData?.slug, serviceName);
                                                    else onSelect?.();
                                                }}
                                                className='link link-active-link font-medium text-blue-600 shrink-0 whitespace-nowrap'
                                            >
                                                {planData?.linkText}
                                            </button>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {featuresToShow.length > 0 && (
                <div className='my-2'>
                    <h4 className='mb-1 text-sm font-semibold text-gray-900'>Features</h4>
                    <div className=''>
                        {featuresToShow.map((item, index) => {
                            const text = typeof item === 'string' ? item : (item?.name ?? '');
                            const isIncluded = typeof item === 'object' && item != null ? item.is_included : true;

                            return (
                                <div key={index} className='flex items-center gap-2 text-sm text-gray-600'>
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
                        {planData.extra.map((item, index) => {
                            const isObject = typeof item === 'object' && item != null && 'label' in item;
                            const label = isObject ? item.label : typeof item === 'string' ? item : String(item);
                            const isNoExtra = isObject ? item.isNoExtra : false;
                            return (
                                <div key={index} className='flex items-center gap-2 text-sm text-gray-600'>
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
