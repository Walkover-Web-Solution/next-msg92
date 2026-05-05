import React from 'react';
import { MdCalendarToday } from 'react-icons/md';

export default function FooterCta({ data }) {
    const { label, heading, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref } = data ?? {};
    if (!heading) return null;

    const primaryExternal = /^https?:\/\//i.test(primaryHref || '');
    const secondaryExternal = /^https?:\/\//i.test(secondaryHref || '');

    return (
        <section className='bg-[#050711] py-20 lg:py-28'>
            <div className='container cont_p'>
                <div className='cont mx-auto max-w-4xl text-center'>
                    {label && (
                        <p className='mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400'>{label}</p>
                    )}
                    <h2 className='mb-5 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl'>
                        {heading}
                    </h2>
                    {description && (
                        <p className='mx-auto mb-10 w-full max-w-[min(42rem,60vw)] text-base leading-relaxed text-gray-400 md:text-lg lg:mb-12'>
                            {description}
                        </p>
                    )}
                    <div className='flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap'>
                        {primaryLabel && primaryHref && (
                            <a
                                href={primaryHref}
                                target={primaryExternal ? '_blank' : undefined}
                                rel={primaryExternal ? 'noopener noreferrer' : undefined}
                                className='inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/40 transition hover:bg-indigo-500 sm:w-auto sm:text-base'
                            >
                                <MdCalendarToday className='h-5 w-5 shrink-0' aria-hidden />
                                {primaryLabel}
                            </a>
                        )}
                        {secondaryLabel && secondaryHref && (
                            <a
                                href={secondaryHref}
                                target={secondaryExternal ? '_blank' : undefined}
                                rel={secondaryExternal ? 'noopener noreferrer' : undefined}
                                className='inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-xl border border-gray-600 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition hover:border-gray-500 hover:bg-white/5 sm:w-auto sm:text-base'
                            >
                                {secondaryLabel}
                                <span aria-hidden>→</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
