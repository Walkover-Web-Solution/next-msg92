import React, { Fragment } from 'react';
import getURL from '@/utils/getURL';

export default function StepsSetup({ data, pageInfo }) {
    const { label, heading, subheading, steps = [], ctaLabel, ctaHref, ctaLink } = data ?? {};
    if (!steps.length) return null;

    const href = ctaHref || ctaLink || getURL('signup', pageInfo?.page, pageInfo);
    const external = /^https?:\/\//i.test(href);

    return (
        <section className='bg-slate-50'>
            <div className='container cont_p py-16 lg:py-24'>
                <div className='cont mx-auto max-w-6xl'>
                    <header className='mb-12 text-center lg:mb-16'>
                        {label && (
                            <p className='mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600'>
                                {label}
                            </p>
                        )}
                        {heading && (
                            <h2 className='mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl'>
                                {heading}
                            </h2>
                        )}
                        {subheading && (
                            <p className='mx-auto max-w-xl text-base text-gray-600 md:text-lg'>{subheading}</p>
                        )}
                    </header>

                    <div className='mb-10 hidden items-center md:mb-12 md:flex lg:px-2'>
                        {steps.map((step, i) => {
                            const num = step.number || String(i + 1).padStart(2, '0');
                            return (
                                <Fragment key={`badge-${i}`}>
                                    {i > 0 && <div className='h-px min-h-px min-w-8 flex-1 bg-gray-200' aria-hidden />}
                                    <span className='relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-base font-bold tracking-wide text-white'>
                                        {num}
                                    </span>
                                </Fragment>
                            );
                        })}
                    </div>

                    <div className='grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:gap-10'>
                        {steps.map((step, i) => {
                            const num = step.number || String(i + 1).padStart(2, '0');
                            return (
                                <div
                                    key={`${step.title}-${i}`}
                                    className='flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-6 pb-8 pt-10 text-center shadow-md shadow-gray-200/50 md:pt-8'
                                >
                                    <div className='mb-8 flex w-full items-center md:hidden'>
                                        <div
                                            className={`h-px min-w-0 flex-1 bg-gray-200 ${i === 0 ? 'opacity-0' : ''}`}
                                            aria-hidden
                                        />
                                        <span className='mx-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-base font-bold tracking-wide text-white'>
                                            {num}
                                        </span>
                                        <div
                                            className={`h-px min-w-0 flex-1 bg-gray-200 ${i === steps.length - 1 ? 'opacity-0' : ''}`}
                                            aria-hidden
                                        />
                                    </div>
                                    {step.title && (
                                        <h3 className='mb-3 text-lg font-bold tracking-tight text-gray-900 md:text-xl'>
                                            {step.title}
                                        </h3>
                                    )}
                                    {step.description && (
                                        <p className='text-sm leading-relaxed text-gray-600 md:text-[15px]'>
                                            {step.description}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {ctaLabel && (
                        <div className='mt-12 flex justify-center lg:mt-16'>
                            <a
                                href={href}
                                target={external ? '_blank' : undefined}
                                rel={external ? 'noopener noreferrer' : undefined}
                                className='inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700'
                            >
                                {ctaLabel}
                                <span aria-hidden>→</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
