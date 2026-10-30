import React from 'react';

const StartupSection = ({ data }) => {
    if (!data) return null;

    return (
        <section className='border-t border-yellow-500 hello_gradient_bg py-12 lg:py-16'>
            <div className='container'>
                <div className='mx-auto max-w-7xl overflow-hidden rounded-3xl border border-yellow-400 bg-white shadow-sm'>
                    <div className='grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12'>
                        <div>
                            {data.kicker && (
                                <span className='my-3 inline-block text-sm font-semibold uppercase tracking-wider text-hello'>
                                    {data.kicker}
                                </span>
                            )}

                            <h2 className='text-3xl font-bold leading-tight text-gray-900 lg:text-4xl'>
                                {data.heading}
                            </h2>

                            {data.description && <p className='my-3 leading-7 text-gray-600'>{data.description}</p>}

                            {data.eligibility && (
                                <p className='my-3 text-sm leading-6 text-gray-500'>{data.eligibility}</p>
                            )}

                            {data.cta?.text && data.cta?.link && (
                                <a
                                    href={data.cta.link}
                                    className='my-4 inline-flex items-center justify-center rounded-lg hello_bg px-6 py-3 font-semibold text-hello transition-opacity hover:opacity-90'
                                >
                                    {data.cta.text}
                                </a>
                            )}
                        </div>

                        <div className='rounded-2xl border border-yellow-400 hello_gradient_bg p-6 sm:p-8'>
                            {data.benefits_heading && (
                                <h3 className='my-4 text-xl font-bold text-gray-900'>{data.benefits_heading}</h3>
                            )}

                            {data.benefits?.length > 0 && (
                                <ul className='space-y-5'>
                                    {data.benefits.map((benefit, index) => (
                                        <li key={index} className='flex items-start gap-3'>
                                            <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full hello_bg text-sm font-bold text-hello'>
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
