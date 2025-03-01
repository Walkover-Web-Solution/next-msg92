import { useEffect, useState } from 'react';

export default function CalculateVoicePricing({ plans, currency, symbol }) {
    const [selectedNetwork, setSelectedNetwork] = useState();
    const [minutes, setMinutes] = useState(1000);

    useEffect(() => {
        if (plans.length > 0) {
            setSelectedNetwork(plans[0]);
        }
    }, [plans]);
    const handleSelectNetwork = (networkvalue) => {
        const network = plans.find((plan) => plan?.network === networkvalue);
        setSelectedNetwork(network);
    };

    const handleClose = () => {
        document.getElementById('calculate_voice_pricing').close();
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
    return (
        <>
            <div className='modal-box flex flex-col gap-6 w-[900px]'>
                <button
                    className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                    onClick={() => {
                        handleClose();
                    }}
                >
                    ✕
                </button>
                <h3 className='font-bold text-lg'>Calculate Voice Pricing</h3>
                <div className='flex gap-6'>
                    <label className='form-control w-full max-w-xs flex flex-col gap-1'>
                        <span className='label-text'>Recipient’s Network</span>
                        <select
                            className='select select-bordered w-full max-w-xs select-md'
                            onChange={(e) => {
                                handleSelectNetwork(e.target.value);
                            }}
                            value={selectedNetwork?.netwok}
                        >
                            {plans?.length > 0 &&
                                plans?.map((plan, index) => {
                                    return <option value={plan?.network}>{plan?.network}</option>;
                                })}
                        </select>
                    </label>
                    <label className='form-control w-full max-w-xs flex flex-col gap-1'>
                        <span className='label-text'>Minutes</span>
                        <input
                            value={minutes}
                            type='number'
                            placeholder='Total No. of Minutes'
                            className='input input-bordered w-full max-w-xs select-md'
                            onChange={(e) => setMinutes(e.target.value)}
                        />
                    </label>
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='text-gray-500'>Charges</p>
                    <div className='bg-gray  rounded'>
                        {selectedNetwork?.local_rates_min && (
                            <div className='p-4 grid grid-cols-3 md:grid-cols-3 gap-4 items-center'>
                                <p>Local Charges</p>
                                <p>{`${contvertToLocal(minutes)} x ${selectedNetwork?.local_rates_min}`}</p>
                                <p>
                                    <span className='text-lg font-bold text-green-600'>
                                        {symbol}
                                        {contvertToLocal(minutes * selectedNetwork?.local_rates_min)}
                                    </span>
                                    {currency === 'INR' && (
                                        <span className='font-normal text-sm text-gray-500'> +18% GST</span>
                                    )}
                                    {currency === 'GBP' && (
                                        <span className='font-normal text-sm text-gray-500'> +VAT</span>
                                    )}
                                </p>
                            </div>
                        )}
                        {selectedNetwork?.international_rates_min && (
                            <div className=' p-4 grid grid-cols-3 md:grid-cols-3 gap-4 items-center'>
                                <p>International Charges</p>
                                <p>{`${contvertToLocal(minutes)} x ${selectedNetwork?.international_rates_min}`}</p>
                                <p>
                                    <span className='text-lg font-bold text-green-600'>
                                        {symbol}
                                        {contvertToLocal(minutes * selectedNetwork?.international_rates_min)}
                                    </span>{' '}
                                    {currency === 'INR' && (
                                        <span className='font-normal text-sm text-gray-500'>+18% GST</span>
                                    )}
                                    {currency === 'GBP' && (
                                        <span className='font-normal text-sm text-gray-500'>+VAT</span>
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
