import React from 'react';
import { MdFlashOn, MdOutlineChatBubbleOutline } from 'react-icons/md';

export default function Banner({ data }) {
    const videoWrapperClass = data?.video
        ? 'relative flex w-full shrink-0 items-center justify-center overflow-visible lg:w-[58%] lg:min-w-0 lg:justify-end'
        : 'relative flex min-h-64 w-full items-center justify-center overflow-hidden rounded-3xl border border-white/50 bg-slate-200 shadow-xl lg:min-h-80';

    const videoClass = data?.video
        ? 'block h-auto w-full max-w-full origin-center object-contain lg:max-w-[min(100%,920px)]'
        : '';

    return (
        <section className='container cont_p'>
            <div className='cont flex flex-col items-center gap-10 py-10 lg:flex-row lg:items-center lg:gap-8'>
                <div className='cont flex w-full shrink-0 flex-col justify-center gap-4 lg:w-[42%] lg:max-w-xl lg:flex-none'>
                    <h1 className='text-2xl font-bold text-gray-900 md:text-4xl'>{renderHeading(data?.heading)}</h1>
                    <p className='text-base text-gray-600 md:text-lg'>{data?.description}</p>

                    <div className='flex flex-col gap-4 sm:flex-row sm:flex-wrap'>
                        <a
                            href={data?.getstarted_btn_link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-6 py-3.5 font-bold text-white hover:bg-indigo-700'
                        >
                            <MdFlashOn size={18} aria-hidden />
                            {data?.getstarted_btn}
                        </a>
                        <a
                            href={data?.specialist_btn_link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white/40 px-6 py-3.5 font-bold text-gray-800 hover:border-indigo-300'
                        >
                            <MdOutlineChatBubbleOutline size={18} aria-hidden />
                            {data?.specialist_btn}
                        </a>
                    </div>
                </div>

                <div className={videoWrapperClass} aria-hidden={data?.video ? undefined : 'true'}>
                    {data?.video ? (
                        <video className={videoClass} autoPlay muted loop playsInline aria-label={data?.videoAlt || ''}>
                            <source src={data.video} type='video/webm' />
                        </video>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

function renderHeading(raw) {
    const parts = String(raw ?? '')
        .split('|')
        .map((string) => string.trim())
        .filter(Boolean);
    if (parts.length < 2) return parts[0];
    const [lead, accent] = parts;
    const rest = parts.slice(2).join(' ');
    return (
        <>
            {lead} <span className='text-indigo-600'>{accent}</span>
            {rest ? ` ${rest}` : null}
        </>
    );
}
