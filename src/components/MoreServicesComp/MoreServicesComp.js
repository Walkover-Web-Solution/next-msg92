import Image from 'next/image';
import Link from 'next/link';
import { LinkText } from '../UIComponent/Buttons/LinkButton';

export default function MoreServicesComp({ data }) {
    return (
        <>
            <div className='container flex flex-col gap-6 my-20'>
                <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                    {data?.services?.length > 0 &&
                        data?.services.map((service, index) => (
                            <a
                                key={index}
                                className='flex flex-col gap-6 bg-neutral rounded-lg md:p-8 p-4 hover:shadow-lg LinkButtonCard'
                                href={service?.link}
                            >
                                <div className='flex items-center gap-2'>
                                    <Image
                                        width={36}
                                        height={36}
                                        src={service?.icon}
                                        alt={service?.name}
                                        loading='lazy'
                                        sizes='(max-width: 768px) 28px, 36px'
                                    />
                                    <h3 className='text-2xl font-semibold'>{service?.name}</h3>
                                </div>
                                <Image
                                    width={600}
                                    height={600}
                                    src={service?.img}
                                    alt={service?.name}
                                    loading='lazy'
                                    sizes='(max-width: 768px) 280px, (max-width: 1024px) 320px, (max-width: 1280px) 400px, 600px'
                                />
                                <div className='flex flex-col gap-2 mb-auto'>
                                    <span className='text-xl font-semibold'>{service?.heading}</span>
                                    <p className='text-lg'>{service?.description}</p>
                                </div>
                                <LinkText className='link-btn'>{data?.linkText}</LinkText>
                            </a>
                        ))}
                </div>
            </div>
        </>
    );
}
