import getURL from '@/utils/getURL';
import { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { MdLaunch } from 'react-icons/md';

export default function ConnectWithTeam({ product, isPlan, pageData, href, per }) {
    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
    return (
        <div className='w-full flex flex-col justify-start items-start gap-5'>
            <div>
                <a
                    href={getURL('product', href)}
                    className='inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline capitalize'
                >
                    <MdLaunch className='text-base' />
                    {`${pageData?.know_more} ${product}`}
                </a>
            </div>
            <div className='w-full rounded-2xl border border-gray-200 bg-white px-8 py-8 shadow-sm'>
                <div className='flex flex-col gap-6 sm:gap-8'>
                    {isPlan && (
                        <>
                            {per ? (
                                <div
                                    className='text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug'
                                    dangerouslySetInnerHTML={{ __html: pageData?.contentper }}
                                />
                            ) : (
                                <div
                                    className='max-w-3xl text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug'
                                    dangerouslySetInnerHTML={{ __html: pageData?.content }}
                                />
                            )}

                            {pageData?.sales_btn && (
                                <div>
                                    <button
                                        type='button'
                                        onClick={() => setIsSalesModalOpen(true)}
                                        className='inline-flex items-center justify-center rounded-md border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
                                    >
                                        {pageData?.sales_btn}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {isSalesModalOpen && (
                <dialog open className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
                    <div className='relative w-full max-w-3xl rounded-xl bg-white px-6 py-6 shadow-lg'>
                        <button
                            onClick={() => setIsSalesModalOpen(false)}
                            className='absolute right-3 top-3 rounded-full px-2 py-1 text-gray-500 hover:bg-gray-100'
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
