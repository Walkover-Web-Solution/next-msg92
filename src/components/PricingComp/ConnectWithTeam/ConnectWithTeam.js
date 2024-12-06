import getURL from '@/utils/getURL';
import Link from 'next/link';
import { InlineWidget } from 'react-calendly';
import { MdLaunch } from 'react-icons/md';

export default function ConnectWithTeam({ product, isPlan, data, href, per }) {
    return (
        <div className='flex flex-col gap-3'>
            {isPlan && (
                <>
                    {per ? (
                        <div className='text-xl' dangerouslySetInnerHTML={{ __html: data?.contentper }}></div>
                    ) : (
                        <div className='text-xl' dangerouslySetInnerHTML={{ __html: data?.content }}></div>
                    )}
                    <button
                        onClick={() => document.getElementById('sales_modal').showModal()}
                        className='btn btn-outline btn-md'
                    >
                        {data?.sales_btn}
                    </button>
                </>
            )}
            <div>
                <Link href={getURL('product', href)} className='flex items-center gap-1 text-link active-link '>
                    <MdLaunch />
                    {data?.know_more} {product}
                </Link>
            </div>
            {isPlan && (
                <dialog id='sales_modal' className='modal'>
                    <div className='modal-box'>
                        <form method='dialog'>
                            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                        </form>
                        <InlineWidget url='https://calendly.com/sales-msg91/pre-sales' styles={{ height: '680px' }} />
                    </div>
                </dialog>
            )}
        </div>
    );
}
