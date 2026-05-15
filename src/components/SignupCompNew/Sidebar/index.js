import { MdCheck } from 'react-icons/md';

const FEATURES = [
    'Programmable SMS',
    'Customer Contact Center',
    'Virtual Number',
    'Automated user segmentation',
    'OTP invisible verification',
];

export default function Sidebar() {
    return (
        <div className='flex w-full shrink-0 flex-col justify-start bg-secondary p-6 sm:p-12 lg:sticky lg:top-0 lg:h-screen lg:w-1/3 lg:min-w-[320px] lg:overflow-y-auto'>
            <h2 className='text-2xl text-primary font-semibold mb-6'>
                Signup to avail a complete suite of MSG91 products
            </h2>
            <div className='cont gap-4 mb-8'>
                <p className='text-base text-primary font-medium'>What can you build with MSG91?</p>
                <ul className='cont gap-3'>
                    {FEATURES.map((feature) => (
                        <li key={feature} className='flex items-center gap-2 text-sm text-gray-600'>
                            <MdCheck className='text-accent text-lg flex-shrink-0' />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
            <p className='text-sm text-gray-500'>Trusted by 30000+ startups and enterprises</p>
        </div>
    );
}
