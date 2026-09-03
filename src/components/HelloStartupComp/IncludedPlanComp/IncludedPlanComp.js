import React from 'react';
import { MdCheckCircle } from 'react-icons/md';

export default function IncludedPlanComp({ data }) {
    if (!data?.price && !data?.heading) return null;

    return (
        <section id='plan' className='bg-[#f5faff] pb-16 lg:pb-24'>
            <div className='container max-w-6xl mx-auto'>
                {data?.heading && (
                    <div className='text-center max-w-3xl mx-auto mb-10'>
                        <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>
                            {data.heading}
                        </h2>
                        {data?.subheading && (
                            <p className='text-gray-600 text-sm sm:text-base mt-3 max-w-xl mx-auto'>
                                {data.subheading}
                            </p>
                        )}
                    </div>
                )}

                <div className='bg-white border border-[#dce7ee] rounded-3xl shadow-[0_25px_70px_rgba(22,70,100,0.09)] overflow-hidden'>
                    {/* Price Header */}
                    <div className='p-6 sm:p-9 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#edf0f3]'>
                        <div>
                            {data?.plan_badge && (
                                <div className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                                    {data.plan_badge}
                                </div>
                            )}
                            <div className='flex items-baseline gap-1 mt-1'>
                                <span className='text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight'>
                                    {data?.price}
                                </span>
                                {data?.period && (
                                    <span className='text-xs sm:text-sm font-normal text-gray-500'>{data.period}</span>
                                )}
                            </div>
                        </div>

                        {data?.action_badge && (
                            <div className='bg-[#eaf6ff] text-accent text-xs font-extrabold px-4 py-2 rounded-full tracking-wide'>
                                {data.action_badge}
                            </div>
                        )}
                    </div>

                    {/* Limits 4-column Grid */}
                    {data?.stats?.length > 0 && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#edf0f3]'>
                            {data?.stats?.map((stat, index) => (
                                <div key={index} className='p-6 sm:p-7 flex flex-col justify-center'>
                                    <b className='text-2xl sm:text-3xl font-extrabold text-accent block mb-1'>
                                        {stat?.value}
                                    </b>
                                    <span className='text-xs sm:text-sm text-gray-600 leading-snug whitespace-pre-line'>
                                        {stat?.sublabel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Notice Bottom Bar */}
                    {data?.notice && (
                        <div className='mx-6 sm:mx-8 mb-6 p-4 rounded-xl bg-[#f7fafc] border border-gray-100 flex items-center gap-3 text-xs sm:text-sm text-gray-600'>
                            <MdCheckCircle className='text-accent text-lg flex-shrink-0' aria-hidden />
                            <p dangerouslySetInnerHTML={{ __html: data.notice }} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
