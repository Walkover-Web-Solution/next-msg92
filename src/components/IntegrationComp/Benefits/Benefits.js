import Image from 'next/image';
import LottiePlayer from '@/components/LottiePlayer/LottiePlayer';

export default function Benefits({ data }) {
    const hasMedia = data?.media?.lottie || data?.media?.image;

    return (
        <section className={`benefits benefits--${data.theme} w-full`}>
            <div className='container cont cont_p flex flex-col gap-6 items-center text-center'>
                <div className='cont items-center'>
                    {data?.heading_segments?.length > 0 ? (
                        <h2 className='heading'>
                            {data.heading_segments.map((part, index) => (
                                <span
                                    key={index}
                                    className={part?.accent ? 'benefits_heading-accent' : 'benefits_heading'}
                                >
                                    {part?.text}
                                </span>
                            ))}
                        </h2>
                    ) : (
                        data?.heading && <h2 className='heading benefits_heading'>{data.heading}</h2>
                    )}
                    {data?.subheading && <p className='benefits_intro subheading'>{data.subheading}</p>}
                </div>

                <div className='benefits_graphic flex min-h-[18rem] flex-col items-center justify-center gap-2 rounded-md'>
                    {hasMedia && data?.media?.lottie && (
                        <div className='w-full h-fit rounded overflow-hidden'>
                            <LottiePlayer lottie={data.media.lottie} />
                        </div>
                    )}
                    {hasMedia && data?.media?.image && !data?.media?.lottie && (
                        <div className='relative h-[min(28rem,55vh)] w-full max-w-3xl'>
                            <Image
                                src={data.media.image}
                                alt={data.media.alt || ''}
                                fill
                                sizes='(max-width: 768px) 100vw, min(48rem, 100vw)'
                                className='object-contain object-center'
                            />
                        </div>
                    )}
                    {!hasMedia && (
                        <p className='benefits_graphic-label text-sm leading-snug md:text-base'>
                            {data?.graphic_placeholder ||
                                'Turning point graphic placeholder (Ask -> Instant Answer -> Sale flow)'}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
