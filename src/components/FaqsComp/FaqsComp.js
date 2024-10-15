export default function FaqsComp({ data, notCont }) {
    if (data?.faqs && data?.faqs?.length > 0) {
        return (
            <>
                <div className={`my-20 flex flex-col gap-6 ${!notCont && 'container'}`}>
                    <h2 className='text-3xl font-bold'>{data?.heading || 'Frequently Asked Questions'}</h2>
                    <div className='flex flex-col'>
                        {data?.faqs.map((faq, index) => {
                            return (
                                <div key={index} className='collapse collapse-plus  border-b rounded-none'>
                                    <input type='radio' name='my-accordion-3' defaultChecked={index === 0} />
                                    <h3 className='collapse-title text-xl font-medium'>{faq?.question}</h3>
                                    <div
                                        className='collapse-content py-3 text-lg'
                                        dangerouslySetInnerHTML={{ __html: faq?.answer }}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }
}
