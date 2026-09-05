import React from 'react';
import Link from 'next/link';

export default function HelloStartupTerms({ data }) {
    if (!data?.title) return null;

    return (
        <article className='bg-white'>
            <header className='bg-secondary py-12 border-b border-gray-200'>
                <div className='container max-w-4xl mx-auto'>
                    <nav className='flex items-center gap-2 text-sm font-medium' aria-label='Breadcrumb'>
                        {data?.breadcrumb_parent && data?.breadcrumb_link && (
                            <Link href={data.breadcrumb_link} className='text-accent hover:opacity-80 font-semibold'>
                                {data.breadcrumb_parent}
                            </Link>
                        )}
                        {data?.breadcrumb_parent && data?.breadcrumb_current && (
                            <span className='text-gray-400'>›</span>
                        )}
                        {data?.breadcrumb_current && <span className='text-gray-600'>{data.breadcrumb_current}</span>}
                    </nav>

                    <h1 className='heading my-3'>{data?.title}</h1>

                    {data?.meta && <p className='text-sm text-gray-500'>{data.meta}</p>}
                </div>
            </header>

            <div className='container max-w-4xl mx-auto py-10'>
                {data?.lead && <p className='text-base text-gray-700 mb-8'>{data.lead}</p>}

                {data?.sections?.length > 0 && (
                    <div className='border border-gray-200 rounded-xl p-6 sm:p-8 bg-white my-8'>
                        {data?.nav_title && <h2 className='text-xs font-bold text-gray-400 mb-4'>{data.nav_title}</h2>}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2'>
                            {data?.sections?.map((sec, index) => (
                                <a
                                    key={index}
                                    href={`#section-${sec?.number}`}
                                    className='text-sm text-gray-700 hover:text-accent'
                                >
                                    <span className='font-medium'>{sec?.number}.</span> {sec?.title}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <div className='flex flex-col gap-10 mt-10'>
                    {data?.sections?.map((sec, index) => (
                        <section key={index} id={`section-${sec?.number}`} className='scroll-mt-16'>
                            <h2 className='text-xl font-bold text-gray-900 flex items-baseline gap-2 mb-3'>
                                <span className='text-accent font-bold'>{sec?.number}.</span>
                                <span>{sec?.title}</span>
                            </h2>

                            {sec?.content && (
                                <p className='text-sm text-gray-700'>
                                    {sec.content
                                        .split(/(falcon@msg91\.com|support@msg91\.com|07316914278)/g)
                                        .map((part, partIndex) => {
                                            if (part === 'falcon@msg91.com' || part === 'support@msg91.com') {
                                                return (
                                                    <a
                                                        key={partIndex}
                                                        href={`mailto:${part}`}
                                                        className='text-accent hover:underline font-medium'
                                                    >
                                                        {part}
                                                    </a>
                                                );
                                            }
                                            if (part === '07316914278') {
                                                return (
                                                    <a
                                                        key={partIndex}
                                                        href={`tel:${part}`}
                                                        className='text-accent hover:underline font-medium'
                                                    >
                                                        {part}
                                                    </a>
                                                );
                                            }
                                            return part;
                                        })}
                                </p>
                            )}

                            {sec?.definitions?.length > 0 && (
                                <div className='space-y-2 text-sm text-gray-700'>
                                    {sec.definitions.map((def, defIndex) => (
                                        <p key={defIndex}>
                                            <strong className='font-semibold text-gray-900'>{def?.term}</strong> —{' '}
                                            {def?.desc}
                                        </p>
                                    ))}
                                </div>
                            )}

                            {sec?.lead && <p className='text-sm text-gray-700 mb-2'>{sec?.lead}</p>}

                            {sec?.list?.length > 0 &&
                                (sec?.list_type === 'alpha' ? (
                                    <ol className='list-[lower-alpha] ml-6 space-y-1 text-sm text-gray-700'>
                                        {sec?.list?.map((item, itemIndex) => (
                                            <li key={itemIndex}>{item}</li>
                                        ))}
                                    </ol>
                                ) : (
                                    <ul className='list-disc ml-6 space-y-1 text-sm text-gray-700'>
                                        {sec?.list?.map((item, itemIndex) => (
                                            <li key={itemIndex}>{item}</li>
                                        ))}
                                    </ul>
                                ))}

                            {sec?.footer && <p className='text-sm text-gray-700 mt-3'>{sec?.footer}</p>}

                            {sec?.callout && (
                                <div className='border-l-4 border-accent bg-secondary p-4 rounded-xl text-sm text-gray-700 mt-4'>
                                    {sec?.callout}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {data?.disclaimer && (
                    <div className='border border-gray-200 bg-secondary p-4 rounded-xl text-sm text-gray-700 mt-12 flex items-start gap-3'>
                        <span>⚠️</span>
                        <div>{data?.disclaimer}</div>
                    </div>
                )}
            </div>
        </article>
    );
}
