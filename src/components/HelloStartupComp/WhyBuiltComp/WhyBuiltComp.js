import React from 'react';

export default function WhyBuiltComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section id='features' className='container cont_p py-16 lg:py-24'>
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 max-w-6xl mx-auto mb-12'>
                <div>
                    {data?.kicker ? (
                        <div className='text-accent text-xs font-extrabold uppercase tracking-widest mb-3'>
                            {data.kicker}
                        </div>
                    ) : (
                        <div className='text-accent text-xs font-extrabold uppercase tracking-widest mb-3'>
                            One workspace
                        </div>
                    )}
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight'>
                        {data?.heading}
                    </h2>
                </div>
                {data?.description && (
                    <p className='text-gray-600 text-sm sm:text-base leading-relaxed md:text-right max-w-md mt-2 md:mt-0'>
                        {data.description}
                    </p>
                )}
            </div>

            {data?.cards?.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto'>
                    {data?.cards?.map((card, index) => {
                        const isLarge = index === 0;
                        const hasVisual = index < 3;

                        return (
                            <div
                                key={index}
                                className={`rounded-2xl border border-gray-200 p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all min-h-[260px] ${
                                    isLarge ? 'bg-gradient-to-br from-secondary/50 via-white to-white' : 'bg-white'
                                }`}
                            >
                                <div>
                                    {card?.icon && (
                                        <div className='w-10 h-10 rounded-xl bg-secondary text-accent flex items-center justify-center text-lg mb-5 font-bold shadow-xs'>
                                            {card?.icon}
                                        </div>
                                    )}
                                    <h3 className='text-lg font-bold text-gray-900 mb-2'>{card?.title}</h3>
                                    <p className='text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[280px] whitespace-pre-line'>
                                        {card?.description}
                                    </p>
                                </div>

                                {hasVisual && (
                                    <div
                                        className='absolute -right-2 -bottom-7 w-44 h-28 border border-[#d9eaf6] bg-white rounded-tl-xl shadow-md p-3 flex flex-col gap-2 pointer-events-none'
                                        aria-hidden
                                    >
                                        <div
                                            className={`h-2 rounded-full ${
                                                index % 2 === 0 ? 'bg-secondary w-3/4' : 'bg-gray-100 w-full'
                                            }`}
                                        />
                                        <div
                                            className={`h-2 rounded-full ${
                                                index === 0 ? 'bg-gray-100 w-full' : 'bg-secondary w-4/5'
                                            }`}
                                        />
                                        <div className='h-2 rounded-full bg-gray-100 w-1/2' />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
