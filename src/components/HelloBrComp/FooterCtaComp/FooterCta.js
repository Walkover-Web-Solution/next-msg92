import React from 'react';
import { MdCalendarToday } from 'react-icons/md';

export default function FooterCta({ data, pageInfo }) {
    if (!data?.heading) return null;

    const isRcs = pageInfo?.page === 'rcs';

    return (
        <section
            className={`py-20 lg:py-28 ${
                pageInfo?.page === 'rcs' && data?.theme
                    ? 'bg-gradient-to-br from-blue-100 via-indigo-20 to-violet-10'
                    : 'bg-slate-950'
            }`}
        >
            <div className='container cont _p'>
                <div className='cont text-center'>
                    {data?.label && (
                        <p className='py-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600'>
                            {data.label}
                        </p>
                    )}
                    <h2
                        className={`mb-5 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${
                            data?.theme ? 'text-slate-900' : 'text-white'
                        }`}
                    >
                        {data.heading}
                    </h2>
                    {data?.description && (
                        <p className='mx-auto mb-10 w-full max-w-[min(42rem,60vw)] text-base text-gray-400 md:text-lg lg:mb-12'>
                            {data.description}
                        </p>
                    )}
                    <div className='flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap'>
                        {data?.primaryLabel && data?.primaryHref && (
                            <a
                                href={data.primaryHref}
                                target={/^https?:\/\//i.test(String(data.primaryHref)) ? '_blank' : undefined}
                                rel={/^https?:\/\//i.test(String(data.primaryHref)) ? 'noopener noreferrer' : undefined}
                                className={`inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white shadow-xl transition sm:w-auto sm:text-base ${
                                    data?.theme
                                        ? 'bg-blue-600 shadow-blue-600/30 hover:bg-blue-700'
                                        : 'bg-indigo-600 shadow-indigo-600/40 hover:bg-indigo-500'
                                }`}
                            >
                                <MdCalendarToday className='h-5 w-5 shrink-0' aria-hidden />
                                {data.primaryLabel}
                            </a>
                        )}
                        {data?.secondaryLabel && data?.secondaryHref && (
                            <a
                                href={data.secondaryHref}
                                target={/^https?:\/\//i.test(String(data.secondaryHref)) ? '_blank' : undefined}
                                rel={
                                    /^https?:\/\//i.test(String(data.secondaryHref)) ? 'noopener noreferrer' : undefined
                                }
                                className='inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-600 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition hover:border-gray-500 hover:bg-white/5 sm:w-auto sm:text-base'
                            >
                                {data.secondaryLabel}
                                <span aria-hidden>→</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
