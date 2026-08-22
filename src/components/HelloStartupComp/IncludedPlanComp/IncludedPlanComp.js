import React from 'react';
import { MdCheckCircle } from 'react-icons/md';

export default function IncludedPlanComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='bg-secondary py-16'>
            <div className='container max-w-4xl mx-auto'>
                <div className='text-center max-w-4xl mx-auto mb-10'>
                    <h1 className='heading'>{data?.heading}</h1>
                    {data?.subheading && <p className='subheading'>{data?.subheading}</p>}
                </div>

                <div className='bg-primary text-white rounded-xl p-6 sm:p-8 shadow-lg'>
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-700'>
                        <div>
                            {data?.plan_badge && (
                                <p className='text-xs text-gray-400 font-medium mb-1'>{data?.plan_badge}</p>
                            )}
                            <div className='flex items-baseline gap-1'>
                                <span className='text-3xl sm:text-4xl font-bold text-white'>{data?.price}</span>
                                {data?.period && <span className='text-xs text-gray-400'>{data?.period}</span>}
                            </div>
                        </div>
                        {data?.action_badge && (
                            <span className='bg-accent text-white text-xs font-semibold px-4 py-1.5 rounded-xl'>
                                {data?.action_badge}
                            </span>
                        )}
                    </div>

                    {data?.stats?.length > 0 && (
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-b border-gray-700'>
                            {data?.stats?.map((stat, index) => (
                                <div key={index} className='flex flex-col'>
                                    <span className='text-2xl sm:text-3xl font-bold text-accent mb-1'>
                                        {stat?.value}
                                    </span>
                                    {stat?.label && (
                                        <span className='text-xs text-gray-400 font-semibold mb-1'>{stat?.label}</span>
                                    )}
                                    <span className='text-xs text-gray-400 whitespace-pre-line'>{stat?.sublabel}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {data?.notice && (
                        <div className='mt-6 bg-white/5 rounded-xl p-4 flex items-center gap-3 border border-white/10'>
                            <MdCheckCircle className='text-accent text-base' aria-hidden />
                            <p className='text-xs text-gray-300' dangerouslySetInnerHTML={{ __html: data?.notice }} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
