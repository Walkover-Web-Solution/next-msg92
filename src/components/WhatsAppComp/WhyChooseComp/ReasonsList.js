export default function ReasonsList({ data, pageInfo }) {
    if (!data?.heading) return null;

    const isHello = pageInfo?.page === 'hello' || pageInfo?.page === 'hello-contact-center';

    const sectionClass = isHello
        ? 'border-t border-[var(--hello-color)] [background-image:linear-gradient(to_bottom,color-mix(in_srgb,var(--hello-color)_30%,white)_0%,white_100%)]'
        : 'whatsapp_lite_bg';

    const isOdd = data?.reasons?.length % 2 === 1;

    return (
        <section className={sectionClass}>
            <div className='container cont cont_p cont_gap'>
                <header className='cont cont_gap'>
                    <h2 className='whatsapp__heading'>{data?.heading}</h2>
                    {data?.tagline && <p className='whatsapp__subheading'>{data?.tagline}</p>}
                    {data?.description && <p className='text-base md:text-lg text-gray-600'>{data?.description}</p>}
                </header>

                <ul
                    className={`grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-2xl border ${isHello ? 'border-[var(--hello-color)] bg-[var(--hello-color)]' : 'border-green-200 bg-green-200'}`}
                >
                    {data?.reasons?.map((reason, index) => (
                        <li
                            key={index}
                            className='group flex flex-col gap-3 bg-white p-6 md:p-8 transition-colors duration-200 ${hoverClass}'
                        >
                            <span
                                aria-hidden='true'
                                className={`h-1 w-8 rounded-full ${
                                    isHello ? 'hello_bg' : 'whatsapp_bg'
                                } transition-all duration-300 group-hover:w-14`}
                            />
                            {reason?.title && (
                                <h3 className='text-lg md:text-xl font-bold leading-snug text-gray-900'>
                                    {reason?.title}
                                </h3>
                            )}
                            {reason?.description && (
                                <p className='text-base leading-relaxed text-gray-600'>{reason?.description}</p>
                            )}
                        </li>
                    ))}

                    {data?.reasons?.length % 2 === 1 && <li aria-hidden='true' className='hidden md:block bg-white' />}
                </ul>
            </div>
        </section>
    );
}
