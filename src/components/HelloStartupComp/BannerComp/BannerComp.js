import Image from 'next/image';

export default function BannerComp({ data }) {
    if (!data?.heading && !data?.heading_accent) return null;

    return (
        <>
            <section className='relative overflow-hidden bg-gradient-to-b from-sky-100 to-white pt-16 md:pt-24 text-center'>
                <div className='absolute left-1/2 -translate-x-1/2 top-[300px] w-[680px] h-[680px] rounded-full border border-sky-200/40 pointer-events-none' />
                <div className='absolute left-1/2 -translate-x-1/2 top-[160px] w-[960px] h-[960px] rounded-full border border-sky-200/40 pointer-events-none' />

                <div className='container relative z-10'>
                    <div className='flex flex-col items-center max-w-5xl mx-auto'>
                        {data?.badge && (
                            <div className='inline-flex items-center gap-3 px-5 py-2 rounded-full border border-sky-200 bg-white text-accent text-base sm:text-lg font-semibold mb-6'>
                                <span className='w-3 h-3 rounded-full bg-accent animate-pulse ring-4 ring-sky-100' />
                                <span>{data?.badge}</span>
                            </div>
                        )}

                        <h1 className='heading font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
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
                            <p className='my-4 max-w-2xl text-base md:text-lg text-gray-600'>{data?.subheading}</p>
                        )}

                        <div className='flex flex-wrap items-center justify-center gap-4 mt-6 mb-12'>
                            {data?.primary_btn && data?.primary_btn_link && (
                                <a
                                    href={data.primary_btn_link}
                                    target={data.primary_btn_link.startsWith('http') ? '_blank' : undefined}
                                    rel={data.primary_btn_link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className='btn btn-accent btn-md'
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

                        <div className='relative z-10 w-full'>
                            <Image
                                src={data?.banner_img || '/assets/hello_for_startup/hello_for_startup.png'}
                                alt={data?.heading || 'Hello for Startups'}
                                width={1774}
                                height={644}
                                priority
                                className='w-full h-auto'
                            />
                        </div>
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
            </section>

            {/* Trusted By Bar */}
            {data?.trusted_by?.logos?.length > 0 && (
                <div className='border-y border-gray-200 bg-slate-100 py-5'>
                    <div className='container flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8'>
                        {data?.trusted_by?.title && (
                            <span className='text-xs font-semibold text-gray-700'>{data.trusted_by.title}</span>
                        )}
                        <div className='flex flex-wrap items-center justify-center gap-6 sm:gap-8'>
                            {data?.trusted_by?.logos?.map((logo, index) => (
                                <Image
                                    key={index}
                                    src={logo?.url}
                                    alt={logo?.name || 'Partner logo'}
                                    width={100}
                                    height={24}
                                    className='h-6 sm:h-7 w-auto'
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
