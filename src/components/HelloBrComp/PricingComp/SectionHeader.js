import React from 'react';

export default function SectionHeader({ label, heading, subheading }) {
    return (
        <header className='mb-10 text-center md:mb-12'>
            {label && (
                <p className='mb-3 inline-flex rounded-full bg-indigo-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-700'>
                    {label}
                </p>
            )}
            {heading && (
                <h2 className='mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl'>
                    {renderHeading(heading)}
                </h2>
            )}
            {subheading && <p className='mx-auto max-w-2xl text-base text-gray-600 md:text-lg'>{subheading}</p>}
        </header>
    );
}

function renderHeading(raw) {
    const parts = String(raw ?? '')
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean);
    if (parts.length < 2) return parts[0] || '';
    const [lead, accent] = parts;
    return (
        <>
            {lead}
            <span className='text-indigo-600'> {accent}</span>
        </>
    );
}
