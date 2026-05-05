import React, { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { MdFlashOn, MdOutlineChatBubbleOutline } from 'react-icons/md';
import getURL from '@/utils/getURL';

export default function Banner({ pageInfo, data }) {
    return (
        <>
            <section className='container cont_p relative'>
                <div className='absolute'>
                    <div className='absolute inset-0 bg-indigo-600/10 mix-blend-multiply' />
                    <div className='absolute inset-0 bg-gradient-to-r from-white via-white/65 to-transparent' />
                    <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-2/5 max-h-72 bg-gradient-to-b from-white via-white/90 to-transparent' />
                    <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 max-h-72 bg-gradient-to-t from-white via-white/90 to-transparent' />
                </div>

                <div className='relative z-10'>
                    <div className='cont grid min-h-[75dvh] grid-cols-1 items-center gap-10 lg:grid-cols-2'>
                        <div className='flex flex-col gap-6'>
                            <h1 className='heading  tracking-tight text-gray-900'>{renderHeading(data?.heading)}</h1>

                            <p className='subheading text-gray-600'>{data?.description ?? ''}</p>

                            <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap'>
                                <a
                                    href={data?.getstarted_btn_link || getURL('signup', pageInfo?.page, pageInfo)}
                                    target='_blank'
                                    rel={data?.getstarted_btn_link ? 'noopener noreferrer' : undefined}
                                    className='flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700'
                                >
                                    <MdFlashOn size={18} className='shrink-0' aria-hidden />
                                    {data?.getstarted_btn}
                                </a>
                                <button
                                    type='button'
                                    className='flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white/40 px-6 py-3.5 font-bold text-gray-800 shadow-sm hover:border-indigo-300'
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <MdOutlineChatBubbleOutline size={18} className='shrink-0' aria-hidden />
                                    {data?.specialist_btn}
                                </button>
                            </div>
                        </div>

                        <div
                            className='relative min-h-64 w-full rounded-3xl border border-white/50 bg-slate-200 shadow-xl lg:min-h-80'
                            aria-hidden='true'
                        ></div>
                    </div>
                </div>
            </section>
        </>
    );
}

function renderHeading(raw) {
    const parts = String(raw ?? '')
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean);
    if (parts.length < 2) return parts[0] || 'Customer Support';
    const [lead, accent] = parts;
    const rest = parts.slice(2).join(' ');
    return (
        <>
            {lead} <span className='text-indigo-600'>{accent}</span>
            {rest ? ` ${rest}` : null}
        </>
    );
}
