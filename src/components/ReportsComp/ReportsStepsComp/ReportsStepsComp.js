import { Fragment } from 'react';

export default function ReportsStepsComp({ data }) {
    if (!data?.steps?.length) return null;

    return (
        <section className='bg-slate-50'>
            <div className='container cont cont_p cont_gap'>
                <div className='cont gap-4 text-center max-w-4xl mx-auto'>
                    {data?.label && (
                        <p className='text-xs sm:text-sm font-semibold text-report-primary-dark'>{data.label}</p>
                    )}
                    {data?.heading && <h2 className='heading'>{data.heading}</h2>}
                    {data?.subheading && <p>{data.subheading}</p>}
                </div>

                <div className='mb-6 hidden items-center md:flex px-12 lg:px-28 w-full'>
                    {data.steps.map((step, stepIndex) => (
                        <Fragment key={stepIndex}>
                            {stepIndex > 0 && <div className='h-0.5 flex-1 bg-slate-200' aria-hidden />}
                            <span className='relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-report-primary text-base font-bold text-white shadow-sm'>
                                {step.number}
                            </span>
                        </Fragment>
                    ))}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {data.steps.map((step, stepIndex) => (
                        <div
                            key={stepIndex}
                            className='flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm hover:shadow-md hover:border-report-primary/40'
                        >
                            <div className='mb-4 flex w-full items-center md:hidden'>
                                <div
                                    className={`h-0.5 min-w-0 flex-1 bg-slate-200 ${stepIndex === 0 ? 'opacity-0' : ''}`}
                                    aria-hidden
                                />
                                <span className='mx-3 flex h-10 w-10 items-center justify-center rounded-full bg-report-primary text-sm font-bold text-white shadow-sm'>
                                    {step.number}
                                </span>
                                <div
                                    className={`h-0.5 min-w-0 flex-1 bg-slate-200 ${stepIndex === data.steps.length - 1 ? 'opacity-0' : ''}`}
                                    aria-hidden
                                />
                            </div>

                            {step?.title && <h3 className='font-bold text-lg text-primary mb-2'>{step.title}</h3>}
                            {step?.description && <p className='text-sm text-slate-600'>{step.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
