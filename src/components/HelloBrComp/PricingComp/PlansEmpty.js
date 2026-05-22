import React from 'react';

export default function PlansEmpty({ comparePlansLabel, pricingHref, fullPricingPath }) {
    return (
        <p className='text-center text-gray-600'>
            {comparePlansLabel || 'View plans on the pricing page.'}{' '}
            <a href={pricingHref} className='font-semibold text-indigo-600 hover:text-indigo-700'>
                {fullPricingPath ? 'Hello pricing' : 'Pricing'}
            </a>
        </p>
    );
}
