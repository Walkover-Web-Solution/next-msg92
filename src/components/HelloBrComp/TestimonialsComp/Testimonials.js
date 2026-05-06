import React, { useLayoutEffect, useRef, useState } from 'react';
import { MdStar } from 'react-icons/md';
import styles from './Testimonials.module.scss';

const avatarRing = {
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
    blue: 'bg-blue-600',
};

export default function Testimonials({ data }) {
    const trackRef = useRef(null);
    const duplicateRef = useRef(null);
    const [offsetPx, setOffsetPx] = useState(0);

    useLayoutEffect(() => {
        const track = trackRef.current;
        const duplicate = duplicateRef.current;
        if (!track || !duplicate || !data || !data.items || data.items.length === 0) return;

        const updateOffset = () => {
            const next = duplicate.getBoundingClientRect().left - track.getBoundingClientRect().left;
            if (next > 1) setOffsetPx(Math.round(next * 100) / 100);
        };

        updateOffset();

        const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateOffset) : null;
        observer?.observe(track);
        observer?.observe(duplicate);
        window.addEventListener('resize', updateOffset);

        return () => {
            observer?.disconnect();
            window.removeEventListener('resize', updateOffset);
        };
    }, [data]);

    if (!data || !data.items || data.items.length === 0) return null;

    const cssShift = offsetPx > 0 ? `${offsetPx}px` : undefined;

    return (
        <section className='bg-white'>
            <div className='container'>
                <div className='cont py-14'>
                    {(data.label || data.heading) && (
                        <header className='text-center py-16'>
                            {data.label && (
                                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600'>
                                    {data.label}
                                </p>
                            )}
                            {data.heading && (
                                <h2 className='text-4xl font-bold text-gray-900'>{renderHeading(data.heading)}</h2>
                            )}
                        </header>
                    )}
                </div>

                <div className='relative'>
                    <div className='overflow-hidden' aria-label='Customer testimonials'>
                        <div
                            ref={trackRef}
                            className={styles.track}
                            style={cssShift ? { '--marquee-shift': cssShift } : undefined}
                            data-marquee-ready={cssShift ? 'true' : undefined}
                        >
                            <div className={styles.segment}>
                                {data.items.map((item, i) => (
                                    <TestimonialCard key={`t1-${item.name}-${i}`} item={item} />
                                ))}
                            </div>
                            <div ref={duplicateRef} className={styles.segment} aria-hidden>
                                {data.items.map((item, i) => (
                                    <TestimonialCard key={`t2-${item.name}-${i}`} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className='pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-10 bg-gradient-to-r from-white to-transparent'
                        aria-hidden
                    />
                    <div
                        className='pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-10 bg-gradient-to-l from-white to-transparent'
                        aria-hidden
                    />
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ item }) {
    return (
        <article className='w-[min(100vw-3rem,22rem)] shrink-0 rounded-lg border border-gray-100 bg-white p-6 shadow-sm sm:w-[24rem]'>
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
                            avatarRing[item.avatar] ?? 'bg-indigo-500'
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
            {lead} <span className='text-indigo-600'>{accent}</span>
        </>
    );
}
