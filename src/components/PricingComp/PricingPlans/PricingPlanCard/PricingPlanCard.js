import React from 'react';
import { MdCheck, MdClose, MdChevronRight } from 'react-icons/md';

export default function PricingPlanCard({ planData, isSelected = false, onSelect, onViewCallingRates }) {
    const {
        title,
        price,
        period,
        ctaText = 'Get Started',
        showLink = true,
        linkText = 'View Calling Rates',
        hasDialPlan = false,
        included = [],
        features = [],
        extra = [],
    } = planData ?? {};

    const featuresToShow = Array.isArray(features) ? features.slice(0, 5) : [];

    const handleCardSelect = () => {
        if (onSelect) onSelect();
    };

    return (
        <div
            role='button'
            tabIndex={0}
            onClick={handleCardSelect}
            onKeyDown={(e) => e.key === 'Enter' && handleCardSelect()}
            className={`min-w-[300px] rounded-xl border bg-white px-6 py-6 sm:px-7 sm:py-7 transition-colors cursor-pointer ${
                isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
            }`}
        >
            <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>

            <div className='my-2'>
                <span className='text-2xl font-bold text-green-600'>{price}</span>
                <span className='ml-1 text-sm text-gray-500'>{period}</span>
            </div>

            {/* CTA */}
            <div className='my-4' onClick={(e) => e.stopPropagation()}>
                <button
                    type='button'
                    className='w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50'
                >
                    {ctaText}
                </button>
            </div>

            {showLink && hasDialPlan && (
                <div className='my-2'>
                    <button
                        type='button'
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onViewCallingRates) onViewCallingRates(planData?.slug);
                            else onSelect?.();
                        }}
                        className='text-sm text-blue-600 hover:underline'
                    >
                        {linkText}
                    </button>
                </div>
            )}

            {Array.isArray(included) && included.length > 0 && (
                <Section title='Included'>
                    {included.map((item, idx) => (
                        <p key={idx} className='text-sm text-gray-600'>
                            {item}
                        </p>
                    ))}
                </Section>
            )}

            {featuresToShow.length > 0 && (
                <Section title='Features'>
                    {featuresToShow.map((item, idx) => {
                        const text = typeof item === 'string' ? item : (item?.name ?? '');
                        const isIncluded = typeof item === 'object' && item != null ? item.is_included : true;

                        return (
                            <div key={idx} className='flex items-start gap-2 text-sm text-gray-600'>
                                {isIncluded === 0 || isIncluded === false ? (
                                    <MdClose className='shrink-0 text-red-500' />
                                ) : (
                                    <MdChevronRight className='shrink-0 text-green-600' />
                                )}
                                <span>{text}</span>
                            </div>
                        );
                    })}
                </Section>
            )}

            {Array.isArray(extra) && extra.length > 0 && (
                <Section title='Extra @'>
                    {extra.map((item, idx) => (
                        <CheckItem key={idx} text={typeof item === 'string' ? item : String(item)} />
                    ))}
                </Section>
            )}
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className='my-3'>
            <h4 className='mb-1 text-sm font-semibold text-gray-900'>{title}</h4>
            <div className='space-y-1'>{children}</div>
        </div>
    );
}

function CheckItem({ text }) {
    return (
        <div className='flex items-start gap-2 text-sm text-gray-600'>
            <MdCheck className='mt-0.5 text-green-600' />
            <span>{text}</span>
        </div>
    );
}
