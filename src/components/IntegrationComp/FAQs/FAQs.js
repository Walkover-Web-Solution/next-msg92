export default function FAQs({ data }) {
    if (!data?.faqs?.length) return null;

    return (
        <section className={`integration-faqs integration-faqs--${data.theme} w-full bg-white`}>
            <div className='container cont cont_p flex flex-col items-center gap-10'>
                <div className='cont cont_gap max-w-3xl items-center text-center'>
                    <p className='text-sm font-semibold uppercase tracking-widest text-shopifyBanner-headingAccent'>
                        Help Center
                    </p>
                    <h2 className='heading text-shopifyBanner-heading'>{data.heading}</h2>
                    {data.subheading && <p className='subheading text-shopifyBanner-body'>{data.subheading}</p>}
                </div>

                <div className='flex w-full max-w-3xl flex-col gap-4'>
                    {data.faqs.map((faq, index) => (
                        <details
                            key={index}
                            className='group rounded-xl border border-shopifyBanner-primary/20 bg-shopifyBanner-content/50 open:bg-white open:shadow-md'
                        >
                            <summary className='flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left [&::-webkit-details-marker]:hidden'>
                                <h3 className='text-lg font-bold text-shopifyBanner-heading'>{faq.question}</h3>
                                <span className='relative h-8 w-8 shrink-0 rounded-full bg-shopifyBanner-content text-shopifyBanner-visual'>
                                    <span className='absolute left-2 top-[15px] h-0.5 w-4 bg-current' />
                                    <span className='absolute left-[15px] top-2 h-4 w-0.5 bg-current transition-transform group-open:rotate-90' />
                                </span>
                            </summary>
                            <p className='px-5 pb-5 text-base leading-relaxed text-shopifyBanner-body'>{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
