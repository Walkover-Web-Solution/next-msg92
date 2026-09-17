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
                                <div className='flex items-center justify-center h-[270px] md:h-[300px] w-full'>
                                    <Image
                                        width={550}
                                        height={300}
                                        className='h-full max-h-[300px] w-auto object-contain mx-auto'
                                        src={service?.img}
                                        alt={service?.name}
                                        loading='lazy'
                                        sizes='(max-width: 768px) 340px, (max-width: 1024px) 460px, 550px'
                                    />
                                </div>
                                <div className='flex items-center gap-2 mt-2'>
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
                                <div className='flex flex-col gap-1.5 mb-auto'>
                                    <h4 className='text-lg font-semibold'>{service?.heading}</h4>
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
