import Image from 'next/image';
import { useState } from 'react';
import { MdCheck, MdRadioButtonChecked } from 'react-icons/md';

export default function ReportsDashboardComp({ data }) {
    const [activeTab, setActiveTab] = useState(0);

    if (!data || !data?.channels?.length) return null;

    const currentChannel = data.channels[activeTab] || data.channels[0];

    return (
        <section className='bg-neutral py-16 md:py-20'>
            <div className='container cont cont_p cont_gap'>
                <div className='cont gap-4 text-center max-w-4xl mx-auto'>
                    {data?.tagline && (
                        <span className='text-xs sm:text-sm font-semibold uppercase tracking-widest text-accent'>
                            {data.tagline}
                        </span>
                    )}
                    {data?.heading && <h2 className='heading'>{data.heading}</h2>}
                    {data?.subheading && <p className='subheading'>{data.subheading}</p>}
                </div>

                <div className='flex flex-wrap items-center justify-center gap-2 md:gap-3 py-4'>
                    {data.channels.map((channel, index) => (
                        <button
                            key={index}
                            type='button'
                            onClick={() => setActiveTab(index)}
                            className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                                activeTab === index
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            {channel.tab_name || channel.name.split(' ')[0]}
                        </button>
                    ))}
                </div>

                <div className='bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-sm'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'>
                        <div className='lg:col-span-6 w-full flex items-center justify-center'>
                            {currentChannel?.video ? (
                                <div className='w-full rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shadow-inner'>
                                    <video
                                        key={currentChannel.video}
                                        className='w-full h-auto object-contain rounded-xl'
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        aria-label={currentChannel.name}
                                    >
                                        <source src={currentChannel.video} type='video/webm' />
                                    </video>
                                </div>
                            ) : currentChannel?.img ? (
                                <div className='w-full rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shadow-inner flex items-center justify-center p-2'>
                                    <Image
                                        key={currentChannel.img}
                                        src={currentChannel.img}
                                        alt={currentChannel.name}
                                        width={960}
                                        height={600}
                                        className='w-full h-auto object-contain rounded-xl'
                                        loading='lazy'
                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px'
                                    />
                                </div>
                            ) : null}
                        </div>

                        <div className='lg:col-span-6 flex flex-col gap-6'>
                            <div className='flex flex-col gap-2'>
                                <h3 className='text-2xl md:text-3xl font-bold text-primary'>{currentChannel?.name}</h3>
                                <p className='text-slate-600 text-base md:text-lg leading-relaxed'>
                                    {currentChannel?.content}
                                </p>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100'>
                                {currentChannel?.monitor?.length > 0 && (
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='font-bold text-sm md:text-base text-primary uppercase tracking-wide flex items-center gap-1.5'>
                                            <MdRadioButtonChecked className='text-accent text-base' aria-hidden />
                                            {currentChannel?.monitor_heading || 'Monitor'}
                                        </h4>
                                        <ul className='flex flex-col gap-2'>
                                            {currentChannel.monitor.map((item, i) => (
                                                <li
                                                    key={i}
                                                    className='flex items-start gap-2 text-sm text-slate-700 leading-snug'
                                                >
                                                    <span
                                                        className='h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0'
                                                        aria-hidden
                                                    />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {currentChannel?.key_features?.length > 0 && (
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='font-bold text-sm md:text-base text-primary uppercase tracking-wide flex items-center gap-1.5'>
                                            <MdCheck className='text-emerald-600 text-lg' aria-hidden />
                                            {currentChannel?.features_heading || 'Key Features'}
                                        </h4>
                                        <ul className='flex flex-col gap-2'>
                                            {currentChannel.key_features.map((item, i) => (
                                                <li
                                                    key={i}
                                                    className='flex items-start gap-2 text-sm text-slate-700 leading-snug'
                                                >
                                                    <span
                                                        className='h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2 shrink-0'
                                                        aria-hidden
                                                    />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
