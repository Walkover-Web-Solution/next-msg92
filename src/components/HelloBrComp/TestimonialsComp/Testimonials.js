import React from 'react';
import { MdStar } from 'react-icons/md';
import styles from './Testimonials.module.scss';

const AVATAR_RING = {
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
    blue: 'bg-blue-600',
};

export default function Testimonials({ data }) {
    const { label, heading, items = [] } = data ?? {};
    if (!items.length) return null;

    const loop = [...items, ...items];

    return (
        <section className='bg-white'>
            <div className='container cont_p py-16 lg:py-24'>
                <div className='cont mx-auto max-w-6xl'>
                    {(label || heading) && (
                        <header className='mb-12 text-center lg:mb-16'>
                            {label && (
                                <p className='mb-4 inline-flex rounded-full bg-indigo-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-900'>
                                    {label}
                                </p>
                            )}
                            {heading && (
                                <h2 className='text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl'>
                                    {renderHeading(heading)}
                                </h2>
                            )}
                        </header>
                    )}
                </div>

                <div className='relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8'>
                    <div className={`${styles.marquee} gap-6 px-4 sm:px-6 lg:px-8`}>
                        {loop.map((item, i) => (
                            <article
                                key={`${item.name}-${i}`}
                                className='w-[min(100vw-3rem,22rem)] shrink-0 rounded-[1.75rem] border border-gray-100 bg-white p-6 shadow-sm sm:w-[24rem]'
                            >
                                <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-lg font-serif leading-none text-indigo-600'>
                                    <span aria-hidden>&ldquo;</span>
                                </div>
                                <div className='mb-4 flex gap-0.5' aria-label={`${item.rating ?? 5} out of 5`}>
                                    {Array.from({ length: item.rating ?? 5 }).map((_, j) => (
                                        <MdStar key={j} className='h-4 w-4 shrink-0 text-[#5850EC]' aria-hidden />
                                    ))}
                                </div>
                                <p className='mb-6 text-base leading-relaxed text-gray-600'>{item.quote}</p>
                                <div className='border-t border-gray-100 pt-5'>
                                    <div className='flex items-center gap-3'>
                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                                                AVATAR_RING[item.avatar] ?? 'bg-indigo-500'
                                            }`}
                                            aria-hidden
                                        >
                                            {item.initials}
                                        </div>
                                        <div className='min-w-0'>
                                            <p className='truncate font-bold text-gray-900'>{item.name}</p>
                                            <p className='truncate text-xs font-semibold uppercase tracking-wide text-indigo-500/90'>
                                                {item.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function renderHeading(raw) {
    const parts = String(raw ?? '')
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean);
    if (parts.length < 2) return parts[0] || '';
    const [lead, accent] = parts;
    return (
        <>
            {lead} <span className='text-[#5850EC]'>{accent}</span>
        </>
    );
}
