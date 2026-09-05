import React from 'react';

export default function WhyBuiltComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section id='features'>
            <div className='container cont_p flex flex-col gap-8'>
                <header className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
                    <div>
                        {data?.kicker && <p className='text-xs font-semibold text-accent'>{data.kicker}</p>}
                        <h2 className='heading font-semibold whitespace-pre-line'>{data.heading}</h2>
                    </div>
                    {data?.description && (
                        <p className='max-w-md text-base text-gray-600 md:text-right'>{data.description}</p>
                    )}
                </header>

                {data?.cards?.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {data?.cards?.map((card, index) => (
                            <div
                                key={index}
                                className='min-h-[260px] border border-gray-200 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between bg-white'
                            >
                                <div className='relative z-10 flex flex-col gap-3'>
                                    {card?.icon && (
                                        <div className='w-10 h-10 rounded-xl bg-secondary text-accent flex items-center justify-center text-lg'>
                                            {card.icon}
                                        </div>
                                    )}
                                    <h3 className='subheading font-bold'>{card?.title}</h3>
                                    {card?.description && (
                                        <p className='text-sm text-gray-600 whitespace-pre-line'>{card.description}</p>
                                    )}
                                </div>

                                {index < 3 && (
                                    <div
                                        aria-hidden='true'
                                        className='absolute -right-3 -bottom-7 w-44 h-28 border border-sky-100 bg-white rounded-tl-xl p-3 space-y-2 pointer-events-none'
                                    >
                                        <div className='h-1.5 w-3/4 bg-sky-100 rounded-full' />
                                        <div className='h-1.5 w-full bg-slate-100 rounded-full' />
                                        <div className='h-1.5 w-1/2 bg-slate-100 rounded-full' />
                                        <div className='h-1.5 w-3/4 bg-sky-100 rounded-full' />
                                        <div className='h-1.5 w-full bg-slate-100 rounded-full' />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
