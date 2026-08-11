import { MdCalendarToday, MdLocationOn, MdOutlineAccessTime } from 'react-icons/md';
import CountdownTimer from './CountdownTimer';

export default function EventDetails({ data }) {
    return (
        <div className='flex w-full flex-col items-center gap-8 rounded-b-3xl bg-gradient-to-b from-blue-800 to-blue-500 p-6 text-center text-white sm:p-10 md:w-1/2 md:rounded-b-none md:rounded-r-[40%_50%] md:pl-10 md:pr-16'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl font-bold sm:text-4xl'>{data?.heading}</h1>
                {data?.badge && (
                    <span className='mx-auto rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide'>
                        {data?.badge}
                    </span>
                )}
                {data?.edition && (
                    <p className='text-xs font-bold uppercase tracking-widest text-blue-200'>{data?.edition}</p>
                )}
                {data?.tagline && <p className='text-sm text-blue-100'>{data?.tagline}</p>}
            </div>

            <div className='flex w-full max-w-xs flex-col gap-6'>
                <CountdownTimer data={data?.countdown} />

                <div className='flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/15 p-5'>
                    {data?.event?.label && (
                        <span className='flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-200'>
                            <MdCalendarToday size={14} className='text-amber-300' aria-hidden />
                            {data?.event?.label}
                        </span>
                    )}
                    <span className='text-lg font-bold sm:text-xl'>{data?.event?.date}</span>
                    {data?.event?.time && (
                        <span className='mx-auto flex items-center gap-1.5 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-xs font-medium'>
                            <MdOutlineAccessTime size={14} className='text-amber-300' aria-hidden />
                            {data?.event?.time}
                        </span>
                    )}
                    {data?.event?.address && (
                        <span className='flex items-start justify-center gap-1.5 border-t border-white/20 pt-3 text-xs text-blue-100'>
                            <MdLocationOn size={14} className='mt-0.5 shrink-0 text-amber-300' aria-hidden />
                            {data?.event?.address}
                        </span>
                    )}
                </div>
            </div>

            {data?.note && <p className='text-sm font-semibold text-amber-200'>{data?.note}</p>}
        </div>
    );
}
