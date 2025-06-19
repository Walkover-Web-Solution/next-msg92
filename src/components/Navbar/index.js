import Image from 'next/image';
import NotificationBar from '../Notificationbar';

export default function Navbar({ data, pageInfo }) {
    return (
        <>
            <NotificationBar data={data} pageInfo={pageInfo} />
            <div className='container py-6 flex'>
                <ul className='flex gap-8 w-full items-center justify-start'>
                    <li className='text-md font-medium text-link flex items-center '>
                        <Image
                            width={120}
                            height={120}
                            src={'/assets/icons/products/hello.svg'}
                            className='h-8 w-fit mr-1'
                            alt='Hello Logo'
                        />
                        Hello
                    </li>
                    <li className='text-md font-medium text-link'>Integrations</li>
                    <li className='text-md font-medium text-link'>Pricing</li>
                </ul>
                <Image
                    width={360}
                    height={120}
                    src={'/assets/brand/msg91.svg'}
                    className='h-10 w-fit'
                    alt='MSG91 Logo'
                />
                <ul className='flex gap-8 w-full items-center justify-end'>
                    <li className='text-md font-medium text-link'>API Docs</li>
                    <li className='btn btn-primary btn-sm font-semibold uppercase'>Sign Up</li>
                </ul>
            </div>
        </>
    );
}
