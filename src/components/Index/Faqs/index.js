export default function Faqs({ data, notCont }) {
    if (data?.faqs && data?.faqs?.length > 0) {
        return (
            <>
                <div className={`cont cont_gap cont_p ${!notCont && 'container'}`}>
                    <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                    <div className='cont'>
                        {data?.faqs.map((faq, index) => {
                            return (
                                <div key={index} className='collapse collapse-plus rounded-none'>
                                    <input type='radio' name='my-accordion-3' defaultChecked={index === 0} />
                                    <h3 className='collapse-title text-xl font-medium'>
                                        <button className='text-start'>{faq?.question}</button>
                                    </h3>
                                    <div className='collapse-content'>
                                        <div
                                            className=' pt-3 text-gray-600'
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
