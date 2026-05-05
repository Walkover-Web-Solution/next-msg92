import Image from 'next/image';
import LottiePlayer from '@/components/LottiePlayer/LottiePlayer';

export default function Benefits({ data }) {
    return (
        <section className={`benefits benefits--${data.theme} w-full`}>
            <div className='container cont cont_p flex flex-col gap-6 items-center text-center'>
                <div className='cont items-center'>
                    <h2 className='heading'>
                        {data?.heading_segments?.map((part, index) => (
                            <span key={index} className={part?.accent ? 'benefits_heading-accent' : 'benefits_heading'}>
                                {part?.text}
                            </span>
                        ))}
                    </h2>
                    {data?.subheading && <p className='benefits_intro subheading'>{data.subheading}</p>}
                </div>

                <div className='py-5 flex flex-col items-center justify-center gap-2'>
                    {data?.media?.image && (
                        <div className='relative h-full w-full'>
                            <Image
                                src={data.media.image}
                                alt={data.media.alt}
                                width={960}
                                height={540}
                                className='object-contain object-center'
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
