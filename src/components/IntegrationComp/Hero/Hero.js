import Image from 'next/image';
import LottiePlayer from '@/components/LottiePlayer/LottiePlayer';

export default function Hero({ data }) {
    return (
        <section className={`container cont_p cont  banner--${data.theme}`}>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-stretch'>
                <div className='banner_content flex flex-1 flex-col justify-center gap-4 rounded-md p-6 lg:min-h-[674px]'>
                    {data?.logo?.src && (
                        <div className='flex items-center gap-2'>
                            <Image src={data.logo.src} alt={data.logo.alt} width={140} height={40} className='h-9' />
                        </div>
                    )}

                    <h1 className='heading'>
                        {(data?.heading_segments || []).map((part, index) => (
                            <span key={index} className={part?.accent ? 'banner_heading-accent' : 'banner_heading'}>
                                {part?.text}
                            </span>
                        ))}
                    </h1>

                    {data?.subheading && <p className='banner_body text-base'>{data.subheading}</p>}

                    {(data?.buttons ?? []).some((b) => b?.url) && (
                        <div className='flex flex-wrap gap-2'>
                            {(data?.buttons ?? []).map((btn, index) =>
                                !btn?.url ? null : (
                                    <a
                                        key={index}
                                        href={btn.url}
                                        target={'_blank'}
                                        rel={'noopener noreferrer'}
                                        className={`${
                                            index % 2 === 0 ? 'banner_btn-primary' : 'banner_btn-secondary'
                                        } inline-flex items-center justify-center rounded-md px-5 py-1.5 text-base font-semibold`}
                                    >
                                        {btn.label}
                                    </a>
                                )
                            )}
                        </div>
                    )}
                </div>

                <div className='banner_visual flex flex-1 items-center justify-center rounded-md'>
                    {data?.visual?.lottie && (
                        <div className='h-full w-full max-w-lg p-4'>
                            <LottiePlayer lottie={data.visual.lottie} />
                        </div>
                    )}
                    {data?.visual?.image &&
                        !data?.visual?.lottie &&
                        data.visual.image_width &&
                        data.visual.image_height && (
                            <Image
                                src={data.visual.image}
                                alt={data.visual.image_alt}
                                width={data.visual.image_width}
                                height={data.visual.image_height}
                                className='max-h-full w-auto max-w-[90%] object-contain p-6'
                            />
                        )}
                </div>
            </div>
        </section>
    );
}
