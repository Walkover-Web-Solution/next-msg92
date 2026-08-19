import React from 'react';
import { MdChatBubbleOutline, MdSmartToy, MdFlashOn, MdLanguage, MdBarChart, MdPower } from 'react-icons/md';

const iconMap = {
    inbox: {
        icon: MdChatBubbleOutline,
        bg: 'bg-purple-50',
        color: 'text-purple-500',
    },
    chatbot: {
        icon: MdSmartToy,
        bg: 'bg-pink-50',
        color: 'text-pink-500',
    },
    automation: {
        icon: MdFlashOn,
        bg: 'bg-amber-50',
        color: 'text-amber-500',
    },
    translation: {
        icon: MdLanguage,
        bg: 'bg-sky-50',
        color: 'text-sky-500',
    },
    analytics: {
        icon: MdBarChart,
        bg: 'bg-emerald-50',
        color: 'text-emerald-500',
    },
    integrations: {
        icon: MdPower,
        bg: 'bg-slate-100',
        color: 'text-slate-600',
    },
};

export default function WhyBuiltComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='bg-white py-14 md:py-20'>
            <div className='container'>
                <div className='text-center max-w-[640px] mx-auto mb-10'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-gray-950 mb-3'>{data?.heading}</h2>
                    {data?.description && (
                        <p className='text-xs sm:text-[13px] text-gray-600 leading-relaxed'>{data.description}</p>
                    )}
                </div>

                {data?.cards?.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto'>
                        {data.cards.map((card, index) => {
                            const iconConfig = iconMap[card?.icon] || iconMap.inbox;
                            const IconComponent = iconConfig.icon;
                            return (
                                <div
                                    key={index}
                                    className='bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-start'
                                >
                                    <div
                                        className={`w-8 h-8 rounded-lg ${iconConfig.bg} ${iconConfig.color} flex items-center justify-center text-base`}
                                    >
                                        <IconComponent aria-hidden />
                                    </div>
                                    <h3 className='text-sm font-bold text-gray-900 mt-3.5 mb-1.5'>{card?.title}</h3>
                                    <p className='text-xs text-gray-500 leading-relaxed whitespace-pre-line'>
                                        {card?.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
