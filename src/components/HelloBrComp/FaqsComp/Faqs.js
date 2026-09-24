import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

export default function Faqs({ data }) {
    const { label, heading, items = [] } = data ?? {};
    if (!items.length) return null;

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className='bg-white'>
            <div className='container cont_p'>
                <div className='max-w-3xl w-full mx-auto flex flex-col gap-8'>
                    <header className='flex flex-col items-center text-center gap-2'>
                        {label && <p className='text-xs font-semibold text-accent'>{label}</p>}
                        {heading && <h2 className='heading font-bold'>{heading}</h2>}
                    </header>

                    <ul className='flex flex-col gap-4 w-full min-w-0'>
                        {items.map((item, index) => (
                            <li key={index} className='w-full min-w-0'>
                                <div
                                    className={`rounded-xl border border-gray-200 bg-white p-4 sm:p-6 flex flex-col gap-4 w-full min-w-0 ${
                                        openIndex === index ? 'ring-1 ring-sky-100' : ''
                                    }`}
                                >
                                    <button
                                        type='button'
                                        id={`hello-faq-trigger-${index}`}
                                        className='flex w-full min-w-0 items-start justify-between gap-3 sm:gap-4 text-left'
                                        aria-expanded={openIndex === index}
                                        aria-controls={`hello-faq-panel-${index}`}
                                        aria-label={
                                            openIndex === index
                                                ? `Close answer: ${item.question}`
                                                : `Open answer: ${item.question}`
                                        }
                                        onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                    >
                                        <h3 className='flex-1 min-w-0 text-base sm:text-lg font-bold text-gray-900'>
                                            {item.question}
                                        </h3>
                                        <span
                                            className='flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-accent'
                                            aria-hidden='true'
                                        >
                                            {openIndex === index ? (
                                                <MdClose className='h-4 w-4 sm:h-5 sm:w-5' />
                                            ) : (
                                                <MdAdd className='h-4 w-4 sm:h-5 sm:w-5' />
                                            )}
                                        </span>
                                    </button>
                                    {openIndex === index && item.answer && (
                                        <div
                                            id={`hello-faq-panel-${index}`}
                                            role='region'
                                            aria-labelledby={`hello-faq-trigger-${index}`}
                                            className='border-t border-gray-100 text-left text-sm sm:text-base text-gray-600'
                                        >
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
