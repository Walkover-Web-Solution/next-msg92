import React from 'react';
import { MdArrowForward } from 'react-icons/md';

const PreFooter = ({ content, buttons, themeColor = 'emerald' }) => {
    const colorClasses = {
        emerald: 'bg-emerald-600 hover:bg-emerald-700',
        green: 'bg-green-600 hover:bg-green-700',
    };

    const colors = colorClasses[themeColor] || colorClasses.emerald;

    return (
        <section className='py-16 bg-slate-50 border-t border-slate-200'>
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8'>
                <h2 className='text-3xl font-bold text-slate-900'>{content}</h2>
                <div className='flex flex-wrap items-center justify-center gap-4'>
                    {buttons?.contactSales && (
                        <a
                            href={buttons.contactSales.link}
                            className='px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors'
                        >
                            {buttons.contactSales.text}
                        </a>
                    )}
                    {buttons?.pricing && (
                        <a
                            href={buttons.pricing.link}
                            className='px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors'
                        >
                            {buttons.pricing.text}
                        </a>
                    )}
                    {buttons?.getStarted && (
                        <a
                            href={buttons.getStarted.link}
                            className={`${colors} text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transform hover:-translate-y-0.5 transition duration-200 flex items-center space-x-2`}
                        >
                            <span>{buttons.getStarted.text}</span>
                            <MdArrowForward className='w-5 h-5' />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PreFooter;
