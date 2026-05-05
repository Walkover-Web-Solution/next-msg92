import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

export default function Faqs({ data }) {
    const { label, heading, items = [] } = data ?? {};
    if (!items.length) return null;

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className='bg-white'>
            <div className='container cont_p py-16 lg:py-24'>
                <div className='cont mx-auto max-w-3xl'>
                    <header className='mb-10 text-center md:mb-12'>
                        {label && (
                            <p className='mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600'>
                                {label}
                            </p>
                        )}
                        {heading && (
                            <h2 className='text-3xl font-bold tracking-tight text-gray-900 md:text-4xl'>{heading}</h2>
                        )}
                    </header>

                    <ul className='flex flex-col gap-4'>
                        {items.map((item, index) => {
                            const isOpen = openIndex === index;
                            const panelId = `hello-faq-panel-${index}`;
                            const triggerId = `hello-faq-trigger-${index}`;

                            return (
                                <li key={index}>
                                    <div
                                        className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow md:p-6 ${
                                            isOpen ? 'shadow-md ring-1 ring-indigo-100' : ''
                                        }`}
                                    >
                                        <div className='flex items-start justify-between gap-4'>
                                            <h3 className='text-left text-base font-bold leading-snug text-gray-900 md:text-lg'>
                                                {item.question}
                                            </h3>
                                            <button
                                                type='button'
                                                id={triggerId}
                                                className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 transition hover:bg-indigo-200'
                                                aria-expanded={isOpen}
                                                aria-controls={panelId}
                                                aria-label={
                                                    isOpen
                                                        ? `Close answer: ${item.question}`
                                                        : `Open answer: ${item.question}`
                                                }
                                                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                            >
                                                {isOpen ? (
                                                    <MdClose className='h-5 w-5' aria-hidden />
                                                ) : (
                                                    <MdAdd className='h-5 w-5' aria-hidden />
                                                )}
                                            </button>
                                        </div>
                                        {isOpen && item.answer && (
                                            <div
                                                id={panelId}
                                                role='region'
                                                aria-labelledby={triggerId}
                                                className='mt-4 border-t border-indigo-100 pt-4 text-left text-base leading-relaxed text-gray-600'
                                            >
                                                {item.answer}
                                            </div>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
