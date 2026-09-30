import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';
import GetMdIcons from '@/utils/getMdIcons';

export default function WhyChooseChatbotComp({ data }) {
    const items = data?.items || [];

    if (!data) return null;

    return (
        <section className='bg-slate-50 border-t border-gray-100'>
            <div className='container cont_p flex flex-col gap-12 lg:gap-16'>
                <div className='flex flex-col items-center text-center gap-4 w-full max-w-4xl mx-auto'>
                    {data?.tagline && (
                        <span className='inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200'>
                            {data?.tagline}
                        </span>
                    )}

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

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch'>
                    {items.map((item, index) => {
                        const Icon = GetMdIcons(item?.icon);

                        return (
                            <div
                                key={index}
                                className='bg-white rounded-xl p-7 lg:p-8 border border-gray-100 shadow-sm flex flex-col gap-4 group'
                            >
                                <div className='w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-2xl shadow-sm'>
                                    {item?.icon === 'IoLogoWhatsapp' ? <IoLogoWhatsapp /> : Icon && <Icon />}
                                </div>

                                <h3 className='text-xl font-bold text-gray-900 group-hover:text-emerald-600'>
                                    {item?.title}
                                </h3>

                                {item?.description && (
                                    <p
                                        className='text-sm text-gray-600'
                                        dangerouslySetInnerHTML={{ __html: item?.description }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
