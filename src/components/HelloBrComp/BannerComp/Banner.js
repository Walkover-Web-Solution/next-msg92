import React from 'react';
import { MdFlashOn, MdOutlineChatBubbleOutline } from 'react-icons/md';

export default function Banner({ data }) {
    const videoWrapperClass = data?.video
        ? 'relative flex w-full items-center justify-center'
        : 'relative flex min-h-64 w-full items-center justify-center overflow-hidden rounded-3xl border border-white/50 bg-slate-200 shadow-xl lg:min-h-80';

    return (
        <section className='container cont_p'>
            <div className='cont py-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2'>
                <div className='cont justify-center gap-4'>
                    <h1 className='heading text-gray-900'>{renderHeading(data?.heading)}</h1>
                    <p className='subheading text-gray-600'>{data?.description}</p>

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
                        <video
                            className='block h-auto w-full object-contain'
                            autoPlay
                            muted
                            loop
                            playsInline
                            aria-label={data?.videoAlt || ''}
                        >
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
