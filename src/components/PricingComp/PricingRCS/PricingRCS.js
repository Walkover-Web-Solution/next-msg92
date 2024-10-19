import getURL from '@/utils/getURL';

export default function PricingRCS() {
    return (
        <>
            <div className='p-8 flex flex-col gap-4 bg-white h-fit rounded'>
                <h1 className='text-2xl'>Connect to our team for the custimized pricing</h1>
                <a href={getURL('signup', 'rcs')}>
                    <button className='btn btn-primary btn-md'>Get Started</button>
                </a>
            </div>
        </>
    );
}
