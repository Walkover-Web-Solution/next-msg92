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
                </div>
            </section>

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
                                    alt={logo?.name}
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
