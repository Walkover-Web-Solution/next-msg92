import React from 'react';

const StartupSection = ({ data }) => {
    if (!data) return null;

    return (
        <section className='border-t border-[var(--hello-color)] bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--hello-color)_12%,white)_0%,white_75%)] py-12 lg:py-16'>
            <div className='container'>
                <div className='mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--hello-color)_35%,white)] bg-white shadow-sm'>
                    <div className='grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12'>
                        <div>
                            {data.kicker && (
                                <span className='mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-[var(--hello-dark-color)]'>
                                    {data.kicker}
                                </span>
                            )}

                            <h2 className='text-3xl font-bold leading-tight text-gray-900 lg:text-4xl'>
                                {data.heading}
                            </h2>

                            {data.description && <p className='mt-5 leading-7 text-gray-600'>{data.description}</p>}

                            {data.eligibility && (
                                <p className='mt-4 text-sm leading-6 text-gray-500'>{data.eligibility}</p>
                            )}

                            {data.cta?.text && data.cta?.link && (
                                <a
                                    href={data.cta.link}
                                    className='mt-7 inline-flex items-center justify-center rounded-lg bg-[var(--hello-color)] px-6 py-3 font-semibold text-[var(--hello-dark-color)] transition-opacity hover:opacity-90'
                                >
                                    {data.cta.text}
                                </a>
                            )}
                        </div>

                        <div className='rounded-2xl border border-[color-mix(in_srgb,var(--hello-color)_25%,white)] bg-[color-mix(in_srgb,var(--hello-color)_8%,white)] p-6 sm:p-8'>
                            {data.benefits_heading && (
                                <h3 className='mb-6 text-xl font-bold text-gray-900'>{data.benefits_heading}</h3>
                            )}

                            {data.benefits?.length > 0 && (
                                <ul className='space-y-5'>
                                    {data.benefits.map((benefit, index) => (
                                        <li key={index} className='flex items-start gap-3'>
                                            <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--hello-color)] text-sm font-bold text-[var(--hello-dark-color)]'>
                                                ✓
                                            </span>

                                            <span className='leading-6 text-gray-700'>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StartupSection;
