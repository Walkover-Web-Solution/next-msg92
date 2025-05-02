import Image from 'next/image';
import Link from 'next/link';
import chatbotdemo from '@/data/chatbotdemo.json';
import Head from 'next/head';

export default function DemoChatBotComp() {
    return (
        <>
            <Head>
                <meta name='robots' content='noindex,nofollow' />
                <meta name='googlebot' content='noindex,nofollow' />
                <meta name='bingbot' content='noindex,nofollow' />
            </Head>
            <div className='container py-8 flex flex-col gap-12'>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-1'>
                        <Image
                            src={'/assets/icons/social/whatsapp_logo.svg'}
                            width={32}
                            height={32}
                            alt='WhatsApp Logo'
                        />
                        <h2 className='text-xl font-bold'>WhatsApp Bots</h2>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 '>
                        {chatbotdemo.whatsapp_bot.map((bot, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={bot?.link}
                                    className='flex flex-col  bg-gray-50 gap-3 p-3 rounded-lg'
                                >
                                    <Image
                                        className='w-full rounded-lg bg-white'
                                        src={bot?.image}
                                        width={720}
                                        height={720}
                                        alt='WhatsApp Bot'
                                    />
                                    <div className='flex flex-col gap-0 '>
                                        <h3 className='text-base font-semibold'>{bot?.name}</h3>
                                        <p className='text-gray-800 text-sm'>{bot?.description}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-1'>
                        <Image
                            src={'/assets/icons/social/instagram_logo.svg'}
                            width={32}
                            height={32}
                            alt='Instagram Logo'
                        />
                        <h2 className='text-xl font-bold'>Instagram Bots</h2>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 '>
                        {chatbotdemo.instagram_bot.map((bot, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={bot?.link}
                                    className='flex flex-col  bg-gray-50 gap-3 p-3 rounded-lg'
                                >
                                    <Image
                                        className='w-full rounded-lg bg-white'
                                        src={bot?.image}
                                        width={720}
                                        height={720}
                                        alt='WhatsApp Bot'
                                    />
                                    <div className='flex flex-col gap-0 '>
                                        <h3 className='text-base font-semibold'>{bot?.name}</h3>
                                        <p className='text-gray-800 text-sm'>{bot?.description}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
