import React from 'react';
import { MdCheck } from 'react-icons/md';

export default function Features({ data }) {
    const { label, heading, rows = [] } = data ?? {};
    if (!rows.length) return null;

    return (
        <section className='container bg-white'>
            <div className='container cont_p py-16 lg:py-24'>
                <div className='cont mx-auto max-w-6xl'>
                    {(label || heading) && (
                        <header className='mb-16 text-center lg:mb-20'>
                            {label && (
                                <p className='mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600'>
                                    {label}
                                </p>
                            )}
                            {heading && (
                                <h2 className='text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl'>
                                    {heading}
                                </h2>
                            )}
                        </header>
                    )}

                    <div className='flex flex-col gap-20 lg:gap-28'>
                        {rows.map((row, i) => {
                            const reverseOnLg = i % 2 === 1;
                            return (
                                <article
                                    key={`${row.title}-${i}`}
                                    className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-0 xl:gap-x-28 2xl:gap-x-32'
                                >
                                    <div
                                        className={`flex max-w-xl flex-col gap-5 lg:max-w-none ${reverseOnLg ? 'lg:order-2 lg:justify-self-start lg:ps-8 xl:ps-12' : 'lg:justify-self-start lg:pe-8 xl:pe-12'}`}
                                    >
                                        {row.eyebrow && (
                                            <p className='text-xs font-semibold uppercase tracking-wider text-indigo-600'>
                                                {row.eyebrow}
                                            </p>
                                        )}
                                        {row.title && (
                                            <h3 className='text-2xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl'>
                                                {row.title}
                                            </h3>
                                        )}
                                        {row.description && (
                                            <p className='text-base leading-relaxed text-gray-600 md:text-lg'>
                                                {row.description}
                                            </p>
                                        )}
                                        {row.bullets?.length > 0 && (
                                            <ul className='mt-1 flex flex-col gap-3'>
                                                {row.bullets.map((item, j) => (
                                                    <li key={j} className='flex items-start gap-3 text-gray-700'>
                                                        <span
                                                            className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600'
                                                            aria-hidden
                                                        >
                                                            <MdCheck className='h-3.5 w-3.5' />
                                                        </span>
                                                        <span className='text-base leading-snug'>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {row.ctaLabel && (
                                            <div className='pt-1'>
                                                {row.ctaHref ? (
                                                    <a
                                                        href={row.ctaHref}
                                                        className='inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700'
                                                    >
                                                        {row.ctaLabel}
                                                        <span aria-hidden>→</span>
                                                    </a>
                                                ) : (
                                                    <span className='inline-flex items-center gap-1 text-sm font-semibold text-indigo-600'>
                                                        {row.ctaLabel}
                                                        <span aria-hidden>→</span>
                                                    </span>
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
