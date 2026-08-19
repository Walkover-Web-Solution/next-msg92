import React from 'react';
import { MdCheckCircle } from 'react-icons/md';

export default function IncludedPlanComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='bg-white py-14 md:py-20'>
            <div className='container max-w-5xl mx-auto px-4'>
                <div className='text-center max-w-[620px] mx-auto mb-10'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-gray-950 mb-3'>{data?.heading}</h2>
                    {data?.description && (
                        <p className='text-xs sm:text-[13px] text-gray-600 leading-relaxed'>{data.description}</p>
                    )}
                </div>

                <div className='bg-[#101923] text-white rounded-2xl p-6 sm:p-9 max-w-4xl mx-auto shadow-xl'>
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80'>
                        <div>
                            <p className='text-[11px] text-gray-400 font-medium tracking-wide mb-0.5'>
                                {data?.plan_badge || 'Free Startup Plan'}
                            </p>
                            <div className='flex items-baseline gap-1'>
                                <span className='text-3xl sm:text-4xl font-bold text-white tracking-tight'>
                                    {data?.price || '₹0'}
                                </span>
                                <span className='text-xs text-gray-400'>{data?.period || '/month'}</span>
                            </div>
                        </div>
                        {data?.action_badge && (
                            <div>
                                <span className='inline-block bg-[#1E75BA] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm'>
                                    {data.action_badge}
                                </span>
                            </div>
                        )}
                    </div>

                    {data?.stats?.length > 0 && (
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 py-7 border-b border-gray-800/60'>
                            {data.stats.map((stat, index) => (
                                <div key={index} className='flex flex-col'>
                                    <span className='text-[10px] text-gray-400 font-semibold tracking-wider uppercase mb-1'>
                                        {stat?.label || 'UP TO'}
                                    </span>
                                    <span className='text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight'>
                                        {stat?.value}
                                    </span>
                                    <span className='text-xs text-gray-400 whitespace-pre-line leading-snug'>
                                        {stat?.sublabel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {data?.notice && (
                        <div className='mt-6 bg-[#1A2634] rounded-xl p-3 px-4 flex items-center gap-3 border border-gray-800/60'>
                            <MdCheckCircle className='text-emerald-400 text-base shrink-0' aria-hidden />
                            <p className='text-[11px] sm:text-xs text-gray-300 leading-relaxed'>{data.notice}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
