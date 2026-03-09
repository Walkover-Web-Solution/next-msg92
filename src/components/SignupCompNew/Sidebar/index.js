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
        <div className='hidden lg:flex h-full overflow-y-auto w-1/3 min-w-[320px] max-w-full bg-secondary flex-col justify-start p-12 sticky top-0'>
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
