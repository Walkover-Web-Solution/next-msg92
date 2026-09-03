import React from 'react';

export default function EligibilityComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section
            id={data?.id || 'eligibility'}
            className='bg-[#f5faff] border-y border-[#edf5fa] py-16 lg:py-24 scroll-mt-10'
        >
            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-end max-w-6xl mx-auto mb-12'>
                    <div>
                        {data?.kicker ? (
                            <div className='text-accent text-xs font-extrabold uppercase tracking-widest mb-3'>
                                {data.kicker}
                            </div>
                        ) : (
                            <div className='text-accent text-xs font-extrabold uppercase tracking-widest mb-3'>
                                Built for early-stage teams
                            </div>
                        )}
                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight'>
                            {data?.heading}
                        </h2>
                    </div>
                    {data?.description && (
                        <p className='text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg mt-2 md:mt-0'>
                            {data.description}
                        </p>
                    )}
                </div>

                {data?.cards?.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#dfeaf2] border border-[#dfeaf2] rounded-2xl overflow-hidden shadow-sm max-w-6xl mx-auto'>
                        {data?.cards?.map((card, index) => {
                            const formattedNum = card?.number
                                ? String(card.number).padStart(2, '0')
                                : String(index + 1).padStart(2, '0');

                            return (
                                <article
                                    key={index}
                                    className='bg-white p-6 sm:p-7 min-h-[220px] flex flex-col justify-between hover:bg-slate-50/50 transition-colors'
                                >
                                    <div className='text-accent font-extrabold text-xs tracking-wider mb-6'>
                                        {formattedNum}
                                    </div>
                                    <div>
                                        <h3 className='text-base sm:text-lg font-bold text-gray-900 mb-2'>
                                            {card?.title}
                                        </h3>
                                        <p className='text-xs sm:text-sm text-gray-600 leading-relaxed'>
                                            {card?.description}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
