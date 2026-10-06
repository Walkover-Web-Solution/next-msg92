import { useState, useEffect, useRef } from 'react';
import { RiWhatsappFill } from 'react-icons/ri';

export default function WhatsAppComparisonComp({ pageInfo, data }) {
    if (!data) return null;

    const [isChatWindowOn, setIsChatWindowOn] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const sectionRef = useRef(null);

    const handleToggleSwitch = () => {
        setHasUserInteracted(true);
        setIsChatWindowOn((prev) => !prev);
    };

    useEffect(() => {
        if (typeof window === 'undefined' || hasUserInteracted) return;

        let intervalId = null;
        let timeoutId = null;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasUserInteracted) {
                    timeoutId = setTimeout(() => {
                        if (!hasUserInteracted) {
                            setIsChatWindowOn(true);
                            intervalId = setInterval(() => {
                                if (!hasUserInteracted) {
                                    setIsChatWindowOn((prev) => !prev);
                                }
                            }, 3600);
                        }
                    }, 1200);
                } else {
                    if (timeoutId) clearTimeout(timeoutId);
                    if (intervalId) clearInterval(intervalId);
                }
            },
            { threshold: 0.35 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
            if (timeoutId) clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [hasUserInteracted]);

    return (
        <section id='comparison' ref={sectionRef} className='bg-slate-50 border-y border-slate-200'>
            <div className='container cont_p flex flex-col gap-10'>
                <div className='text-center flex flex-col gap-3'>
                    <h2 className='heading'>
                        {data?.heading_prefix}
                        <span className='text-whatsappChat-primary'>{data?.heading_accent}</span>
                        {data?.heading_suffix}
                    </h2>
                    {data?.subheading && <p className='subheading max-w-2xl mx-auto'>{data?.subheading}</p>}
                </div>

                <div className='bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 max-w-6xl mx-auto w-full'>
                    <div className='lg:col-span-6 p-6 lg:p-10 flex flex-col justify-center gap-8'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-xs font-bold uppercase text-whatsappChat-primary'>
                                {data?.kicker}
                            </span>
                            <h3 className='text-2xl lg:text-3xl font-bold'>{data?.title}</h3>
                        </div>

                        <button
                            type='button'
                            role='switch'
                            aria-checked={isChatWindowOn}
                            onClick={handleToggleSwitch}
                            className='flex items-center gap-4 text-left cursor-pointer'
                        >
                            <div
                                className={`w-16 h-9 rounded-full p-1 relative flex items-center ${
                                    isChatWindowOn ? 'bg-whatsappChat-primary' : 'bg-slate-300'
                                }`}
                            >
                                <div
                                    className={`w-7 h-7 rounded-full bg-white shadow-md ${
                                        isChatWindowOn ? 'translate-x-7' : 'translate-x-0'
                                    }`}
                                />
                            </div>

                            <div className='flex flex-col'>
                                <span className='font-bold text-base text-slate-900'>
                                    {isChatWindowOn ? data?.switch_on_title : data?.switch_off_title}
                                </span>
                                <span className='text-xs text-slate-500'>
                                    {isChatWindowOn ? data?.switch_on_desc : data?.switch_off_desc}
                                </span>
                            </div>
                        </button>

                        <div
                            className={`p-6 rounded-2xl border flex flex-col gap-2 ${
                                isChatWindowOn
                                    ? 'bg-whatsappChat-light border-whatsappChat-primary/30'
                                    : 'bg-slate-50 border-slate-200'
                            }`}
                        >
                            <span className='text-xs font-medium text-slate-500'>{data?.bill_label}</span>
                            <div className='flex items-center'>
                                <span
                                    className={`text-4xl lg:text-5xl font-extrabold ${
                                        isChatWindowOn ? 'text-whatsappChat-primary' : 'text-rose-600'
                                    }`}
                                >
                                    {isChatWindowOn ? data?.bill_on_amount : data?.bill_off_amount}
                                </span>
                            </div>
                            <p className='text-xs text-slate-600 font-medium'>
                                {isChatWindowOn ? data?.bill_on_desc : data?.bill_off_desc}
                            </p>
                        </div>
                    </div>

                    <div className='lg:col-span-6 bg-slate-100 p-6 lg:p-10 flex items-center justify-center'>
                        <div className='w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex flex-col'>
                            <div
                                className={`px-4 py-3 flex items-center justify-between text-white ${
                                    isChatWindowOn ? 'bg-whatsappChat-primary' : 'bg-whatsappChat-teal'
                                }`}
                            >
                                <div className='flex items-center gap-2 font-semibold text-sm'>
                                    <RiWhatsappFill className='w-5 h-5' />
                                    <span>{isChatWindowOn ? data?.chat_on_title : data?.chat_off_title}</span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <span className='w-2 h-2 rounded-full bg-white/40' />
                                    <span className='w-2 h-2 rounded-full bg-white/40' />
                                    <span className='w-2 h-2 rounded-full bg-white/40' />
                                </div>
                            </div>

                            <div
                                className={`p-4 flex flex-col gap-3 min-h-[340px] ${
                                    isChatWindowOn ? 'bg-slate-50' : 'wa-chat-bg'
                                }`}
                            >
                                {data?.chat_messages?.map((msg, index) => {
                                    const isIncoming = msg?.type === 'in';
                                    return (
                                        <div key={index} className='flex flex-col gap-3'>
                                            {index === 1 && isChatWindowOn && (
                                                <div className='flex justify-center'>
                                                    <span className='text-xs font-semibold text-whatsappChat-dark bg-whatsappChat-light border border-whatsappChat-primary/30 px-3 py-1 rounded-full'>
                                                        {data?.continued_notice}
                                                    </span>
                                                </div>
                                            )}

                                            <div className={`flex ${isIncoming ? 'justify-start' : 'justify-end'}`}>
                                                <div
                                                    className={`relative px-3.5 py-2 text-xs text-slate-900 rounded-2xl max-w-[80%] flex flex-col gap-1 shadow-sm ${
                                                        isIncoming
                                                            ? 'bg-white rounded-tl-none'
                                                            : isChatWindowOn
                                                              ? 'bg-white border border-whatsappChat-primary/30 rounded-tr-none'
                                                              : 'bg-whatsappChat-bubble rounded-tr-none'
                                                    }`}
                                                >
                                                    {!isIncoming && (
                                                        <div className='flex items-center justify-between gap-3'>
                                                            {isChatWindowOn && (
                                                                <span className='text-[10px] font-bold text-whatsappChat-dark'>
                                                                    {msg?.role}
                                                                </span>
                                                            )}
                                                            <span
                                                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                                                    isChatWindowOn
                                                                        ? 'bg-whatsappChat-primary text-white'
                                                                        : 'bg-amber-400 text-amber-950 shadow-sm'
                                                                }`}
                                                            >
                                                                {isChatWindowOn ? data?.free_tag : data?.coin_tag}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <p>{msg?.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
