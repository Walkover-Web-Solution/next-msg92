export default function IncludedPlanComp({ data }) {
    if (!data?.price && !data?.heading) return null;

    return (
        <section id='plan' className='bg-sky-50 border-b border-sky-100'>
            <div className='container cont_p cont cont_gap'>
                <header className='text-center mx-auto max-w-4xl'>
                    <h2 className='heading font-semibold sm:whitespace-nowrap'>{data?.heading}</h2>
                    {data?.subheading && (
                        <p className='mx-auto my-3 max-w-2xl text-base md:text-lg text-gray-600'>{data?.subheading}</p>
                    )}
                </header>

                <div className='bg-white border border-sky-100 rounded-xl shadow-sm overflow-hidden max-w-5xl mx-auto w-full'>
                    <div className='p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100'>
                        <div>
                            {data?.plan_badge && (
                                <div className='text-xs font-bold text-gray-500 mb-1.5'>{data.plan_badge}</div>
                            )}
                            <div className='text-4xl sm:text-5xl font-extrabold text-gray-900 leading-none flex items-baseline'>
                                <span>{data?.price}</span>
                                {data?.period && (
                                    <span className='text-xs sm:text-sm font-normal text-gray-500 ml-1.5'>
                                        {data.period}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className='text-accent bg-secondary px-4 py-2 rounded-full text-xs font-bold w-fit'>
                            {data?.fee_badge}
                        </div>
                    </div>

                    {/* Limits 4-column Grid */}
                    {data?.stats?.length > 0 && (
                        <div className='grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-sky-100'>
                            {data?.stats?.map((stat, index) => (
                                <div key={index} className='p-6 sm:p-7 sm:px-8 flex flex-col'>
                                    <b className='text-2xl sm:text-3xl font-extrabold text-accent mb-1.5 block'>
                                        {stat?.value}
                                    </b>
                                    <span className='text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line block'>
                                        {stat?.sublabel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='mx-5 sm:mx-10 my-6 sm:my-8 p-3.5 sm:p-4 rounded-xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-gray-600 flex items-center gap-2'>
                        <span className='text-gray-900 font-bold text-sm'>✓</span>
                        {data?.notice ? (
                            <div dangerouslySetInnerHTML={{ __html: data.notice }} />
                        ) : (
                            <div>
                                <strong className='text-gray-900 font-bold'>Grow beyond a limit?</strong> Your account
                                and data stay intact — you simply move to a paid Hello plan.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
