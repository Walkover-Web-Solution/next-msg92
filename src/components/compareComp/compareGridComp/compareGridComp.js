import getURL from '@/utils/getURL';
import Image from 'next/image';
import Link from 'next/link';

export default function CompareGridComp({ data }) {
    return (
        <div className='container py-20 flex flex-col gap-6'>
            <h2 className='md:text-3xl text-2xl font-bold'>{data?.heading}</h2>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-8 gap-6'>
                {data?.cards?.map((card, index) => {
                    return (
                        <a
                            href={getURL('compare', card?.link)}
                            key={index}
                            className='border rounded-lg overflow-hidden hover:shadow-lg'
                        >
                            <div
                                className='p-8 items-center justify-center flex gap-4'
                                style={{
                                    background: `${card?.bg_gredient}`,
                                }}
                            >
                                <div className='xl:min-w-20 xl:h-20 lg:min-w-18 lg:h-18 min-w-14 h-14 bg-white flex items-center justify-center rounded-lg'>
                                    <Image
                                        src={'/assets/brand/favicon.svg'}
                                        className='xl:h-10 w-fit'
                                        width={40}
                                        height={40}
                                        alt='MSG91'
                                        loading='lazy'
                                    />
                                </div>
                                <span className='text-lg font-medium'>vs</span>
                                <div className='xl:min-w-20 xl:h-20 lg:min-w-18 lg:h-18 min-w-14 h-14 bg-white flex items-center justify-center rounded-lg'>
                                    <Image
                                        src={card?.img}
                                        className='xl:h-10 h-8 w-fit'
                                        width={40}
                                        height={40}
                                        alt='MSG91'
                                        loading='lazy'
                                    />
                                </div>
                            </div>
                            <div className='flex text-center w-full items-center justify-center p-4'>
                                <h3 className='text-lg'>{card?.name}</h3>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
