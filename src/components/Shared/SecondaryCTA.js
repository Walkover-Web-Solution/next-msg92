import React from 'react';
import { MdOpenInNew } from 'react-icons/md';

const SecondaryCTA = ({ badge, title, description, buttonText, buttonLink, themeColor = 'emerald' }) => {
    const gradientClasses = {
        emerald: 'from-emerald-600 via-green-600 to-emerald-700',
        green: 'from-green-600 via-green-500 to-green-700',
    };

    const gradient = gradientClasses[themeColor] || gradientClasses.emerald;

    return (
        <section id='website-integration' className={`py-16 bg-gradient-to-r ${gradient} text-white`}>
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6'>
                <span className='inline-block bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-white/20'>
                    {badge}
                </span>

                <h2 className='text-3xl sm:text-4xl font-black tracking-tight'>{title}</h2>

                <p className='text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed'>{description}</p>

                <div className='pt-2'>
                    <a
                        href={buttonLink}
                        className='inline-flex items-center space-x-2 bg-white text-emerald-700 font-extrabold px-8 py-3.5 rounded-xl shadow-lg hover:bg-slate-100 transition duration-200'
                    >
                        <span>{buttonText}</span>
                        <MdOpenInNew className='w-4 h-4' />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SecondaryCTA;
