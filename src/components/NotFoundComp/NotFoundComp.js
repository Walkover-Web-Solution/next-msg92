import Image from 'next/image';
import { MdArrowBack } from 'react-icons/md';

export default function NotFoundComp({ pageInfo }) {
    return (
        <div className='flex flex-col items-center container py-12 cont_gap'>
            <Image
                src={'/assets/brand/msg91.svg'}
                width={120}
                height={80}
                className='w-fit h-12 mb-8'
                alt='MSG91 LOGO'
            />
            <div className='flex flex-col items-center py-40 cont_gap'>
                <span className='text-8xl font-bold'>404</span>
                <h1 className='text-4xl font-semibold'>
                    The page you're trying to reach isn't available or doesn't exist.
                </h1>
                <div className='flex items-center gap-4'>
                    <button className='btn btn-primary' onClick={() => window.history.back()} type='button'>
                        <MdArrowBack /> Go Back
                    </button>
                    <a className='btn btn-secondary' href={'/'}>
                        Go to Homepage
                    </a>
                    <a className='btn  btn-ghost' href={'/contact-us'}>
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
