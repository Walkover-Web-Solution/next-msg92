import LottiePlayer from '../LottiePlayer/LottiePlayer';
import { LinkText } from '../UIComponent/Buttons/LinkButton';
import { ChatbotBuilder } from './ChatbotBuilder';
import FeaturesAccordionComp from './FeaturesAccordionComp';
import FeatureWithBulletComp from './FeatureWithBulletComp';
import PluginsAndIntegrationsComp from './PluginsAndIntegrationsComp';
import styles from './ChatBotPageComp.module.scss';
export default function ChatBotPageComp({ data }) {
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
                <div className='w-full h-fit'>
                    <LottiePlayer lottie='/assets/global/hello-chatbot/lottie/chatbot_hero.json' />
                </div>
            </section>
            <FeaturesAccordionComp data={data?.voiceSupport} />
            <FeatureWithBulletComp data={data?.voiceBot} />
            <PluginsAndIntegrationsComp />
            <MultilingualBot />
            <ChatbotBuilder data={data?.chatBotBuilder} />
            <CTAComp data={data?.cta} />
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

export function CTAComp({ data }) {
    return (
        <section className=' bg-secondary'>
            <div className='container cont cont_gap cont_p items-center'>
                <div className='flex flex-col gap-2 cont items-center text-center cont_w'>
                    <h2 className='text-2xl font-bold'>{data?.heading}</h2>
                    <h3 className='text-2xl font-bold'>{data?.subHeading}</h3>
                    <p className='text-gray-600'>{data?.content}</p>
                </div>
                <div className='flex gap-2'>
                    <a href={data?.button?.link}>
                        <button className='btn btn-primary btn-md'>
                            <LinkText>{data?.button?.text}</LinkText>
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
}
