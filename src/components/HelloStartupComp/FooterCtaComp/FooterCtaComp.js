import React from 'react';

export default function FooterCtaComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='container my-12 mb-16'>
            <div className='bg-accent text-white rounded-xl py-12 px-6 sm:px-12 max-w-4xl mx-auto text-center shadow-lg'>
                <h2 className='text-2xl sm:text-3xl font-bold text-white mb-3'>{data?.heading}</h2>
                {data?.subheading && <p className='text-secondary mb-6 max-w-xl mx-auto'>{data?.subheading}</p>}
                {data?.btn_text && data?.btn_link && (
                    <a
                        href={data.btn_link}
                        target={data.btn_link.startsWith('http') ? '_blank' : undefined}
                        className='inline-block bg-white text-accent hover:bg-neutral font-medium text-sm px-6 py-2.5 rounded-xl'
                    >
                        {data.btn_text}
                    </a>
                )}
            </div>
        </section>
    );
}
