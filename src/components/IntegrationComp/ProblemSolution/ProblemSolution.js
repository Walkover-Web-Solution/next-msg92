import Image from 'next/image';
import LottiePlayer from '@/components/LottiePlayer/LottiePlayer';

export default function ProblemSolution({ data }) {
    return (
        <section className={`container cont cont_p  response response--${data.theme}`}>
            <div className='py-6 items-center gap-4 text-center'>
                <h2 className='heading'>
                    {(data?.heading_segments || []).map((part, index) => (
                        <span key={index} className={part?.accent ? 'response_heading-accent' : 'response_heading'}>
                            {part?.text}
                        </span>
                    ))}
                </h2>
                {data?.subheading && (
                    <p className=' response_intro text-gray-600 text-base text-md'>{data.subheading}</p>
                )}
            </div>

            <div className='grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr] lg:items-stretch lg:gap-12'>
                <div className='response_media min-h-[16rem] min-w-0 overflow-hidden rounded-lg lg:min-h-[22rem]'>
                    {data?.media?.lottie && (
                        <div className='h-full w-full p-4'>
                            <LottiePlayer lottie={data.media.lottie} />
                        </div>
                    )}
                    {data?.media?.image && !data?.media?.lottie && data.media.width && data.media.height && (
                        <Image
                            src={data.media.image}
                            alt={data.media.alt || ''}
                            width={data.media.width}
                            height={data.media.height}
                            className='h-full w-full object-cover'
                        />
                    )}
                </div>

                <div className='cont min-w-0 gap-8 lg:justify-center'>
                    {(data?.items || []).map((item, index) => (
                        <div key={index} className='cont gap-2 text-left'>
                            <h3 className='response_item-title text-lg md:text-xl'>{item?.title}</h3>
                            <p className='response_item-body text-base leading-relaxed'>{item?.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
