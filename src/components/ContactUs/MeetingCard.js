import { MdCalendarToday, MdCheck } from 'react-icons/md';

export default function MeetingCard({ card, onBookSlot }) {
    return (
        <div
            className='flex flex-col gap-5 p-6 sm:p-8 rounded-2xl h-full text-white shadow-xl'
            style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}
        >
            <div className='flex flex-col'>
                <div className='w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600'>
                    <MdCalendarToday className='text-2xl' />
                </div>
                <h2 className='text-xl font-bold'>{card?.heading}</h2>
                <p className='text-sm text-gray-400 leading-relaxed'>{card?.description}</p>
            </div>
            {card?.features?.length > 0 && (
                <ul className='flex flex-col gap-2'>
                    {card.features.map((feature) => (
                        <li key={feature} className='flex items-center gap-2 text-sm text-gray-300'>
                            <MdCheck className='text-blue-400 shrink-0' />
                            {feature}
                        </li>
                    ))}
                </ul>
            )}
            <button
                type='button'
                onClick={onBookSlot}
                className='mt-auto w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-semibold transition-colors'
            >
                {card?.buttonText}
                <span aria-hidden>→</span>
            </button>
        </div>
    );
}
