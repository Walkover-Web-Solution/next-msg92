import Image from 'next/image';
import { MdCheck } from 'react-icons/md';

export default function SignupComp({ data }) {
    return (
        <>
            <div className='bg-secondary p-10 flex-col gap-12 xl:w-1/4 lg:w-1/3 md:w-1/2 w-full min-h-dvh'>
                <Image src={'/assets/brand/msg91.svg'} width={420} height={420} className='w-28' alt='msg91-logo' />
                <h1 className='text-2xl'>{data.heading}</h1>
                <div className='flex-col gap-5'>
                    <h2 className='text-xl'>{data.subheading}</h2>
                    <ul className='flex-col gap-3'>
                        {data?.features.map((feature, index) => {
                            return (
                                <li key={index} className='flex items-center gap-2'>
                                    <MdCheck fontSize={20} className='text-accent' /> {feature}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <p className='text-lg'>{data?.trusted}</p>
            </div>
        </>
    );
}
