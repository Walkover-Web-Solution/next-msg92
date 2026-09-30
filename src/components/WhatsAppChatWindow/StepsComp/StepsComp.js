import { useState, useEffect, useRef } from 'react';
import { MdCheckCircle, MdRefresh, MdArrowBack, MdVideocam, MdCall, MdMoreVert } from 'react-icons/md';

export default function WhatsAppStepsComp({ data, pageInfo }) {
    if (!data) return null;

    const conversationStages = data?.conversation_stages || [];
    const widgetConfig = data?.widget_config || {
        widgetToken: '251a3',
        parentId: 'wa-chat-widget-parent',
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

    const sectionRef = useRef(null);
    const scrollRef = useRef(null);
    const timersRef = useRef([]);

    const initAndOpenWidget = (launch = true, delay = 0) => {
        if (typeof window === 'undefined') return;

        const config = { ...widgetConfig, launch_widget: launch };

        if (window.initChatWidget) {
            window.initChatWidget(config, delay);
            const manager = window.ctest_helloChatbotManager;
            if (manager && manager.changeContainer) {
                manager.changeContainer(widgetConfig?.parentId || 'wa-chat-widget-parent');
            }
            return;
        }

        if (!document.getElementById('msg91-live-chat-script')) {
            const script = document.createElement('script');
            script.id = 'msg91-live-chat-script';
            script.type = 'text/javascript';
            script.src = widgetConfig?.script_src || 'https://ctest.msg91.com/chat-widget.js';
            script.onload = () => {
                if (window.initChatWidget) {
                    window.initChatWidget(config, delay);
                }
            };
            document.head.appendChild(script);
        }
    };

    useEffect(() => {
        initAndOpenWidget(false);
    }, []);

    const clearAllTimers = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };

    const handleCardClick = () => {
        initAndOpenWidget(true, 500);
    };

    const runAutomatedConversation = () => {
        clearAllTimers();
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
        setCurrentStage(stageNum);

        const stage1Msg = conversationStages?.[0]?.messages?.[0];
        const stage2Msg = conversationStages?.[1]?.messages?.[0];

        if (stageNum === 1) {
            if (stage1Msg) setVisibleMessages([stage1Msg]);
        } else {
            const combined = [];
            if (stage1Msg) combined.push(stage1Msg);
            if (stage2Msg) combined.push(stage2Msg);
            setVisibleMessages(combined);
            initAndOpenWidget(true, 500);
        }
    };

    useEffect(() => {
        let hasStarted = false;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasStarted) {
                    hasStarted = true;
                    runAutomatedConversation();
                }
            },
            { threshold: 0.2 }
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
            <div className='container cont_p'>
                <div className='text-center mb-14 sm:mb-16'>
                    <h2 className='heading text-[#18181B] tracking-tight mb-4'>{data?.heading}</h2>

                    <p className='subheading text-[#4B5563] max-w-2xl mx-auto font-normal leading-relaxed'>
                        {data?.subheading}
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto'>
                    <div className='lg:col-span-6 flex flex-col gap-4'>
                        {data?.steps?.map((step, index) => {
                            const stepNum = index + 1;
                            const isCurrent = currentStage === stepNum;
                            const isCompleted = currentStage > stepNum;

                            return (
                                <div
                                    key={step?.n || index}
                                    onClick={() => handleSelectStage(stepNum)}
                                    className={`text-left rounded-2xl sm:rounded-3xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
                                        isCurrent
                                            ? 'bg-white border-[#529837] shadow-lg ring-2 ring-[#529837]/20 -translate-y-0.5'
                                            : isCompleted
                                              ? 'bg-emerald-50/50 border-emerald-200 shadow-2xs hover:bg-white'
                                              : 'bg-white border-gray-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md'
                                    }`}
                                >
                                    <div className='flex items-center justify-between mb-2.5'>
                                        <div className='flex items-center gap-3'>
                                            <span
                                                className={`font-bold text-xs px-3 py-1 rounded-full transition-colors ${
                                                    isCurrent
                                                        ? 'bg-[#529837] text-white shadow-xs'
                                                        : isCompleted
                                                          ? 'bg-[#DCF8C6] text-[#128C7E]'
                                                          : 'bg-gray-100 text-[#6B7280]'
                                                }`}
                                            >
                                                {step?.n || `0${stepNum}`}
                                            </span>
                                            <h3 className='font-bold text-base sm:text-lg text-[#18181B] group-hover:text-[#529837] transition-colors'>
                                                {step?.title}
                                            </h3>
                                        </div>

                                        {isCompleted ? (
                                            <span className='text-[11px] font-semibold text-[#529837] flex items-center gap-1 bg-emerald-100/70 border border-emerald-200 px-2.5 py-0.5 rounded-full'>
                                                <MdCheckCircle className='w-3.5 h-3.5' />
                                                <span>{data?.done_text}</span>
                                            </span>
                                        ) : isCurrent ? (
                                            <span className='text-[11px] font-semibold text-[#529837] flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full'>
                                                <span className='w-1.5 h-1.5 rounded-full bg-[#529837] animate-pulse' />
                                                <span>{data?.live_text}</span>
                                            </span>
                                        ) : (
                                            <span className='text-[11px] text-gray-400 group-hover:text-[#529837] transition-colors'>
                                                {data?.click_to_view}
                                            </span>
                                        )}
                                    </div>

                                    <p className='text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal pl-11'>
                                        {step?.desc}
                                    </p>
                                </div>
                            );
                        })}

                        <div className='pt-2 flex items-center gap-3'>
                            <button
                                onClick={runAutomatedConversation}
                                className='btn btn-md bg-[#529837] hover:bg-[#43822b] text-white border-0 px-6 rounded-xl shadow-sm hover:shadow-md gap-2 font-semibold text-sm'
                            >
                                <MdRefresh className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
                                <span>{isPlaying ? data?.playing_text : data?.replay_text}</span>
                            </button>
                        </div>
                    </div>

                    <div className='lg:col-span-6 flex justify-center w-full relative py-2 sm:py-6'>
                        <div className='relative w-full max-w-[340px] sm:max-w-[380px] bg-[#0B0C0F] p-2.5 sm:p-3 rounded-[46px] sm:rounded-[54px] shadow-[0_30px_70px_-20px_rgba(15,23,42,0.45),inset_0_0_0_2px_#2A2C31]'>
                            <div
                                id='wa-chat-widget-parent'
                                className='relative w-full rounded-[38px] sm:rounded-[44px] overflow-hidden bg-[#EFEAE2] flex flex-col h-[560px] sm:h-[640px]'
                            >
                                <div className='absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-[100000] flex items-center justify-between px-3 pointer-events-none'>
                                    <div className='w-2 h-2 rounded-full bg-[#151515] border border-gray-800' />
                                    <div className='w-2 h-2 rounded-full bg-[#0a192f]' />
                                </div>

                                <div className='flex flex-col h-full w-full'>
                                    <div className='bg-[#008069] pt-2.5 pb-1 px-6 flex items-center justify-between text-white text-[12px] font-semibold tracking-tight relative z-30 select-none'>
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

                                    <div className='bg-[#008069] px-3.5 py-2.5 flex items-center justify-between text-white flex-shrink-0 relative z-20'>
                                        <div className='flex items-center gap-2.5'>
                                            <MdArrowBack className='w-5 h-5 text-white/90 cursor-pointer hover:text-white' />
                                            <div className='w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-amber-300 p-0.5 flex items-center justify-center flex-shrink-0 shadow-xs'>
                                                <div className='w-full h-full rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-sm'>
                                                    🛍️
                                                </div>
                                            </div>
                                            <div className='leading-tight'>
                                                <p className='font-bold text-[13px] text-white flex items-center gap-1'>
                                                    <span>UrbanStyle Store</span>
                                                    <span className='text-[11px] text-[#53BDEB] font-bold'>✓</span>
                                                </p>
                                                <p className='text-emerald-100 text-[10.5px] font-normal flex items-center gap-1'>
                                                    <span className='w-1.5 h-1.5 rounded-full bg-[#25D366]' />
                                                    <span>WhatsApp Business · online</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-2.5 text-white/90'>
                                            <MdVideocam className='w-5 h-5 cursor-pointer hover:text-white' />
                                            <MdCall className='w-4.5 h-4.5 cursor-pointer hover:text-white' />
                                            <MdMoreVert className='w-5 h-5 cursor-pointer hover:text-white' />
                                        </div>
                                    </div>

                                    <div
                                        ref={scrollRef}
                                        className='flex-1 overflow-y-auto p-3.5 space-y-3 relative'
                                        style={{
                                            backgroundColor: '#EFEAE2',
                                            backgroundImage: 'radial-gradient(#d1d7db 1.2px, transparent 1.2px)',
                                            backgroundSize: '20px 20px',
                                        }}
                                    >
                                        <div className='flex justify-center'>
                                            <span className='bg-white text-[#54656F] text-[10px] font-semibold px-3 py-1 rounded-md shadow-xs border border-gray-100/80 uppercase tracking-wide'>
                                                TODAY
                                            </span>
                                        </div>

                                        <div className='flex justify-center'>
                                            <span className='bg-[#FFEECD] text-[#54656F] text-[9.5px] px-3.5 py-1.5 rounded-lg text-center max-w-[92%] shadow-xs leading-tight border border-[#FFE0A3]/60 flex items-center gap-1'>
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
                                                        className={`relative p-3 text-[13px] text-[#111B21] transition-all duration-300 animate-fade-in ${
                                                            isCustomer
                                                                ? 'bg-[#D9FDD3] rounded-2xl rounded-tr-none shadow-sm border border-[#B9EAB3] max-w-[86%]'
                                                                : 'bg-white rounded-2xl rounded-tl-none shadow-sm border border-gray-200/90 max-w-[94%]'
                                                        }`}
                                                    >
                                                        {isCustomer && (
                                                            <div className='absolute -right-1.5 top-0 w-0 h-0 border-t-[7px] border-t-[#D9FDD3] border-r-[7px] border-r-transparent' />
                                                        )}

                                                        {!isCustomer && (
                                                            <p className='text-[10px] font-bold uppercase tracking-wider mb-1.5 text-[#0F6B4F]'>
                                                                URBANSTYLE STORE
                                                            </p>
                                                        )}

                                                        {msg?.isLink ? (
                                                            <div>
                                                                <p className='leading-snug mb-2.5 font-normal text-[#111B21] text-[13px]'>
                                                                    Continue in our dedicated Chat Window:
                                                                </p>

                                                                <div
                                                                    onClick={handleCardClick}
                                                                    className='p-3 rounded-xl border-[1.5px] border-[#A6E0BC] bg-[#EFFAF2] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col gap-2'
                                                                >
                                                                    <div className='flex items-center justify-between gap-2'>
                                                                        <span className='font-bold text-[13.5px] text-[#0F6B4F] flex items-center gap-1'>
                                                                            💬 MSG91 Chat Window
                                                                        </span>
                                                                    </div>

                                                                    <p className='text-[11.5px] text-[#3B4250] leading-tight font-normal'>
                                                                        Continue resolving order #48291
                                                                    </p>

                                                                    <div className='flex items-center justify-between pt-2 border-t border-[#CFEBD9]'>
                                                                        <span className='text-[11px] text-[#0F6B4F] font-semibold flex items-center gap-1'>
                                                                            chat.msg91.com/order-48291 ↗
                                                                        </span>
                                                                        <span className='text-[10px] text-gray-400 font-medium'>
                                                                            10 KB
                                                                        </span>
                                                                    </div>

                                                                    <div className='mt-1 text-white text-[12.5px] font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-sm bg-[#0F6B4F] hover:bg-[#0c5942] transition-colors'>
                                                                        <span>Let's Chat ↗</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className='leading-snug pr-12 pb-0.5 font-normal'>
                                                                {msg?.text}
                                                            </p>
                                                        )}

                                                        <div className='absolute right-2.5 bottom-1 flex items-center gap-1 text-[9.5px] text-[#667781]'>
                                                            <span>{msg?.time || '10:40 AM'}</span>
                                                            {isCustomer && (
                                                                <span className='text-[#53BDEB] font-bold text-[11px] leading-none'>
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

                                    <div className='bg-[#F0F2F5] px-3 py-2 flex items-center gap-2 border-t border-[#E9EDEF] flex-shrink-0 relative z-20'>
                                        <div className='flex-1 bg-white rounded-full px-3.5 py-2 flex items-center gap-2 shadow-2xs border border-[#E1E4E9]'>
                                            <span className='text-sm text-gray-400 cursor-pointer'>😊</span>
                                            <input
                                                type='text'
                                                disabled
                                                placeholder={data?.input_placeholder || 'Message'}
                                                className='flex-1 text-[12px] text-gray-700 bg-transparent outline-none cursor-default'
                                            />
                                            <span className='text-sm text-gray-400 cursor-pointer'>📎</span>
                                        </div>
                                        <div className='w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center text-white text-xs shadow-sm flex-shrink-0 cursor-pointer hover:bg-[#008f70] transition-colors'>
                                            🎙️
                                        </div>
                                    </div>

                                    <div className='bg-[#F0F2F5] pb-1.5 pt-0.5 flex justify-center items-center flex-shrink-0'>
                                        <div className='w-32 h-1 bg-[#111] rounded-full' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                #wa-chat-widget-parent .popup-parent-container,
                #wa-chat-widget-parent [id*='chatbot-iframe-container'],
                #wa-chat-widget-parent .all_available_space-parent-container {
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    max-height: 100% !important;
                    min-height: 100% !important;
                    border-radius: 0 !important;
                    border: none !important;
                    box-shadow: none !important;
                    margin: 0 !important;
                    z-index: 1000 !important;
                }
                #wa-chat-widget-parent iframe {
                    width: 100% !important;
                    height: 100% !important;
                    min-height: 100% !important;
                    border: none !important;
                    border-radius: 0 !important;
                }
                body > [id*='chatbot-launcher'],
                body > [id*='launcher-container'],
                .msg91-chatbot-launcher,
                .chatbot-launcher-container,
                .floating-launcher-container {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }
            `}</style>
        </section>
    );
}
