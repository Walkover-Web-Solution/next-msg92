import Image from 'next/image';
import { MdAllInclusive, MdAutoFixHigh, MdMoving, MdPermIdentity } from 'react-icons/md';
export default function AboutUs({data }) {
    return (
        <>
            <div className='container flex flex-col cont_gap cont_p '>
                <h1 className='text-5xl font-bold '>{data?.heading}</h1>
                <h2 className='text-xl md:w-1/2 gap-6'>{data?.subheading}</h2>
                {/* <Image
                    src={data?.banner_img}
                    alt='walkoverteam'
                    width={1500}
                    height={495}
                    className=' w-full h-auto rounded-md'
                /> */}
            </div>
            <div className='bg-gray'>
                <div className='container flex flex-col cont_gap cont_p'>
                    <h2 className='text-3xl font-bold'>{data?.offer?.heading}</h2>
                    <div className='grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 md:gap-10 gap-4'>
                        {data?.offer?.content?.length > 0 &&
                            data?.offer?.content.map((item, index) => {
                                return (
                                    <div key={index} className='bg-white p-4 rounded-lg flex gap-3 items-center'>
                                        <div className='text-3xl text-[#1E75BA]'>
                                            {item?.icon === 'MdAutoFixHigh' && <MdAutoFixHigh />}
                                            {item?.icon === 'MdMoving' && <MdMoving />}
                                            {item?.icon === 'MdPermIdentity' && <MdPermIdentity />}
                                            {item?.icon === 'MdAllInclusive' && <MdAllInclusive />}
                                        </div>
                                        <p className='text-lg'>{item?.description}</p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>

            <div className='container flex flex-col cont_gap cont_p'>
                <h2 className='text-3xl font-bold'>{data?.team?.heading}</h2>
                <p className='text-lg'>{data?.team?.description}</p>
                <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                    {data?.team?.content?.length > 0 &&
                        data?.team?.content.map((item, index) => {
                            return (
                                <div key={index} className='flex flex-col gap-6 rounded p-6 bg-neutral '>
                                    {/* <Image
                                        className='rounded'
                                        src={item?.icon}
                                        alt={item?.name}
                                        width={400}
                                        height={400}
                                    /> */}
                                    <div>
                                        <h3 className='text-2xl font-bold'>{item?.name}</h3>
                                        <p className='text-lg'>{item?.post}</p>
                                    </div>

                                    <p className='text-lg'>{item?.description}</p>
                                </div>
                            );
                        })}
                </div>
            </div>

            <div className='bg-neutral'>
                <div className=' flex flex-col items-center cont_gap cont_p text-center text-lg'>
                    <p className='md:w-2/4'>
                        {data?.hiring?.content}{' '}
                        <a href={data?.hiring?.link} className='text-link active-link'>
                            {data?.hiring?.linkText}
                        </a>
                    </p>
                </div>
            </div>

            <div className='container flex flex-col cont_gap cont_p'>
                <h2 className='text-3xl font-bold'>{data?.teamStrength?.heading}</h2>
                {/* <Image
                    src={data?.teamStrength?.img}
                    alt='walkoverteam image'
                    width={1500}
                    height={495}
                    className=' w-full h-auto'
                /> */}
                <p className='text-xl font-normal'>{data?.teamStrength?.description}</p>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col cont_gap cont_p'>
                    <h2 className='text-3xl font-bold'>{data?.clientSays?.heading}</h2>
                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-10 gap-4 '>
                        {data?.clientSays?.card?.length > 0 &&
                            data?.clientSays?.card.map((item, index) => {
                                return (
                                    <div key={index} className='bg-white rounded  flex flex-col md:p-6 p-4 gap-6'>
                                        <p className='text-lg'>{item?.description}</p>
                                        <div className='flex gap-4 mt-auto'>
                                            <div className='skeleton h-[40px] w-[40px] color-gray-200'></div>
                                            <div className='flex flex-col'>
                                                <h3 className='text-lg font-bold'>{item?.name}</h3>
                                                <p className='font-normal'>{item?.post}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}
