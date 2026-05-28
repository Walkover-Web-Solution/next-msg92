import React from 'react';

export default function RoiStats({ data }) {
    if (!data?.stats?.length) return null;

    return (
        <section className='bg-slate-950'>
            <div className='container py-16'>
                <div className='cont'>
                    <header className='text-center py-16'>
                        {data?.label && (
                            <p className='py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300'>
                                {data?.label}
                            </p>
                        )}
                        {data?.heading && <h2 className='py-3 text-4xl font-bold text-white'>{data?.heading}</h2>}
                        {data?.subheading && <p className='text-2xl text-slate-400'>{data?.subheading}</p>}
                    </header>

                    <div className='rounded-md border border-white/10 bg-slate-900/70 px-6 py-10 shadow-xl shadow-indigo-950/40 backdrop-blur-sm md:px-4 md:py-12'>
                        <div className='flex flex-col md:flex-row md:divide-x md:divide-white/10'>
                            {data?.stats.map((item, index) => {
                                return (
                                    <div
                                        key={`${item.label}-${index}`}
                                        className={`flex flex-1 flex-col items-center px-2 py-8 text-center ${
                                            index !== data?.stats.length - 1
                                                ? 'border-b border-white/10 md:border-b-0'
                                                : ''
                                        }`}
                                    >
                                        {item.value && (
                                            <p className='text-5xl font-bold text-indigo-400'>{item.value}</p>
                                        )}
                                        {item.label && (
                                            <p className='py-1 text-md font-semibold text-white'>{item.label}</p>
                                        )}
                                        {item.subLabel && (
                                            <p className='text-sm font-medium text-slate-500'>{item.subLabel}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
