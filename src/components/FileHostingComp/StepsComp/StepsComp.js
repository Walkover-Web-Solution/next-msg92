import React from 'react';

export default function StepsComp({ data, pageInfo }) {
    if (!data) return null;

    return (
        <section className='bg-slate-50'>
            <div className='container cont_p cont_gap flex flex-col'>
                <div className='flex flex-col gap-4 text-center max-w-4xl mx-auto'>
                    {data?.tagline && <span className='text-xs font-semibold text-fh sm:text-sm'>{data.tagline}</span>}
                    {data?.heading && <h2 className='heading'>{data.heading}</h2>}
                    {data?.subheading && (
                        <p className='text-base text-gray-600 md:text-xl max-w-3xl mx-auto'>{data.subheading}</p>
                    )}
                </div>

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-8'>
                    {data?.steps?.map((step, index) => (
                        <div
                            key={index}
                            className='flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'
                        >
                            <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-fh font-bold text-white'>
                                {step?.number}
                            </span>
                            <div className='flex flex-col gap-2'>
                                <h3 className='text-lg font-bold text-gray-900'>{step?.title}</h3>
                                <p className='text-sm text-gray-600 leading-relaxed'>{step?.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
