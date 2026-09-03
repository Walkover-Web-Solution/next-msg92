import React from 'react';

export default function CalloutComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='container max-w-4xl mx-auto my-8 px-4'>
            <div className='bg-[#edf8ff] rounded-2xl py-8 px-6 sm:px-10 text-center border border-[#d6ebfa]'>
                <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-2'>{data?.heading}</h3>
                {data?.description && (
                    <p className='text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        {data.description}
                    </p>
                )}
            </div>
        </section>
    );
}
