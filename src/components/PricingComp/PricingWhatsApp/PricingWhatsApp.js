import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PricingWhatsApp() {
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState();
    const [tabtype, setTabtype] = useState('Monthly');
    const [currency, setCurrency] = useState('INR');
    const [symbol, setSymbol] = useState('₹');

    useEffect(() => {
        const getWhatsAppPricing = async () => {
            setLoading(true);

            try {
                const response = await axios.get(`https://whatsapp.phone91.com/get-pricing-data/${currency}`);
                setPlans(response?.data?.data.sort((a, b) => a.country_name.localeCompare(b.country_name)));
                setLoading(false);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
                setLoading(false);
            }
        };
        getWhatsAppPricing();
    }, []);
    return (
        <>
            <div className='flex flex-col w-full gap-8'>
                <div className='flex justify-between w-full p-8 rounded h-fit bg-white'>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-3xl font-semibold'>
                            <span className='text-green-600  font-bold text-4xl'>Zero</span> margin on meta price.
                        </h2>
                        <p className='text-lg'>TDS and GST excluded.</p>
                        <a href='https://web.msg91.com/signup?service=whatsapp'>
                            <button className='btn btn-primary btn-md'>Get Started</button>
                        </a>
                    </div>
                    <Image
                        src={'/assets/icons/extras/whatsapp-black.svg'}
                        className='w-[140px] h-fit'
                        width={400}
                        height={400}
                        alt='whatsapp logo'
                    />
                </div>
                <div className='flex flex-col gap-8'>
                    <p>
                        Since we do not impose any service charge, <strong>GST</strong> will be applied to WhatsApp
                        pricing
                    </p>
                    <table className='table bg-white rounded'>
                        <thead>
                            <tr className='font-bold text-[16px] text-black '>
                                <th className='w-[300px] border-r'>Market</th>
                                <th className='border-r'>Prefix</th>
                                <th className='border-r'>Marketing</th>
                                <th className='border-r'>Utility</th>
                                <th className='border-r'>Authentication</th>
                                <th className=''>Service</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans &&
                                plans.map((item, index) => {
                                    return (
                                        <tr className='border-none text-[16px]' key={index}>
                                            <td className='border-r'>{item?.country_name}</td>
                                            <td className='border-r'>{item?.prefix}</td>
                                            <td className='border-r'>
                                                {symbol}
                                                {!isNaN(parseFloat(item?.marketing_rate))
                                                    ? parseFloat(item.marketing_rate).toFixed(5)
                                                    : 'N/A'}
                                            </td>
                                            <td className='border-r'>
                                                {symbol}
                                                {!isNaN(parseFloat(item?.utility_rate))
                                                    ? parseFloat(item.utility_rate).toFixed(5)
                                                    : 'N/A'}
                                            </td>
                                            <td className='border-r'>
                                                {symbol}
                                                {!isNaN(parseFloat(item?.authentication_rate))
                                                    ? parseFloat(item.authentication_rate).toFixed(5)
                                                    : 'N/A'}
                                            </td>
                                            <td className=''>
                                                {symbol}
                                                {!isNaN(parseFloat(item?.user_initiated_rate))
                                                    ? parseFloat(item?.user_initiated_rate).toFixed(5)
                                                    : 'N/A'}
                                            </td>
                                        </tr>
                                    );
                                })}

                            {loading &&
                                Array.from({ length: 20 }).map((_, index) => {
                                    return (
                                        <tr className='border-none text-[16px]' key={index}>
                                            <td className='border-r'>
                                                {' '}
                                                <div className='skeleton w-2/3 h-[24px]'></div>
                                            </td>
                                            <td className='border-r'>
                                                {' '}
                                                <div className='skeleton w-2/3 h-[24px]'></div>
                                            </td>
                                            <td className='border-r'>
                                                <div className='skeleton w-2/3 h-[24px]'></div>
                                            </td>
                                            <td className='border-r'>
                                                <div className='skeleton w-2/3 h-[24px]'></div>
                                            </td>
                                            <td className='border-r'>
                                                <div className='skeleton w-2/3 h-[24px]'></div>
                                            </td>
                                            <td className=''>
                                                <div className='skeleton w-2/3 h-[24px]'></div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
