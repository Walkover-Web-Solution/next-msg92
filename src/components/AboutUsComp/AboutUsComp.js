import Image from 'next/image';
export default function AboutUsComp({ pageInfo, data }) {
    return (
        <>
            <div className='container gap-6 py-20'>
                <h1 class='text-4xl font-bold mb-2 weight-700'>{data?.heading || ' this is heading '}</h1>
                <h2 class='text-xl font-normal mb-4 w-1/2 gap-6'>{data?.subheading || ' this is heading '}</h2>

                <div className=' '>
                    {' '}
                    <Image
                        src={data?.banner_img}
                        alt='walkoverteam image'
                        width={1500}
                        height={495}
                        className=' w-full h-auto'
                    />
                </div>
            </div>
            <div className='container py-20 gap-6'>
                <h2 className='text-3xl font-bold mb-4'>{data?.offer?.heading}</h2>
                <div className='grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6'>
                    {data?.offer?.content?.length > 0 &&
                        data?.offer?.content.map((item, index) => {
                            return (
                                <div key={index} className='bg-neutral p-4 rounded-lg flex items-center'>
                                    <div className='flex-shrink-0 m-4'>
                                        <Image src={item?.icon} alt={item?.description} width={40} height={40} />
                                    </div>
                                    <div className=''>
                                        <p className='text-lg'>{item?.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className='container py-20 gap-6'>
                <h2 className='text-3xl font-bold mb-4'>{data?.team?.heading}</h2>
                <p className='text-lg mb-8'>{data?.team?.description}</p>
                <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6'>
                    {data?.team?.content?.length > 0 &&
                        data?.team?.content.map((item, index) => {
                            return (
                                <div key={index} className='rounded-lg flex flex-col items-start bg-neutral p-8'>
                                    <div className='flex-shrink-0 '>
                                        <Image src={item?.icon} alt={item?.name} width={400} height={400} />
                                    </div>
                                    <h3 className='text-lg font-bold mb-2 '>{item?.name}</h3>
                                    <p className='text-md font-normal mb-4'>{item?.post}</p>
                                    <p className='text-md'>{item?.description}</p>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className='bg-neutral py-20 '>
                <div className=' container gap-6 text-center'>
                    <p>{data?.hiring?.content}</p>
                    <a href={data?.hiring?.link} className='text-blue-500'>
                        {data?.hiring?.linkText}
                    </a>
                </div>
            </div>
            <div className='container py-20 gap-6'>
                <h2 className='text-3xl font-bold '>{data?.teamStrength?.heading}</h2>
                <div className=' py-4'>
                    {' '}
                    <Image
                        src={data?.teamStrength?.img}
                        alt='walkoverteam image'
                        width={1500}
                        height={495}
                        className=' w-full h-auto'
                    />
                </div>
                <h2 class='text-xl font-normal'>{data?.teamStrength?.description || ' this is heading '}</h2>
            </div>
            <div className='container bg-neutral py-20 gap-6'>
                <h2 className='text-3xl font-bold mb-8'>{data?.clientSays?.heading}</h2>
                <div className='  grid lg:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-6'>
                    {data?.clientSays?.card?.length > 0 &&
                        data?.clientSays?.card.map((item, index) => {
                            return (
                                <div key={index} className='bg-white rounded-lg  flex flex-col'>
                                    <div className='flex-grow m-4'>
                                        <p className='text-lg'>{item?.description}</p>
                                    </div>

                                    <div className='flex p-4'>
                                        <div className='w-1/4'>
                                            <div class='skeleton h-16 w-16 color-gray-200'></div>
                                            {/* <Image src={item?.icon} alt={item?.name} width={100} height={100} /> */}
                                        </div>
                                        <div className='flex flex-col w-3/4'>
                                            <div className='text-lg font-bold'>{item?.name}</div>
                                            <div className='font-normal'>{item?.post}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
