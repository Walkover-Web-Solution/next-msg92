import React from 'react';

export default function EligibilityComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section id={data?.id || 'eligibility'} className='bg-[#EEF5FC] py-14 md:py-20 scroll-mt-10'>
            <div className='container'>
                <div className='text-center max-w-[620px] mx-auto mb-10'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-gray-950 mb-2.5'>{data?.heading}</h2>
                    {data?.description && (
                        <p className='text-xs sm:text-[13px] text-gray-600 leading-relaxed'>{data.description}</p>
                    )}
                </div>

                {data?.cards?.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto'>
                        {data.cards.map((card, index) => (
                            <div
                                key={index}
                                className='bg-white rounded-2xl border border-gray-100/80 p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col justify-between'
                            >
                                <div className='flex items-center justify-between gap-4'>
                                    <h3 className='text-sm sm:text-base font-bold text-gray-900'>{card?.title}</h3>
                                    <span className='text-base sm:text-lg font-bold text-[#1E75BA]'>
                                        {card?.number || String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <p className='text-xs text-gray-500 mt-3 leading-relaxed'>{card?.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
