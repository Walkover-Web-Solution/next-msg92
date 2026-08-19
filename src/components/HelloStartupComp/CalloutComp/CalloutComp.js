import React from 'react';

export default function CalloutComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='container my-8'>
            <div className='bg-secondary rounded-2xl py-9 px-8 max-w-4xl mx-auto text-center'>
                <h3 className='heading mb-2.5'>{data.heading}</h3>
                {data?.description && <p className='text-gray-600 max-w-2xl mx-auto mt-2'>{data.description}</p>}
            </div>
        </section>
    );
}
