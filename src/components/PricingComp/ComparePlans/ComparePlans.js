import { useRef } from 'react';
import { MdCheck, MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md';

const plans = ['Starter', 'Basic', 'Alpha', 'Beta', 'Gamma', 'Omega', 'Enterprise'];

const data = [
    {
        label: 'Price',
        values: ['₹2,000', '₹4,600', '₹7,500', '₹12,000', '₹20,000', '₹35,000', 'Custom'],
        isPrice: true,
    },

    { label: 'Dialplan Access', values: [false, false, true, true, true, true, true] },
    { label: 'SMTP Relay', values: [true, true, true, true, true, true, true] },
    { label: 'HTTP API', values: [true, true, true, true, true, true, true] },
    { label: 'Real-time Logs', values: [true, true, true, true, true, true, true] },
    { label: 'Sub-accounts', values: [true, true, true, true, true, true, true] },
    { label: 'Template Engine', values: [true, true, true, true, true, true, true] },

    { label: 'Webhooks', values: [false, true, true, true, true, true, true] },
    { label: 'Dedicated IP', values: [false, true, true, true, true, true, true] },

    { label: 'A/B Testing', values: [false, false, true, true, true, true, true] },
    { label: 'Suppression Management', values: [false, false, true, true, true, true, true] },

    { label: '24/7 Support', values: [false, false, false, true, true, true, true] },
    { label: 'Single Sign-On (SSO)', values: [false, false, false, true, true, true, true] },

    { label: 'Custom Data Retention', values: [false, false, false, false, true, true, true] },
    { label: 'Priority Sending', values: [false, false, false, false, true, true, true] },

    // 🔥 Added advanced / enterprise-grade rows
    { label: 'Dedicated Account Manager', values: [false, false, false, false, true, true, true] },
    { label: 'SLA Uptime Guarantee', values: [false, false, false, false, true, true, true] },
    { label: 'Custom Integrations', values: [false, false, false, false, false, true, true] },
    { label: 'Onboarding & Training', values: [false, false, false, false, false, true, true] },
    { label: 'Security & Compliance Review', values: [false, false, false, false, false, true, true] },
];

export default function ComparePlans() {
    const tableRef = useRef(null);

    const scrollLeft = () => {
        tableRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        tableRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <section className='w-full px-4 sm:px-6 lg:px-8 my-16'>
            <div className='mx-auto max-w-7xl'>
                {/* Heading */}
                <div className='mb-8 max-w-3xl'>
                    <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900'>Detailed Feature Comparison</h2>
                    <p className='mt-2 text-sm sm:text-base text-gray-600'>
                        Dive deep into what each plan offers. From startup essentials to enterprise-grade capabilities,
                        we have the right set of tools for your growth.
                    </p>
                </div>

                {/* Compare header + arrows */}
                <div className='mb-4 flex items-center justify-between'>
                    <h3 className='text-lg font-semibold text-gray-900'>Compare Plans</h3>

                    <div className='flex items-center gap-2'>
                        <button
                            onClick={scrollLeft}
                            aria-label='Scroll left'
                            className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100'
                        >
                            <MdChevronLeft className='text-lg' />
                        </button>

                        <button
                            onClick={scrollRight}
                            aria-label='Scroll right'
                            className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100'
                        >
                            <MdChevronRight className='text-lg' />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div ref={tableRef} className='overflow-x-auto rounded-xl border border-gray-200 bg-white'>
                    <table className='min-w-[900px] w-full border-collapse text-sm'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-4 py-4 text-left font-medium text-gray-500'>FEATURES</th>
                                {plans.map((plan) => (
                                    <th key={plan} className='px-4 py-4 text-center font-semibold text-gray-900'>
                                        {plan}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={row.label} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className='px-4 py-4 text-gray-600 whitespace-nowrap'>{row.label}</td>

                                    {row.values.map((value, idx) => (
                                        <td key={idx} className='px-4 py-4 text-center'>
                                            {row.isPrice ? (
                                                <span className='font-semibold text-green-600'>{value}</span>
                                            ) : value ? (
                                                <MdCheck className='mx-auto text-green-600 text-lg' />
                                            ) : (
                                                <MdClose className='mx-auto text-red-500 text-lg' />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
