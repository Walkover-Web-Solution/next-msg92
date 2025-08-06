import { MdArrowRightAlt } from 'react-icons/md';
const voiceBotFeatures = [
    {
        title: 'Natural Conversation',
        description:
            'Our bot understands customer intent, mood, and even complex commands, using advanced artificial intelligence.',
    },
    {
        title: 'Automated Call Handling',
        description:
            'Securely collect information, route calls, verify identity, or trigger IVR logic—all without human intervention.',
    },
    {
        title: 'Real-Time Responses, No Hold Music',
        description:
            'No more waiting. Customers get instant answers to queries like “What’s my order status?” or “Schedule my appointment for Thursday at 4pm.”',
    },
    {
        title: 'Personalized Service',
        description:
            'Greet callers by name, retrieve their recent orders, and continue conversations across channels seamlessly using AI chatbot features.',
    },
    {
        title: 'Multilingual Recognition',
        description: 'Speak the language your customer chooses, switching context as needed with intelligent chatbots.',
    },
];

export default function FeatureWithBulletComp() {
    return (
        <section>
            <div className='container cont cont_gap cont_p'>
                <div className='flex flex-col gap-1 cont_w'>
                    <span className='text-lg uppercase text-[var(--hello-dark-color)] font-bold'>Voice Bot</span>
                    <h2 className='text-3xl font-bold'>Conversational Voice Support in Real Time</h2>
                    <p className='text-lg text-gray-500 '>
                        Empower your contact centre with a self-learning, always-on AI Voice Agent.
                    </p>
                </div>
                <div className='flex gap-16'>
                    <div className='w-full max-w-[520px] aspect-square bg-[var(--hello-lite-color)] rounded-lg border'></div>
                    <div className='w-full cont gap-6 justify-center'>
                        {voiceBotFeatures.map((feature, index) => (
                            <div className='flex gap-3' key={index}>
                                <MdArrowRightAlt className='text-2xl' />
                                <div>
                                    <h3 className='text-lg font-semibold text-gray-700'>{feature.title}</h3>
                                    <p className='text-gray-500 max-w-[600px]'>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
