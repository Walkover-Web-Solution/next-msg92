import Image from 'next/image';
import { MdAllInclusive, MdAutoAwesome, MdGroup, MdOutlineGroup, MdTrendingUp } from 'react-icons/md';
export default function AboutUsComp({ pageInfo, data }) {
    console.log(data);
    return (
        <>
            <section className='container cont_p flex flex-col gap-6 items-center  text-center'>
                <div className='flex flex-col items-center cont_w'>
                    <h1 className='heading'> {data?.heading}</h1>
                    <p className='text-lg'>{data?.subheading}</p>
                </div>
                <div className='flex justify-center items-center'>
                    <Image width={1200} height={675} src={data?.banner_img} className='img-fluid text-center' />
                </div>
            </section>
            {data?.company_values && (
                <section className='bg-secondary cont_p company-values flex flex-col gap-6 items-center'>
                    <div className='flex flex-col justify-center items-center cont_w  text-center'>
                        <h2 className='text-3xl font-bold'> {data?.company_values.heading}</h2>
                        <p className='text-lg'>{data?.company_values.subheading}</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto justify-items-center'>
                        {data?.company_values?.cards?.map((item, index) => (
                            <div
                                key={index}
                                className='p-6 text-center gap-6 border h-[260px] w-full bg-base-100 flex flex-col justify-center items-center'
                            >
                                <div key={index} className='bg-white p-4 rounded-lg flex gap-3 items-center'>
                                    <div className='text-accent'>
                                        {item?.icon === 'MdAutoAwesome' && <MdAutoAwesome size={48} />}
                                        {item?.icon === 'MdTrendingUp' && <MdTrendingUp size={48} />}
                                        {item?.icon === 'MdOutlineGroup' && <MdOutlineGroup size={48} />}
                                        {item?.icon === 'MdAllInclusive' && <MdAllInclusive size={48} />}
                                    </div>
                                </div>
                                <div>
                                    <h3 className='font-semibold text-lg'>{item?.heading}</h3>
                                    <p>{item?.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data?.team && (
                <section className='container cont_p items-center flex flex-col gap-6 items-center'>
                    <div className='flex flex-col justify-center items-center  text-center'>
                        <h2 className='text-3xl font-bold'> {data.team.heading}</h2>
                        <p className='text-lg '>{data.team.description}</p>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6'>
                            {data.team.content?.map((item, index) => (
                                <div key={index} className='border rounded-md p-6 shadow-sm p-6'>
                                    <Image
                                        width={100}
                                        height={74}
                                        src={item.icon}
                                        alt={item.name}
                                        className='w-full h-64 object-cover rounded-lg mb-4 filter grayscale'
                                    />

                                    <h2 className='text-lg font-semibold'>{item.name}</h2>

                                    <p className='text-sm text-gray-500 mb-2'>{item.post}</p>

                                    <p className='text-sm text-gray-600'>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {data?.hiring && (
                <section className='cont_p text-xl text-center text-base-100 bg-accent flex flex-col justify-center items-center'>
                    <p className=' text-center cont_w'>{data?.hiring?.content}</p>
                    <p className='text-base-100 '>
                        {data?.hiring?.footer}{' '}
                        <a href={data?.hiring?.link} className='underline active-link'>
                            {data?.hiring?.linkText}
                        </a>
                    </p>
                </section>
            )}

            {data?.teamStrength && (
                <section className='container cont_p flex flex-col items-center gap-6'>
                    <div className='flex flex-col justify-center items-center cont_w  text-center'>
                        <h2 className='text-3xl font-bold'> {data?.teamStrength?.heading}</h2>
                        <p className='text-lg'>{data?.teamStrength?.subheading}</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Image
                            width={1200}
                            height={675}
                            src={data?.teamStrength.img}
                            className='img-fluid text-center'
                        />
                    </div>
                </section>
            )}

            {data?.clientSays && (
                <section className='bg-secondary cont_p flex flex-col cont_gap items-center'>
                    <div className='flex flex-col justify-center items-center cont_w text-center'>
                        <h2 className='text-3xl font-bold'> {data?.clientSays.heading}</h2>
                        <p className='text-lg'>{data?.clientSays.subheading}</p>
                    </div>

                    <div className='flex flex-row flex-wrap gap-6 justify-center items-center'>
                        {data.clientSays.cards?.map((item, index) => (
                            <div
                                key={index}
                                className='flex justify-center px-6 pb-4 border rounded-xl gap-4 h-[260px] bg-base-100 w-full sm:w-[373px] flex flex-col gap-6'
                            >
                                <div className='items-center'>
                                    <p className=''>{item.description}</p>
                                </div>

                                <div className='flex flex-row justify-end gap-4'>
                                    <img src={item.icon} alt={item.post} className='w-10 h-10 object-contain' />
                                    <div className=''>
                                        <h3 className='font-semibold'>{item.name}</h3>
                                        <p className='font-xs'>{item.post}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
