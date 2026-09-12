import React from 'react';
import GetMdIcons from '@/utils/getMdIcons';

export default function SalesOpportunityComp({ data }) {
    const useCases = data?.use_cases || [];

    if (!data) return null;

    return (
        <section className='bg-white border-t border-gray-100'>
            <div className='container cont_p flex flex-col gap-12 lg:gap-14'>
                <div className='flex flex-col items-center text-center gap-3 w-full max-w-5xl xl:max-w-6xl mx-auto'>
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
                            className='text-base sm:text-lg text-gray-600'
                            dangerouslySetInnerHTML={{ __html: data?.subheading }}
                        />
                    )}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6 items-stretch'>
                    {useCases.map((item, index) => {
                        const Icon = GetMdIcons(item?.icon);

                        return (
                            <div
                                key={index}
                                className='bg-white rounded-xl p-6 sm:p-7 border border-gray-100 shadow-sm flex flex-col items-start gap-4'
                            >
                                <div className='w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-2xl shadow-sm'>
                                    {Icon && <Icon />}
                                </div>

                                <h3 className='text-lg font-bold text-gray-900'>{item?.title}</h3>

                                {item?.description && (
                                    <p className='text-xs sm:text-sm text-gray-600'>{item?.description}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
