import React from 'react';
import { formatHeadingWithAccent } from './helpers';

export default function CostSavingBenefits({ data }) {
    if (!data) return null;

    return (
        <section className='bg-slate-50'>
            <div className='container cont_p cont cont_gap'>
                <header className='text-center'>
                    {data?.label && <p className='py-2 text-xs font-semibold text-indigo-600'>{data.label}</p>}
                    {data?.heading && <h2 className='heading'>{formatHeadingWithAccent(data.heading)}</h2>}
                    {data?.description && (
                        <p className='mx-auto my-3 max-w-2xl text-base md:text-lg'>{data.description}</p>
                    )}
                </header>

                {data?.cards?.length > 0 && (
                    <ul className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                        {data.cards.map((card, index) => (
                            <li
                                key={index}
                                className='cont cont_gap rounded-xl border border-gray-200 bg-white p-6 shadow-sm'
                            >
                                <span className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white'>
                                    {card.number || index + 1}
                                </span>

                                {card.title && <h2 className='subheading'>{card.title}</h2>}
                                {card.description && <p className='text-sm text-gray-600'>{card.description}</p>}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
