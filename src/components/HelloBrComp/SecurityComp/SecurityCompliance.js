import React from 'react';
import { MdLockOutline, MdScience, MdSecurity } from 'react-icons/md';

const icons = {
    lock: MdLockOutline,
    shield: MdSecurity,
    vapt: MdScience,
};

export default function SecurityCompliance({ data }) {
    const { label, heading, items = [] } = data ?? {};
    if (!items.length) return null;

    return (
        <section className='bg-white'>
            <div className='container py-16'>
                <div className='cont py-10'>
                    <header className='text-center'>
                        {label && (
                            <p className='py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300'>
                                {label}
                            </p>
                        )}
                        {heading && <h2 className='text-4xl font-bold text-gray-900'>{heading}</h2>}
                    </header>

                    <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-16'>
                        {items.map((item, i) => (
                            <li
                                key={`${item.title}-${i}`}
                                className='flex flex-col rounded-lg border border-gray-200/90 bg-white p-6 '
                            >
                                <span
                                    className='mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600'
                                    aria-hidden
                                >
                                    {React.createElement(icons[item.icon], {
                                        className: 'h-6 w-6',
                                    })}
                                </span>
                                {item.title && <h3 className='py-3 text-2xl font-bold text-gray-900'>{item.title}</h3>}
                                {item.description && (
                                    <p className='text-left text-md text-gray-600'>{item.description}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
