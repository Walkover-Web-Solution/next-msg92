import Image from 'next/image';

export default function BannerComp({ data }) {
    if (!data?.heading && !data?.heading_accent) return null;

    return (
        <>
            <section className='relative overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-white pt-16 md:pt-24 text-center'>
                <div className='absolute left-1/2 -translate-x-1/2 top-[300px] w-[680px] h-[680px] rounded-full border border-sky-200/40 pointer-events-none' />
                <div className='absolute left-1/2 -translate-x-1/2 top-[160px] w-[960px] h-[960px] rounded-full border border-sky-200/40 pointer-events-none' />

                <div className='container relative z-10'>
                    <div className='flex flex-col items-center max-w-5xl mx-auto'>
                        {data?.badge && (
                            <div className='inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-sky-200 bg-white text-accent text-base sm:text-lg font-semibold mb-6 shadow-sm'>
                                <span className='w-3 h-3 rounded-full bg-accent animate-pulse ring-4 ring-sky-100' />
                                <span>{data?.badge}</span>
                            </div>
                        )}

                        <h1 className='heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold max-w-5xl mx-auto leading-[1.15]'>
                            {data?.heading_prefix ? (
                                <>
                                    <span className='block'>{data.heading_prefix}</span>
                                    {data?.heading_accent && (
                                        <span className='text-accent block'>{data.heading_accent}</span>
                                    )}
                                </>
                            ) : (
                                <span>{data?.heading}</span>
                            )}
                        </h1>

                        {data?.subheading && (
                            <p className='mx-auto my-4 max-w-2xl text-base md:text-lg text-gray-600'>
                                {data?.subheading}
                            </p>
                        )}

                        <div className='flex flex-wrap items-center justify-center gap-4 mt-6 mb-12'>
                            {data?.primary_btn && data?.primary_btn_link && (
                                <a
                                    href={data.primary_btn_link}
                                    target={data.primary_btn_link.startsWith('http') ? '_blank' : undefined}
                                    rel={data.primary_btn_link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className='btn btn-accent btn-md text-white rounded-xl'
                                >
                                    <span>{data.primary_btn}</span>
                                    <span aria-hidden>→</span>
                                </a>
                            )}
                            {data?.secondary_btn && data?.secondary_btn_link && (
                                <a
                                    href={data.secondary_btn_link}
                                    target={data?.secondary_btn_target}
                                    rel={data?.secondary_btn_target === '_blank' ? 'noopener noreferrer' : undefined}
                                    className='inline-flex items-center gap-1 text-accent text-sm font-semibold hover:underline'
                                >
                                    <span>{data.secondary_btn}</span>
                                    <span aria-hidden>↗</span>
                                </a>
                            )}
                        </div>

                        <div className='relative z-10 w-full max-w-4xl mx-auto rounded-t-xl border border-gray-200 border-b-0 bg-white shadow-2xl overflow-hidden text-left'>
                            <div className='grid grid-cols-1 md:grid-cols-[170px_1fr] bg-white min-h-[260px]'>
                                <aside className='hidden md:block border-r border-gray-100 p-4'>
                                    <div className='text-xs font-bold text-gray-400 mb-3 px-2'>Hello</div>
                                    <div className='px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-secondary text-accent mb-1'>
                                        Inbox
                                    </div>
                                    <div className='px-2.5 py-1.5 rounded-lg text-xs text-gray-600 mb-1'>Contacts</div>
                                    <div className='px-2.5 py-1.5 rounded-lg text-xs text-gray-600 mb-1'>
                                        Automation
                                    </div>
                                    <div className='px-2.5 py-1.5 rounded-lg text-xs text-gray-600'>Analytics</div>
                                </aside>

                                <div className='p-4 sm:p-5'>
                                    <div className='flex items-center justify-between mb-4'>
                                        <span className='font-bold text-sm text-gray-900'>Support overview</span>
                                        <span className='text-xs font-bold text-accent bg-secondary px-2.5 py-1 rounded-full flex items-center gap-1'>
                                            <span className='w-1.5 h-1.5 rounded-full bg-accent animate-pulse' />
                                            LIVE
                                        </span>
                                    </div>

                                    <div className='grid grid-cols-3 gap-2 sm:gap-3 mb-4'>
                                        <div className='border border-gray-100 rounded-xl p-2.5 sm:p-3 bg-gray-50/50'>
                                            <small className='text-xs font-medium text-gray-400 block'>
                                                OPEN TICKETS
                                            </small>
                                            <b className='text-base sm:text-xl font-bold text-gray-900 block mt-0.5'>
                                                128
                                            </b>
                                            <span className='text-xs text-emerald-600 font-medium'>
                                                &darr; 12% today
                                            </span>
                                        </div>
                                        <div className='border border-gray-100 rounded-xl p-2.5 sm:p-3 bg-gray-50/50'>
                                            <small className='text-xs font-medium text-gray-400 block'>
                                                AVG. RESPONSE
                                            </small>
                                            <b className='text-base sm:text-xl font-bold text-gray-900 block mt-0.5'>
                                                4m
                                            </b>
                                            <span className='text-xs text-emerald-600 font-medium'>
                                                &darr; 18% faster
                                            </span>
                                        </div>
                                        <div className='border border-gray-100 rounded-xl p-2.5 sm:p-3 bg-gray-50/50'>
                                            <small className='text-xs font-medium text-gray-400 block'>RESOLVED</small>
                                            <b className='text-base sm:text-xl font-bold text-gray-900 block mt-0.5'>
                                                94%
                                            </b>
                                            <span className='text-xs text-emerald-600 font-medium'>
                                                &uarr; 6% this week
                                            </span>
                                        </div>
                                    </div>

                                    <div className='border border-gray-100 rounded-xl grid grid-cols-1 sm:grid-cols-[180px_1fr] overflow-hidden text-xs'>
                                        <div className='border-r border-gray-100 p-2.5 bg-gray-50/30 hidden sm:block'>
                                            <div className='p-2 rounded-lg bg-secondary text-accent font-medium mb-1 truncate'>
                                                Order status &middot; WhatsApp
                                            </div>
                                            <div className='p-2 rounded-lg text-gray-600 truncate'>
                                                Refund request &middot; Email
                                            </div>
                                            <div className='p-2 rounded-lg text-gray-600 truncate'>
                                                Product question &middot; Chat
                                            </div>
                                        </div>
                                        <div className='p-3 bg-white'>
                                            <div className='text-xs font-semibold text-gray-500 pb-2 border-b border-gray-100'>
                                                Customer conversation
                                            </div>
                                            <div className='mt-2.5 bg-gray-100 rounded-lg p-2 max-w-[80%] text-gray-700 text-xs'>
                                                Hi! Where is my order?
                                            </div>
                                            <div className='mt-2 bg-secondary text-accent rounded-lg p-2 max-w-[80%] ml-auto text-xs'>
                                                I&apos;ve got it &mdash; checking that for you.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {data?.trusted_by?.logos?.length > 0 && (
                <div className='border-t border-b border-gray-200 bg-slate-100 py-5 px-4'>
                    <div className='container flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8'>
                        {data?.trusted_by?.title && (
                            <span className='text-xs font-semibold text-gray-700'>{data.trusted_by.title}</span>
                        )}
                        <div className='flex flex-wrap items-center justify-center gap-6 sm:gap-8'>
                            {data?.trusted_by?.logos?.map((logo, index) => (
                                <Image
                                    key={index}
                                    src={logo?.url}
                                    alt={logo?.name}
                                    width={100}
                                    height={24}
                                    className='h-6 sm:h-7 w-auto object-contain'
                                    loading='lazy'
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
