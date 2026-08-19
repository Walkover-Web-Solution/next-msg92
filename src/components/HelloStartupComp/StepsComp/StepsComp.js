import React from 'react';

export default function StepsComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='bg-white py-14 md:py-20'>
            <div className='container'>
                <div className='text-center max-w-2xl mx-auto mb-10'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-gray-950'>{data?.heading}</h2>
                </div>

                {data?.steps?.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto'>
                        {data.steps.map((step, index) => (
                            <div key={index} className='flex flex-col items-center text-center'>
                                <div className='w-8 h-8 rounded-full bg-[#1E75BA] text-white font-bold text-xs flex items-center justify-center mb-3 shadow-sm'>
                                    {step?.number || index + 1}
                                </div>
                                <h3 className='text-sm font-bold text-gray-900 mb-1'>{step?.title}</h3>
                                <p className='text-xs text-gray-500 leading-relaxed max-w-[190px] mx-auto whitespace-pre-line'>
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
