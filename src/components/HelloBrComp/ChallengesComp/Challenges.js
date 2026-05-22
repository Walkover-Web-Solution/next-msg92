import React from 'react';

export default function Challenges({ data }) {
    if (!data?.video && !data?.heading) return null;

    return (
        <section className='bg-white'>
            <div className='container py-16 md:py-20'>
                <header className='text-center'>
                    {data?.label && (
                        <p className='py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600'>
                            {data.label}
                        </p>
                    )}
                    {data?.heading && <h2 className='text-4xl font-bold text-gray-900'>{data.heading}</h2>}
                </header>

                {data?.video && (
                    <div className='mx-auto mt-8 w-full px-4 md:mt-10'>
                        <video
                            className='block h-auto w-full object-contain'
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload='metadata'
                            poster={data?.videoPoster}
                            aria-label={data?.videoAlt || data?.heading || ''}
                        >
                            <source src={data.video} type='video/webm' />
                        </video>
                    </div>
                )}
            </div>
        </section>
    );
}
