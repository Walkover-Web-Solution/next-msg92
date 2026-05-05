import React from 'react';

const VALUE_ACCENTS = {
    emerald: 'text-emerald-400',
    indigo: 'text-indigo-400',
    violet: 'text-violet-300',
    amber: 'text-amber-400',
};

export default function RoiStats({ data }) {
    const { label, heading, subheading, stats = [] } = data ?? {};
    if (!stats.length) return null;

    return (
        <section className='relative overflow-hidden bg-slate-950'>
            <div
                className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.22),transparent)]'
                aria-hidden
            />
            <div className='container cont_p relative py-16 lg:py-24'>
                <div className='cont mx-auto max-w-6xl'>
                    <header className='mb-12 text-center lg:mb-16'>
                        {label && (
                            <p className='mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300'>
                                {label}
                            </p>
                        )}
                        {heading && (
                            <h2 className='mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl'>
                                {heading}
                            </h2>
                        )}
                        {subheading && (
                            <p className='mx-auto max-w-2xl text-base text-slate-400 md:text-lg'>{subheading}</p>
                        )}
                    </header>

                    <div className='rounded-3xl border border-white/10 bg-slate-900/70 px-6 py-10 shadow-xl shadow-indigo-950/40 backdrop-blur-sm md:px-4 md:py-12'>
                        <div className='flex flex-col md:flex-row md:items-stretch md:divide-x md:divide-white/10'>
                            {stats.map((item, i) => {
                                const accentClass = VALUE_ACCENTS[item.accent] || VALUE_ACCENTS.indigo;
                                const isLast = i === stats.length - 1;
                                return (
                                    <div
                                        key={`${item.label}-${i}`}
                                        className={`flex flex-1 flex-col items-center px-2 py-8 text-center first:pt-0 last:pb-0 md:px-6 md:py-0 lg:px-8 ${
                                            !isLast ? 'border-b border-white/10 md:border-b-0' : ''
                                        }`}
                                    >
                                        {item.value && (
                                            <p
                                                className={`mb-3 text-4xl font-bold tabular-nums tracking-tight md:text-5xl ${accentClass}`}
                                            >
                                                {item.value}
                                            </p>
                                        )}
                                        {item.label && (
                                            <p className='mx-auto mb-1 max-w-[13rem] text-sm font-semibold leading-snug text-white md:max-w-[15rem]'>
                                                {item.label}
                                            </p>
                                        )}
                                        {item.subLabel && (
                                            <p className='text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs'>
                                                {item.subLabel}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
