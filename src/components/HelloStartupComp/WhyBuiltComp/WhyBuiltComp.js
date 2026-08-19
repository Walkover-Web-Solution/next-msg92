import React from 'react';

const iconMap = {
    inbox: { emoji: '💬', bg: 'bg-purple-50' },
    chatbot: { emoji: '🤖', bg: 'bg-pink-50' },
    automation: { emoji: '⚡', bg: 'bg-amber-50' },
    translation: { emoji: '🌐', bg: 'bg-sky-50' },
    analytics: { emoji: '📊', bg: 'bg-emerald-50' },
    integrations: { emoji: '🔌', bg: 'bg-slate-100' },
};

export default function WhyBuiltComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='container cont_p'>
            <div className='text-center max-w-3xl mx-auto mb-12'>
                <h2 className='heading'>{data?.heading}</h2>
                {data?.description && <p className='text-gray-600 mt-4'>{data.description}</p>}
            </div>

            {data?.cards?.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                    {data.cards.map((card, index) => {
                        const iconData = iconMap[card?.icon] || iconMap.inbox;
                        return (
                            <div key={index} className='bg-white rounded-2xl border border-gray-200 p-6 flex flex-col'>
                                <div
                                    className={`w-9 h-9 rounded-xl ${iconData.bg} flex items-center justify-center text-lg`}
                                >
                                    {iconData.emoji}
                                </div>
                                <h3 className='text-base font-bold text-gray-900 mt-4 mb-2'>{card?.title}</h3>
                                <p className='text-sm text-gray-500 whitespace-pre-line'>{card?.description}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
