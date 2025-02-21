import { useEffect, useState } from 'react';

export default function CalculatePricingWhatsApp({ plans, currentCountry, symbol, currency }) {
    const [marketingMessages, setMarketingMessages] = useState('');
    const [utilityMessages, setUtilityMessages] = useState('');
    const [authenticationMessages, setAuthenticationMessages] = useState('');
    const [serviceMessages, setServiceMessages] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(currentCountry);

    useEffect(() => {
        if (plans?.length > 0) {
            const country = plans.find((plan) => plan?.country_name === currentCountry?.name);
            setSelectedCountry(country);
        }
    }, [plans]);

    const handleSelectCountry = (value) => {
        const country = plans.find((plan) => plan?.country_name === value);
        setSelectedCountry(country);
    };

    const contvertToLocal = (number) => {
        if (currency === 'INR') {
            {
                return Number(number).toLocaleString('en-IN');
            }
        } else {
            {
                return Number(number).toLocaleString('en-US');
            }
        }
    };

    const handleClose = () => {
        setMarketingMessages('');
        setUtilityMessages('');
        setAuthenticationMessages('');
        handleSelectCountry(currentCountry?.name);
        document.getElementById('calculate_whatsapp_pricing').close();
    };
    return (
        <>
            <div className='modal-box flex flex-col gap-6 max-w-[900px]'>
                <button
                    className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                    onClick={() => {
                        handleClose();
                    }}
                >
                    ✕
                </button>
                <h3 className='font-bold text-lg'>Calculate WhatsApp Pricing</h3>
                <label className='form-control w-full max-w-xs flex flex-col gap-1'>
                    <span className='label-text'>Market</span>
                    <select
                        className='select select-bordered w-full max-w-xs'
                        onChange={(e) => {
                            handleSelectCountry(e.target.value);
                        }}
                        value={selectedCountry?.country_name}
                    >
                        {plans?.length > 0 &&
                            plans?.map((plan, index) => {
                                return <option value={plan?.country_name}>{plan?.country_name}</option>;
                            })}
                    </select>
                </label>
                <p>Here you can calculate your expense based on your usage.</p>
                <div className='hidden md:grid grid-cols-2'>
                    <p className='font-bold text-start'>Number on Messages</p>
                    <p className='font-bold text-start'>Charges</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-gray-500'>Marketing</p>
                    <div className='bg-gray p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                        {' '}
                        <input
                            type='number'
                            placeholder='Marketing Message'
                            className='input input-bordered w-full input-ms max-w-[240px]'
                            value={marketingMessages}
                            onChange={(e) => setMarketingMessages(e.target.value)}
                            min={0}
                            max={9999999999999}
                        />
                        <div className='flex flex-col sm:flex-row gap-3 items-start  w-full justify-start '>
                            <p className='text-start'>
                                {marketingMessages &&
                                    `${marketingMessages} x ${contvertToLocal(
                                        selectedCountry?.marketing_rate
                                    )} = `}{' '}
                            </p>
                            <p className='font-bold text-start'>
                                {symbol}
                                {marketingMessages
                                    ? contvertToLocal(marketingMessages * selectedCountry?.marketing_rate)
                                    : 0}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-gray-500'>Utility</p>
                    <div className='bg-gray p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                        {' '}
                        <input
                            type='number'
                            placeholder='Utility Message'
                            className='input input-bordered w-full input-ms max-w-[240px]'
                            value={utilityMessages}
                            onChange={(e) => setUtilityMessages(e.target.value)}
                            min={0}
                            max={9999999999999}
                        />
                        <div className='flex flex-col sm:flex-row gap-3 items-start  w-full justify-start '>
                            <p className='text-center'>
                                {utilityMessages &&
                                    `${utilityMessages} x ${contvertToLocal(selectedCountry?.utility_rate)} = `}{' '}
                            </p>
                            <p className='font-bold text-center'>
                                {symbol}
                                {utilityMessages ? contvertToLocal(utilityMessages * selectedCountry?.utility_rate) : 0}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-gray-500'>Authentication</p>
                    <div className='bg-gray p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                        {' '}
                        <input
                            type='number'
                            placeholder='Authentication Message'
                            className='input input-bordered w-full input-ms max-w-[240px]'
                            value={authenticationMessages}
                            onChange={(e) => setAuthenticationMessages(e.target.value)}
                            min={0}
                            max={9999999999999}
                        />
                        <div className='flex flex-col sm:flex-row gap-3 items-start  w-full justify-start '>
                            <p className='text-center'>
                                {authenticationMessages &&
                                    `${authenticationMessages} x ${contvertToLocal(
                                        selectedCountry?.authentication_rate
                                    )} = `}{' '}
                            </p>
                            <p className='font-bold text-center'>
                                {symbol}
                                {authenticationMessages
                                    ? contvertToLocal(authenticationMessages * selectedCountry?.authentication_rate)
                                    : 0}
                            </p>
                        </div>
                    </div>
                </div>
                {/* <div className='flex flex-col gap-1'>
                    <p className='text-gray-500'>Service</p>
                    <div className='bg-gray p-4 rounded grid grid-cols-3 gap-4 items-center'>
                        {' '}
                        <input
                            type='number'
                            placeholder='Service Message'
                            className='input input-bordered w-full input-ms'
                            value={serviceMessages}
                            onChange={(e) => setServiceMessages(e.target.value)}
                            min={0}
                            max={9999999999999}
                        />
                        <p className='text-center'>
                            {serviceMessages &&
                                `${serviceMessages} x ${contvertToLocal(selectedCountry?.authentication_rate)}`}
                        </p>
                        <p className='font-bold text-center'>
                            {symbol}
                            {contvertToLocal(serviceMessages * selectedCountry?.authentication_rate)}
                        </p>
                    </div>
                </div> */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                    <p className='font-bold text-lg'>Total monthly recurring charges</p>
                    <p className=' p-4 font-bold text-green-600 text-2xl flex flex-col break-words'>
                        {symbol}
                        {contvertToLocal(
                            Number(marketingMessages * selectedCountry?.marketing_rate) +
                                Number(utilityMessages * selectedCountry?.utility_rate) +
                                Number(authenticationMessages * selectedCountry?.authentication_rate)
                        ) || 0}
                        {currency === 'INR' && <span className='font-normal text-sm text-gray-500'>+18% GST</span>}
                        {currency === 'GBP' && <span className='font-normal text-sm text-gray-500'>+VAT</span>}
                    </p>
                </div>
            </div>
        </>
    );
}
