import Link from 'next/link';

export default function NotFoundComp({ pageInfo }) {
    return (
        <div className='flex flex-col items-center container py-40 cont_gap'>
            <span className='text-8xl'>404</span>
            <h1 className='text-4xl font-semibold'>
                The page you're trying to reach isn't available or doesn't exist.
            </h1>
            <div className='flex items-center gap-4'>
                <a className='btn btn-secondary' href={pageInfo?.country === 'global' ? '/' : pageInfo?.country}>
                    Go To Home
                </a>
                <a className='btn btn-secondary' href={'/contact-us'}>
                    Contact Support
                </a>
            </div>
        </div>
    );
}
