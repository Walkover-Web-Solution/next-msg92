import React from 'react';
import { MdCheck } from 'react-icons/md';

export default function Features({ data }) {
    if (!data?.rows?.length) return null;

    return (
        <section className='container bg-white'>
            <div className='container  py-18'>
                <div className='cont'>
                    {(data?.label || data?.heading) && (
                        <header className='text-center py-16'>
                            {data?.label && (
                                <p className='py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600'>
                                    {data?.label}
                                </p>
                            )}
                            {data?.heading && <h2 className='text-4xl font-bold text-gray-900'>{data?.heading}</h2>}
                        </header>
                    )}

                    <div className='flex flex-col'>
                        {data?.rows.map((row, i) => {
                            const reverseOnLg = i % 2 === 1;
                            return (
                                <article
                                    key={`${row?.title}-${i}`}
                                    className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 py-10'
                                >
                                    <div
                                        className={`flex flex-col gap-5 ${reverseOnLg ? 'lg:order-2 lg:justify-self-start' : 'lg:justify-self-start '}`}
                                    >
                                        {row.eyebrow && (
                                            <p className='text-xs font-semibold uppercase tracking-wider text-indigo-600'>
                                                {row?.eyebrow}
                                            </p>
                                        )}
                                        {row?.title && (
                                            <h3 className='text-3xl font-bold text-gray-900'>{row?.title}</h3>
                                        )}
                                        {row.description && (
                                            <p className='text-base text-gray-600'>{row.description}</p>
                                        )}
                                        {row.bullets?.length > 0 && (
                                            <ul className='mt-1 flex flex-col gap-3'>
                                                {row.bullets.map((item, j) => (
                                                    <li key={j} className='flex items-start gap-3 text-gray-700'>
                                                        <span
                                                            className='flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600'
                                                            aria-hidden
                                                        >
                                                            <MdCheck className='h-3.5 w-3.5' />
                                                        </span>
                                                        <span className='text-base'>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {row.ctaLabel && (
                                            <div>
                                                {row.ctaHref && (
                                                    <a
                                                        href={row.ctaHref}
                                                        className='inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700'
                                                    >
                                                        {row.ctaLabel}
                                                        <span aria-hidden>→</span>
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {row.image && (
                                        <div
                                            className={`w-full ${reverseOnLg ? 'lg:order-1 lg:justify-self-end lg:pe-8 xl:pe-12' : 'lg:justify-self-start lg:ps-8 xl:ps-12'}`}
                                        >
                                            <img
                                                src={row.image}
                                                alt={row.imageAlt || ''}
                                                className='aspect-[4/3] w-full rounded-3xl object-cover shadow-lg shadow-indigo-950/5'
                                                loading='lazy'
                                            />
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
