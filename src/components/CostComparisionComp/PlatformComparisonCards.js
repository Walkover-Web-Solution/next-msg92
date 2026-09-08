import React from 'react';
import { MdCheckCircle, MdWarning } from 'react-icons/md';
import { formatHeadingWithAccent } from './helpers';

export default function PlatformComparisonCards({ data }) {
    if (!data) return null;

    return (
        <section>
            <div className='container cont_p cont cont_gap'>
                <header className='text-center'>
                    {data?.label && <p className='py-2 text-xs font-semibold text-indigo-600'>{data.label}</p>}
                    {data?.heading && <h2 className='heading'>{formatHeadingWithAccent(data.heading)}</h2>}
                    {data?.description && <p className='mx-auto my-3 max-w-2xl text-base'>{data.description}</p>}
                </header>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='cont cont_gap rounded-xl bg-indigo-600 p-6 text-white'>
                        {data?.helloCard?.label && (
                            <p className='text-xs font-semibold text-indigo-200'>{data.helloCard.label}</p>
                        )}
                        {data?.helloCard?.title && <h3 className='text-lg font-bold'>{data.helloCard.title}</h3>}
                        {data?.helloCard?.items?.length > 0 && (
                            <ul className='cont gap-3'>
                                {data.helloCard.items.map((item, index) => (
                                    <li key={index} className='flex items-start gap-2'>
                                        <MdCheckCircle className='my-0.5 h-4 w-4' aria-hidden />
                                        <span className='text-sm'>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className='cont cont_gap rounded-xl border border-gray-200 bg-white p-6'>
                        {data?.competitorCard?.label && (
                            <p className='text-xs font-semibold'>{data.competitorCard.label}</p>
                        )}
                        {data?.competitorCard?.title && (
                            <h3 className='text-lg font-bold'>{data.competitorCard.title}</h3>
                        )}
                        {data?.competitorCard?.items?.length > 0 && (
                            <ul className='cont gap-3'>
                                {data.competitorCard.items.map((item, index) => (
                                    <li key={index} className='flex items-start gap-2'>
                                        <MdWarning className='my-0.5 h-4 w-4 text-red-500' aria-hidden />
                                        <span className='text-sm'>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
