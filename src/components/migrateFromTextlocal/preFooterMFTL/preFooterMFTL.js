import Link from 'next/link';
import { MdCall, MdEmail } from 'react-icons/md';

export default function PreFooterMFTL() {
    return (
        <div className='container items-center cont cont_gap cont_p'>
            <h2 className='text-3xl font-bold'>Still have questions? We're here to help.</h2>
            <p className='text-2xl font-semibold'>Contact our support team anytime:</p>
            <div className='cont gap-2 w-fit'>
                <div className='flex items-center  gap-2'>
                    <MdCall className='text-2xl' />{' '}
                    <span className='text-lg'>
                        {' '}
                        <Link href={'tel:+918818888733'} className='text-lg text-link'>
                            +91-8818888733
                        </Link>
                    </span>
                </div>
                <div className='flex items-center  gap-2'>
                    <MdEmail className='text-2xl' />
                    <Link href={'mailTo:support@msg91.com'} className='text-lg text-link'>
                        support@msg91.com
                    </Link>
                </div>
            </div>
        </div>
    );
}
