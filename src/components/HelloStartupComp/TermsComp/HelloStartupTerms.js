import Link from 'next/link';

export default function HelloStartupTerms({ data }) {
    if (!data?.title) return null;

    return (
        <section>
            <div className='bg-secondary py-12 border-b border-gray-200'>
                <div className='container max-w-4xl mx-auto'>
                    {(data?.breadcrumb_parent || data?.breadcrumb_current) && (
                        <div className='flex items-center gap-2 text-sm'>
                            {data?.breadcrumb_parent && data?.breadcrumb_link && (
                                <Link href={data.breadcrumb_link} className='text-accent font-semibold'>
                                    {data.breadcrumb_parent}
                                </Link>
                            )}
                            {data?.breadcrumb_parent && data?.breadcrumb_current && (
                                <span className='text-gray-400'>›</span>
                            )}
                            {data?.breadcrumb_current && <span>{data.breadcrumb_current}</span>}
                        </div>
                    )}
                    <h1 className='heading my-3'>{data?.title}</h1>
                    {data?.meta && <p className='text-sm text-gray-500'>{data.meta}</p>}
                </div>
            </div>

            <div className='container max-w-4xl mx-auto py-10 flex flex-col gap-8'>
                {data?.lead && <p className='text-base'>{data.lead}</p>}

                {data?.sections?.length > 0 && (
                    <div className='border border-gray-200 rounded-xl p-6'>
                        {data?.nav_title && <p className='text-xs font-bold text-gray-400 mb-4'>{data.nav_title}</p>}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2'>
                            {data.sections.map((sec, index) => (
                                <a key={index} href={`#section-${sec?.number}`} className='text-sm hover:text-accent'>
                                    <span className='font-medium'>{sec?.number}.</span> {sec?.title}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <div className='flex flex-col gap-10'>
                    {data?.sections?.map((sec, index) => (
                        <section key={index} id={`section-${sec?.number}`} className='scroll-mt-16 flex flex-col gap-3'>
                            <h2 className='text-xl font-bold flex gap-2'>
                                <span className='text-accent'>{sec?.number}.</span>
                                <span>{sec?.title}</span>
                            </h2>

                            {sec?.content && (
                                <p className='text-sm' dangerouslySetInnerHTML={{ __html: sec.content }} />
                            )}

                            {sec?.definitions?.length > 0 && (
                                <div className='flex flex-col gap-2 text-sm'>
                                    {sec.definitions.map((def, defIndex) => (
                                        <p key={defIndex}>
                                            <strong className='font-semibold'>{def?.term}</strong> — {def?.desc}
                                        </p>
                                    ))}
                                </div>
                            )}

                            {sec?.lead && <p className='text-sm'>{sec.lead}</p>}

                            {sec?.list?.length > 0 && (
                                <ol
                                    className={`${sec?.list_type === 'alpha' ? 'list-[lower-alpha]' : 'list-disc'} ml-6 space-y-1 text-sm`}
                                >
                                    {sec.list.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ol>
                            )}

                            {sec?.footer && <p className='text-sm'>{sec.footer}</p>}

                            {sec?.callout && (
                                <div className='border-l-4 border-accent bg-secondary p-4 rounded-xl text-sm'>
                                    {sec.callout}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {data?.disclaimer && (
                    <div className='border border-gray-200 bg-secondary p-4 rounded-xl text-sm'>{data.disclaimer}</div>
                )}
            </div>
        </section>
    );
}
