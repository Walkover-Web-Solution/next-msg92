export default function FooterCtaComp({ data }) {
    if (!data?.heading) return null;

    const renderHeading = () => {
        if (data?.heading_line1) {
            return (
                <>
                    <span className='block'>{data.heading_line1}</span>
                    {data?.heading_line2 && <span className='text-accent block'>{data.heading_line2}</span>}
                </>
            );
        }
        if (data?.heading?.includes('\n')) {
            const [line1, ...rest] = data.heading.split('\n');
            return (
                <>
                    <span className='block'>{line1}</span>
                    <span className='text-accent block'>{rest.join(' ')}</span>
                </>
            );
        }
        if (data?.heading?.includes(',')) {
            const commaIndex = data.heading.indexOf(',');
            const line1 = data.heading.substring(0, commaIndex + 1);
            const line2 = data.heading.substring(commaIndex + 1).trim();
            return (
                <>
                    <span className='block'>{line1}</span>
                    <span className='text-accent block'>{line2}</span>
                </>
            );
        }
        return data?.heading;
    };

    return (
        <section className='bg-gradient-to-b from-sky-100 to-white border-t border-sky-100'>
            <div className='container cont_p flex flex-col items-center text-center gap-6'>
                <header className='max-w-3xl mx-auto'>
                    {data?.kicker && <p className='py-2 text-xs font-semibold text-accent'>{data.kicker}</p>}
                    <h2 className='heading font-semibold'>{renderHeading()}</h2>
                    {data?.subheading && (
                        <p className='my-3 max-w-2xl text-base md:text-lg text-gray-600'>{data?.subheading}</p>
                    )}
                </header>

                {data?.btn_text && data?.btn_link && (
                    <div className='mt-2'>
                        <a
                            href={data.btn_link}
                            target={data.btn_link.startsWith('http') ? '_blank' : undefined}
                            rel={data.btn_link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className='btn btn-accent btn-md'
                        >
                            <span>{data.btn_text}</span>
                            <span aria-hidden>→</span>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
