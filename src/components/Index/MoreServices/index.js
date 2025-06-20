import { LinkText } from '@/components/1UIComponents/Buttons';
import Image from 'next/image';
import Link from 'next/link';

export default function MoreServices({ data }) {
    return (
        <>
            <div className='container cont cont_gap cont_p'>
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
                                <div className='flex flex-col gap-2 mb-auto'>
                                    <h3 className='text-xl font-semibold'>{service?.heading}</h3>
                                    <p className='text-lg'>{service?.description}</p>
                                </div>
                                <LinkText className='link-btn'>{data?.linkText}</LinkText>
                            </Link>
                        ))}
                </div>
            </div>
        </>
    );
}
