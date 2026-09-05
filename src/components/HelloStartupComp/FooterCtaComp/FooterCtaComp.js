export default function FooterCtaComp({ data }) {
    if (!data) return null;

    return (
        <section className='bg-gradient-to-b from-sky-100 to-white border-t border-sky-100'>
            <div className='container cont_p flex flex-col items-center text-center gap-6'>
                <header className='max-w-4xl mx-auto'>
                    {data?.kicker && <p className='text-xs font-semibold text-accent'>{data.kicker}</p>}
                    <h2 className='heading font-semibold'>
                        {data?.heading_prefix ? (
                            <>
                                <span className='block'>{data.heading_prefix}</span>
                                {data?.heading_accent && (
                                    <span className='text-accent block'>{data.heading_accent}</span>
                                )}
                            </>
                        ) : (
                            <span>{data?.heading}</span>
                        )}
                    </h2>
                    {data?.subheading && <p className='my-3 text-base md:text-lg text-gray-600'>{data.subheading}</p>}
                </header>

                {data?.btn_text && data?.btn_link && (
                    <a href={data.btn_link} className='btn btn-accent btn-md'>
                        {data.btn_text}
                    </a>
                )}
            </div>
        </section>
    );
}
