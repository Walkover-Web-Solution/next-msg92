import React, { useState } from 'react';
import { MdKeyboardArrowDown as MdChevronDown } from 'react-icons/md';

const FAQSection = ({ heading, faqs, themeColor = 'emerald' }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const colorClasses = {
        emerald: 'text-emerald-600',
        green: 'text-green-600',
    };

    const colors = colorClasses[themeColor] || colorClasses.emerald;

    return (
        <section className='py-16 bg-white'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h2 className='text-3xl font-bold text-slate-900 text-center mb-12'>{heading}</h2>
                <div className='space-y-4'>
                    {faqs?.map((faq, index) => (
                        <div key={index} className='border border-slate-200 rounded-xl overflow-hidden'>
                            <button
                                onClick={() => toggleFaq(index)}
                                className='w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors'
                            >
                                <span className='text-lg font-semibold text-slate-900'>{faq.question}</span>
                                <MdChevronDown
                                    className={`w-5 h-5 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''} ${colors}`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className='p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100'>
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
