import getURL from '@/utils/getURL';
import { useState } from 'react';
import { MdLaunch } from 'react-icons/md';
import BookingModal from '@/components/ContactUs/BookingModal';

export default function ConnectWithTeam({ product, isPlan, pageData, href, per }) {
    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);

    const handleOpenModal = () => setIsSalesModalOpen(true);
    const handleCloseModal = () => setIsSalesModalOpen(false);

    const contentClassName = per
        ? 'text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug'
        : 'max-w-3xl text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug';

    const contentPerHTML = pageData?.contentper;
    const contentHTML = per ? contentPerHTML : pageData?.content;
    const knowMoreText = pageData?.know_more;
    const salesButtonText = pageData?.sales_btn;

    return (
        <div className='w-full flex flex-col justify-start items-start gap-5'>
            <div className='w-full rounded border border-gray-200 bg-white px-8 py-8'>
                <div className='flex flex-col gap-6 sm:gap-8'>
                    {isPlan && (
                        <>
                            <div className={contentClassName} dangerouslySetInnerHTML={{ __html: contentHTML }} />

                            {salesButtonText && (
                                <div>
                                    <button
                                        type='button'
                                        onClick={handleOpenModal}
                                        className='inline-flex items-center justify-center rounded-md border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
                                    >
                                        {salesButtonText}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div>
                <a
                    href={getURL('product', href)}
                    className='inline-flex items-center gap-2 text-sm font-medium text-link active-link capitalize'
                >
                    <MdLaunch className='text-base' />
                    {`${knowMoreText} ${product}`}
                </a>
            </div>
            <BookingModal isOpen={isSalesModalOpen} onClose={handleCloseModal} />
        </div>
    );
}
