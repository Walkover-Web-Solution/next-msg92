import getURL from '@/utils/getURL';
import { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { MdLaunch } from 'react-icons/md';

export default function ConnectWithTeam({ product, isPlan, pageData, href, per }) {
    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
    return (
        <div className='flex flex-col gap-3'>
            {isPlan && (
                <>
                    {per ? (
                        <div className='text-xl' dangerouslySetInnerHTML={{ __html: pageData?.contentper }}></div>
                    ) : (
                        <div className='text-xl' dangerouslySetInnerHTML={{ __html: pageData?.content }}></div>
                    )}
                    {pageData?.sales_btn && (
                        <button onClick={() => setIsSalesModalOpen(true)} className='btn btn-outline btn-md'>
                            {pageData?.sales_btn}
                        </button>
                    )}
                </>
            )}
            <div>
                <a href={getURL('product', href)} className='flex items-center gap-1 text-link active-link capitalize'>
                    <MdLaunch />
                    {`${pageData?.know_more} ${product}`}
                </a>
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
