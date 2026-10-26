export default function SplitColumns({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='whatsapp_lite_bg'>
            <div className='container cont_p'>
                <div className='flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-0'>
                    <div className='flex-1 lg:pr-12 cont cont_gap'>
                        <h2 className='heading'>{data?.heading}</h2>
                        {data?.paragraphs?.map((paragraph, index) => (
                            <p key={index} className='text-base md:text-lg text-gray-600'>
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className='hidden lg:block w-px bg-accent shrink-0 self-stretch' aria-hidden />

                    <div className='flex-1 lg:pl-12 cont cont_gap border-t border-accent lg:border-t-0 pt-8 lg:pt-0'>
                        {data?.ways_heading && <h3 className='text-2xl font-bold'>{data?.ways_heading}</h3>}
                        <ul className='cont cont_gap'>
                            {data?.ways?.map((way, index) => (
                                <li key={index} className='cont gap-1'>
                                    {way?.title && <h4 className='text-lg font-bold'>{way?.title}</h4>}
                                    {way?.description && <p className='text-base text-gray-600'>{way?.description}</p>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
