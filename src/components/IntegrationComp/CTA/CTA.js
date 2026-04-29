export default function CTA({ data }) {
    const buttons = (data?.buttons ?? []).filter((b) => b?.url);

    return (
        <section className={`cta cta--${data.theme}`}>
            <div className='container cont cont_p flex flex-col items-center gap-8 text-center'>
                <div className='cont items-center'>
                    {data?.heading && <h2 className='heading cta_heading'>{data.heading}</h2>}
                    {data?.subheading && <p className='cta_intro subheading'>{data.subheading}</p>}
                </div>

                {buttons.length > 0 && (
                    <div className='flex flex-wrap items-center justify-center gap-3'>
                        {buttons.map((btn, index) => (
                            <a
                                key={index}
                                href={btn.url}
                                target={'_blank'}
                                rel={'noopener noreferrer'}
                                className={index % 2 === 0 ? 'cta_btn-primary' : 'cta_btn-secondary'}
                            >
                                {btn.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
