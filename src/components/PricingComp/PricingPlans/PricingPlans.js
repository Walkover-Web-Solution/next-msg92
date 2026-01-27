import { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import PricingPlanCard from './PricingPlanCard/PricingPlanCard';

export default function PricingPlans({ plansData }) {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
    };

    const PLAN_DATA = plansData ?? [
        {
            title: 'Beta',
            price: '₹12,000',
            period: 'Monthly',
            ctaText: 'Get Started',
            showLink: true,
            linkText: 'View Calling Rates',
            included: ['1,000,000 Emails/month', '15,000 Email Validations/month'],
            features: ['SMTP Relay', 'HTTP API', 'Real-time Logs', 'Sub-accounts', 'Template Engine'],
            extra: ['₹0.009 / Emails/month', '₹0.09 / Email Validations/month'],
        },
        {
            title: 'Beta',
            price: '₹12,000',
            period: 'Monthly',
            ctaText: 'Get Started',
            showLink: true,
            linkText: 'View Calling Rates',
            included: ['1,000,000 Emails/month', '15,000 Email Validations/month'],
            features: ['SMTP Relay', 'HTTP API', 'Real-time Logs', 'Sub-accounts', 'Template Engine'],
            extra: ['₹0.009 / Emails/month', '₹0.09 / Email Validations/month'],
        },
        {
            title: 'Beta',
            price: '₹12,000',
            period: 'Monthly',
            ctaText: 'Get Started',
            showLink: true,
            linkText: 'View Calling Rates',
            included: ['1,000,000 Emails/month', '15,000 Email Validations/month'],
            features: ['SMTP Relay', 'HTTP API', 'Real-time Logs', 'Sub-accounts', 'Template Engine'],
            extra: ['₹0.009 / Emails/month', '₹0.09 / Email Validations/month'],
        },
        {
            title: 'Beta',
            price: '₹12,000',
            period: 'Monthly',
            ctaText: 'Get Started',
            showLink: true,
            linkText: 'View Calling Rates',
            included: ['1,000,000 Emails/month', '15,000 Email Validations/month'],
            features: ['SMTP Relay', 'HTTP API', 'Real-time Logs', 'Sub-accounts', 'Template Engine'],
            extra: ['₹0.009 / Emails/month', '₹0.09 / Email Validations/month'],
        },
        {
            title: 'Gamma',
            price: '₹20,000',
            period: 'Monthly',
            ctaText: 'Get Started',
            showLink: true,
            linkText: 'View Calling Rates',
            included: ['2,000,000 Emails/month', '30,000 Email Validations/month'],
            features: ['SMTP Relay', 'HTTP API', 'Real-time Logs', 'Sub-accounts', 'Template Engine'],
            extra: ['₹0.008 / Emails/month', '₹0.08 / Email Validations/month'],
        },
        {
            title: 'Delta',
            price: '₹35,000',
            period: 'Monthly',
            ctaText: 'Get Started',
            showLink: true,
            linkText: 'View Calling Rates',
            included: ['4,000,000 Emails/month', '60,000 Email Validations/month'],
            features: ['SMTP Relay', 'HTTP API', 'Real-time Logs', 'Sub-accounts', 'Template Engine'],
            extra: ['₹0.007 / Emails/month', '₹0.07 / Email Validations/month'],
        },
    ];

    return (
        <section className='w-full my-16'>
            <div className='mx-auto max-w-7xl'>
                <div className='mb-6 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <button
                            onClick={scrollLeft}
                            className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
                            aria-label='Scroll left'
                        >
                            <MdChevronLeft />
                        </button>

                        <button
                            onClick={scrollRight}
                            className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
                            aria-label='Scroll right'
                        >
                            <MdChevronRight />
                        </button>
                    </div>
                </div>

                {/* Cards row */}
                <div ref={scrollRef} className='flex gap-6 overflow-x-auto pb-4 scroll-smooth'>
                    {PLAN_DATA.map((card, index) => (
                        <PricingPlanCard key={`${card.title}-${index}`} planData={card} />
                    ))}
                </div>

                {/* Footer links */}
                <div className='mt-6 flex items-center justify-between text-sm'>
                    <button className='text-blue-600 hover:underline'>Calculate pricing</button>
                    <button className='text-blue-600 hover:underline'>Compare all features ↓</button>
                </div>
            </div>
        </section>
    );
}
