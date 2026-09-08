import { useEffect, useState } from 'react';

const INITIAL_TIME_LEFT = { days: '00', hours: '00', minutes: '00', seconds: '00' };

const padValue = (value) => String(value).padStart(2, '0');

export default function CountdownTimer({ data }) {
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LEFT);

    useEffect(() => {
        if (!data?.date) return;

        const targetTime = new Date(data.date).getTime();

        const updateTimeLeft = () => {
            const difference = targetTime - new Date().getTime();
            if (difference <= 0) {
                setTimeLeft(INITIAL_TIME_LEFT);
                return;
            }
            setTimeLeft({
                days: padValue(Math.floor(difference / (1000 * 60 * 60 * 24))),
                hours: padValue(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
                minutes: padValue(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))),
                seconds: padValue(Math.floor((difference % (1000 * 60)) / 1000)),
            });
        };

        updateTimeLeft();
        const interval = setInterval(updateTimeLeft, 1000);
        return () => clearInterval(interval);
    }, [data?.date]);

    if (!data?.date) return null;

    const tiles = [
        { name: data?.days, value: timeLeft.days },
        { name: data?.hours, value: timeLeft.hours },
        { name: data?.minutes, value: timeLeft.minutes },
        { name: data?.seconds, value: timeLeft.seconds },
    ];

    return (
        <div className='grid w-full grid-cols-4 gap-2 text-center'>
            {tiles.map((tile, index) => {
                return (
                    <div key={index} className='rounded-xl border border-white/20 bg-white/20 px-1 py-2'>
                        <span className='block text-base font-bold leading-none sm:text-lg'>{tile?.value}</span>
                        <span className='mt-1 block text-[10px] font-semibold uppercase tracking-wider text-blue-100'>
                            {tile?.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
