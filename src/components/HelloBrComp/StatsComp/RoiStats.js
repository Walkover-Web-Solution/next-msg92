import React from 'react';

export default function RoiStats({ data, pageInfo }) {
    if (!data?.stats?.length) return null;

    const isHello =
        ['hello', 'hello-contact-center'].includes(pageInfo?.page) &&
        !['br', 'br-pt'].includes(pageInfo?.country?.toLowerCase());

    return (
        <section className={isHello ? 'border-t border-yellow-500 hello_gradient_bg' : 'bg-slate-950'}>
            <div className='container py-16'>
                <div className='cont'>
                    <header className='text-center py-16'>
                        {data?.label && (
                            <p
                                className={`py-2 text-xs font-semibold uppercase tracking-[0.2em] ${isHello ? 'text-hello' : 'text-indigo-300'}`}
                            >
                                {data?.label}
                            </p>
                        )}

                        {data?.heading && (
                            <h2 className={`py-3 text-4xl font-bold ${isHello ? 'text-hello' : 'text-white'}`}>
                                {data?.heading}
                            </h2>
                        )}

                        {data?.subheading && (
                            <p className={`text-2xl ${isHello ? 'text-gray-700' : 'text-slate-400'}`}>
                                {data?.subheading}
                            </p>
                        )}
                    </header>

                    <div
                        className={`rounded-md border px-6 py-10 shadow-xl backdrop-blur-sm md:px-4 md:py-12 ${
                            isHello
                                ? 'border-hello_lite_bg/30 bg-white/70 shadow-amber-900/10'
                                : 'border-white/10 bg-slate-900/70 shadow-indigo-950/40'
                        }`}
                    >
                        <div
                            className={`flex flex-col md:flex-row md:divide-x ${
                                isHello ? 'md:divide-hello_lite_bg/30' : 'md:divide-white/10'
                            }`}
                        >
                            {data?.stats.map((item, index) => (
                                <div
                                    key={`${item.label}-${index}`}
                                    className={`flex flex-1 flex-col items-center px-2 py-8 text-center ${
                                        index !== data.stats.length - 1
                                            ? isHello
                                                ? 'border-b border-hello_lite_bg/30 md:border-b-0'
                                                : 'border-b border-white/10 md:border-b-0'
                                            : ''
                                    }`}
                                >
                                    {item.value && (
                                        <p
                                            className={`text-5xl font-bold ${isHello ? 'text-hello' : 'text-indigo-400'}`}
                                        >
                                            {item.value}
                                        </p>
                                    )}

                                    {item.label && (
                                        <p
                                            className={`py-1 text-md font-semibold ${isHello ? 'text-gray-900' : 'text-white'}`}
                                        >
                                            {item.label}
                                        </p>
                                    )}

                                    {item.subLabel && (
                                        <p
                                            className={`text-sm font-medium ${isHello ? 'text-gray-600' : 'text-slate-500'}`}
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
