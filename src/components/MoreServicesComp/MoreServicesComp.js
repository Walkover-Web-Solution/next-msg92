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
                            <Link
                                key={index}
                                className='flex flex-col gap-6 bg-neutral rounded-lg md:p-8 p-4 hover:shadow-lg LinkButtonCard'
                                href={service?.link}
                            >
                                <div className='flex items-center gap-2'>
                                    <Image width={36} height={36} src={service?.icon} alt={service?.name} />
                                    <span className='text-2xl font-semibold'>{service?.name}</span>
                                </div>
                                <Image width={600} height={600} src={service?.img} alt={service?.name} />
                                <h2 className='text-xl font-semibold'>{service?.heading}</h2>
                                <p className='text-lg'>{service?.description}</p>
                                <LinkText className='link-btn'>{data?.linkText}</LinkText>
                            </Link>
                        ))}
                </div>
            </div>
        </>
    );
}
