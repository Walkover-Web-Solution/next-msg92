export default function ReasonsList({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='whatsapp_lite_bg'>
            <div className='container cont cont_p cont_gap'>
                <header className='cont cont_gap'>
                    <h2 className='heading'>{data?.heading}</h2>
                    {data?.tagline && <p className='subheading'>{data?.tagline}</p>}
                    {data?.description && <p className='text-base md:text-lg text-gray-600'>{data?.description}</p>}
                </header>

                <div className='cont border-t border-gray-200'>
                    {data?.reasons?.map((reason, index) => (
                        <div
                            key={index}
                            className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12 py-6 md:py-8 border-b border-gray-200 last:border-b-0'
                        >
                            {reason?.title && <h3 className='text-lg font-bold'>{reason?.title}</h3>}
                            {reason?.description && <p className='text-base text-gray-600'>{reason?.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
