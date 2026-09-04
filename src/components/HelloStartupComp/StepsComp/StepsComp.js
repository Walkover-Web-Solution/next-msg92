export default function StepsComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section>
            <div className='container cont_p cont cont_gap'>
                <header className='text-center mx-auto max-w-3xl'>
                    {data?.kicker && <p className='py-2 text-xs font-semibold text-accent'>{data.kicker}</p>}
                    <h2 className='heading font-semibold'>{data.heading}</h2>
                    {data?.description && (
                        <p className='mx-auto my-3 max-w-2xl text-base md:text-lg text-gray-600'>{data.description}</p>
                    )}
                </header>

                {data?.steps?.length > 0 && (
                    <div className='relative max-w-5xl mx-auto w-full'>
                        <div className='hidden md:block absolute top-[20px] left-[12%] right-[12%] h-px bg-gray-200 pointer-events-none' />

                        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10'>
                            {data.steps.map((step, index) => (
                                <div key={index} className='flex flex-col items-center text-center'>
                                    <span className='flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white mb-4 shadow-sm ring-4 ring-white border border-gray-200'>
                                        {step?.number || index + 1}
                                    </span>
                                    <h3 className='text-base font-bold text-gray-900 mb-1.5'>{step?.title}</h3>
                                    <p className='text-sm text-gray-600 leading-relaxed max-w-[210px] mx-auto m-0'>
                                        {step?.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
