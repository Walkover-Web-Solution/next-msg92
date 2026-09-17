import Image from 'next/image';
import Link from 'next/link';
import { LinkText } from '../UIComponent/Buttons/LinkButton';

export default function MoreServicesComp({ data }) {
    return (
        <>
            <div className='container flex flex-col gap-6 my-20'>
                <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6'>
                    {data?.services?.length > 0 &&
                        data?.services.map((service, index) => (
                            <a
                                key={index}
                                className='flex flex-col gap-4 bg-neutral rounded-lg p-6 hover:shadow-lg LinkButtonCard'
                                href={service?.link}
                            >
                                <div className='flex items-center gap-2'>
                                    <Image
                                        width={32}
                                        height={32}
                                        src={service?.icon}
                                        alt={service?.name}
                                        loading='lazy'
                                        sizes='(max-width: 768px) 28px, 32px'
                                    />
                                    <h3 className='text-xl font-semibold'>{service?.name}</h3>
                                </div>
                                <div className='flex items-center justify-center h-[200px] w-full'>
                                    <Image
                                        width={400}
                                        height={200}
                                        className='h-full w-auto object-contain'
                                        src={service?.img}
                                        alt={service?.name}
                                        loading='lazy'
                                        sizes='(max-width: 768px) 280px, 400px'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 mb-auto'>
                                    <span className='text-lg font-semibold'>{service?.heading}</span>
                                    <p className='text-base'>{service?.description}</p>
                                </div>
                                <LinkText className='link-btn'>{data?.linkText}</LinkText>
                            </a>
                        ))}
                </div>
            </div>
        </>
    );
}
