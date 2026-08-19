import Image from 'next/image';
import React from 'react';
import { MdArrowForward } from 'react-icons/md';

export default function BannerComp({ data }) {
    if (!data?.heading && !data?.heading_accent) return null;

    const trustedBy = data?.trusted_by;

    return (
        <section className='bg-gradient-to-b from-secondary to-white pt-12 text-center'>
            <div className='container'>
                <div className='flex flex-col items-center max-w-4xl mx-auto'>
                    {data?.badge && (
                        <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-secondary text-accent text-xs font-semibold mb-5 shadow-sm'>
                            <span>🇮🇳</span>
                            <span>{data?.badge_text}</span>
                        </div>
                    )}

                    <h1 className='heading'>
                        {data?.heading_prefix && `${data.heading_prefix} `}
                        <span className='text-accent'>{data?.heading_accent}</span>
                    </h1>

                    {data?.description && (
                        <p className='text-xs sm:text-sm text-gray-700 max-w-xl mx-auto my-12'>{data.description}</p>
                    )}

                    <div className='flex items-center justify-center gap-4'>
                        {data?.primary_btn && data?.primary_btn_link && (
                            <a
                                href={data.primary_btn_link}
                                target={data.primary_btn_link.startsWith('http') ? '_blank' : undefined}
                                className='btn btn-accent btn-sm text-white px-5'
                            >
                                {data.primary_btn}
                            </a>
                        )}
                        {data?.secondary_btn && data?.secondary_btn_link && (
                            <a
                                href={data.secondary_btn_link}
                                target={
                                    data?.secondary_btn_target ||
                                    (data.secondary_btn_link.startsWith('http') ? '_blank' : undefined)
                                }
                                className='inline-flex items-center gap-1.5 text-accent text-xs sm:text-sm font-medium'
                            >
                                <span>{data.secondary_btn}</span>
                                <MdArrowForward className='text-base' aria-hidden />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {trustedBy?.logos?.length > 0 && (
                <div className='mt-16 md:mt-20 bg-secondary py-5 px-4 border-t border-blue-100'>
                    <div className='container flex flex-col md:flex-row items-center justify-center gap-4 md:gap-7'>
                        {trustedBy?.title && (
                            <span className='text-xs font-semibold text-gray-600'>{trustedBy.title}</span>
                        )}
                        <div className='flex flex-wrap items-center justify-center gap-5 sm:gap-7'>
                            {trustedBy.logos.map((logo, index) => (
                                <Image
                                    key={index}
                                    src={logo?.url}
                                    alt={logo?.name}
                                    width={100}
                                    height={24}
                                    className='h-5 sm:h-6 w-auto object-contain'
                                    loading='lazy'
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
