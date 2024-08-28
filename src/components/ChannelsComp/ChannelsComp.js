import Image from 'next/image';
import Link from 'next/link';
import { LinkText } from '../UIComponent/Buttons/LinkButton';

export default function ChannelsComp({ data }) {
    return (
        <div className='container flex flex-col gap-6 my-20'>
            <h2 className='text-3xl font-bold'>{data.heading}</h2>
            <p className='text-2xl'>{data.subheading}</p>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                {data.channels.map((channel, index) => (
                    <Link
                        key={index}
                        className='flex flex-col gap-4 bg-neutral rounded-lg md:p-8 p-4 hover:shadow-lg LinkButtonCard'
                        href={channel.link}
                    >
                        <Image width={40} height={40} src={channel?.icon} alt={channel?.name} />
                        <h3 className='text-2xl font-semibold'>{channel?.name}</h3>
                        <p className='text-lg'>{channel?.description}</p>
                        <LinkText className='link-btn'>{channel.linkText}</LinkText>
                    </Link>
                ))}
            </div>
        </div>
    );
}
