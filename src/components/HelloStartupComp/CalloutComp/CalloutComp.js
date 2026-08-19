import React from 'react';

export default function CalloutComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='container my-8'>
            <div className='bg-[#DCEBFA] rounded-2xl py-9 px-8 max-w-4xl mx-auto text-center'>
                <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-2.5'>{data.heading}</h3>
                {data?.description && (
                    <p className='text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto'>
                        {data.description}
                    </p>
                )}
            </div>
        </section>
    );
}
