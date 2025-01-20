import Image from 'next/image';

export default function AsSeenComp({ data }) {
    return (
        <>
            <div className='border-t'>
                <div className='container py-20 flex flex-col gap-6'>
                    <h2 className='lg:text-2xl text-xl text-center font-semibold'>As Seen On</h2>
                    <div className='flex items-center gap-5 justify-center sm:flex-wrap lg:flex-nowrap flex-col sm:flex-row'>
                        <Image
                            className='lg:block hidden  xl:w-16 w-8'
                            src={'/assets/as_seen_on/left.png'}
                            width={400}
                            height={400}
                            alt='Left'
                        />
                        {data?.map((icon, index) => {
                            return (
                                <Image
                                    key={index}
                                    className='xl:h-5 h-4 w-fit'
                                    src={`/assets/as_seen_on/${icon?.name}.png`}
                                    width={400}
                                    height={400}
                                    alt={icon?.name}
                                />
                            );
                        })}
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
