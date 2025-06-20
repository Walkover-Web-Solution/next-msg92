import { LinkText } from '@/components/1UIComponents/Buttons';
import Image from 'next/image';
import Link from 'next/link';

export default function Channels({ data }) {
    return (
        <div className='container cont cont_gap cont_p'>
            <div className='cont gap-1 '>
                <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                <p className='text-xl max-w-2/3'>{data?.subheading}</p>
            </div>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                {data?.channels?.length > 0 &&
                    data?.channels.map((channel, index) => {
                        return (
                            <Link
                                key={index}
                                className='flex flex-col gap-4 bg-neutral rounded-lg md:p-8 p-4 hover:shadow-lg LinkButtonCard'
                                href={channel?.link}
                            >
                                <Image width={40} height={40} src={channel?.icon} alt={channel?.name} />
                                <h3 className='text-2xl font-semibold'>{channel?.name}</h3>
                                <p className='text-lg'>{channel?.description}</p>
                                <LinkText className='link-btn'>{data?.linkText}</LinkText>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}
