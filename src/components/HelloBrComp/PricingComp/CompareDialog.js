import React, { forwardRef } from 'react';
import { MdClose } from 'react-icons/md';
import ComparePlans from '@/components/PricingComp/ComparePlans';

const CompareDialog = forwardRef(function CompareDialog({ pricingData, symbol, locale, comparePageData }, ref) {
    return (
        <dialog ref={ref} className='modal'>
            <div className='modal-box relative max-h-[90vh] max-w-[1100px] overflow-y-auto p-4 sm:p-6'>
                <button
                    type='button'
                    onClick={() => ref?.current?.close()}
                    className='btn btn-md btn-circle btn-ghost absolute right-2 top-2 z-10'
                    aria-label='Close'
                >
                    <MdClose aria-hidden />
                </button>
                <ComparePlans pricingData={pricingData} symbol={symbol} locale={locale} pageData={comparePageData} />
            </div>
        </dialog>
    );
});

export default CompareDialog;
