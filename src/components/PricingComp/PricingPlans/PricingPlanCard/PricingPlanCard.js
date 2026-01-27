import React from 'react';
import { MdCheck } from 'react-icons/md';

/* ---------------- DATA (Single Source of Truth) ---------------- */

/* ---------------- COMPONENT ---------------- */

export default function PricingPlanCard({ planData }) {
    const { title, price, period, ctaText, showLink, linkText, included, features, extra } = planData;

    return (
        <div className='min-w-[300px] rounded-xl border border-gray-200 bg-white p-6'>
            {/* Title */}
            <h3 className='mb-2 text-lg font-semibold text-gray-900'>{title}</h3>

            {/* Price */}
            <div className='mb-4'>
                <span className='text-2xl font-bold text-green-600'>{price}</span>
                <span className='ml-1 text-sm text-gray-500'>{period}</span>
            </div>

            {/* CTA */}
            <button className='mb-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50'>
                {ctaText}
            </button>

            {/* Optional link */}
            {showLink && <button className='mb-6 text-sm text-blue-600 hover:underline'>{linkText}</button>}

            {/* Included */}
            <Section title='Included'>
                {included.map((item, idx) => (
                    <p key={idx} className='text-sm text-gray-600'>
                        {item}
                    </p>
                ))}
            </Section>

            {/* Features */}
            <Section title='Features'>
                {features.map((item, idx) => (
                    <CheckItem key={idx} text={item} />
                ))}
            </Section>

            {/* Extra */}
            <Section title='Extra @'>
                {extra.map((item, idx) => (
                    <CheckItem key={idx} text={item} />
                ))}
            </Section>
        </div>
    );
}

/* ---------------- SUB COMPONENTS ---------------- */

function Section({ title, children }) {
    return (
        <div className='mb-4'>
            <h4 className='mb-2 text-sm font-semibold text-gray-900'>{title}</h4>
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
