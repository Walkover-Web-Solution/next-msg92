import Image from 'next/image';
import { useState } from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import LottiePlayer from '../LottiePlayer/LottiePlayer';
import styles from './FeatureWithBulletGroup.module.scss';
import { LinkText } from '../UIComponent/Buttons/LinkButton';

export default function FeatureWithBulletGroup({ data }) {
    const [showMobileLinks, setShowMobileLinks] = useState({});

    if (!data || data.features.length === 0) return null;

    const toggleMobileLinks = (index) => {
        setShowMobileLinks((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

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
                            {group?.schedule_meet && (
                                <a href='https://calendly.com/hello-shared-inbox/hello-meeting' target='_blank'>
                                    <LinkText customClasses={'text-link active-link'}>{group?.schedule_meet}</LinkText>
                                </a>
                            )}
                            {/* {group?.get_in_action && (
                                <a href='/demochatbot' target='_blank'>
                                    <LinkText customClasses={'text-link active-link'}>{group?.get_in_action}</LinkText>
                                </a>
                            )} */}
                            {group?.get_mobile_app && (
                                <div className='flex gap-4 items-center flex-wrap'>
                                    <button
                                        className='btn btn-md btn-hello btn-outline'
                                        onClick={() => toggleMobileLinks(index)}
                                    >
                                        <LinkText>Get Mobile App</LinkText>
                                    </button>
                                    {showMobileLinks[index] && (
                                        <>
                                            <a
                                                href='https://play.google.com/store/apps/details?id=com.hellornapp&pli=1'
                                                target='_blank'
                                            >
                                                <LinkText customClasses={'text-link active-link'}>Android</LinkText>
                                            </a>
                                            <a
                                                href='https://apps.apple.com/in/app/hello-chatbot-shared-inbox/id1635375551'
                                                target='_blank'
                                            >
                                                <LinkText customClasses={'text-link active-link'}>iOS</LinkText>
                                            </a>
                                        </>
                                    )}
                                </div>
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
                                loading='lazy'
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
