import React, { Fragment } from 'react';
import getURL from '@/utils/getURL';

export default function StepsSetup({ data, pageInfo }) {
    const { label, heading, subheading, steps = [], ctaLabel, ctaHref, ctaLink } = data ?? {};
    if (!steps.length) return null;

    const href = ctaHref || ctaLink || getURL('signup', pageInfo?.page, pageInfo);
    const external = /^https?:\/\//i.test(href);

    return (
        <section className='bg-slate-50'>
            <div className='container'>
                <div className='cont py-14'>
                    <header className='text-center py-16'>
                        {label && (
                            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600'>{label}</p>
                        )}
                        {heading && <h2 className='text-4xl font-bold text-gray-900'>{heading}</h2>}
                        {subheading && <p className='text-2xl text-gray-600'>{subheading}</p>}
                    </header>

                    <div className='mb-10 hidden items-center md:mb-12 md:flex lg:px-2'>
                        {steps.map((step, index) => (
                            <Fragment key={`badge-${index}`}>
                                {index > 0 && <div className='h-px min-h-px min-w-8 flex-1 bg-gray-200' aria-hidden />}
                                <span className='relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-base font-bold tracking-wide text-white'>
                                    {step.number || String(index + 1).padStart(2, '0')}
                                </span>
                            </Fragment>
                        ))}
                    </div>

                    <div className='grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:gap-10'>
                        {steps.map((step, index) => (
                            <div
                                key={`${step.title}-${index}`}
                                className='flex flex-col items-center rounded-lg border border-gray-100 bg-white p-16 text-center'
                            >
                                <div className='mb-8 flex w-full items-center md:hidden'>
                                    <div
                                        className={`h-px min-w-0 flex-1 bg-gray-200 ${index === 0 ? 'opacity-0' : ''}`}
                                        aria-hidden
                                    />
                                    <span className='mx-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-base font-bold text-white'>
                                        {step.number || String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div
                                        className={`h-px min-w-0 flex-1 bg-gray-200 ${index === steps.length - 1 ? 'opacity-0' : ''}`}
                                        aria-hidden
                                    />
                                </div>
                                {step.title && <h3 className='py-3 text-2xl font-bold text-gray-900'>{step.title}</h3>}
                                {step.description && <p className='text-md text-gray-600'>{step.description}</p>}
                            </div>
                        ))}
                    </div>

                    {ctaLabel && (
                        <div className='mt-12 flex justify-center lg:mt-16'>
                            <a
                                href={href}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-4 text-base font-bold text-white hover:bg-indigo-700'
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
