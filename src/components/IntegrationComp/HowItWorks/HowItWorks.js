export default function HowItWorks({ data }) {
    if (!data?.steps?.length) return null;

    return (
        <section className={`how-it-works--${data.theme} bg-shopifyBanner-visual`}>
            <div className='container cont cont_p flex flex-col items-center gap-10 text-center'>
                {(data.heading_segments?.length > 0 || data.heading) && (
                    <div className='cont py-5 items-center'>
                        {data.heading_segments?.length > 0 ? (
                            <h2 className='heading'>
                                {data.heading_segments.map((part, index) => (
                                    <span
                                        key={index}
                                        className={
                                            part?.accent ? 'how-it-works_heading-accent' : 'how-it-works_heading'
                                        }
                                    >
                                        {part?.text}
                                    </span>
                                ))}
                            </h2>
                        ) : (
                            <h2 className='heading how-it-works_heading'>{data.heading}</h2>
                        )}
                        {data.subheading && <p className='how-it-works_intro subheading'>{data.subheading}</p>}
                    </div>
                )}

                <div className='grid grid-cols-1 gap-10 md:grid-cols-3 py-5'>
                    {data.steps.map((step, index) => (
                        <div key={index} className='cont gap-3 items-center border p-6 rounded-md'>
                            <div className='how-it-works_badge flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold'>
                                {step.step ?? index + 1}
                            </div>
                            <h3 className='how-it-works_step-title text-xl'>{step.title}</h3>
                            <p className='how-it-works_step-desc text-lg'>{step.description}</p>
                            {step.link && (
                                <a
                                    href={step.link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='how-it-works_step-desc break-all rounded-md px-3 py-1.5 text-lg underline'
                                >
                                    {step.link}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
