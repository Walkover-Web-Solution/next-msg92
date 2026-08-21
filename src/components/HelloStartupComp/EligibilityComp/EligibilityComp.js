import React from 'react';

export default function EligibilityComp({ data }) {
    if (!data?.heading) return null;

    const renderNumber = (num) => {
        if (!num) return null;
        const formattedNumber = String(num).padStart(2, '0');
        return (
            <span className='text-lg font-bold'>
                <span className='text-gray-900'>{formattedNumber[0]}</span>
                <span className='text-accent'>{formattedNumber.slice(1)}</span>
            </span>
        );
    };

    return (
        <section id={data?.id} className='bg-secondary py-16 scroll-mt-10'>
            <div className='container'>
                <div className='text-center max-w-4xl mx-auto mb-10'>
                    <h1 className='heading'>{data?.heading}</h1>
                    {data?.description && <p className='text-gray-600 mt-3 max-w-2xl mx-auto'>{data?.description}</p>}
                </div>

                {data?.cards?.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto'>
                        {data?.cards?.map((card, index) => (
                            <div
                                key={index}
                                className='bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between'
                            >
                                <div className='flex items-center justify-between gap-4'>
                                    <h3 className='text-base font-bold text-gray-900'>{card?.title}</h3>
                                    {renderNumber(card?.number)}
                                </div>
                                <p className='text-sm text-gray-500 mt-3'>{card?.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
