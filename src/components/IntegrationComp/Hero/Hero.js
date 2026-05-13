import Image from 'next/image';
import LottiePlayer from '@/components/LottiePlayer/LottiePlayer';

export default function Hero({ data }) {
    return (
        <section className={`container cont_p cont banner--${data.theme} bg-green`}>
            <div className='flex flex-col gap-8 lg:flex-row lg:items-center'>
                <div className='banner_content flex flex-1 flex-col justify-center gap-4 p-6'>
                    {data?.logo?.src && (
                        <div className='flex items-center gap-2'>
                            <Image
                                src={data.logo.src}
                                alt={data.logo.alt}
                                width={200}
                                height={100}
                                className='h-12 w-auto sm:h-14'
                            />
                        </div>
                    )}

                    <h1 className='heading'>
                        {data?.heading_segments?.map((part, index) => (
                            <span key={index} className={part?.accent ? 'banner_heading-accent' : 'banner_heading'}>
                                {part?.text}
                            </span>
                        ))}
                    </h1>

                    {data?.subheading && <p className='banner_body text-base'>{data.subheading}</p>}

                    {data?.buttons?.some((b) => b?.url) && (
                        <div className='flex flex-wrap gap-2'>
                            {data?.buttons.map((btn, index) =>
                                !btn?.url ? null : (
                                    <a
                                        key={index}
                                        href={btn.url}
                                        target={'_blank'}
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

                <div className='banner_visual flex flex-1 items-center justify-center p-6'>
                    {data?.visual?.lottie && (
                        <div className='w-full max-w-lg'>
                            <LottiePlayer lottie={data.visual.lottie} />
                        </div>
                    )}
                    {data?.visual?.video && !data?.visual?.lottie && (
                        <div className=' items-center justify-center'>
                            <video
                                className='h-auto w-full rounded-3xl max-h-[min(640px,85dvh)] object-cover'
                                aria-label={data.visual.video_alt}
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src={data.visual.video} type='video/webm' />
                            </video>
                        </div>
                    )}
                    {data?.visual?.image && !data?.visual?.lottie && !data?.visual?.video && (
                        <Image
                            src={data.visual.image}
                            alt={data.visual.image_alt || ''}
                            width={960}
                            height={540}
                            className='max-h-full w-auto max-w-full object-contain'
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
