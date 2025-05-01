import Image from 'next/image';
import Link from 'next/link';

export default function DemoChatBotComp() {
    return (
        <div className='container py-20'>
            <div className='flex flex-col gap-10'>
                <h2 className='text-2xl font-bold'>WhatsApp Bots</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <Link href={'/'} className='flex flex-col border hover:bg-[#E8F7E8] gap-3 p-4 rounded-lg'>
                        <Image
                            className='w-full rounded-lg bg-white'
                            src={'/assets/global/index/products/product-hello.svg'}
                            width={720}
                            height={720}
                            alt='WhatsApp Bot'
                        />
                        <div className='flex flex-col gap-0 '>
                            <h3 className='text-lg font-semibold'>Track My order</h3>
                            <p className='text-gray-800 text-sm'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
