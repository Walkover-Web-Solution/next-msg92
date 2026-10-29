import React from 'react';
import { MdCalendarToday } from 'react-icons/md';

export default function FooterCta({ data, pageInfo }) {
    if (!data?.heading) return null;

    const isRcs = pageInfo?.page === 'rcs';
    const isLight = Boolean(data?.bg);
    const primaryBtnClass = isLight
        ? data?.theme === 'rcs'
            ? 'bg-accent hover:opacity-90'
            : 'whatsapp_bg hover:opacity-90'
        : 'bg-indigo-600 shadow-xl shadow-indigo-600/40 hover:bg-indigo-500';

    return (
        <section
            className={`py-20 lg:py-28 ${isRcs && data?.theme ? 'bg-gradient-to-br from-blue-100 via-indigo-20 to-violet-10' : isLight ? 'bg-white' : 'bg-slate-950'}`}
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
                            isLight ? 'text-primary' : 'text-white'
                        }`}
                    >
                        {data.heading}
                    </h2>
                    {data?.description && (
                        <p
                            className={`mx-auto mb-10 w-full max-w-[min(42rem,60vw)] text-base md:text-lg lg:mb-12 ${
                                isLight ? 'text-gray-600' : 'text-gray-400'
                            }`}
                        >
                            {data.description}
                        </p>
                    )}
                    <div className='flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap'>
                        {data?.primaryLabel && data?.primaryHref && (
                            <a
                                href={data.primaryHref}
                                target={/^https?:\/\//i.test(String(data.primaryHref)) ? '_blank' : undefined}
                                rel={/^https?:\/\//i.test(String(data.primaryHref)) ? 'noopener noreferrer' : undefined}
                                className={`inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition sm:w-auto sm:text-base ${primaryBtnClass}`}
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
                                className={`inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg border bg-transparent px-6 py-3.5 text-sm font-semibold transition sm:w-auto sm:text-base ${
                                    data?.bg
                                        ? 'border-gray-300 text-primary hover:border-gray-400 hover:bg-gray-50'
                                        : 'border-gray-600 text-white hover:border-gray-500 hover:bg-white/5'
                                }`}
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
