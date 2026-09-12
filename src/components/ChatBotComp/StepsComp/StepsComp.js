import React from 'react';

export default function ChatbotStepsComp({ data }) {
    const steps = data?.steps || [];

    if (!data) return null;

    return (
        <section className='bg-white border-t border-gray-100'>
            <div className='container cont_p flex flex-col gap-12 lg:gap-16'>
                <div className='flex flex-col items-center text-center gap-3 w-full max-w-4xl mx-auto'>
                    {data?.heading && (
                        <h2 className='text-3xl lg:text-4xl xl:text-[40px] font-bold text-gray-900'>
                            {data?.heading_black ? (
                                <>
                                    {data?.heading_black}{' '}
                                    <span className='text-emerald-600'>{data?.heading_green}</span>
                                </>
                            ) : (
                                data?.heading
                            )}
                        </h2>
                    )}

                    {data?.subheading && (
                        <p
                            className='text-base sm:text-lg text-gray-600 max-w-3xl'
                            dangerouslySetInnerHTML={{ __html: data?.subheading }}
                        />
                    )}
                </div>

                <div className='hidden md:block relative'>
                    <div
                        className='absolute top-6 left-[10%] right-[10%] h-[2px] bg-gray-200 -z-0'
                        aria-hidden='true'
                    />

                    <div className='grid grid-cols-5 gap-4 lg:gap-6 relative z-10'>
                        {steps.map((step, index) => (
                            <div key={index} className='flex flex-col items-center text-center px-2'>
                                <div className='w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-base flex items-center justify-center ring-8 ring-white shadow-sm mb-4'>
                                    {index + 1}
                                </div>

                                <h3 className='text-base lg:text-lg font-bold text-gray-900 mb-2'>{step?.title}</h3>

                                {step?.description && (
                                    <p className='text-xs sm:text-sm text-gray-500'>{step?.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex md:hidden flex-col gap-8 relative pl-16'>
                    <div
                        className='absolute left-6 top-6 bottom-6 w-[2px] bg-gray-200 -translate-x-1/2'
                        aria-hidden='true'
                    />

                    {steps.map((step, index) => (
                        <div key={index} className='relative flex flex-col gap-1 text-left'>
                            <div className='absolute -left-16 top-0 w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-base flex items-center justify-center ring-4 ring-white shadow-sm'>
                                {index + 1}
                            </div>

                            <h3 className='text-base font-bold text-gray-900'>{step?.title}</h3>

                            {step?.description && (
                                <p className='text-xs sm:text-sm text-gray-500'>{step?.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
