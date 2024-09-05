import getRelativeURL from '@/utils/getRelativeURL';
import Link from 'next/link';
import { MdLaunch } from 'react-icons/md';

export default function ConnectWithTeam({ product }) {
    return (
        <div className='flex flex-col gap-3'>
            <p className='text-xl'>Connect with our team for a personalized plan to meet your needs.</p>
            <button className='btn btn-outline btn-md'>Talk to sales</button>
            <div>
                <Link
                    href={getRelativeURL('hello', 'product')}
                    className='flex items-center gap-2 text-link active-link '
                >
                    <MdLaunch /> Know more about <span className='capitalize'>{product}</span>
                </Link>
            </div>
        </div>
    );
}
