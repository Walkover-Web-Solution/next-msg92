import Image from 'next/image';
import { MdMenu } from 'react-icons/md';
import styles from './MenuBarComp.module.scss';
import { BtnWithHideIco, LinkText } from '../UIComponent/Buttons/LinkButton';
import { useEffect, useState } from 'react';
import getURL from '@/utils/getURL';

export default function MenuBarComp({ componentData, pageInfo }) {
    const [nav, setNav] = useState('hide');
    const [type, setType] = useState('products');
    // Access cookies country
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

    useEffect(() => {
        if (nav === 'show') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [nav]);

    const hidden = componentData?.hide?.includes(pageInfo?.page);

    const handleMiniMenu = () => {
        if (nav === 'show') {
            setNav('hide');
        } else {
            setNav('show');
        }
    };
    if (componentData && !hidden) {
        return (
            <>
                <div className={`${styles.minicont} nav-${nav}  `}>
                    <div className={`${styles.navigation} container pt-28 w-full flex`}>
                        <div className='flex  overflow-scroll flex-col scrollbar-none pb-4 gap-12 h-full min-w-full'>
                            <div className='flex flex-col h-fit w-full '>
                                {componentData?.products_list?.length > 0 &&
                                    componentData?.products_list.map((category, index) => {
                                        return (
                                            <div key={index} className='flex flex-col gap-3 w-full '>
                                                <span className='text font-medium'>{category?.name} </span>
                                                <div className='flex flex-col gap-2'>
                                                    {category?.products?.length > 0 &&
                                                        category?.products.map((product, i) => {
                                                            return (
                                                                <a
                                                                    key={i}
                                                                    href={getURL('product', product?.slug, pageInfo)}
                                                                    onClick={() => {
                                                                        setNav('hide');
                                                                        setType('products');
                                                                    }}
                                                                >
                                                                    <div className='flex items-center gap-2 py-2 px-2 rounded hover:bg-secondary w-full LinkButtonCard'>
                                                                        <Image
                                                                            className='h-10'
                                                                            src={`/assets/icons/products/${product?.slug}.svg`}
                                                                            alt={`${product?.name} Icon`}
                                                                            width={46}
                                                                            height={46}
                                                                            loading='lazy'
                                                                            sizes='(max-width: 768px) 32px, 40px'
                                                                        />
                                                                        <div className='flex flex-col'>
                                                                            <BtnWithHideIco customClasses='text-xl font-semibold'>
                                                                                {product?.name}
                                                                            </BtnWithHideIco>
                                                                            {product?.description && (
                                                                                <p className='text-sm text-gray-500'>
                                                                                    {product?.description}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                <div className='flex flex-col gap-2 mt-4'>
                                    <a
                                        href={getURL('pricing', 'sms', pageInfo)}
                                        onClick={() => {
                                            setNav('hide');
                                            setType('products');
                                        }}
                                    >
                                        <LinkText customClasses='text-lg'>Pricing</LinkText>
                                    </a>
                                    <a
                                        href='/partners-and-integrations'
                                        onClick={() => {
                                            setNav('hide');
                                            setType('products');
                                        }}
                                    >
                                        <LinkText customClasses='text-lg'>Integrations</LinkText>
                                    </a>
                                    <a
                                        className='flex items-center h-full justify-center'
                                        href='https://docs.msg91.com/overview'
                                        target='_blank'
                                        onClick={() => {
                                            setNav('hide');
                                            setType('products');
                                        }}
                                    >
                                        <LinkText customClasses='text-lg'>API Docs</LinkText>
                                    </a>
                                    <a
                                        href={getURL('signup', pageInfo?.page)}
                                        target='_blank'
                                        onClick={() => {
                                            setNav('hide');
                                            setType('products');
                                        }}
                                    >
                                        <LinkText customClasses='text-lg'>Sign Up</LinkText>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.cont} nav-${nav}  `}>
                    <div className={`${styles.navigation} container flex`}>
                        <div className=' lg:w-3/5  xl:w-1/2 w-3/4 pe-3 '>
                            {type === 'products' && (
                                <div className='mt-32 grid grid-cols-2 gap-12 h-fit '>
                                    {componentData?.products_list?.length > 0 &&
                                        componentData?.products_list.map((category, index) => {
                                            return (
                                                <div key={index} className='flex flex-col gap-3 w-full '>
                                                    <span className='text font-medium'>{category?.name} </span>
                                                    <div className='flex flex-col gap-2'>
                                                        {category?.products?.length > 0 &&
                                                            category?.products.map((product, i) => {
                                                                return (
                                                                    <a
                                                                        key={i}
                                                                        href={getURL(
                                                                            'product',
                                                                            product?.slug,
                                                                            pageInfo
                                                                        )}
                                                                        onClick={() => {
                                                                            setNav('hide');
                                                                            setType('products');
                                                                        }}
                                                                    >
                                                                        <div className='flex items-center gap-2 py-2 px-2 rounded hover:bg-secondary w-full LinkButtonCard'>
                                                                            <Image
                                                                                className='h-10'
                                                                                src={`/assets/icons/products/${product?.slug}.svg`}
                                                                                alt={`${product?.name} Icon`}
                                                                                width={46}
                                                                                height={46}
                                                                                loading='lazy'
                                                                                sizes='(max-width: 768px) 32px, 40px'
                                                                            />
                                                                            <div className='flex flex-col'>
                                                                                <BtnWithHideIco customClasses='text-xl font-semibold'>
                                                                                    {product?.name}
                                                                                </BtnWithHideIco>
                                                                                {product?.description && (
                                                                                    <p className='text-sm text-gray-500'>
                                                                                        {product?.description}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                );
                                                            })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                            {type === 'integrations' && (
                                <div className='mt-32 min-w-[640px]'>
                                    <div className=' flex flex-col gap-2 h-fit w-[300px]'>
                                        {componentData?.integrations_list?.content?.length > 0 &&
                                            componentData?.integrations_list?.content.map((integration, index) => {
                                                return (
                                                    <a
                                                        key={index}
                                                        href={integration?.link}
                                                        {...(integration?.link?.startsWith('https://msg91.com')
                                                            ? {}
                                                            : { target: '_blank', rel: 'noopener noreferrer' })}
                                                    >
                                                        <div className='flex items-center gap-2 p-2 rounded hover:bg-secondary w-full LinkButtonCard'>
                                                            <div className='w-8 h-8 flex items-center justify-center'>
                                                                <Image
                                                                    className='h-fit w-8'
                                                                    src={integration?.icon || 'https://placehold.co/20'}
                                                                    alt={`${integration?.name} Icon`}
                                                                    width={46}
                                                                    height={46}
                                                                    loading='lazy'
                                                                    sizes='32px'
                                                                />
                                                            </div>
                                                            <div className='flex flex-col'>
                                                                <BtnWithHideIco customClasses='text-lg font-semibold'>
                                                                    {integration?.name}
                                                                </BtnWithHideIco>
                                                                {integration?.description && (
                                                                    <p className='text-sm text-gray-500'>
                                                                        {integration?.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </a>
                                                );
                                            })}
                                        <a href='/partners-and-integrations'>
                                            <button
                                                className='flex items-center gap-2 px-5 py-3 rounded hover:bg-secondary w-full'
                                                onClick={() => {
                                                    setNav('hide');
                                                    setType('products');
                                                }}
                                            >
                                                <LinkText>{componentData?.integrations_list?.explore_btn}</LinkText>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            )}
                            {nav === 'show' && (
                                <div
                                    className='w-full'
                                    onMouseEnter={() => {
                                        setNav('hide');
                                        setType('products');
                                    }}
                                ></div>
                            )}
                        </div>
                        <div
                            className='lg:w-2/5 xl:w-1/2 w-1/4 h-dvh'
                            onMouseEnter={() => {
                                setNav('hide');
                                setType('products');
                            }}
                        ></div>
                    </div>
                </div>
                <div className={`${styles.background} nav-${nav}`}></div>
                {nav === 'show' && (
                    <div
                        onMouseEnter={() => {
                            setNav('hide');
                            setType('products');
                        }}
                        className={styles.overlay}
                    ></div>
                )}

                <div>
                    <div className='container hidden md:flex items-center py-5 '>
                        <ul className='w-full z-[1000] flex gap-6'>
                            <li
                                onMouseEnter={() => {
                                    setNav('show');
                                    setType('products');
                                }}
                                className={`${nav === 'show' && type === 'products' && 'active-link '} text-link`}
                            >
                                {componentData?.products}
                            </li>
                            <li
                                onMouseEnter={() => {
                                    setNav('show');
                                    setType('integrations');
                                }}
                                className={`${nav === 'show' && type === 'integrations' && 'active-link '} text-link`}
                            >
                                {componentData?.integrations}
                            </li>
                            <li>
                                <a
                                    onMouseEnter={() => {
                                        setNav('hide');
                                        setType('products');
                                    }}
                                    className='text-link'
                                    href={pricingPath || '/pricing/sms'}
                                >
                                    {componentData?.pricing}
                                </a>
                            </li>
                        </ul>
                        <div className='w-full items-center flex justify-center'>
                            <a href={pageInfo?.country === 'global' ? '/' : `/${pageInfo?.country}`}>
                                <Image
                                    src={'/assets/brand/msg91.svg'}
                                    width={300}
                                    height={100}
                                    className='h-[40px] w-auto'
                                    alt='MSG91'
                                    loading='lazy'
                                    sizes='(max-width: 768px) 120px, 160px'
                                />
                            </a>
                        </div>
                        <ul className='w-full flex justify-end gap-6 items-center'>
                            <li className='flex items-center h-full justify-center'>
                                <a href='https://docs.msg91.com/overview' target='_blank' className='text-link'>
                                    {componentData?.apidocs}
                                </a>
                            </li>
                            <li>
                                <a
                                    className='btn btn-primary btn-sm uppercase'
                                    href={getURL('signup', pageInfo?.page)}
                                    target='_blank'
                                >
                                    {componentData?.signup_btn}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='container z-[1000] flex md:hidden  py-5 '>
                        <div className='w-full z-[1000] flex items-center justify-between gap-6'>
                            <a href={pageInfo?.country === 'global' ? '/' : `/${pageInfo?.country}`}>
                                <Image
                                    src={'/assets/brand/msg91.svg'}
                                    width={300}
                                    height={100}
                                    className='h-[30px] w-auto'
                                    alt='MSG91'
                                    loading='lazy'
                                    sizes='(max-width: 768px) 90px, 120px'
                                />
                            </a>
                            <button
                                aria-label='Menu Toggle Button'
                                className='btn btn-icon'
                                onClick={() => {
                                    handleMiniMenu();
                                }}
                            >
                                <MdMenu fontSize={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
