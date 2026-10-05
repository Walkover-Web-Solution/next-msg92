export default function FooterCtaComp({ data, pageInfo }) {
    if (!data) return null;

    const isWhatsApp = pageInfo?.page === 'whatsapp' || pageInfo?.page === 'whatsapp-chat-window';
    const bgClass =
        data?.bg_class ||
        (isWhatsApp ? 'whatsapp_gradient_bg' : 'bg-gradient-to-b from-sky-100 to-white border-t border-sky-100');
    const accentClass = data?.accent_class || (isWhatsApp ? 'text-whatsapp' : 'text-accent');
    const btnClass =
        data?.btn_class || (isWhatsApp ? 'btn whatsapp_bg text-white border-none btn-md' : 'btn btn-accent btn-md');

    return (
        <section className={bgClass}>
            <div className='container cont_p flex flex-col items-center text-center gap-6'>
                <header className='max-w-4xl mx-auto flex flex-col gap-4'>
                    {data?.kicker && <p className={`text-xs font-semibold ${accentClass}`}>{data?.kicker}</p>}
                    <h2 className='heading font-semibold'>
                        {data?.heading_prefix ? (
                            <>
                                <span className='block'>{data?.heading_prefix}</span>
                                {data?.heading_accent && (
                                    <span className={`${accentClass} block`}>{data?.heading_accent}</span>
                                )}
                            </>
                        ) : (
                            <span>{data?.heading}</span>
                        )}
                    </h2>
                    {data?.subheading && <p className='subheading'>{data?.subheading}</p>}
                </header>

                {data?.btn_text && data?.btn_link && (
                    <a href={data?.btn_link} className={btnClass}>
                        {data?.btn_text}
                    </a>
                )}
            </div>
        </section>
    );
}
