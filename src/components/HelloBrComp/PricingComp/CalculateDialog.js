import React, { forwardRef } from 'react';
import CalculatePricingModal from '@/components/PricingComp/PricingSubscription/CalculatePricingModal';

const CalculateDialog = forwardRef(function CalculateDialog({ pricingData, symbol, billing, locale, onClose }, ref) {
    return (
        <dialog ref={ref} className='modal'>
            <CalculatePricingModal
                plans={pricingData}
                symbol={symbol}
                tabtype={billing}
                locale={locale}
                onClose={onClose}
            />
        </dialog>
    );
});

export default CalculateDialog;
