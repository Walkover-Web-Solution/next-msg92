import { useState } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';

export default function CheckoutFaqs({ data }) {
    const [openIndex, setOpenIndex] = useState(null);

    if (!data?.items?.length) return null;

    return (
        <section className='bg-shopifyCheckout-cream'>
            <div className='container cont cont_p'>
                <div className='flex flex-col gap-6 py-12 md:py-16'>
                    {data?.eyebrow && (
                        <div className='flex items-center gap-3'>
                            <span className='h-px w-8 bg-shopifyCheckout-accent' aria-hidden />
                            <span className='text-xs font-semibold uppercase tracking-widest text-shopifyCheckout-accent'>
                                {data.eyebrow}
                            </span>
                        </div>
                    )}

                    {data?.heading_segments?.length > 0 && (
                        <h2 className='heading max-w-3xl'>
                            {data.heading_segments.map((part, index) => (
                                <span
                                    key={index}
                                    className={`${part?.accent ? 'italic text-shopifyCheckout-accent' : 'text-shopifyCheckout-heading'}${part?.block ? ' block' : ''}`}
                                >
                                    {part?.text}
                                </span>
                            ))}
                        </h2>
                    )}
                </div>

                <div className='border-t border-shopifyCheckout-heading/10 pb-12 md:pb-16'>
                    {data.items.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div key={index} className='border-b border-shopifyCheckout-heading/10'>
                                <button
                                    type='button'
                                    className='flex w-full items-center justify-between gap-6 py-6 text-left'
                                    aria-expanded={isOpen}
                                    aria-controls={`checkout-faq-panel-${index}`}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                >
                                    <h3 className='text-lg font-bold text-shopifyCheckout-heading md:text-xl'>
                                        {item?.question}
                                    </h3>
                                    <span className='shrink-0 text-xl text-shopifyCheckout-heading' aria-hidden>
                                        {isOpen ? <MdRemove /> : <MdAdd />}
                                    </span>
                                </button>

                                {isOpen && item?.answer && (
                                    <div
                                        id={`checkout-faq-panel-${index}`}
                                        role='region'
                                        className='pb-6 text-base leading-relaxed text-shopifyCheckout-body'
                                    >
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
