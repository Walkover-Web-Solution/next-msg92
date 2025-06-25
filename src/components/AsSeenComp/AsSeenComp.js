import Image from 'next/image';
import Link from 'next/link';

export default function AsSeenComp({ data }) {
    return (
        <>
            <div className='border-t'>
                <div className='container md:py-20 py-12 flex flex-col sm:gap-20 gap-12'>
                    <h2 className='lg:text-3xl text-3xl text-center font-bold'>As Seen On</h2>
                    <div className='flex items-center gap-20 justify-center sm:flex-wrap lg:flex-nowrap flex-col sm:flex-row'>
                        <Image
                            className='lg:block hidden  xl:w-16 w-8'
                            src={'/assets/as_seen_on/left.png'}
                            width={400}
                            height={400}
                            alt='Left'
                        />
                        <div className='max-w-full flex-wrap flex items-center sm:gap-20 gap-12 justify-center  flex-col sm:flex-row'>
                            {data?.map((icon, index) => {
                                return (
                                    <a href={icon?.url || '#'} target='_blank'>
                                        <Image
                                            key={index}
                                            className='xl:h-5 h-5 w-fit'
                                            src={`/assets/as_seen_on/${icon?.name}.png`}
                                            width={1080}
                                            height={400}
                                            alt={icon?.name}
                                        />
                                    </a>
                                );
                            })}
                        </div>
                        <Image
                            className='lg:block hidden  xl:w-16 w-8'
                            src={'/assets/as_seen_on/right.png'}
                            width={400}
                            height={400}
                            alt='Right'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
