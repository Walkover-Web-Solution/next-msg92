import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { formatHeadingWithAccent } from './helpers';

export default function CostComparisonHeader({ data }) {
    if (!data) return null;

    return (
        <div className='cont items-center text-center'>
            <h1 className='heading'>{formatHeadingWithAccent(data.heading)}</h1>
            {data?.description && (
                <p className='mx-auto my-7 md:my-8 max-w-3xl text-base md:text-lg text-gray-600'>{data.description}</p>
            )}

            {data?.badges?.length > 0 && (
                <ul className='flex flex-wrap justify-center gap-5'>
                    {data.badges.map((badge, index) => (
                        <li key={index} className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                            <MdCheckCircle className='h-5 w-5 text-emerald-600' aria-hidden />
                            <span>{badge}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
