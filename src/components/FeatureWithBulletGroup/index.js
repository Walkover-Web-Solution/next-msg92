import Image from 'next/image';
import { MdArrowRightAlt } from 'react-icons/md';
import LottiePlayer from '../LottiePlayer/LottiePlayer';
import styles from './FeatureWithBulletGroup.module.scss';

export default function FeatureWithBulletGroup({ data }) {
    if (!data || data.features.length === 0) return null;
    return (
        <div className='container cont gap-10 md:gap-16 cont_p'>
            {data.features.map((group, index) => {
                return (
                    <div
                        key={index}
                        className={`flex items-center gap-4 md:gap-12 ${
                            index % 2 === 0 ? 'lg:flex-row flex-col' : 'lg:flex-row-reverse flex-col'
                        }`}
                    >
                        <div className='w-full flex flex-col gap-2'>
                            <h2 className='md:text-3xl text-xl font-semibold text-primary'>{group?.name}</h2>
                            {group?.subtitle && (
                                <p className='md:text-lg text-base font-semibold text-gray-800'>{group?.subtitle}</p>
                            )}
                            <p className='md:text-lg text-base text-gray-800'>{group?.content}</p>
                            {group?.more_content?.features?.length > 0 && (
                                <ul className='text-gray-600 cont gap-1'>
                                    {group?.more_content?.features.map((item, idx) => (
                                        <li className='flex gap-2' key={idx}>
                                            {' '}
                                            <MdArrowRightAlt className='text-primary text-lg mt-1' /> {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {group?.lottie ? (
                            <div className={`${styles.image}`}>
                                <LottiePlayer lottie={group?.lottie} />
                            </div>
                        ) : (
                            <Image
                                width={720}
                                height={720}
                                className={`${styles?.image}`}
                                src={group?.img}
                                alt={group?.name}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
