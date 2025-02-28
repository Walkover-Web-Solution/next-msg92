import Image from 'next/image';
import Link from 'next/link';
import { MdCheckCircleOutline } from 'react-icons/md';
import { LinkText } from '../UIComponent/Buttons/LinkButton';

export default function IntegrationsComp({ pageInfo, data }) {
    return (
        <>
            {' '}
            <div className='container gap-6 py-20'>
                <h1 className='text-4xl font-bold mb-2 weight-700'>{data?.heading || ' this is heading '}</h1>
                <h2 className='text-xl font-normal mb-4 w-full lg:w-1/2 gap-6'>
                    {data?.subheading || ' this is heading '}
                </h2>

                <a
                    href={data?.doc_btn_link}
                    target='_blank'
                    className='btn btn-outline sm:btn-sm md:btn-md lg:btn-lg bg-black py-2 text-white'
                >
                    {data?.doc_btn}
                </a>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col gap-6 py-20'>
                    <h2 className='text-3xl font-bold '>{data?.plugins_by_msg91?.heading || 'Plugins by MSG91'}</h2>
                    {data?.plugins_by_msg91?.subheading && (
                        <p className='text-xl font-normal'>{data?.plugins_by_msg91?.subheading}</p>
                    )}

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
                        {data?.plugins_by_msg91?.plugins.map((card, index) => (
                            <div
                                key={index}
                                className='flex flex-col p-6 gap-4 bg-white rounded-lg shadow h-full w-full min-h-[380px]'
                            >
                                <div className='flex flex-col gap-4'>
                                    <img src={card.icon} alt={card.name} className=' h-8 w-fit' />
                                    <h3 className='text-lg font-bold mb-2'>{card.name}</h3>
                                </div>
                                <div className=''>
                                    <p className=''>{card.description}</p>
                                    {card?.extra && (
                                        <ul className='list-disc'>
                                            {card?.extra?.map((extra, index) => (
                                                <li className='text-sm' key={index}>
                                                    {extra}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className='flex items-center gap-5 mt-auto'>
                                    {card?.channels?.length > 0 &&
                                        card.channels.map((channel, index) => {
                                            return (
                                                <Link
                                                    target='_blank'
                                                    className='text-sm text-link active-link'
                                                    href={channel?.link}
                                                    key={index}
                                                >
                                                    {channel?.channel}
                                                </Link>
                                            );
                                        })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container flex flex-col gap-6 py-20'>
                <h2 className='text-3xl font-bold '>{'Connectors'}</h2>
                {data?.connectors?.subheading && <p className='text-xl font-normal'>{data?.connectors?.subheading}</p>}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                    {data?.connectors?.connectors.map((card, index) => (
                        <Link
                            target='_blank'
                            href={card?.link}
                            key={index}
                            className='flex flex-col p-6 gap-2 bg-white rounded-lg shadow hover:shadow-lg h-full w-full LinkButtonCard'
                        >
                            <div className='flex flex-col items-start justify-center gap-4'>
                                <Image
                                    width={360}
                                    height={260}
                                    src={card?.icon}
                                    alt={card?.name}
                                    className=' h-8 w-fit'
                                />
                                <h3 className='text-lg font-bold mb-2'>{card?.name}</h3>
                            </div>
                            <p className='mb-auto'>{card?.description}</p>
                            <LinkText className='link-btn' href={'/'}>
                                Learn More
                            </LinkText>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col gap-6 py-20'>
                    <h2 className='text-3xl font-bold '>{data?.third_party?.heading || 'Plugins by MSG91'}</h2>
                    {data?.third_party?.subheading && (
                        <p className='text-xl font-normal'>{data?.third_party?.subheading}</p>
                    )}

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
                        {data?.third_party?.plugins.map((card, index) => (
                            <Link
                                target='_blank'
                                href={card?.link}
                                key={index}
                                className='flex flex-col p-6 gap-2 bg-white rounded-lg shadow hover:shadow-lg h-full w-full LinkButtonCard'
                            >
                                <div className='flex flex-col gap-4'>
                                    <img src={card?.icon} alt={card?.name} className=' h-8 w-fit' />
                                    <h3 className='text-lg font-bold mb-2'>{card?.name}</h3>
                                </div>
                                <div className=''>
                                    <h4 className='font-bold'>{card?.title}</h4>
                                    <p className=''>{card?.description}</p>
                                </div>
                                <LinkText customClasses='link-btn mt-auto' href={'/'}>
                                    Learn More
                                </LinkText>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container flex flex-col py-20 gap-6'>
                <div className='flex flex-row '>
                    <h2 className='text-3xl font-bold'>{data?.section?.heading}</h2>
                </div>
                <div className='flex md:flex-row flex-col gap-6 bg-neutral justify-between p-6'>
                    <div className='flex flex-col bg-neutral'>
                        <div className='text-xl font-bold'>{data?.section?.tag}</div>
                        <div className='text-lg font-normal'>{data?.section?.subtag}</div>
                    </div>
                    <div>
                        <a href={data?.section?.url} target='_blank' className='btn bg-black py-2 text-white w-full'>
                            {data?.section?.partner_btn}
                        </a>
                    </div>
                </div>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col py-20 gap-6'>
                    <h2 className='text-3xl font-bold'>{data?.plugin?.subheading}</h2>
                    <div className='flex flex-col gap-4'>
                        {data?.plugin?.build?.map((item, index) => (
                            <div key={index} className='flex items-center gap-2'>
                                <MdCheckCircleOutline className='text-green-500 text-xl' />
                                <p>{item?.line}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container flex flex-col gap-6 py-20'>
                <div className='flex flex-row justify-start'>
                    <h2 className='text-3xl font-bold'>{data?.partner?.heading}</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                    {data?.partner?.card.map((item, index) => (
                        <div key={index} className='bg-neutral flex flex-col gap-6 p-4'>
                            <p>{item?.content}</p>
                            <h3>{item?.name}</h3>
                            <img src={item?.icon} alt={item?.name} className='w-fit h-10' />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
