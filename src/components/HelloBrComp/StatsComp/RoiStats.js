import React from 'react';

export default function RoiStats({ data, pageInfo }) {
    if (!data?.stats?.length) return null;

    const isHello =
        ['hello', 'hello-contact-center'].includes(pageInfo?.page) &&
        !['br', 'br-pt'].includes(pageInfo?.country?.toLowerCase());
    const isWhatsApp = pageInfo?.page === 'whatsapp';

    return (
        <section className={isHello ? 'border-t border-yellow-500' : isWhatsApp ? 'bg-white' : 'bg-slate-950'}>
            <div className='container py-16'>
                <div className='cont'>
                    {(data?.label || data?.heading || data?.subheading) && (
                        <header className='text-center py-16'>
                            {data?.label && (
                                <p className='py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300'>
                                    {data.label}
                                </p>
                            )}

                            {data?.heading && <h2 className='py-3 text-4xl font-bold text-white'>{data.heading}</h2>}

                            {data?.subheading && <p className='text-2xl text-slate-400'>{data.subheading}</p>}
                        </header>
                    )}

                    <div
                        className={`rounded-md px-6 py-10 md:px-4 md:py-12 ${
                            isWhatsApp
                                ? 'bg-white'
                                : `border shadow-xl backdrop-blur-sm ${
                                      isHello
                                          ? 'border-hello_lite_bg/30 bg-white/70 shadow-amber-900/10'
                                          : 'border-white/10 bg-slate-900/70 shadow-indigo-950/40'
                                  }`
                        }`}
                    >
                        <div
                            className={`flex flex-col md:flex-row md:divide-x ${
                                isHello
                                    ? 'md:divide-hello_lite_bg/30'
                                    : isWhatsApp
                                      ? 'md:divide-slate-200'
                                      : 'md:divide-white/10'
                            }`}
                        >
                            {data?.stats.map((item, index) => (
                                <div
                                    key={`${item.label}-${index}`}
                                    className={`flex flex-1 flex-col items-center px-2 py-8 text-center ${
                                        index !== data.stats.length - 1
                                            ? isHello
                                                ? 'border-b border-hello_lite_bg/30 md:border-b-0'
                                                : isWhatsApp
                                                  ? 'border-b border-slate-200 md:border-b-0'
                                                  : 'border-b border-white/10 md:border-b-0'
                                            : ''
                                    }`}
                                >
                                    {item.value && (
                                        <p
                                            className={`font-bold ${
                                                isHello
                                                    ? 'text-5xl text-hello'
                                                    : isWhatsApp
                                                      ? 'text-4xl text-black'
                                                      : 'text-5xl text-indigo-400'
                                            }`}
                                        >
                                            {item.value}
                                        </p>
                                    )}

                                    {item.label && (
                                        <p
                                            className={`py-1 text-md font-semibold ${
                                                isHello ? 'text-gray-900' : isWhatsApp ? 'text-slate-900' : 'text-white'
                                            }`}
                                        >
                                            {item.label}
                                        </p>
                                    )}

                                    {item.subLabel && (
                                        <p
                                            className={`text-sm font-medium ${
                                                isHello
                                                    ? 'text-gray-600'
                                                    : isWhatsApp
                                                      ? 'text-slate-600'
                                                      : 'text-slate-500'
                                            }`}
                                        >
                                            {item.subLabel}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
