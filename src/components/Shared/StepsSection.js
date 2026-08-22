import React from 'react';

const StepsSection = ({ title, description, steps, themeColor = 'emerald' }) => {
    const colorClasses = {
        emerald: 'bg-emerald-600 shadow-emerald-500/20',
        green: 'bg-green-600 shadow-green-500/20',
    };

    const colors = colorClasses[themeColor] || colorClasses.emerald;

    return (
        <section id='how-it-works' className='py-16 bg-slate-50 border-b border-slate-200/70'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center max-w-2xl mx-auto mb-12'>
                    <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900'>{title}</h2>
                    {description && <p className='text-slate-600 mt-2 text-sm'>{description}</p>}
                </div>

                <div className='grid md:grid-cols-3 gap-8'>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className='bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm relative space-y-4 hover:shadow-md transition'
                        >
                            <div
                                className={`w-12 h-12 text-white rounded-xl flex items-center justify-center text-lg font-black shadow-md ${colors}`}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className='text-lg font-bold text-slate-900'>{step.title}</h3>
                            <p className='text-sm text-slate-600 leading-relaxed'>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepsSection;
