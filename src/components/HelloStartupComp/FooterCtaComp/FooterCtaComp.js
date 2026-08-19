import React from 'react';
import getURL from '@/utils/getURL';

export default function FooterCtaComp({ data, pageInfo }) {
    if (!data?.heading) return null;

    const btnLink = data?.btn_link || getURL('startups-form', pageInfo?.page, pageInfo);

    return (
        <section className='container my-12 mb-16'>
            <div className='bg-[#1E75BA] text-white rounded-2xl py-12 px-6 sm:px-12 max-w-4xl mx-auto text-center shadow-lg'>
                <h2 className='text-2xl sm:text-3xl font-bold text-white mb-3'>{data.heading}</h2>
                {data?.description && (
                    <p className='text-blue-100 text-xs sm:text-sm mb-6 max-w-xl mx-auto leading-relaxed'>
                        {data.description}
                    </p>
                )}
                {data?.btn_text && (
                    <div>
                        <a
                            href={btnLink}
                            target={/^https?:\/\//i.test(String(btnLink)) ? '_blank' : undefined}
                            rel={/^https?:\/\//i.test(String(btnLink)) ? 'noopener noreferrer' : undefined}
                            className='inline-block bg-white text-[#1E75BA] hover:bg-gray-100 font-medium text-xs sm:text-sm px-6 py-2.5 rounded-md shadow-sm transition-colors'
                        >
                            {data.btn_text}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
