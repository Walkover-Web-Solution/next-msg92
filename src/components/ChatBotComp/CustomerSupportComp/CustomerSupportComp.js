import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';
import GetMdIcons from '@/utils/getMdIcons';

export default function CustomerSupportComp({ data }) {
    const useCases = data?.use_cases || [];

    if (!data) return null;

    return (
        <section className='bg-[#f4fcf4]'>
            <div className='container cont_p grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch'>
                <div className='lg:col-span-5 bg-white rounded-xl p-8 lg:p-10 shadow-sm border border-gray-100 flex flex-col justify-between'>
                    <div className='flex flex-col'>
                        <div className='w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl mb-6 shadow-sm'>
                            <IoLogoWhatsapp />
                        </div>

                        {data?.heading && (
                            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900'>
                                {data?.heading_black ? (
                                    <>
                                        {data?.heading_black}{' '}
                                        <span className='text-emerald-600 block sm:inline'>{data?.heading_green}</span>
                                    </>
                                ) : (
                                    data?.heading
                                )}
                            </h2>
                        )}

                        <div className='w-12 h-1 bg-emerald-600 rounded-full my-6' />

                        {data?.subheading && (
                            <p
                                className='text-sm sm:text-base text-gray-600'
                                dangerouslySetInnerHTML={{ __html: data?.subheading }}
                            />
                        )}
                    </div>

                    <div className='pt-8 mt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3'>
                        {data?.footer_tag && (
                            <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200'>
                                <span className='w-2 h-2 rounded-full bg-emerald-600' />
                                {data?.footer_tag}
                            </span>
                        )}

                        {data?.status_tag && (
                            <span className='inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600'>
                                <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                                {data?.status_tag}
                            </span>
                        )}
                    </div>
                </div>

                <div className='lg:col-span-7 bg-white rounded-xl p-8 lg:p-10 shadow-sm border border-gray-100 flex flex-col gap-5'>
                    <div className='flex items-center justify-between pb-2'>
                        {data?.use_cases_heading && (
                            <h3 className='text-2xl font-bold text-gray-900'>{data?.use_cases_heading}</h3>
                        )}
                        {data?.solutions_badge && (
                            <span className='px-3 py-1 rounded-xl text-xs font-semibold bg-gray-100 text-gray-600'>
                                {data?.solutions_badge}
                            </span>
                        )}
                    </div>

                    <div className='flex flex-col gap-3.5'>
                        {useCases.map((item, index) => {
                            const Icon = GetMdIcons(item?.icon);

                            return (
                                <div
                                    key={index}
                                    className='p-4 sm:p-5 rounded-xl border border-gray-100 bg-white flex items-start gap-4'
                                >
                                    <div className='w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl shrink-0'>
                                        {Icon && <Icon />}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <h4 className='text-base font-bold text-gray-900'>{item?.title}</h4>
                                        {item?.description && (
                                            <p className='text-xs sm:text-sm text-gray-600'>{item?.description}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
