import React from 'react';

export default function CostComparisonBanner({ data }) {
    if (!data) return null;

    const { heading, description, primaryBtn, secondaryBtn } = data;

    return (
        <section className='container cont_p'>
            <div className='rounded-2xl bg-darkNavy px-12 text-center py-12'>
                <div className='mx-auto max-w-3xl'>
                    {heading && <h1 className='heading text-white'>{heading}</h1>}
                    {description && <p className='mt-4 text-slate-300'>{description}</p>}

                    <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
                        {primaryBtn?.text && (
                            <a
                                href={primaryBtn?.link}
                                className='btn btn-md bg-white rounded-xl text-darkNavy border-none hover:bg-slate-100'
                            >
                                {primaryBtn?.text}
                            </a>
                        )}

                        {secondaryBtn?.text && (
                            <a
                                href={secondaryBtn?.link}
                                className='btn btn-md btn-outline rounded-xl text-white border-white/30 hover:bg-white/10'
                            >
                                {secondaryBtn?.text}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
