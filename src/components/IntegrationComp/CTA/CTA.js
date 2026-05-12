export default function CTA({ data }) {
    return (
        <section className={`cta cta--${data.theme}`}>
            <div className='container cont cont_p flex flex-col items-center gap-8 text-center'>
                <div className='cont items-center'>
                    {data?.heading && <h2 className='heading cta_heading'>{data.heading}</h2>}
                    {data?.subheading && <p className='cta_intro subheading'>{data.subheading}</p>}
                </div>

                {(data?.buttons).some((button) => button?.url) && (
                    <div className='flex flex-wrap items-center justify-center gap-3'>
                        {(data?.buttons).map(
                            (button, index) =>
                                button?.url && (
                                    <a
                                        key={index}
                                        href={button.url}
                                        target={'_blank'}
                                        rel={'noopener noreferrer'}
                                        className={index % 2 === 0 ? 'cta_btn-primary' : 'cta_btn-secondary'}
                                    >
                                        {button.label}
                                    </a>
                                )
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
