import { MdArrowRightAlt } from 'react-icons/md';
import getURL from '@/utils/getURL';

export default function PricingPlanCard({ title, price, period, features, isSelected, onSelect, IsMultiPlan = false }) {
    return (
        <div
            className={`flex flex-col gap-3 bg-base-100 rounded border p-6 flex-1 cursor-pointer ${
                !IsMultiPlan
                    ? 'border-gray-300 hover:shadow-none'
                    : isSelected
                      ? 'border-accent'
                      : 'border-gray-300 hover:shadow-md'
            }`}
            onClick={onSelect}
        >
            <div className='flex justify-between items-center flex-row'>
                <h3 className='text-lg font-bold'>{title}</h3>
                {IsMultiPlan && (
                    <>
                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-accent bg-accent' : 'border-accent bg-white'
                            }`}
                        >
                            {isSelected && <div className='w-2 h-2 rounded-full bg-white'></div>}
                        </div>
                    </>
                )}
            </div>

            <div className='text-2xl text-green-600 font-bold'>
                <span>{price}</span>
                <span>{period} </span>
            </div>
            <div className='overflow-y-auto'>
                <ul className='flex flex-col gap-1 font-md'>
                    {features.map((feature, index) => (
                        <li
                            key={`${feature}-${index}`}
                            className={`flex text-gray-700 gap-2 ${index === 0 ? 'font-semibold' : ''}`}
                        >
                            <MdArrowRightAlt size={18} className='text-gray-600 mt-1' />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <a
                href={getURL('signup', 'whatsapp')}
                className='w-fit block mt-auto'
                target='_blank'
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={`rounded px-5 py-2 transition-all duration-200 ${
                        isSelected
                            ? 'bg-primary text-white hover:bg-gray-700 hover:shadow-md'
                            : 'bg-white text-accent border border-accent hover:bg-accent hover:text-white hover:border-accent'
                    }`}
                >
                    Get Started
                </button>
            </a>
        </div>
    );
}
