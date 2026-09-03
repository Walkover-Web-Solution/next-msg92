import React from 'react';

export default function FooterCtaComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='bg-gradient-to-b from-[#e9f7ff] to-[#f7fcff] py-20 sm:py-28 text-center border-t border-[#edf5fa]'>
            <div className='container max-w-4xl mx-auto px-4'>
                {data?.kicker ? (
                    <div className='text-accent text-xs font-extrabold uppercase tracking-widest mb-3'>
                        {data.kicker}
                    </div>
                ) : (
                    <div className='text-accent text-xs font-extrabold uppercase tracking-widest mb-3'>
                        For the next stage
                    </div>
                )}

                <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight max-w-2xl mx-auto leading-tight'>
                    {data?.heading}
                </h2>

                {data?.subheading && (
                    <p className='text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-4 mb-8 leading-relaxed'>
                        {data.subheading}
                    </p>
                )}

                {data?.btn_text && data?.btn_link && (
                    <a
                        href={data.btn_link}
                        target={data.btn_link.startsWith('http') ? '_blank' : undefined}
                        rel={data.btn_link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className='btn btn-accent btn-md text-white font-bold px-7 py-3 rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center gap-1'
                    >
                        <span>{data.btn_text}</span>
                        <span className='ml-1'>&nbsp;→</span>
                    </a>
                )}
            </div>
        </section>
    );
}
