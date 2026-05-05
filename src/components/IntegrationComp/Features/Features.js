import Image from 'next/image';
import LottiePlayer from '@/components/LottiePlayer/LottiePlayer';
import styles from './Features.module.scss';

export default function Features({ data }) {
    if (!data?.features?.length) return null;

    return (
        <div className={`features features--${data.theme}`}>
            <div className='container cont gap-12 py-16'>
                {(data.heading_segments?.length > 0 || data.heading) && (
                    <div className='cont items-center py-2 text-center'>
                        {data.heading_segments?.length > 0 ? (
                            <h2 className='heading'>
                                {data.heading_segments.map((part, index) => (
                                    <span
                                        key={index}
                                        className={part?.accent ? 'features_heading-accent' : 'features_heading'}
                                    >
                                        {part?.text}
                                    </span>
                                ))}
                            </h2>
                        ) : (
                            <h2 className='heading features_heading'>{data.heading}</h2>
                        )}
                        {data?.subheading && <p className='features_intro subheading'>{data.subheading}</p>}
                    </div>
                )}
                {data.features.map((group, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-12 py-4 ${
                            index % 2 === 0 ? 'lg:flex-row flex-col' : 'lg:flex-row-reverse flex-col'
                        }`}
                    >
                        <div className='flex flex-col gap-2'>
                            <h3 className='features_item-title text-2xl'>{group?.name}</h3>
                            {group?.subtitle && <p className='features_item-subtitle text-lg'>{group?.subtitle}</p>}
                            <p className='features_item-body text-lg'>{group?.content}</p>
                            {group?.more_content?.features?.length > 0 && (
                                <ul className='features_item-list cont gap-2'>
                                    {group.more_content.features.map((item, idx) => (
                                        <li className='flex items-center justify-start gap-3' key={idx}>
                                            <span className='h-2 w-2 bg-shopifyBanner-primary' aria-hidden />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {group?.video && (
                            <div className={styles.image}>
                                <video
                                    className='h-auto w-full rounded-md object-cover'
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    aria-label={group.video_alt}
                                >
                                    <source src={group.video} type='video/webm' />
                                </video>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
