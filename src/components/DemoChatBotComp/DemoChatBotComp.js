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
            <div className='container py-8 flex flex-col gap-5'>
                <div className='flex justify-center flex-wrap gap-12'>
                    <div className='flex flex-col gap-5 items-center'>
                        <div className='flex items-center gap-1 justify-center'>
                            <Image
                                src={'/assets/icons/social/whatsapp_logo.svg'}
                                width={32}
                                height={32}
                                alt='WhatsApp Logo'
                            />
                            <h2 className='text-xl font-bold'>WhatsApp Bots</h2>
                        </div>
                        <Link href='https://wa.me/917316914316?text=%F0%9F%9B%92%20Track%20My%20Order' target='_blank'>
                            <button className='btn bg-gray hover:bg-gray-500 border-none font-bold h-[44px] min-h-[36px] text-[16px] text-white w-[300px]'>
                                Track Order
                            </button>
                        </Link>
                        <Link href='https://wa.me/917316914316?text=%F0%9F%93%A6%20Order%20Issues' target='_blank'>
                            <button className='btn bg-gray hover:bg-gray-500 border-none font-bold h-[44px] min-h-[36px] text-[16px] text-white w-[300px]'>
                                Order Issues
                            </button>
                        </Link>
                        <Link
                            href='https://wa.me/917316914316?text=%F0%9F%92%B0%20Refund%20%26%20Cancellation'
                            target='_blank'
                        >
                            <button className='btn bg-gray hover:bg-gray-500 border-none font-bold h-[44px] min-h-[36px] text-[16px] text-white w-[300px]'>
                                Refund and Cancellation
                            </button>
                        </Link>
                        <Link href='https://wa.me/917316914316?text=%F0%9F%8E%81%20Ongoing%20Offers' target='_blank'>
                            <button className='btn bg-gray hover:bg-gray-500 border-none font-bold h-[44px] min-h-[36px] text-[16px] text-white w-[300px]'>
                                Ongoing Offers
                            </button>
                        </Link>
                        <Link href='https://wa.me/917316914316?text=%F0%9F%99%8B%20Talk%20to%20Support' target='_blank'>
                            <button className='btn bg-gray hover:bg-gray-500 border-none font-bold h-[44px] min-h-[36px] text-[16px] text-white w-[300px]'>
                                Talk to Support
                            </button>
                        </Link>
                        <Link
                            href='https://wa.me/917316914316?text=%F0%9F%9B%92%E2%8F%B3Abandoned%20Cart'
                            target='_blank'
                        >
                            <button className='btn bg-gray hover:bg-gray-500 border-none font-bold h-[44px] min-h-[36px] text-[16px] text-white w-[300px]'>
                                Abandoned Cart
                            </button>
                        </Link>
                        <Link href='https://wa.me/917316914316?text=Latest%20Collection' target='_blank'>
                            <button className='btn bg-gray hover:bg-gray-500 border-none font-bold h-[44px] min-h-[36px] text-[16px] text-white w-[300px]'>
                                Latest Collection
                            </button>
                        </Link>
                        {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 '>
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
                    </div> */}
                    </div>
                    <div className='flex flex-col gap-12'>
                        <div className='flex flex-col gap-5 items-center'>
                            <div className='flex items-center gap-1 justify-center'>
                                <Image
                                    src={'/assets/icons/social/instagram_logo.svg'}
                                    width={32}
                                    height={32}
                                    alt='Instagram Logo'
                                />
                                <h2 className='text-xl font-bold'>Instagram Bots</h2>
                            </div>
                            <Link href='https://ig.me/m/MSG91_Instabot' target='_blank'>
                                <button className='btn bg-gray hover:bg-gray-500 border-none font-bold h-[44px] min-h-[36px] text-[16px] text-white w-[300px]'>
                                    Fashion & Style Industry
                                </button>
                            </Link>
                            <Link href='https://ig.me/m/msg91_hello' target='_blank'>
                                <button className='btn bg-gray hover:bg-gray-500 border-none font-bold h-[44px] min-h-[36px] text-[16px] text-white w-[300px]'>
                                    Real Estate Industry
                                </button>
                            </Link>
                            {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 '>
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
                    </div> */}
                        </div>
                        <div className='flex flex-col gap-5 items-center'>
                            <div className='flex items-center gap-1 justify-center'>
                                <Image src={'/assets/brand/favicon.svg'} width={32} height={32} alt='Website Logo' />
                                <h2 className='text-xl font-bold'>Website Bots</h2>
                            </div>
                            <div onClick={() => window.chatWidget.open()}>
                                <button className='btn bg-gray hover:bg-gray-500 border-none font-bold h-[44px] min-h-[36px] text-[16px] text-white w-[300px]'>
                                    Marketing Strategy
                                </button>
                                {/* <div>
                                    hello
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-5 items-center justify-center'>
                    <Link href='https://www.instagram.com/msg91com/?igsh=MWV5ZjQ1M3d5NDFyNQ%3D%3D#' target='_blank'>
                        <Image
                            src={'/assets/icons/social/insta-outline.svg'}
                            width={32}
                            height={32}
                            alt='Instagram Logo'
                        />
                    </Link>
                    <Link href='https://x.com/msg91' target='_blank'>
                        <Image src={'/assets/icons/social/X icon.svg'} width={28} height={28} alt='Twitter Logo' />
                    </Link>
                    <Link href='https://www.linkedin.com/company/msg91' target='_blank'>
                        <Image
                            src={'/assets/icons/social/linkedin-outline.svg'}
                            width={28}
                            height={28}
                            alt='LinkedIn Logo'
                        />
                    </Link>
                </div>
            </div>
        </>
    );
}
