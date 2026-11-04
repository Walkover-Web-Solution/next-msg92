import { useState } from 'react';

export default function FaqsComp({ data, notCont }) {
    const [openIndex, setOpenIndex] = useState(0);

    if (data?.faqs && data?.faqs?.length > 0) {
        return (
            <>
                <div className={`my-20 flex flex-col gap-6 ${!notCont && 'container'}`}>
                    <h2 className='text-3xl font-bold'>{data?.heading || 'Frequently Asked Questions'}</h2>
                    {data?.subheading && <p className='text-lg text-gray-600'> {data.subheading} </p>}
                    <div className='flex flex-col'>
                        {data?.faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className={`collapse collapse-plus ${isOpen ? 'collapse-open border rounded' : 'border-b rounded-none'}`}
                                >
                                    <h3
                                        className={`collapse-title text-xl font-medium ${isOpen ? 'bg-[var(--secandary-color)]' : ''}`}
                                    >
                                        <button
                                            type='button'
                                            className='text-start select-text'
                                            aria-expanded={isOpen}
                                            onClick={() => setOpenIndex(index)}
                                        >
                                            {faq?.question}
                                        </button>
                                    </h3>
                                    <div className='collapse-content '>
                                        <div
                                            className=' pt-3 text-lg '
                                            dangerouslySetInnerHTML={{ __html: faq?.answer }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }
}
