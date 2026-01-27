import React, { useState } from 'react';

const RATE_DATA = [
    { country: 'Singapore', code: '+65', currency: 'INR', rate: '₹1.20' },
    { country: 'France', code: '+33', currency: 'INR', rate: '₹1.90' },
    { country: 'Japan', code: '+81', currency: 'INR', rate: '₹2.50' },
    { country: 'Brazil', code: '+55', currency: 'INR', rate: '₹1.10' },
    { country: 'China', code: '+86', currency: 'INR', rate: '₹1.50' },
    { country: 'South Africa', code: '+27', currency: 'INR', rate: '₹2.10' },
    { country: 'Russia', code: '+7', currency: 'INR', rate: '₹3.00' },
    { country: 'Italy', code: '+39', currency: 'INR', rate: '₹1.85' },
    { country: 'Spain', code: '+34', currency: 'INR', rate: '₹1.75' },
    { country: 'Netherlands', code: '+31', currency: 'INR', rate: '₹1.95' },
];

export default function DialPlan() {
    const [search, setSearch] = useState('');

    const filteredRates = RATE_DATA.filter((item) => item.country.toLowerCase().includes(search.toLowerCase()));

    return (
        <section className='w-full my-16'>
            <div className='mx-auto'>
                <div className='mb-8'>
                    <h2 className='text-2xl font-semibold text-gray-900'>Global Calling Rates</h2>
                    <p className='mt-2 text-sm text-gray-600'>
                        Experience premium voice quality with our competitive international calling rates. Connect with
                        customers worldwide without breaking the bank.
                    </p>
                </div>
                <div className='mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900'>Dialplan Rates</h3>
                        <p className='text-sm text-gray-600'>
                            Showing rates for <span className='font-medium text-blue-600'>Alpha</span> plan
                        </p>
                    </div>
                    <div className='relative w-full sm:w-64'>
                        <input
                            type='text'
                            placeholder='Search country...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                        />
                    </div>
                </div>
                <div className='rounded-xl border border-gray-200 bg-white'>
                    <div className='max-h-[420px] overflow-y-scroll scrollbar-none'>
                        <table className='w-full border-collapse text-sm'>
                            <thead className='sticky top-0 bg-gray-50 z-10'>
                                <tr className='border-b border-gray-200'>
                                    <th className='px-4 py-3 text-left font-medium text-gray-500'>COUNTRY</th>
                                    <th className='px-4 py-3 text-left font-medium text-gray-500'>CODE</th>
                                    <th className='px-4 py-3 text-left font-medium text-gray-500'>CURRENCY</th>
                                    <th className='px-4 py-3 text-left font-medium text-gray-500'>RATE (PER UNIT)</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredRates.map((item, idx) => (
                                    <tr key={idx} className='border-b border-gray-200 last:border-b-0'>
                                        <td className='px-4 py-3 text-gray-900'>{item.country}</td>
                                        <td className='px-4 py-3 text-gray-600'>{item.code}</td>
                                        <td className='px-4 py-3 text-gray-600'>{item.currency}</td>
                                        <td className='px-4 py-3 font-medium text-green-600'>{item.rate}</td>
                                    </tr>
                                ))}

                                {filteredRates.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className='px-4 py-6 text-center text-sm text-gray-500'>
                                            No countries found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
