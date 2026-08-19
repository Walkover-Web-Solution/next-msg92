import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import getURL from '@/utils/getURL';

export default function BannerComp({ data, pageInfo }) {
    if (!data?.heading && !data?.heading_accent) return null;

    const primaryLink = data?.primary_btn_link || getURL('startups-form', pageInfo?.page, pageInfo);

    return (
        <section className='bg-[#EEF5FC] pt-12 text-center'>
            <div className='container'>
                <div className='flex flex-col items-center max-w-4xl mx-auto'>
                    {data?.badge && (
                        <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7E9FB] text-[#1970B8] text-[11px] font-semibold mb-5 shadow-sm'>
                            <span>🇮🇳</span>
                            <span>{data?.badge_text}</span>
                        </div>
                    )}

                    <h1 className='text-3xl sm:text-4xl md:text-[46px] font-extrabold text-gray-950 tracking-tight leading-tight mb-3.5'>
                        {data?.heading_prefix ? `${data.heading_prefix} ` : 'Hello, '}
                        <span className='text-[#1E75BA]'>{data?.heading_accent || 'free for India startups.'}</span>
                    </h1>

                    {data?.description && (
                        <p className='text-xs sm:text-[15px] text-gray-700 max-w-[620px] leading-[1.6] mx-auto mt-3 mb-14'>
                            {data.description}
                        </p>
                    )}

                    <div className='flex flex-row items-center justify-center gap-4'>
                        {data?.primary_btn && (
                            <a
                                href={primaryLink}
                                target={/^https?:\/\//i.test(String(primaryLink)) ? '_blank' : undefined}
                                rel={/^https?:\/\//i.test(String(primaryLink)) ? 'noopener noreferrer' : undefined}
                                className='bg-[#1E75BA] hover:bg-[#1864a0] text-white font-medium text-[13px] px-5 py-2 rounded-[6px] shadow-sm transition-colors'
                            >
                                {data.primary_btn}
                            </a>
                        )}
                        {data?.secondary_btn && (
                            <a
                                href={data?.secondary_btn_link || '#eligibility'}
                                className='inline-flex items-center gap-1.5 text-[#1E75BA] hover:text-[#1864a0] font-medium text-[13px] transition-colors'
                            >
                                <span>{data.secondary_btn}</span>
                                <span className='w-3.5 h-3.5 rounded-full bg-[#1E75BA] text-white flex items-center justify-center text-[9px]'>
                                    <MdArrowForward aria-hidden />
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Trusted By Banner Strip */}
            {data?.trusted_strip && (
                <div className='mt-16 md:mt-24 bg-[#DCEBFA] py-6 px-6 border-t border-[#D0E2F5]'>
                    <p className='text-[11px] font-semibold text-[#40566F] tracking-wide text-center uppercase'>
                        {data.trusted_strip}
                    </p>
                </div>
            )}
        </section>
    );
}
