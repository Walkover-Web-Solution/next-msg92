import React from 'react';
import { MdArrowForward } from 'react-icons/md';

const HeroSection = ({
    badge,
    title,
    subtitle,
    description,
    buttonText,
    buttonAction,
    footerText,
    scrollToGenerator,
    themeColor = 'emerald',
}) => {
    const colorClasses = {
        emerald: {
            badge: 'bg-emerald-50 border-emerald-100 text-emerald-700',
            button: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25 hover:shadow-emerald-500/40',
        },
        green: {
            badge: 'bg-green-50 border-green-100 text-green-700',
            button: 'bg-green-600 hover:bg-green-700 shadow-green-500/25 hover:shadow-green-500/40',
        },
    };

    const colors = colorClasses[themeColor] || colorClasses.emerald;

    return (
        <section className='bg-gradient-to-b from-slate-50 via-white to-white py-16 sm:py-24 border-b border-slate-100'>
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6'>
                <div
                    className={`inline-flex items-center space-x-2 ${colors.badge} rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-xs`}
                >
                    <span>{badge}</span>
                </div>

                <h1 className='text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight'>
                    {title}
                </h1>

                <p className='text-lg sm:text-xl font-bold text-slate-700 max-w-3xl mx-auto'>{subtitle}</p>

                <p className='text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed'>{description}</p>

                <div className='pt-4 flex flex-col items-center justify-center space-y-3'>
                    <button
                        onClick={buttonAction || scrollToGenerator}
                        className={`${colors.button} text-white text-base font-bold px-10 py-4 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition duration-200 flex items-center space-x-3 cursor-pointer`}
                    >
                        <span>{buttonText}</span>
                        <MdArrowForward className='w-5 h-5' />
                    </button>
                    {footerText && <p className='text-xs text-slate-500 font-medium'>{footerText}</p>}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
