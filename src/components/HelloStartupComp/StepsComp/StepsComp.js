import React from 'react';

export default function StepsComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='bg-white py-16'>
            <div className='container'>
                <div className='text-center max-w-2xl mx-auto mb-10'>
                    <h1 className='heading'>{data?.heading}</h1>
                    {data?.subheading && <p className='subheading'>{data?.subheading}</p>}
                </div>

                {data?.steps?.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto'>
                        {data?.steps?.map((step, index) => (
                            <div key={index} className='flex flex-col items-center text-center'>
                                <div className='w-8 h-8 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center mb-3'>
                                    {step?.number}
                                </div>
                                <h2 className='text-base font-bold text-gray-900 mb-1'>{step?.title}</h2>
                                <p className='text-sm text-gray-500 max-w-xs mx-auto whitespace-pre-line'>
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
