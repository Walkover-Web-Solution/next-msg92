import getNestedURL from '@/utils/getNestedURL';
import getURL from '@/utils/getURL';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FooterComp({ componentData, pageInfo }) {
    const hidden = componentData?.hide?.includes(pageInfo?.page);
    const year = new Date().getFullYear();
    const [pricingPath, setPricingPath] = useState('/pricing/sms');
    let cookiesCountry = null;
    if (typeof document !== 'undefined') {
        const match = document.cookie.match('(^|;)\\s*country\\s*=\\s*([^;]+)');
        cookiesCountry = match ? match.pop() : null;
    }

    useEffect(() => {
        setPricingPath(
            cookiesCountry && cookiesCountry !== 'global' ? '/' + cookiesCountry + '/pricing/sms' : '/pricing/sms'
        );
    }, [cookiesCountry]);

    if (componentData && !hidden) {
        return (
            <>
                <div className='bg-gray-800 pt-16 pb-10'>
                    <div className='container text-white grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10  '>
                        <div className='flex flex-col gap-10 w-full'>
                            {componentData?.products?.links.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <span className='font-semibold'>{componentData?.products?.name}</span>
                                    <ul className='flex flex-col gap-2'>
                                        {componentData?.products?.links.map((link, index) => {
                                            return (
                                                <li key={index} className='text-link-white'>
                                                    <a
                                                        href={
                                                            link?.nested
                                                                ? getNestedURL('product', link?.link, pageInfo)
                                                                : getURL('product', link?.link, pageInfo)
                                                        }
                                                        className='text-gray-200 '
                                                    >
                                                        {link?.name}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                            {componentData?.utilities?.links.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <span className='font-semibold'>{componentData?.utilities?.name}</span>
                                    <ul className='flex flex-col gap-2'>
                                        {componentData?.utilities?.links.map((link, index) => {
                                            return (
                                                <li key={index} className='text-link-white'>
                                                    <a
                                                        href={getURL('product', link?.link, pageInfo)}
                                                        className='text-gray-200'
                                                    >
                                                        {link?.name}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                        <li className='text-link-white'>
                                            <a href='/chatbot' className='text-gray-200'>
                                                Chatbot
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col gap-10 w-full'>
                            {componentData?.channels?.links.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <span className='font-semibold'>{componentData?.channels?.name}</span>
                                    <ul className='flex flex-col gap-2'>
                                        {componentData?.channels?.links.map((link, index) => {
                                            return (
                                                <li key={index} className='text-link-white'>
                                                    <a
                                                        href={getURL('product', link?.link, pageInfo)}
                                                        className='text-gray-200'
                                                    >
                                                        {link?.name}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                            {componentData?.resources?.links.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <span className='font-semibold'>{componentData?.resources?.name}</span>
                                    <ul className='flex flex-col gap-2'>
                                        {componentData?.resources?.links.map((link, index) => {
                                            return (
                                                <li key={index} className='text-link-white'>
                                                    <a href={link?.link} className='text-gray-200'>
                                                        {link?.name}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col gap-10 w-full'>
                            {componentData?.discover?.links.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <span className='font-semibold'>{componentData?.discover?.name}</span>
                                    <ul className='flex flex-col gap-2'>
                                        {componentData?.discover?.links.map((link, index) => {
                                            if (link?.link === 'pricing/hello') {
                                                return (
                                                    <li key={index} className='text-link-white'>
                                                        <a
                                                            href={pricingPath || 'pricing/sms'}
                                                            className='text-gray-200'
                                                        >
                                                            {link?.name}
                                                        </a>
                                                    </li>
                                                );
                                            } else if (link?.link.startsWith('http')) {
                                                return (
                                                    <li key={index} className='text-link-white'>
                                                        <a href={link?.link} target='_blank' className='text-gray-200'>
                                                            {link?.name}
                                                        </a>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={index} className='text-link-white'>
                                                        <a
                                                            href={getURL('global', link?.link, pageInfo)}
                                                            className='text-gray-200'
                                                        >
                                                            {link?.name}
                                                        </a>
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col gap-10 w-full h-full'>
                            <div className='flex flex-col gap-4 lg:items-end'>
                                <a href={'https://msg91.com'}>
                                    <Image
                                        className='w-32'
                                        src={'/assets/brand/msg91_white.svg'}
                                        width={480}
                                        height={480}
                                        alt='MSG91 Logo'
                                        loading='lazy'
                                        sizes='(max-width: 768px) 96px, 128px'
                                    />
                                </a>
                            </div>
                            <div className='flex flex-col gap-2 lg:items-end'>
                                <span className='font-semibold'>Download Apps</span>
                                <div className='flex gap-4'>
                                    <a
                                        href='https://play.google.com/store/apps/details?id=com.hellornapp'
                                        target='_blank'
                                        className='flex items-center'
                                    >
                                        <Image
                                            src='/assets/icons/social/android.svg'
                                            alt='Android App'
                                            width={24}
                                            height={24}
                                            loading='lazy'
                                            sizes='24px'
                                        />
                                    </a>
                                    <a
                                        href='https://apps.apple.com/in/app/hello-by-msg91/id1635375551'
                                        target='_blank'
                                        className='flex items-center '
                                    >
                                        <Image
                                            src='/assets/icons/social/apple.svg'
                                            alt='Apple App'
                                            width={24}
                                            height={24}
                                            loading='lazy'
                                            sizes='24px'
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 lg:items-end'>
                                <span className='font-semibold '>Follow Us</span>
                                <div className='flex gap-4'>
                                    <a
                                        href='https://www.facebook.com/msg91'
                                        target='_blank'
                                        className='flex items-center'
                                    >
                                        <Image
                                            src='/assets/icons/social/facebook.svg'
                                            alt='Facebook'
                                            width={24}
                                            height={24}
                                            loading='lazy'
                                            sizes='24px'
                                        />
                                    </a>
                                    <a
                                        href='https://www.linkedin.com/company/msg91/'
                                        target='_blank'
                                        className='flex items-center '
                                    >
                                        <Image
                                            src='/assets/icons/social/linkedin.svg'
                                            alt='LinkedIn'
                                            width={24}
                                            height={24}
                                            loading='lazy'
                                            sizes='24px'
                                        />
                                    </a>
                                    <a href='https://x.com/msg91' target='_blank' className='flex items-center '>
                                        <Image
                                            src='/assets/icons/social/twitter.svg'
                                            width={25}
                                            height={25}
                                            alt='Twitter'
                                            loading='lazy'
                                            sizes='25px'
                                        />
                                    </a>
                                    <a
                                        href='https://www.youtube.com/@WalkoverWS'
                                        target='_blank'
                                        className='flex items-center '
                                    >
                                        <Image
                                            src='/assets/icons/social/youtube.svg'
                                            width={25}
                                            height={25}
                                            alt='YouTube'
                                            loading='lazy'
                                            sizes='25px'
                                        />
                                    </a>
                                </div>
                            </div>
                            {componentData?.address?.address && (
                                <p className=' text-gray-200 text-end'>{componentData?.address?.address}</p>
                            )}
                            <div className='flex flex-col gap-4 mt-auto lg:items-end'>
                                <a
                                    target='_blank'
                                    href={
                                        'https://www.facebook.com/business/partner-directory/search?solution_type=messaging&ref=pd_home_hero_cta&id=5412005225590465&section=overview'
                                    }
                                >
                                    <Image
                                        className='w-40'
                                        src={'/assets/icons/extras/meta-business-platform.svg'}
                                        width={480}
                                        height={480}
                                        alt='Meta Business Platform'
                                        loading='lazy'
                                        sizes='(max-width: 768px) 120px, 160px'
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-900 pt-10 pb-16'>
                    <div className='container text-white flex'>
                        <ul className='flex flex-wrap gap-4'>
                            {componentData?.policies?.links.length > 0 &&
                                componentData?.policies?.links.map((link, index) => {
                                    return (
                                        <li key={index} className='flex items-center gap-4'>
                                            <a
                                                href={getURL('terms', link?.link, pageInfo)}
                                                className='text-gray-200 text-link-white  '
                                            >
                                                {link?.name}
                                            </a>
                                            {index !== componentData?.policies?.links.length - 1 && <span>|</span>}
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    <div className='container flex flex-col  gap-2 pt-5 text-gray-300 text-sm'>
                        <p>
                            {' '}
                            Copyright 2008-{year}, {componentData?.address?.name || 'Superheroes, Inc.'} | All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </>
        );
    }
}
