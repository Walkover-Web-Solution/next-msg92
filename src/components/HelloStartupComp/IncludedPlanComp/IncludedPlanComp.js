export default function IncludedPlanComp({ data }) {
    if (!data?.price && !data?.heading) return null;

    return (
        <section id='plan' className='bg-sky-50 border-b border-sky-100'>
            <div className='container cont_p flex flex-col gap-8'>
                <header className='text-center max-w-4xl mx-auto'>
                    <h2 className='heading font-semibold'>{data?.heading}</h2>
                    {data?.subheading && (
                        <p className='my-3 max-w-2xl text-base md:text-lg text-gray-600'>{data?.subheading}</p>
                    )}
                </header>

                <div className='bg-white border border-sky-100 rounded-xl overflow-hidden max-w-6xl w-full mx-auto'>
                    <div className='p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100'>
                        <div>
                            {data?.plan_badge && (
                                <div className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5'>
                                    {data.plan_badge}
                                </div>
                            )}
                            <div className='text-4xl sm:text-5xl font-extrabold text-gray-900 flex items-baseline'>
                                <span>{data?.price}</span>
                                {data?.period && (
                                    <span className='text-xs sm:text-sm font-normal text-gray-500 ml-1.5'>
                                        {data.period}
                                    </span>
                                )}
                            </div>
                        </div>

                        {data?.fee_badge && (
                            <div className='text-accent bg-secondary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider w-fit'>
                                {data.fee_badge}
                            </div>
                        )}
                    </div>

                    {/* Limits 4-column Grid */}
                    {data?.stats?.length > 0 && (
                        <div className='grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-sky-100'>
                            {data?.stats?.map((stat, index) => (
                                <div key={index} className='p-6 sm:p-8 flex flex-col'>
                                    <b className='text-2xl sm:text-3xl font-extrabold text-accent mb-1.5 block'>
                                        {stat?.value}
                                    </b>
                                    <span className='text-xs sm:text-sm text-gray-600 whitespace-pre-line'>
                                        {stat?.sublabel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {data?.notice && (
                        <div className='m-6 sm:m-8 p-4 rounded-xl bg-sky-50 border border-sky-100 text-xs sm:text-sm text-gray-600 flex items-center gap-2'>
                            <span className='font-bold text-sm'>✓</span>
                            <div dangerouslySetInnerHTML={{ __html: data.notice }} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
