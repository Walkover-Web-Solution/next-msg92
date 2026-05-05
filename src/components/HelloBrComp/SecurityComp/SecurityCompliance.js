import React from 'react';
import { MdLockOutline, MdScience, MdSecurity } from 'react-icons/md';

const ICON_MAP = {
    lock: MdLockOutline,
    shield: MdSecurity,
    vapt: MdScience,
};

export default function SecurityCompliance({ data }) {
    const { label, heading, items = [] } = data ?? {};
    if (!items.length) return null;

    return (
        <section className='bg-white'>
            <div className='container cont_p py-16 lg:py-24'>
                <div className='cont mx-auto max-w-6xl'>
                    <header className='mb-12 text-center lg:mb-16'>
                        {label && (
                            <p className='mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600'>
                                {label}
                            </p>
                        )}
                        {heading && (
                            <h2 className='text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-[2.5rem] lg:leading-tight'>
                                {heading}
                            </h2>
                        )}
                    </header>

                    <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
                        {items.map((item, i) => {
                            const Icon = ICON_MAP[item.icon] || MdLockOutline;
                            return (
                                <li
                                    key={`${item.title}-${i}`}
                                    className='flex flex-col rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
                                >
                                    <span
                                        className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600'
                                        aria-hidden
                                    >
                                        <Icon className='h-6 w-6' />
                                    </span>
                                    {item.title && (
                                        <h3 className='mb-3 text-lg font-bold tracking-tight text-gray-900'>
                                            {item.title}
                                        </h3>
                                    )}
                                    {item.description && (
                                        <p className='text-left text-sm leading-relaxed text-gray-600 md:text-[15px]'>
                                            {item.description}
                                        </p>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
