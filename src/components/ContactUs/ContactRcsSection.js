import Image from 'next/image';
import { MdCheckCircle, MdGridView, MdHeadset, MdBolt } from 'react-icons/md';

const FEATURE_ICONS = [MdBolt, MdGridView, MdHeadset];
const FEATURE_ICON_COLORS = ['text-amber-500', 'text-blue-500', 'text-sky-500'];

export default function ContactRcsSection({ data }) {
    if (!data) return null;

    return (
        <div className='w-full rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8 lg:p-10'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-center'>
                <div className='flex flex-col gap-4'>
                    {data?.badge && (
                        <span className='w-fit text-xs font-semibold text-accent border border-accent/20 bg-secondary rounded-full px-4 py-1.5'>
                            {data.badge}
                        </span>
                    )}
                    {data?.heading && <h2 className='text-2xl md:text-3xl font-bold text-primary'>{data.heading}</h2>}
                    {data?.subheading && <p className='text-sm md:text-base opacity-70'>{data.subheading}</p>}
                    {data?.features?.length > 0 && (
                        <ul className='flex flex-col gap-3'>
                            {data.features.map((feature, index) => {
                                const Icon = FEATURE_ICONS[index];
                                const iconColor = FEATURE_ICON_COLORS[index];

                                return (
                                    <li
                                        key={index}
                                        className='flex items-center gap-3 text-sm md:text-base text-primary'
                                    >
                                        {Icon && <Icon className={`text-xl ${iconColor}`} />}
                                        <span>{feature}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className='flex flex-col sm:flex-row lg:col-span-2 items-center justify-center lg:justify-end gap-6'>
                    {data?.phoneImage && (
                        <Image
                            src={data.phoneImage}
                            alt={data?.heading}
                            width={200}
                            height={400}
                            className='w-48 h-auto lg:-translate-x-4'
                        />
                    )}

                    <div className='flex flex-col items-center gap-4 w-full max-w-xs bg-secondary/40 border border-secondary rounded-2xl p-6'>
                        {data?.scanLabel && (
                            <div className='flex items-center justify-center gap-2'>
                                <svg width='18' height='14' viewBox='0 0 18 14' fill='none' className='text-accent'>
                                    <path d='M4 3L11 7' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
                                    <path
                                        d='M2 11L9 11'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                        strokeLinecap='round'
                                    />
                                </svg>
                                <h3 className='text-xl font-bold text-primary'>{data.scanLabel}</h3>
                                <svg width='18' height='14' viewBox='0 0 18 14' fill='none' className='text-accent'>
                                    <path d='M14 3L7 7' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
                                    <path
                                        d='M16 11L9 11'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                        strokeLinecap='round'
                                    />
                                </svg>
                            </div>
                        )}
                        {data?.qrImage && (
                            <div className='rounded-xl bg-white p-4 shadow-sm border border-secondary'>
                                <Image
                                    src={data.qrImage}
                                    alt={data?.scanLabel}
                                    width={180}
                                    height={180}
                                    className='w-40 h-40'
                                />
                            </div>
                        )}
                        {data?.scanCaption && <p className='text-sm opacity-70 text-center'>{data.scanCaption}</p>}
                        {data?.scanTips?.length > 0 && (
                            <ul className='flex flex-col gap-3 w-full'>
                                {data.scanTips.map((tip, index) => (
                                    <li key={index} className='flex items-center gap-3 text-sm text-primary'>
                                        <MdCheckCircle className='text-xl text-accent' />
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
