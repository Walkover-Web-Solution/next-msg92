import Image from 'next/image';
import { MdArrowRightAlt } from 'react-icons/md';
import LottiePlayer from '../LottiePlayer/LottiePlayer';

export default function FeatureWithBulletGroup({ data }) {
    console.log('⚡️ ~ FeatureWithBulletGroup ~ data:', data);

    if (!data || data.features.length === 0) return null;

    return (
        <div className='container cont cont_gap cont_p'>
            {data.features.map((group, index) => {
                return (
                    <div
                        key={index}
                        className={`flex items-center xl:gap-20 lg:gap-16 md:gap-12 gap-8 ${
                            index % 2 === 0 ? 'lg:flex-row flex-col' : 'lg:flex-row-reverse flex-col'
                        }`}
                    >
                        <div>
                            <h2 className='text-2xl font-bold text-primary'>{group.name}</h2>
                            <p className='text-lg text-gray-600'>{group.content}</p>
                            {group.more_content?.features && (
                                <ul className='list-disc ps-8 text-lg text-gray-600'>
                                    {group.more_content.features.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {group?.lottie ? (
                            (console.log(group?.lottie, 'lottie'),
                            (
                                <div className='max-w-[clamp(200px, 40%, 500px)] lg:w-1/3 w-full'>
                                    <LottiePlayer lottie={group?.lottie} />
                                </div>
                            ))
                        ) : (
                            <Image
                                width={720}
                                height={720}
                                className='max-w-[clamp(200px, 40%, 500px)] lg:w-1/3 w-full'
                                src={group?.img}
                                alt={group.name}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
