import React from 'react';

export default function WhyBuiltComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section id='features'>
            <div className='container cont_p cont cont_gap'>
                <header className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
                    <div>
                        {data?.kicker && <p className='py-2 text-xs font-semibold text-accent'>{data.kicker}</p>}
                        <h2 className='heading font-semibold whitespace-pre-line'>{data.heading}</h2>
                    </div>
                    {data?.description && (
                        <p className='max-w-md text-base text-gray-600 md:text-right'>{data?.description}</p>
                    )}
                </header>

                {data?.cards?.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr] gap-6'>
                        {data?.cards?.map((card, index) => {
                            const isLarge = index === 0;

                            return (
                                <article
                                    key={index}
                                    className={`min-h-[265px] border border-gray-200 rounded-xl p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                                        isLarge
                                            ? 'bg-gradient-to-br from-sky-50 to-white md:col-span-2 lg:col-span-1'
                                            : 'bg-white'
                                    }`}
                                >
                                    <div className='relative z-10 cont gap-3'>
                                        {card?.icon && (
                                            <div className='w-10 h-10 rounded-xl bg-secondary text-accent flex items-center justify-center text-lg'>
                                                {card.icon}
                                            </div>
                                        )}
                                        <h3 className='subheading font-bold text-gray-900'>{card?.title}</h3>
                                        <p className='text-sm text-gray-600 leading-relaxed max-w-[290px] m-0 whitespace-pre-line'>
                                            {card?.description}
                                        </p>
                                    </div>

                                    {index === 0 && (
                                        <div
                                            aria-hidden='true'
                                            className='absolute -right-2.5 -bottom-7 w-[180px] h-[115px] border border-sky-100 bg-white rounded-tl-xl shadow-md p-2.5 pointer-events-none'
                                        >
                                            <div className='h-1.5 w-[78%] bg-sky-100 rounded-full my-1.5' />
                                            <div className='h-1.5 w-full bg-slate-100 rounded-full my-1.5' />
                                            <div className='h-1.5 w-[58%] bg-slate-100 rounded-full my-1.5' />
                                            <div className='h-1.5 w-[78%] bg-sky-100 rounded-full my-1.5' />
                                            <div className='h-1.5 w-full bg-slate-100 rounded-full my-1.5' />
                                        </div>
                                    )}

                                    {index === 1 && (
                                        <div
                                            aria-hidden='true'
                                            className='absolute -right-2.5 -bottom-7 w-[180px] h-[115px] border border-sky-100 bg-white rounded-tl-xl shadow-md p-2.5 pointer-events-none'
                                        >
                                            <div className='h-1.5 w-[78%] bg-sky-100 rounded-full my-1.5' />
                                            <div className='h-1.5 w-[58%] bg-slate-100 rounded-full my-1.5' />
                                            <div className='h-1.5 w-full bg-slate-100 rounded-full my-1.5' />
                                        </div>
                                    )}

                                    {index === 2 && (
                                        <div
                                            aria-hidden='true'
                                            className='absolute -right-2.5 -bottom-7 w-[180px] h-[115px] border border-sky-100 bg-white rounded-tl-xl shadow-md p-2.5 pointer-events-none'
                                        >
                                            <div className='h-1.5 w-full bg-slate-100 rounded-full my-1.5' />
                                            <div className='h-1.5 w-[78%] bg-sky-100 rounded-full my-1.5' />
                                            <div className='h-1.5 w-[58%] bg-slate-100 rounded-full my-1.5' />
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
