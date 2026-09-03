import Image from 'next/image';
import React from 'react';
import { MdArrowForward } from 'react-icons/md';

export default function BannerComp({ data }) {
    if (!data?.heading && !data?.heading_accent) return null;

    return (
        <section className='relative overflow-hidden bg-gradient-to-b from-[#e3f3ff] via-[#f3faff] to-white pt-16 sm:pt-20 pb-0 text-center'>
            {/* Concentric ambient background rings */}
            <div
                className='absolute top-[300px] left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full border border-accent/10 pointer-events-none'
                aria-hidden
            />
            <div
                className='absolute top-[160px] left-1/2 -translate-x-1/2 w-[960px] h-[960px] rounded-full border border-accent/10 pointer-events-none'
                aria-hidden
            />

            <div className='container relative z-10'>
                <div className='flex flex-col items-center max-w-4xl mx-auto'>
                    {data?.badge && (
                        <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d6ebfa] bg-white/90 backdrop-blur-sm text-accent text-xs font-bold shadow-sm mb-5'>
                            <span className='w-2 h-2 rounded-full bg-accent ring-4 ring-accent/20 animate-pulse' />
                            <span>{data?.badge}</span>
                        </div>
                    )}

                    <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-gray-900 leading-[1.06] max-w-4xl'>
                        {data?.heading_prefix && `${data.heading_prefix} `}
                        <span className='text-accent'>{data?.heading_accent || data?.heading}</span>
                    </h1>

                    {data?.subheading && (
                        <p className='text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-6 mb-8 leading-relaxed'>
                            {data?.subheading}
                        </p>
                    )}

                    <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12'>
                        {data?.primary_btn && data?.primary_btn_link && (
                            <a
                                href={data.primary_btn_link}
                                target={data.primary_btn_link.startsWith('http') ? '_blank' : undefined}
                                rel={data.primary_btn_link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className='btn btn-accent btn-md text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all'
                            >
                                <span>{data.primary_btn}</span>
                                <span className='ml-1'>&nbsp;→</span>
                            </a>
                        )}
                        {data?.secondary_btn && data?.secondary_btn_link && (
                            <a
                                href={data.secondary_btn_link}
                                target={data?.secondary_btn_target}
                                rel={data?.secondary_btn_target === '_blank' ? 'noopener noreferrer' : undefined}
                                className='inline-flex items-center gap-1.5 text-accent text-sm font-bold hover:underline py-2'
                            >
                                <span>{data.secondary_btn}</span>
                                <MdArrowForward className='text-base' aria-hidden />
                            </a>
                        )}
                    </div>

                    {/* Mini Product Preview Dashboard */}
                    <div
                        className='w-full max-w-[930px] mx-auto border border-[#dfe9f1] border-b-0 bg-white rounded-t-2xl shadow-[0_28px_80px_rgba(22,77,112,0.13)] overflow-hidden text-left relative z-10'
                        aria-label='Hello product preview'
                    >
                        {/* Browser Top Bar */}
                        <div className='h-9 bg-[#f8fafc] border-b border-[#edf1f4] flex items-center px-4 gap-1.5'>
                            <span className='w-2 h-2 rounded-full bg-[#d5dce3]' />
                            <span className='w-2 h-2 rounded-full bg-[#d5dce3]' />
                            <span className='w-2 h-2 rounded-full bg-[#d5dce3]' />
                            <div className='h-4 w-44 sm:w-60 ml-2 bg-[#eef2f5] rounded' />
                        </div>

                        {/* Dashboard Body */}
                        <div className='grid grid-cols-1 md:grid-cols-[170px_1fr] bg-white min-h-[260px]'>
                            {/* Left Mini Sidebar */}
                            <aside className='border-r border-[#edf0f3] p-4 hidden md:block'>
                                <div className='text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-2'>
                                    HELLO
                                </div>
                                <div className='flex flex-col gap-1 text-xs'>
                                    <div className='bg-secondary text-accent font-bold px-2.5 py-1.5 rounded-lg'>
                                        Inbox
                                    </div>
                                    <div className='text-gray-500 hover:bg-gray-50 px-2.5 py-1.5 rounded-lg'>
                                        Contacts
                                    </div>
                                    <div className='text-gray-500 hover:bg-gray-50 px-2.5 py-1.5 rounded-lg'>
                                        Automation
                                    </div>
                                    <div className='text-gray-500 hover:bg-gray-50 px-2.5 py-1.5 rounded-lg'>
                                        Analytics
                                    </div>
                                </div>
                            </aside>

                            {/* Main Content Area */}
                            <div className='p-4 sm:p-5 flex flex-col gap-3.5'>
                                <div className='flex justify-between items-center'>
                                    <span className='font-bold text-sm sm:text-base text-gray-900'>
                                        Support overview
                                    </span>
                                    <span className='text-[10px] font-bold text-accent bg-secondary px-2.5 py-0.5 rounded-full flex items-center gap-1'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-accent' />
                                        LIVE
                                    </span>
                                </div>

                                {/* Metrics Cards */}
                                <div className='grid grid-cols-3 gap-2 sm:gap-3'>
                                    <div className='border border-[#edf0f3] rounded-xl p-2.5 sm:p-3'>
                                        <span className='text-[9px] sm:text-[10px] font-semibold text-gray-400 block'>
                                            OPEN TICKETS
                                        </span>
                                        <b className='text-base sm:text-xl font-bold text-gray-900 block mt-0.5'>128</b>
                                        <span className='text-[9px] text-emerald-600 font-medium'>↓ 12% today</span>
                                    </div>
                                    <div className='border border-[#edf0f3] rounded-xl p-2.5 sm:p-3'>
                                        <span className='text-[9px] sm:text-[10px] font-semibold text-gray-400 block'>
                                            AVG. RESPONSE
                                        </span>
                                        <b className='text-base sm:text-xl font-bold text-gray-900 block mt-0.5'>4m</b>
                                        <span className='text-[9px] text-emerald-600 font-medium'>↓ 18% faster</span>
                                    </div>
                                    <div className='border border-[#edf0f3] rounded-xl p-2.5 sm:p-3'>
                                        <span className='text-[9px] sm:text-[10px] font-semibold text-gray-400 block'>
                                            RESOLVED
                                        </span>
                                        <b className='text-base sm:text-xl font-bold text-gray-900 block mt-0.5'>94%</b>
                                        <span className='text-[9px] text-emerald-600 font-medium'>↑ 6% this week</span>
                                    </div>
                                </div>

                                {/* Inbox & Chat Preview */}
                                <div className='border border-[#edf0f3] rounded-xl grid grid-cols-1 sm:grid-cols-[1fr_1.3fr] overflow-hidden min-h-[110px]'>
                                    <div className='border-r border-[#edf0f3] p-2.5 hidden sm:flex flex-col gap-1'>
                                        <div className='bg-secondary/70 text-accent font-medium text-[10px] p-2 rounded-lg'>
                                            Order status · WhatsApp
                                        </div>
                                        <div className='text-gray-500 text-[10px] p-2 rounded-lg'>
                                            Refund request · Email
                                        </div>
                                        <div className='text-gray-500 text-[10px] p-2 rounded-lg'>
                                            Product question · Chat
                                        </div>
                                    </div>
                                    <div className='p-3 flex flex-col justify-between'>
                                        <div className='text-[10px] font-bold text-gray-700 pb-1.5 border-b border-gray-100'>
                                            Customer conversation
                                        </div>
                                        <div className='flex flex-col gap-1.5 my-1'>
                                            <div className='bg-gray-100 text-gray-700 text-[10px] p-2 rounded-lg max-w-[85%] self-start'>
                                                Hi! Where is my order?
                                            </div>
                                            <div className='bg-secondary text-accent font-medium text-[10px] p-2 rounded-lg max-w-[85%] self-end ml-auto'>
                                                I've got it — checking that for you.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted By Bar */}
            {data?.trusted_by?.logos?.length > 0 && (
                <div className='border-y border-[#e7f0f6] bg-[#f9fcff] py-5 px-4 relative z-10'>
                    <div className='container flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8'>
                        {data?.trusted_by?.title && (
                            <span className='text-[11px] font-bold tracking-wider text-gray-500 uppercase'>
                                {data.trusted_by.title}
                            </span>
                        )}
                        <div className='flex flex-wrap items-center justify-center gap-6 sm:gap-8'>
                            {data?.trusted_by?.logos?.map((logo, index) => (
                                <Image
                                    key={index}
                                    src={logo?.url}
                                    alt={logo?.name || 'Partner logo'}
                                    width={100}
                                    height={24}
                                    className='h-5 sm:h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity'
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
