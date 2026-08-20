import React, { Fragment } from 'react';

export default function ReportsStepsComp({ data }) {
    const { label, heading, subheading, steps = [], ctaLabel, ctaHref, secondaryLabel, secondaryHref } = data ?? {};
    if (!steps.length) return null;

    return (
        <section className='bg-slate-50'>
            <div className='container cont cont_p cont_gap'>
                <div className='cont gap-4 text-center max-w-4xl mx-auto'>
                    {label && <p className='text-xs sm:text-sm font-semibold text-reports'>{label}</p>}
                    {heading && <h2 className='heading'>{heading}</h2>}
                    {subheading && <p>{subheading}</p>}
                </div>

                <div className='mb-6 hidden items-center md:flex px-4'>
                    {steps.map((step, index) => (
                        <Fragment key={`badge-${index}`}>
                            {index > 0 && <div className='h-0.5 min-h-[2px] min-w-8 flex-1 bg-slate-200' aria-hidden />}
                            <span className='relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--reports-color)] text-base font-bold text-white shadow-sm'>
                                {step.number || String(index + 1).padStart(2, '0')}
                            </span>
                        </Fragment>
                    ))}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {steps.map((step, index) => (
                        <div
                            key={`${step.title}-${index}`}
                            className='flex flex-col items-center rounded-xl border border-slate-200/80 bg-white p-6 text-center shadow-sm hover:shadow-md hover:border-[var(--reports-color)]/40'
                        >
                            <div className='mb-4 flex w-full items-center md:hidden'>
                                <div
                                    className={`h-0.5 min-w-0 flex-1 bg-slate-200 ${index === 0 ? 'opacity-0' : ''}`}
                                    aria-hidden
                                />
                                <span className='mx-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--reports-color)] text-sm font-bold text-white shadow-sm'>
                                    {step.number || String(index + 1).padStart(2, '0')}
                                </span>
                                <div
                                    className={`h-0.5 min-w-0 flex-1 bg-slate-200 ${index === steps.length - 1 ? 'opacity-0' : ''}`}
                                    aria-hidden
                                />
                            </div>

                            {step.title && (
                                <h3 className='font-bold text-lg text-primary mb-2 leading-snug'>{step.title}</h3>
                            )}
                            {step.description && (
                                <p className='text-sm text-slate-600 leading-relaxed'>{step.description}</p>
                            )}
                        </div>
                    ))}
                </div>

                {ctaLabel && ctaHref ? (
                    <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap'>
                        <a href={ctaHref} target='_blank' rel='noopener noreferrer' className='btn btn-primary btn-md'>
                            {ctaLabel}
                        </a>
                        {secondaryLabel && secondaryHref ? (
                            <a
                                href={secondaryHref}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='btn btn-primary btn-outline btn-md'
                            >
                                {secondaryLabel}
                            </a>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
