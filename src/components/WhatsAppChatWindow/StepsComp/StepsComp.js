import { useState, useEffect, useRef } from 'react';
import { MdCheckCircle, MdRefresh, MdArrowBack, MdVideocam, MdCall, MdMoreVert } from 'react-icons/md';
import Script from 'next/script';

export default function WhatsAppStepsComp({ pageInfo, data }) {
    const conversationStages = data?.conversation_stages || [];

    const [currentStage, setCurrentStage] = useState(1);
    const [isTyping, setIsTyping] = useState(false);
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const sectionRef = useRef(null);
    const scrollRef = useRef(null);
    const phoneMockupRef = useRef(null);
    const timersRef = useRef([]);

    const widgetOpenRef = useRef(false);
    const widgetInitRef = useRef(false);
    const stagesRef = useRef(conversationStages);
    stagesRef.current = conversationStages;

    const clearAllTimers = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };

    const getStageMessages = () => {
        const stage1Msg = stagesRef.current?.[0]?.messages?.[0];
        const stage2Msg = stagesRef.current?.[1]?.messages?.[0];
        return { stage1Msg, stage2Msg };
    };

    const openWidget = () => {
        clearAllTimers();
        widgetOpenRef.current = true;
        setIsTyping(false);
        setIsPlaying(false);
        setCurrentStage(3);
    };

    const runAutomatedConversation = () => {
        clearAllTimers();
        widgetOpenRef.current = false;
        setIsPlaying(true);
        setCurrentStage(1);
        setVisibleMessages([]);
        setIsTyping(true);

        const { stage1Msg, stage2Msg } = getStageMessages();

        timersRef.current.push(
            setTimeout(() => {
                setIsTyping(false);
                if (stage1Msg) setVisibleMessages([stage1Msg]);
            }, 500)
        );

        timersRef.current.push(setTimeout(() => setIsTyping(true), 1200));

        timersRef.current.push(
            setTimeout(() => {
                setIsTyping(false);
                setVisibleMessages([stage1Msg, stage2Msg].filter(Boolean));
                setCurrentStage(2);
                setIsPlaying(false);
            }, 2000)
        );
    };

    const handleSelectStage = (stageNum) => {
        clearAllTimers();
        setIsTyping(false);
        setIsPlaying(false);

        if (stageNum === 3) {
            openWidget();
            return;
        }

        widgetOpenRef.current = false;
        setCurrentStage(stageNum);

        const { stage1Msg, stage2Msg } = getStageMessages();
        setVisibleMessages(stageNum === 1 ? [stage1Msg].filter(Boolean) : [stage1Msg, stage2Msg].filter(Boolean));

        if (typeof window !== 'undefined' && window.innerWidth < 1024 && stageNum === 2) {
            phoneMockupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && window.initChatWidget) {
            setScriptLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (currentStage !== 3 || !scriptLoaded || widgetInitRef.current) return;
        if (typeof window === 'undefined' || !window.initChatWidget) return;

        const container = document.getElementById('phone-mockup-chat-widget');
        if (!container) return;

        widgetInitRef.current = true;

        window.initChatWidget(
            {
                widgetToken: process.env.WHATSAPP_CHAT_WIDGET_TOKEN,
                hide_launcher: true,
                launch_widget: true,
                show_close_button: false,
                show_minimize_button: false,
                show_widget_form: false,
                show_send_button: true,
                fullScreen: true,
                theme: 'light',
                parentId: 'phone-mockup-chat-widget',
            },
            0
        );
    }, [currentStage, scriptLoaded]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (widgetOpenRef.current) return;

                if (entry.isIntersecting) {
                    runAutomatedConversation();
                } else {
                    clearAllTimers();
                    setIsPlaying(false);
                    setIsTyping(false);
                }
            },
            { threshold: 0.25 }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
            clearAllTimers();
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [visibleMessages, isTyping]);

    if (!data) return null;

    const activeMeta = conversationStages?.[0];

    return (
        <section id='how-it-works' ref={sectionRef} className='bg-slate-50 border-t border-slate-200 overflow-hidden'>
            <Script
                src={process.env.CHAT_WIDGET_URL}
                strategy='afterInteractive'
                onLoad={() => setScriptLoaded(true)}
                onReady={() => setScriptLoaded(true)}
            />
            <div className='container cont_p flex flex-col gap-10'>
                <div className='text-center flex flex-col gap-3'>
                    <h2 className='heading'>
                        {data?.heading_prefix}
                        <span className='text-whatsappChat-primary'>{data?.heading_accent}</span>
                        {data?.heading_suffix}
                    </h2>

                    {data?.subheading && <p className='subheading max-w-2xl mx-auto'>{data?.subheading}</p>}
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto'>
                    <div className='lg:col-span-6 flex flex-col gap-6'>
                        <div className='flex flex-col gap-4'>
                            {data?.steps?.map((step, index) => {
                                const stepNum = index + 1;
                                const isCurrent = currentStage === stepNum;
                                const isCompleted = currentStage > stepNum;

                                return (
                                    <div
                                        key={step?.n || index}
                                        role='button'
                                        tabIndex={0}
                                        onClick={() => handleSelectStage(stepNum)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handleSelectStage(stepNum);
                                            }
                                        }}
                                        className={`text-left rounded-xl p-5 border flex gap-3 cursor-pointer ${
                                            isCurrent
                                                ? 'bg-white border-whatsappChat-primary shadow-md'
                                                : isCompleted
                                                  ? 'bg-slate-50 border-slate-200'
                                                  : 'bg-white border-slate-200'
                                        }`}
                                    >
                                        <div
                                            className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center ${
                                                isCurrent
                                                    ? 'bg-whatsappChat-primary text-white'
                                                    : isCompleted
                                                      ? 'bg-whatsappChat-light text-whatsappChat-dark'
                                                      : 'bg-slate-100 text-slate-500'
                                            }`}
                                        >
                                            {step?.n}
                                        </div>

                                        <div className='flex-1 flex flex-col gap-1'>
                                            <div className='flex items-center justify-between gap-3'>
                                                <h3 className={`font-semibold text-lg ${isCurrent ? 'font-bold' : ''}`}>
                                                    {step?.title}
                                                </h3>

                                                {isCompleted ? (
                                                    <span className='text-xs font-semibold text-whatsappChat-dark flex items-center gap-1 bg-whatsappChat-light border border-whatsappChat-primary/30 px-2.5 py-0.5 rounded-full'>
                                                        <MdCheckCircle className='w-3.5 h-3.5' />
                                                        <span>{data?.done_text}</span>
                                                    </span>
                                                ) : isCurrent ? (
                                                    <span className='text-xs font-semibold text-whatsappChat-dark flex items-center gap-1.5 bg-whatsappChat-light border border-whatsappChat-primary/40 px-2.5 py-0.5 rounded-full'>
                                                        <span className='w-1.5 h-1.5 rounded-full bg-whatsappChat-primary animate-pulse' />
                                                        <span>{data?.live_text}</span>
                                                    </span>
                                                ) : (
                                                    <span className='text-xs text-slate-400 font-medium'>
                                                        {data?.click_to_view}
                                                    </span>
                                                )}
                                            </div>

                                            <p className='text-sm text-slate-600'>{step?.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className='flex flex-col items-start gap-2'>
                            <button
                                type='button'
                                onClick={runAutomatedConversation}
                                className='btn btn-whatsapp-chat btn-md gap-2'
                            >
                                <MdRefresh className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`} />
                                <span>{data?.replay_text}</span>
                            </button>
                            {data?.replay_subtext && <p className='text-xs text-slate-500'>{data?.replay_subtext}</p>}
                        </div>
                    </div>

                    <div className='lg:col-span-6 flex flex-col items-center justify-center gap-4 w-full relative'>
                        <div className='flex lg:hidden justify-center'>
                            <div className='bg-slate-900 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md border border-slate-700 flex items-center gap-2 animate-bounce'>
                                <span className='w-2 h-2 rounded-full bg-whatsappChat-accent animate-ping' />
                                <span>{data?.hint_mobile}</span>
                            </div>
                        </div>

                        <div className='absolute -right-2 xl:-right-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 pointer-events-none'>
                            <svg
                                width='48'
                                height='26'
                                viewBox='0 0 54 28'
                                fill='none'
                                className='text-whatsappChat-dark drop-shadow-sm'
                            >
                                <path
                                    d='M52 14 C 36 8, 20 12, 6 14'
                                    stroke='currentColor'
                                    strokeWidth='3.5'
                                    strokeLinecap='round'
                                />
                                <path
                                    d='M16 6 L 5 14 L 16 22'
                                    stroke='currentColor'
                                    strokeWidth='3.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                            <div className='bg-slate-900 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce'>
                                <span className='w-2 h-2 rounded-full bg-whatsappChat-accent animate-ping' />
                                <span>{data?.hint_desktop}</span>
                            </div>
                        </div>

                        <div
                            ref={phoneMockupRef}
                            className='relative w-full max-w-[320px] bg-slate-900 p-1.5 rounded-[44px] shadow-2xl'
                        >
                            <div className='relative w-full rounded-[38px] overflow-hidden flex flex-col h-[640px]'>
                                <div className='absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-black rounded-full z-50 flex items-center justify-between px-2.5 pointer-events-none'>
                                    <div className='w-2 h-2 rounded-full bg-black/90 border border-gray-800' />
                                    <div className='w-2 h-2 rounded-full bg-slate-950' />
                                </div>

                                <div className='flex flex-col h-full w-full'>
                                    <div className='bg-whatsappChat-teal py-2 px-5 flex items-center justify-between text-white text-xs font-semibold'>
                                        <span>{data?.status_time}</span>
                                        <div className='flex items-center gap-1.5 text-xs'>
                                            <svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 24 24'>
                                                <rect x='1' y='14' width='3' height='7' rx='0.5' />
                                                <rect x='6' y='10' width='3' height='11' rx='0.5' />
                                                <rect x='11' y='6' width='3' height='15' rx='0.5' />
                                                <rect x='16' y='2' width='3' height='19' rx='0.5' />
                                            </svg>
                                            <svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 24 24'>
                                                <path d='M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.5 0 6.67 1.34 9.07 3.53L12 19.88 2.93 11.03C5.33 8.84 8.5 7.5 12 7.5z' />
                                            </svg>
                                            <div className='flex items-center gap-0.5'>
                                                <div className='w-5 h-2.5 rounded-xs border border-white/90 p-0.5 flex items-center'>
                                                    <div className='w-full h-full bg-white rounded-xs' />
                                                </div>
                                                <div className='w-0.5 h-1 bg-white/90 rounded-r-xs' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='bg-whatsappChat-teal px-3 py-2 flex items-center justify-between text-white'>
                                        <div className='flex items-center gap-2'>
                                            <MdArrowBack className='w-4.5 h-4.5 text-white/90 cursor-pointer hover:text-white' />
                                            <div className='w-8 h-8 rounded-full bg-whatsappChat-dark flex items-center justify-center'>
                                                <div className='text-xs'>{activeMeta?.avatar}</div>
                                            </div>
                                            <div>
                                                <p className='font-bold text-xs text-white flex items-center gap-1'>
                                                    <span>{activeMeta?.name}</span>
                                                    <span className='text-xs text-sky-400 font-bold'>
                                                        {data?.verified_badge}
                                                    </span>
                                                </p>
                                                <p className='text-whatsappChat-light text-xs flex items-center gap-1'>
                                                    <span className='w-1.5 h-1.5 rounded-full bg-whatsappChat-accent' />
                                                    <span>{activeMeta?.status}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-1 text-white/90'>
                                            <MdVideocam className='w-4.5 h-4.5 cursor-pointer hover:text-white' />
                                            <MdCall className='w-4 h-4 cursor-pointer hover:text-white' />
                                            <MdMoreVert className='w-4.5 h-4.5 cursor-pointer hover:text-white' />
                                        </div>
                                    </div>

                                    <div
                                        ref={scrollRef}
                                        className='flex-1 overflow-y-auto p-3 flex flex-col gap-3 relative wa-chat-bg'
                                    >
                                        <div className='flex justify-center'>
                                            <span className='bg-white text-slate-500 text-xs font-semibold px-2.5 py-0.5 rounded shadow-xs border border-gray-100 uppercase'>
                                                {data?.date_badge}
                                            </span>
                                        </div>

                                        <div className='flex justify-center'>
                                            <span className='bg-amber-100 text-slate-700 text-xs px-3 py-1.5 rounded-lg text-center max-w-[94%] border border-amber-200 flex items-center gap-1'>
                                                <span>🔒</span>
                                                <span>{data?.encryption_notice}</span>
                                            </span>
                                        </div>

                                        {visibleMessages.map((msg) => {
                                            const isCustomer = msg?.role === 'customer';

                                            return (
                                                <div
                                                    key={msg?.id || msg?.text}
                                                    className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div
                                                        className={`relative p-2.5 text-xs text-slate-900 flex flex-col gap-1.5 ${
                                                            isCustomer
                                                                ? 'bg-whatsappChat-bubble rounded-2xl rounded-tr-none border border-whatsappChat-accent/20 max-w-[88%]'
                                                                : 'bg-white rounded-2xl rounded-tl-none border border-gray-200 max-w-[94%]'
                                                        }`}
                                                    >
                                                        {isCustomer && (
                                                            <div className='absolute -right-1.5 top-0 w-0 h-0 border-t-[7px] border-t-whatsappChat-bubble border-r-[7px] border-r-transparent' />
                                                        )}

                                                        {!isCustomer && (
                                                            <p className='text-xs font-bold uppercase text-whatsappChat-dark'>
                                                                {msg?.label || activeMeta?.name?.toUpperCase()}
                                                            </p>
                                                        )}

                                                        {msg?.isLink ? (
                                                            <div className='flex flex-col gap-2'>
                                                                <p className='text-xs text-slate-900'>{msg?.text}</p>

                                                                <div
                                                                    onClick={openWidget}
                                                                    className='p-2.5 rounded-xl border border-whatsappChat-primary/20 bg-whatsappChat-light hover:bg-whatsappChat-light/70 cursor-pointer flex flex-col gap-2'
                                                                >
                                                                    <div className='flex items-center justify-between gap-1'>
                                                                        <span className='font-bold text-xs text-whatsappChat-dark flex items-center gap-1'>
                                                                            {data?.link_preview_title}
                                                                        </span>
                                                                    </div>

                                                                    <div className='flex items-center justify-between border-t border-whatsappChat-primary/10 py-1 text-xs'>
                                                                        <span className='text-whatsappChat-dark font-semibold'>
                                                                            {data?.link_preview_url}
                                                                        </span>
                                                                        <span className='text-slate-400'>
                                                                            {data?.link_preview_size}
                                                                        </span>
                                                                    </div>

                                                                    <div className='relative'>
                                                                        <div className='text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 bg-whatsappChat-primary hover:bg-whatsappChat-hover'>
                                                                            <span>{data?.lets_chat_btn}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className='pr-11'>{msg?.text}</p>
                                                        )}

                                                        <div className='absolute right-2 bottom-1 flex items-center gap-1 text-xs text-slate-400'>
                                                            <span>{msg?.time}</span>
                                                            {isCustomer && (
                                                                <span className='text-sky-500 font-bold text-xs'>
                                                                    ✓✓
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {isTyping && (
                                            <div className='flex justify-start relative z-10'>
                                                <div className='bg-white px-3 py-1.5 flex gap-1 items-center rounded-2xl rounded-tl-none border border-gray-100'>
                                                    <span className='text-xs text-slate-400'>{data?.store_typing}</span>
                                                    <span className='w-1.5 h-1.5 rounded-full bg-whatsappChat-teal animate-bounce' />
                                                    <span className='w-1.5 h-1.5 rounded-full bg-whatsappChat-teal animate-bounce' />
                                                    <span className='w-1.5 h-1.5 rounded-full bg-whatsappChat-teal animate-bounce' />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className='bg-slate-100 px-2.5 py-2 flex items-center gap-2 border-t border-slate-200'>
                                        <div className='flex-1 bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-slate-200'>
                                            <span className='text-xs text-gray-400 cursor-pointer'>😊</span>
                                            <input
                                                type='text'
                                                disabled
                                                placeholder={data?.input_placeholder}
                                                className='flex-1 text-xs text-slate-700 bg-transparent outline-none'
                                            />
                                            <span className='text-xs text-gray-400 cursor-pointer'>📎</span>
                                        </div>
                                        <div className='w-7 h-7 rounded-full bg-whatsappChat-teal flex items-center justify-center text-white text-xs cursor-pointer'>
                                            🎙️
                                        </div>
                                    </div>

                                    <div className='bg-slate-100 py-1 flex justify-center items-center'>
                                        <div className='w-28 h-1 bg-slate-900 rounded-full' />
                                    </div>
                                </div>

                                <div
                                    id='phone-mockup-chat-widget'
                                    className={`absolute inset-0 z-40 bg-white ${
                                        currentStage === 3
                                            ? 'opacity-100 pointer-events-auto'
                                            : 'opacity-0 pointer-events-none'
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
