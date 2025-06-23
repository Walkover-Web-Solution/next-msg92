import getURL from '@/utils/getURL';
import Link from 'next/link';
import { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { MdLaunch } from 'react-icons/md';

export default function ConnectWithTeam({ product, isPlan, data, href, per }) {
    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
    return (
        <div className='flex flex-col gap-3'>
            {isPlan && (
                <>
                    {per ? (
                        <div className='text-xl' dangerouslySetInnerHTML={{ __html: data?.contentper }}></div>
                    ) : (
                        <div className='text-xl' dangerouslySetInnerHTML={{ __html: data?.content }}></div>
                    )}
                    {data?.sales_btn && (
                        <button onClick={() => setIsSalesModalOpen(true)} className='btn btn-outline btn-md'>
                            {data?.sales_btn}
                        </button>
                    )}
                </>
            )}
            <div>
                <Link href={getURL('product', href)} className='flex items-center gap-1 text-link active-link '>
                    <MdLaunch />
                    {data?.know_more} {product}
                </Link>
            </div>
            {isSalesModalOpen && (
                <dialog id='sales_modal' className='modal' open>
                    <div className='modal-box'>
                        <button
                            onClick={() => setIsSalesModalOpen(false)}
                            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        >
                            ✕
                        </button>
                        <InlineWidget url='https://calendly.com/d/y3n-29s-29h' styles={{ height: '680px' }} />
                    </div>
                </dialog>
            )}
        </div>
    );
}
