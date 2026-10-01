import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { MdCheckCircle, MdRefresh, MdArrowBack, MdVideocam, MdCall, MdMoreVert } from 'react-icons/md';

export default function WhatsAppStepsComp({ data, pageInfo }) {
    if (!data) return null;

    const conversationStages = data?.conversation_stages || [];
    const widgetConfig = data?.widget_config || {
        widgetToken: '251a3',
        parentId: 'wa-chat-widget-mount',
        hide_launcher: true,
        show_widget_form: true,
        show_close_button: true,
        show_send_button: true,
        fullscreen: true,
        theme: 'systlight',
    };

    const [currentStage, setCurrentStage] = useState(1);
    const [isTyping, setIsTyping] = useState(false);
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWidgetScriptLoaded, setIsWidgetScriptLoaded] = useState(false);
    const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);
    const [widgetInitTick, setWidgetInitTick] = useState(0);

    const sectionRef = useRef(null);
    const scrollRef = useRef(null);
    const timersRef = useRef([]);
    const isChatWidgetOpenRef = useRef(false);
    const isWidgetOpenRequestedRef = useRef(false);
    const widgetMountId = 'wa-chat-widget-mount';

    const updateChatWidgetVisibility = (isOpen) => {
        isChatWidgetOpenRef.current = isOpen;
        setIsChatWidgetOpen(isOpen);
    };

    const destroyChatWidget = () => {
        if (typeof document === 'undefined') return;

        const mount = document.getElementById(widgetMountId);
        if (mount) mount.innerHTML = '';
    };

    const initChatWidgetInMount = () => {
        if (typeof window === 'undefined' || !window.initChatWidget) return false;

        const mount = document.getElementById(widgetMountId);
        if (!mount) return false;

        mount.innerHTML = '';
        window.initChatWidget({ ...widgetConfig, parentId: widgetMountId, launch_widget: true }, 0);
        return true;
    };

    const openChatWidget = () => {
        updateChatWidgetVisibility(true);
        setWidgetInitTick((tick) => tick + 1);

        if (typeof window === 'undefined' || !window.initChatWidget) {
            isWidgetOpenRequestedRef.current = true;
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (window.initChatWidget) {
            setIsWidgetScriptLoaded(true);
            return;
        }

        const scriptPoll = setInterval(() => {
            if (window.initChatWidget) {
                setIsWidgetScriptLoaded(true);
                clearInterval(scriptPoll);
            }
        }, 200);

        return () => clearInterval(scriptPoll);
    }, []);

    useEffect(() => {
        if (!isChatWidgetOpen) {
            destroyChatWidget();
            return;
        }

        if (!isWidgetScriptLoaded) return;

        initChatWidgetInMount();
        isWidgetOpenRequestedRef.current = false;
    }, [isChatWidgetOpen, widgetInitTick, isWidgetScriptLoaded]);

    useEffect(() => {
        if (!isWidgetScriptLoaded || !isWidgetOpenRequestedRef.current) return;
        isWidgetOpenRequestedRef.current = false;
        openChatWidget();
    }, [isWidgetScriptLoaded]);

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
        updateChatWidgetVisibility(false);
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
            updateChatWidgetVisibility(false);
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

    const activeMeta = conversationStages?.[0] || {};

    return (
        <section id='how-it-works' ref={sectionRef} className='bg-[#FAFAF9] border-t border-gray-100 overflow-hidden'>
            {widgetConfig?.script_src && (
                <Script
                    strategy='afterInteractive'
                    src={widgetConfig?.script_src}
                    onLoad={() => setIsWidgetScriptLoaded(true)}
                    onReady={() => setIsWidgetScriptLoaded(true)}
                />
            )}

            <div className='container cont_p flex flex-col gap-10'>
                <div className='text-center flex flex-col gap-3'>
                    <h2 className='heading text-[#18181B]'>
                        {data?.heading_prefix ? (
                            <>
                                {data?.heading_prefix}
                                <span className='text-[#529837]'>{data?.heading_accent}</span>
                                {data?.heading_suffix}
                            </>
                        ) : (
                            data?.heading
                        )}
                    </h2>

                    <p className='subheading text-[#4B5563] max-w-2xl mx-auto font-normal leading-relaxed'>
                        {data?.subheading}
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto'>
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
                                        className={`text-left rounded-xl p-5 border flex flex-col gap-2 cursor-pointer group relative ${
                                            isCurrent
                                                ? 'bg-white border-emerald-600 shadow-md ring-1 ring-emerald-600/30'
                                                : isCompleted
                                                  ? 'bg-slate-50/90 border-slate-200 hover:bg-white hover:border-emerald-200'
                                                  : 'bg-white border-slate-200/80 hover:border-slate-300'
                                        }`}
                                    >
                                        <div className='flex items-center justify-between gap-3'>
                                            <div className='flex items-center gap-3'>
                                                <div
                                                    className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center ${
                                                        isCurrent
                                                            ? 'bg-emerald-600 text-white'
                                                            : isCompleted
                                                              ? 'bg-emerald-100 text-emerald-700'
                                                              : 'bg-slate-100 text-slate-500'
                                                    }`}
                                                >
                                                    {step?.n || `0${stepNum}`}
                                                </div>
                                                <h3
                                                    className={`font-semibold text-base sm:text-lg ${
                                                        isCurrent ? 'text-slate-900 font-bold' : 'text-slate-800'
                                                    }`}
                                                >
                                                    {step?.title}
                                                </h3>
                                            </div>

                                            {isCompleted ? (
                                                <span className='text-[11px] font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full'>
                                                    <MdCheckCircle className='w-3.5 h-3.5' />
                                                    <span>{data?.done_text}</span>
                                                </span>
                                            ) : isCurrent ? (
                                                <span className='text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full'>
                                                    <span className='w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse' />
                                                    <span>{data?.live_text}</span>
                                                </span>
                                            ) : (
                                                <span className='text-xs text-slate-400 font-medium'>
                                                    {data?.click_to_view}
                                                </span>
                                            )}
                                        </div>

                                        <p className='text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pl-12'>
                                            {step?.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className='flex flex-col items-start gap-2'>
                            <button
                                type='button'
                                onClick={runAutomatedConversation}
                                className='inline-flex items-center gap-2 bg-[#008069] hover:bg-[#006e5a] text-white font-medium text-sm px-5 py-2.5 rounded cursor-pointer'
                            >
                                <MdRefresh className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`} />
                                <span>{data?.replay_text}</span>
                            </button>
                            {data?.replay_subtext && (
                                <p className='text-xs text-slate-500 font-normal'>{data?.replay_subtext}</p>
                            )}
                        </div>
                    </div>

                    <div className='lg:col-span-6 flex flex-col items-center justify-center gap-4 w-full relative py-2 sm:py-6'>
                        <div className='flex lg:hidden justify-center select-none'>
                            <div className='bg-[#0F172A] text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md border border-slate-700 flex items-center gap-2 animate-bounce'>
                                <span className='w-2 h-2 rounded-full bg-emerald-400 animate-ping' />
                                <span>Click "Let's Chat" below to test live! 👇</span>
                            </div>
                        </div>

                        <div className='absolute -right-2 xl:-right-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 pointer-events-none z-40 select-none'>
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
                            <div className='bg-[#0F172A] text-white font-bold text-xs xl:text-[13px] px-3.5 py-1.5 rounded-full shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce whitespace-nowrap'>
                                <span className='w-2 h-2 rounded-full bg-emerald-400 animate-ping' />
                                <span>Click to test live!</span>
                            </div>
                        </div>

                        <div className='relative w-full max-w-[295px] sm:max-w-[325px] bg-[#14151A] p-1.5 rounded-[44px] sm:rounded-[48px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35),0_0_0_1px_#272930]'>
                            <div
                                id='wa-chat-widget-parent'
                                data-widget-open={isChatWidgetOpen ? 'true' : 'false'}
                                className='relative w-full rounded-[38px] sm:rounded-[42px] overflow-hidden bg-[#EFEAE2] flex flex-col h-[620px] sm:h-[690px]'
                            >
                                <div id={widgetMountId} />

                                <div className='absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-black rounded-full z-[100000] flex items-center justify-between px-2.5 pointer-events-none'>
                                    <div className='w-2 h-2 rounded-full bg-[#151515] border border-gray-800' />
                                    <div className='w-2 h-2 rounded-full bg-[#0a192f]' />
                                </div>

                                <div className='flex flex-col h-full w-full'>
                                    <div className='bg-[#008069] py-2 px-5 flex items-center justify-between text-white text-[11.5px] font-semibold relative z-30 select-none'>
                                        <span>9:41</span>
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

                                    <div className='bg-[#008069] px-3 py-2 flex items-center justify-between text-white relative z-20'>
                                        <div className='flex items-center gap-2'>
                                            <MdArrowBack className='w-4.5 h-4.5 text-white/90 cursor-pointer hover:text-white' />
                                            <div className='w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-amber-300 p-0.5 flex items-center justify-center shadow-xs'>
                                                <div className='w-full h-full rounded-full bg-white/20 flex items-center justify-center text-xs'>
                                                    🛍️
                                                </div>
                                            </div>
                                            <div className='leading-tight'>
                                                <p className='font-bold text-[12.5px] text-white flex items-center gap-1'>
                                                    <span>UrbanStyle Store</span>
                                                    <span className='text-[10px] text-[#53BDEB] font-bold'>✓</span>
                                                </p>
                                                <p className='text-emerald-100 text-[10px] font-normal flex items-center gap-1'>
                                                    <span className='w-1.5 h-1.5 rounded-full bg-[#25D366]' />
                                                    <span>WhatsApp Business · online</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-2 text-white/90'>
                                            <MdVideocam className='w-4.5 h-4.5 cursor-pointer hover:text-white' />
                                            <MdCall className='w-4 h-4 cursor-pointer hover:text-white' />
                                            <MdMoreVert className='w-4.5 h-4.5 cursor-pointer hover:text-white' />
                                        </div>
                                    </div>

                                    <div
                                        ref={scrollRef}
                                        className='flex-1 overflow-y-auto p-3 flex flex-col gap-3 relative'
                                        style={{
                                            backgroundColor: '#EFEAE2',
                                            backgroundImage: 'radial-gradient(#d1d7db 1.2px, transparent 1.2px)',
                                            backgroundSize: '20px 20px',
                                        }}
                                    >
                                        <div className='flex justify-center'>
                                            <span className='bg-white text-[#54656F] text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md shadow-xs border border-gray-100/80 uppercase'>
                                                TODAY
                                            </span>
                                        </div>

                                        <div className='flex justify-center'>
                                            <span className='bg-[#FFEECD] text-[#54656F] text-[9px] px-3 py-1.5 rounded-lg text-center max-w-[94%] shadow-xs leading-tight border border-[#FFE0A3]/60 flex items-center gap-1'>
                                                <span>🔒</span>
                                                <span>Messages and calls are end-to-end encrypted.</span>
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
                                                        className={`relative p-2.5 text-[12.5px] text-[#111B21] flex flex-col gap-1.5 ${
                                                            isCustomer
                                                                ? 'bg-[#D9FDD3] rounded-2xl rounded-tr-none shadow-sm border border-[#B9EAB3] max-w-[88%]'
                                                                : 'bg-white rounded-2xl rounded-tl-none shadow-sm border border-gray-200/90 max-w-[94%]'
                                                        }`}
                                                    >
                                                        {isCustomer && (
                                                            <div className='absolute -right-1.5 top-0 w-0 h-0 border-t-[7px] border-t-[#D9FDD3] border-r-[7px] border-r-transparent' />
                                                        )}

                                                        {!isCustomer && (
                                                            <p className='text-[9.5px] font-bold uppercase text-[#0F6B4F]'>
                                                                URBANSTYLE STORE
                                                            </p>
                                                        )}

                                                        {msg?.isLink ? (
                                                            <div className='flex flex-col gap-2'>
                                                                <p className='leading-snug font-normal text-[#111B21] text-[12.5px]'>
                                                                    Continue in our dedicated Chat Window:
                                                                </p>

                                                                <div
                                                                    onClick={handleLetsChatClick}
                                                                    className='p-2.5 rounded-xl border-[1.5px] border-[#A6E0BC] bg-[#EFFAF2] shadow-xs hover:shadow-md hover:border-[#0F6B4F] cursor-pointer flex flex-col gap-2 relative group'
                                                                >
                                                                    <div className='flex items-center justify-between gap-1'>
                                                                        <span className='font-bold text-[12.5px] text-[#0F6B4F] flex items-center gap-1'>
                                                                            💬 MSG91 Chat Window
                                                                        </span>
                                                                    </div>

                                                                    <div className='flex items-center justify-between border-t border-[#CFEBD9] py-1'>
                                                                        <span className='text-[10.5px] text-[#0F6B4F] font-semibold flex items-center gap-1'>
                                                                            chat.msg91.com/order-48291 ↗
                                                                        </span>
                                                                        <span className='text-[9.5px] text-gray-400 font-medium'>
                                                                            10 KB
                                                                        </span>
                                                                    </div>

                                                                    <div className='relative'>
                                                                        <div className='text-white text-[12px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 shadow-sm bg-[#0F6B4F] group-hover:bg-[#0c5942] relative overflow-hidden ring-2 ring-emerald-500/40'>
                                                                            <span>Let's Chat ↗</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className='leading-snug pr-11 font-normal'>
                                                                {msg?.text}
                                                            </p>
                                                        )}

                                                        <div className='absolute right-2 bottom-1 flex items-center gap-1 text-[9px] text-[#667781]'>
                                                            <span>{msg?.time || '10:40 AM'}</span>
                                                            {isCustomer && (
                                                                <span className='text-[#53BDEB] font-bold text-[10px] leading-none'>
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
                                                <div className='bg-white px-3 py-1.5 shadow-xs flex gap-1 items-center rounded-2xl rounded-tl-none border border-gray-100'>
                                                    <span className='text-[10px] text-gray-400 mr-1'>
                                                        {data?.store_typing || 'Store is typing'}
                                                    </span>
                                                    <span className='w-1.5 h-1.5 rounded-full bg-[#008069] animate-bounce' />
                                                    <span className='w-1.5 h-1.5 rounded-full bg-[#008069] animate-bounce' />
                                                    <span className='w-1.5 h-1.5 rounded-full bg-[#008069] animate-bounce' />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className='bg-[#F0F2F5] px-2.5 py-2 flex items-center gap-2 border-t border-[#E9EDEF] relative z-20'>
                                        <div className='flex-1 bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-[#E1E4E9]'>
                                            <span className='text-xs text-gray-400 cursor-pointer'>😊</span>
                                            <input
                                                type='text'
                                                disabled
                                                placeholder={data?.input_placeholder || 'Message'}
                                                className='flex-1 text-[11.5px] text-gray-700 bg-transparent outline-none cursor-default'
                                            />
                                            <span className='text-xs text-gray-400 cursor-pointer'>📎</span>
                                        </div>
                                        <div className='w-7 h-7 rounded-full bg-[#00A884] flex items-center justify-center text-white text-[11px] shadow-sm cursor-pointer hover:bg-[#008f70]'>
                                            🎙️
                                        </div>
                                    </div>

                                    <div className='bg-[#F0F2F5] py-1 flex justify-center items-center'>
                                        <div className='w-28 h-1 bg-[#111] rounded-full' />
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
