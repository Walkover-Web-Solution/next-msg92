export default function FaqSection({ faqData, faq }) {
    const faqs = faqData;
    return (
        <>
            <div className=" my-5 d-grid gap-4">
                <h2 className="c-fs-1">{faq?.heading || `Frequently Asked Questions`}</h2>
                <div className="accordion" id="accordionExample">
                    {faqs?.length > 0 &&
                        faqs.map((data, index) => {
                            return (
                                <div className="accordion-item  border-start-0 border-end-0" key={`heading${index}`}>
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button
                                            className="accordion-button collapsed c-fs-3 c-fw-m"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${index}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse${index}`}
                                        >
                                            {data?.que}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse${index}`}
                                        className={`accordion-collapse border border-start-1 border-end-1 collapse 
                  `}
                                        aria-labelledby={`heading${index}`}
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div
                                            className="accordion-body c-fs-4"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.des.replace(/(?:\r\n|\r|\n)/g, '<br>'),
                                            }}
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
