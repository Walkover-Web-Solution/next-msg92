import { useState, useEffect, useRef } from 'react';
import { MdCheckCircle, MdRefresh, MdArrowBack, MdVideocam, MdCall, MdMoreVert } from 'react-icons/md';

export default function WhatsAppStepsComp({ data, pageInfo }) {
    if (!data) return null;

    const conversationStages = data?.conversation_stages || [];
    const widgetConfig = data?.widget_config;

    const [currentStage, setCurrentStage] = useState(1);
    const [isTyping, setIsTyping] = useState(false);
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);

    const sectionRef = useRef(null);
    const scrollRef = useRef(null);
    const phoneMockupRef = useRef(null);
    const timersRef = useRef([]);
    const isChatWidgetOpenRef = useRef(false);
    const isWidgetOpenRequestedRef = useRef(false);
    const widgetMountId = 'wa-chat-widget-mount';
    const widgetScriptId = 'wa-chat-widget-script';

    const updateChatWidgetVisibility = (isOpen) => {
        isChatWidgetOpenRef.current = isOpen;
        setIsChatWidgetOpen(isOpen);
    };

    const launchChatWidget = () => {
        if (typeof window === 'undefined' || !window.initChatWidget) return;
        if (!document.getElementById(widgetMountId)) return;

        const helloConfig = {
            widgetToken: process.env.WHATSAPP_CHAT_WIDGET_TOKEN,
            launch_widget: true,
            show_send_button: widgetConfig?.show_send_button ?? true,
            theme: widgetConfig?.theme || 'light',
            parentId: widgetMountId,
        };

        window.initChatWidget(helloConfig, 0);
    };

    const closeChatWidget = () => {
        isWidgetOpenRequestedRef.current = false;
        updateChatWidgetVisibility(false);
    };

    const openChatWidget = () => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;

        updateChatWidgetVisibility(true);

        if (window.initChatWidget) {
            launchChatWidget();
            return;
        }

        isWidgetOpenRequestedRef.current = true;

        if (document.getElementById(widgetScriptId)) return;

        const script = document.createElement('script');
        script.id = widgetScriptId;
        script.type = 'text/javascript';
        script.src = process.env.CHAT_WIDGET_URL;
        script.onload = () => {
            if (!isWidgetOpenRequestedRef.current) return;
            isWidgetOpenRequestedRef.current = false;
            launchChatWidget();
        };
        document.head.appendChild(script);
    };

    const clearAllTimers = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };

    const handleLetsChatClick = () => {
        clearAllTimers();
        setCurrentStage(2);
        openChatWidget();

        timersRef.current.push(
            setTimeout(() => {
                setCurrentStage(3);
            }, 700)
        );
    };

    const runAutomatedConversation = () => {
        clearAllTimers();
        closeChatWidget();
        setIsPlaying(true);
        setCurrentStage(1);
        setVisibleMessages([]);
        setIsTyping(true);

        const stage1Msg = conversationStages?.[0]?.messages?.[0];
        const stage2Msg = conversationStages?.[1]?.messages?.[0];

        timersRef.current.push(
            setTimeout(() => {
                setIsTyping(false);
                if (stage1Msg) setVisibleMessages([stage1Msg]);
            }, 500)
        );

        timersRef.current.push(
            setTimeout(() => {
                setIsTyping(true);
            }, 1200)
        );

        timersRef.current.push(
            setTimeout(() => {
                setIsTyping(false);
                const combined = [];
                if (stage1Msg) combined.push(stage1Msg);
                if (stage2Msg) combined.push(stage2Msg);
                setVisibleMessages(combined);
                setIsPlaying(false);
            }, 2000)
        );
    };

    const handleSelectStage = (stageNum) => {
        clearAllTimers();
        setIsTyping(false);
        setIsPlaying(false);

        const stage1Msg = conversationStages?.[0]?.messages?.[0];
        const stage2Msg = conversationStages?.[1]?.messages?.[0];

        if (stageNum === 1) {
            closeChatWidget();
            setCurrentStage(1);
            const combined = [];
            if (stage1Msg) combined.push(stage1Msg);
            if (stage2Msg) combined.push(stage2Msg);
            setVisibleMessages(combined);
        } else if (stageNum === 2) {
            setCurrentStage(2);
            openChatWidget();
            timersRef.current.push(
                setTimeout(() => {
                    setCurrentStage(3);
                }, 700)
            );
        } else {
            setCurrentStage(3);
            openChatWidget();
        }

        if (typeof window !== 'undefined' && window.innerWidth < 1024 && (stageNum === 2 || stageNum === 3)) {
            phoneMockupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    if (!isChatWidgetOpenRef.current) runAutomatedConversation();
                } else {
                    clearAllTimers();
                    setIsPlaying(false);
                    setIsTyping(false);
                }
            },
            { threshold: 0.25 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
            clearAllTimers();
        };
    }, [conversationStages]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [visibleMessages, isTyping]);

    const activeMeta = conversationStages?.[0];

    return (
        <section id='how-it-works' ref={sectionRef} className='bg-slate-50 border-t border-gray-100 overflow-hidden'>
            <div className='container cont_p flex flex-col gap-10'>
                <div className='text-center flex flex-col gap-3'>
                    <h2 className='heading'>
                        {data?.heading_prefix ? (
                            <>
                                {data?.heading_prefix}
                                <span className='text-emerald-600 font-bold'>{data?.heading_accent}</span>
                                {data?.heading_suffix}
                            </>
                        ) : (
                            data?.heading
                        )}
                    </h2>

                    <p className='subheading max-w-2xl mx-auto'>{data?.subheading}</p>
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
                                        onClick={() => handleSelectStage(stepNum)}
                                        className={`text-left rounded-xl p-5 border flex gap-3 cursor-pointer ${
                                            isCurrent
                                                ? 'bg-white border-emerald-600 shadow-md'
                                                : isCompleted
                                                  ? 'bg-slate-50 border-slate-200'
                                                  : 'bg-white border-slate-200'
                                        }`}
                                    >
                                        <div
                                            className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center ${
                                                isCurrent
                                                    ? 'bg-emerald-600 text-white'
                                                    : isCompleted
                                                      ? 'bg-emerald-100 text-emerald-700'
                                                      : 'bg-slate-100 text-slate-500'
                                            }`}
                                        >
                                            {step?.n}
                                        </div>

                                        <div className='flex-1 flex flex-col gap-1'>
                                            <div className='flex items-center justify-between gap-3'>
                                                <h3
                                                    className={`font-semibold text-lg ${
                                                        isCurrent ? 'text-slate-900 font-bold' : 'text-slate-800'
                                                    }`}
                                                >
                                                    {step?.title}
                                                </h3>

                                                {isCompleted ? (
                                                    <span className='text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full'>
                                                        <MdCheckCircle className='w-3.5 h-3.5' />
                                                        <span>{data?.done_text}</span>
                                                    </span>
                                                ) : isCurrent ? (
                                                    <span className='text-xs font-semibold text-emerald-800 flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full'>
                                                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse' />
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
                                className='btn btn-primary btn-md inline-flex items-center gap-2'
                            >
                                <MdRefresh className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`} />
                                <span>{data?.replay_text}</span>
                            </button>
                            {data?.replay_subtext && <p className='text-xs text-slate-500'>{data?.replay_subtext}</p>}
                        </div>
                    </div>

                    <div className='lg:col-span-6 flex flex-col items-center justify-center gap-4 w-full relative'>
                        <div className='flex lg:hidden justify-center select-none'>
                            <div className='bg-slate-900 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md border border-slate-700 flex items-center gap-2 animate-bounce'>
                                <span className='w-2 h-2 rounded-full bg-emerald-400 animate-ping' />
                                <span>{data?.hint_mobile}</span>
                            </div>
                        </div>

                        <div className='absolute -right-2 xl:-right-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 pointer-events-none select-none'>
                            <svg
                                width='48'
                                height='26'
                                viewBox='0 0 54 28'
                                fill='none'
                                className='text-emerald-700 drop-shadow-sm'
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
                                <span className='w-2 h-2 rounded-full bg-emerald-400 animate-ping' />
                                <span>{data?.hint_desktop}</span>
                            </div>
                        </div>

                        <div
                            ref={phoneMockupRef}
                            className='relative w-full max-w-[320px] bg-slate-900 p-1.5 rounded-[44px] shadow-2xl'
                        >
                            <div
                                id='wa-chat-widget-parent'
                                data-widget-open={isChatWidgetOpen ? 'true' : 'false'}
                                className='relative w-full rounded-[38px] overflow-hidden flex flex-col h-[640px]'
                            >
                                <div id={widgetMountId} />

                                <div className='absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-black rounded-full z-[100000] flex items-center justify-between px-2.5 pointer-events-none'>
                                    <div className='w-2 h-2 rounded-full bg-[#151515] border border-gray-800' />
                                    <div className='w-2 h-2 rounded-full bg-[#0a192f]' />
                                </div>

                                <div className='flex flex-col h-full w-full'>
                                    <div className='bg-[#008069] py-2 px-5 flex items-center justify-between text-white text-xs font-semibold select-none'>
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
                                                <div className='w-5 h-2.5 rounded-[3px] border border-white/90 p-0.5 flex items-center'>
                                                    <div className='w-full h-full bg-white rounded-[1px]' />
                                                </div>
                                                <div className='w-0.5 h-1 bg-white/90 rounded-r-[1px]' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='bg-[#008069] px-3 py-2 flex items-center justify-between text-white'>
                                        <div className='flex items-center gap-2'>
                                            <MdArrowBack className='w-4.5 h-4.5 text-white/90 cursor-pointer hover:text-white' />
                                            <div className='w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center'>
                                                <div className='text-xs'>{activeMeta?.avatar}</div>
                                            </div>
                                            <div className='leading-tight'>
                                                <p className='font-bold text-xs text-white flex items-center gap-1'>
                                                    <span>{activeMeta?.name}</span>
                                                    <span className='text-xs text-sky-400 font-bold'>
                                                        {data?.verified_badge}
                                                    </span>
                                                </p>
                                                <p className='text-emerald-100 text-xs flex items-center gap-1 whitespace-nowrap'>
                                                    <span className='w-1.5 h-1.5 rounded-full bg-emerald-400' />
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
                                            <span className='bg-[#FFEECD] text-slate-600 text-xs px-3 py-1.5 rounded-lg text-center max-w-[94%] border border-[#FFE0A3] flex items-center gap-1'>
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
                                                                ? 'bg-[#D9FDD3] rounded-2xl rounded-tr-none border border-[#B9EAB3] max-w-[88%]'
                                                                : 'bg-white rounded-2xl rounded-tl-none border border-gray-200 max-w-[94%]'
                                                        }`}
                                                    >
                                                        {isCustomer && (
                                                            <div className='absolute -right-1.5 top-0 w-0 h-0 border-t-[7px] border-t-[#D9FDD3] border-r-[7px] border-r-transparent' />
                                                        )}

                                                        {!isCustomer && (
                                                            <p className='text-xs font-bold uppercase text-emerald-800'>
                                                                {msg?.label || activeMeta?.name?.toUpperCase()}
                                                            </p>
                                                        )}

                                                        {msg?.isLink ? (
                                                            <div className='flex flex-col gap-2'>
                                                                <p className='text-xs text-slate-900'>{msg?.text}</p>

                                                                <div
                                                                    onClick={handleLetsChatClick}
                                                                    className='p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer flex flex-col gap-2'
                                                                >
                                                                    <div className='flex items-center justify-between gap-1'>
                                                                        <span className='font-bold text-xs text-emerald-800 flex items-center gap-1'>
                                                                            {data?.link_preview_title}
                                                                        </span>
                                                                    </div>

                                                                    <div className='flex items-center justify-between border-t border-emerald-100 py-1 text-xs'>
                                                                        <span className='text-emerald-800 font-semibold'>
                                                                            {data?.link_preview_url}
                                                                        </span>
                                                                        <span className='text-slate-400'>
                                                                            {data?.link_preview_size}
                                                                        </span>
                                                                    </div>

                                                                    <div className='relative'>
                                                                        <div className='text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 bg-emerald-700 hover:bg-emerald-800'>
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
                                                                <span className='text-sky-500 font-bold text-xs leading-none'>
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
                                                    <span className='text-xs text-slate-400 mr-1'>
                                                        {data?.store_typing}
                                                    </span>
                                                    <span className='w-1.5 h-1.5 rounded-full bg-[#008069] animate-bounce' />
                                                    <span className='w-1.5 h-1.5 rounded-full bg-[#008069] animate-bounce' />
                                                    <span className='w-1.5 h-1.5 rounded-full bg-[#008069] animate-bounce' />
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
                                        <div className='w-7 h-7 rounded-full bg-[#008069] flex items-center justify-center text-white text-xs cursor-pointer'>
                                            🎙️
                                        </div>
                                    </div>

                                    <div className='bg-slate-100 py-1 flex justify-center items-center'>
                                        <div className='w-28 h-1 bg-slate-900 rounded-full' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
