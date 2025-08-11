import { LinkText } from '../UIComponent/Buttons/LinkButton';
import FeaturesAccordionComp from './FeaturesAccordionComp';
import FeatureWithBulletComp from './FeatureWithBulletComp';
import PluginsAndIntegrationsComp from './PluginsAndIntegrationsComp';
const data = [
    {
        title: 'WhatsApp',
        description:
            'Send order updates, respond to FAQs, push personalized offers, and even collect feedback—all in the chat app your customers use daily. Automation makes it easy to broadcast campaigns and enrich every engagement with two-way conversation.',
    },
    {
        title: 'Facebook Messenger & Instagram DM',
        description:
            'Let your AI chatbot initiate product recommendations, send reminders, and handle post-purchase support, increasing social engagement and conversion rates. Leverage instagram automation to maximize outreach.',
    },
    {
        title: 'Website Live Chat & Mobile Widget',
        description:
            'Greet website visitors with personalized messages, capture leads in real time, answer product/service queries, and trigger contextual pop-ups based on user actions using an AI chat bot website experience.',
    },
    {
        title: 'Voice Calls',
        description:
            'Enable customers to talk to your AI Voice Agent, allowing hands-free scheduling, support, and even complex issue resolution—perfect for those on the go.',
    },
];
export default function ChatBotPageComp() {
    return (
        <>
            <section className='container cont cont_gap cont_p'>
                <div className='flex flex-col gap-1'>
                    <h1 className='heading'>Automate Customer Chats with AI</h1>
                    <p className='subheading'>
                        Deliver human-like support on WhatsApp, Instagram, and web—without the effort. Just plug, play,
                        and personalize.
                    </p>
                </div>

                <div className='flex gap-2'>
                    <button className='btn btn-hello btn-md'>
                        <LinkText>Get Started</LinkText>
                    </button>
                    <button className='btn btn-hello btn-outline btn-md'>
                        <LinkText>Test Chatbot</LinkText>
                    </button>
                </div>
                <div className='w-full h-[600px] bg-[var(--hello-lite-color)] rounded-lg border'></div>
            </section>
            <FeaturesAccordionComp data={data} />
            <FeatureWithBulletComp />
            <PluginsAndIntegrationsComp />
            <MultilingualBot />
            <PreFooterComp />
        </>
    );
}

export function MultilingualBot() {
    return (
        <section className='container cont cont_gap cont_p'>
            <div className='flex flex-col gap-2'>
                <span className='text-lg uppercase text-[var(--hello-dark-color)] font-bold'>Multilingual Bot</span>
                <h2 className='text-3xl font-bold'>Go Global With Multilingual AI Chatbot</h2>
                <p className='subheading'>
                    Break through language barriers and connect globally with artificial intelligence.
                </p>
            </div>
            <div className='w-full h-[600px] bg-[var(--hello-lite-color)] rounded-lg border'></div>
        </section>
    );
}

export function PreFooterComp() {
    return (
        <section className='container cont cont_gap cont_p'>
            <div className='flex flex-col gap-2'>
                <span className='text-lg uppercase text-[var(--hello-dark-color)] font-bold'>Pre Footer</span>
                <h2 className='text-3xl font-bold'>Pre Footer</h2>
                <p className='subheading'>Pre Footer</p>
            </div>
            <div className='w-full h-[600px] bg-[var(--hello-lite-color)] rounded-lg border'></div>
        </section>
    );
}
