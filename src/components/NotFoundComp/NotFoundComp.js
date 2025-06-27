import Image from 'next/image';
import { MdArrowBack } from 'react-icons/md';

export default function NotFoundComp({ pageInfo }) {
    return (
        <div className='flex flex-col items-center container py-12 cont_gap'>
            <div className='flex flex-col items-center py-40 cont_gap'>
                <span className='text-8xl font-bold text-accent'>404</span>
                <h1 className='text-2xl'>The page you're trying to reach isn't available or doesn't exist.</h1>
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
