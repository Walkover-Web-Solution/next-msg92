import React from 'react';

export default function StepsComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='bg-white py-16 lg:py-24 text-center'>
            <div className='container max-w-6xl mx-auto'>
                <div className='max-w-2xl mx-auto mb-12'>
                    {data?.kicker ? (
                        <div className='text-accent text-xs font-extrabold uppercase tracking-widest mb-3'>
                            {data.kicker}
                        </div>
                    ) : (
                        <div className='text-accent text-xs font-extrabold uppercase tracking-widest mb-3'>
                            Getting started
                        </div>
                    )}
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight'>
                        {data.heading}
                    </h2>
                    {(data?.subheading || data?.description) && (
                        <p className='text-gray-600 text-sm sm:text-base leading-relaxed mt-4'>
                            {data.subheading || data.description}
                        </p>
                    )}
                </div>

                {data?.steps?.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-5xl mx-auto relative before:content-[""] before:absolute before:top-5 before:left-[12%] before:right-[12%] before:h-[1px] before:bg-[#dfe7ed] before:hidden lg:before:block'>
                        {data?.steps?.map((step, index) => (
                            <div key={index} className='flex flex-col items-center text-center relative z-10'>
                                <div className='w-11 h-11 rounded-full bg-accent text-white font-extrabold text-sm flex items-center justify-center border-4 border-white shadow-[0_0_0_1px_#dce8f0] mb-4'>
                                    {step?.number || index + 1}
                                </div>
                                <h3 className='text-base sm:text-lg font-bold text-gray-900 mb-2'>{step?.title}</h3>
                                <p className='text-xs sm:text-sm text-gray-600 max-w-[210px] mx-auto leading-relaxed whitespace-pre-line'>
                                    {step?.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
