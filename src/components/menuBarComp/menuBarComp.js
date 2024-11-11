import Image from 'next/image';
import Link from 'next/link';
import { MdMenu } from 'react-icons/md';
import styles from './MenuBarComp.module.scss';
import { BtnWithHideIco, LinkButton, LinkText } from '../UIComponent/Buttons/LinkButton';
import { useEffect, useState } from 'react';
import getURL from '@/utils/getURL';

export default function MenuBarComp({ componentData, pageInfo }) {
    const [nav, setNav] = useState('hide');
    const [type, setType] = useState('products');
    useEffect(() => {
        if (nav === 'show') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [nav]);
    const getPricingPath = () => {
        let path = '/pricing/hello';
        switch (pageInfo?.country) {
            case 'global':
                if (pageInfo?.page !== 'pricing') {
                    path = '/pricing/' + ((pageInfo?.page !== 'home' && pageInfo?.page) || 'hello');
                } else {
                    path = '/pricing/hello';
                }
                break;

            default:
                if (pageInfo?.page !== 'pricing') {
                    path =
                        '/' +
                        pageInfo?.country +
                        '/pricing/' +
                        ((pageInfo?.page !== 'home' && pageInfo?.page) || 'hello');
                } else {
                    path = '/' + pageInfo?.country + '/pricing/' + 'hello';
                }
                break;
        }
        return process.env.BASE_URL + path;
    };
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
                                                                <Link
                                                                    key={i}
                                                                    href={getURL('product', product?.slug)}
                                                                    onClick={() => {
                                                                        setNav('hide');
                                                                        setType('products');
                                                                    }}
                                                                >
                                                                    <div className='flex items-center gap-2 py-2 px-2 rounded hover:bg-secondary w-full LinkButtonCard'>
                                                                        <Image
                                                                            className='h-10'
                                                                            src={`/assets/icons/products/${product?.slug}.svg`}
                                                                            alt={product?.name}
                                                                            width={46}
                                                                            height={46}
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
                                                                </Link>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                <div className='flex flex-col gap-2'>
                                    <Link
                                        href={getURL('pricing', 'hello')}
                                        onClick={() => {
                                            setNav('hide');
                                            setType('products');
                                        }}
                                    >
                                        <LinkText customClasses='text-lg'>Pricing</LinkText>
                                    </Link>
                                    <Link
                                        href={getURL('pricing', 'hello')}
                                        onClick={() => {
                                            setNav('hide');
                                            setType('products');
                                        }}
                                    >
                                        <LinkText customClasses='text-lg'>Integrations</LinkText>
                                    </Link>
                                    <Link
                                        href={getURL('pricing', 'hello')}
                                        onClick={() => {
                                            setNav('hide');
                                            setType('products');
                                        }}
                                    >
                                        <LinkText customClasses='text-lg'>API Docs</LinkText>
                                    </Link>
                                    <Link
                                        href={getURL('pricing', 'hello')}
                                        onClick={() => {
                                            setNav('hide');
                                            setType('products');
                                        }}
                                    >
                                        <LinkText customClasses='text-lg'>Sign Up</LinkText>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.cont} nav-${nav}  `}>
                    <div className={`${styles.navigation} container flex`}>
                        {type === 'products' && (
                            <div className='mt-32 grid grid-cols-2 gap-12 h-fit min-w-[640px]'>
                                {componentData?.products_list?.length > 0 &&
                                    componentData?.products_list.map((category, index) => {
                                        return (
                                            <div key={index} className='flex flex-col gap-3 w-full '>
                                                <span className='text font-medium'>{category?.name} </span>
                                                <div className='flex flex-col gap-2'>
                                                    {category?.products?.length > 0 &&
                                                        category?.products.map((product, i) => {
                                                            return (
                                                                <Link
                                                                    key={i}
                                                                    href={getURL('product', product?.slug)}
                                                                    onClick={() => {
                                                                        setNav('hide');
                                                                        setType('products');
                                                                    }}
                                                                >
                                                                    <div className='flex items-center gap-2 py-2 px-2 rounded hover:bg-secondary w-full LinkButtonCard'>
                                                                        <Image
                                                                            className='h-10'
                                                                            src={`/assets/icons/products/${product?.slug}.svg`}
                                                                            alt={product?.name}
                                                                            width={46}
                                                                            height={46}
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
                                                                </Link>
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
                                <div className=' flex flex-col gap-4 h-fit w-[300px]'>
                                    {componentData?.integrations_list?.content?.length > 0 &&
                                        componentData?.integrations_list?.content.map((integration, index) => {
                                            return (
                                                <Link key={index} href={integration?.link}>
                                                    <div className='flex items-center gap-2 py-2 px-2 rounded hover:bg-secondary w-full LinkButtonCard'>
                                                        <Image
                                                            className='h-10'
                                                            src={`/assets/integrations/${integration?.slug}.svg`}
                                                            alt={integration?.slug}
                                                            width={46}
                                                            height={46}
                                                        />
                                                        <div className='flex flex-col'>
                                                            <BtnWithHideIco customClasses='text-xl font-semibold'>
                                                                {integration?.name}
                                                            </BtnWithHideIco>
                                                            {integration?.description && (
                                                                <p className='text-sm text-gray-500'>
                                                                    {integration?.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    <LinkButton
                                        href='/partners-and-integrations'
                                        customClasses='flex items-center gap-2 px-5 py-3 rounded hover:bg-secondary w-full'
                                        content={componentData?.integrations_list?.explore_btn}
                                    />
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
                </div>
                <div className={`${styles.background} nav-${nav}`}></div>
                {nav === 'show' && (
                    <div
                        onMouseEnter={() => {
                            console.log('Mouse entered overlay');
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
                            <Link
                                onMouseEnter={() => {
                                    setNav('hide');
                                    setType('products');
                                }}
                                className='text-link'
                                href={getPricingPath()}
                            >
                                {componentData?.pricing}
                            </Link>
                        </ul>
                        <div className='w-full items-center flex justify-center'>
                            <Link href={pageInfo?.country === 'global' ? '/' : pageInfo?.country}>
                                <Image
                                    src={'/assets/brand/msg91.svg'}
                                    width={300}
                                    height={100}
                                    className='h-[40px] w-auto'
                                    alt='MSG91'
                                />
                            </Link>
                        </div>
                        <ul className='w-full flex justify-end gap-6'>
                            <a href='https://docs.msg91.com/overview' target='_blank'>
                                <li className='text-link'>{componentData?.apidocs}</li>
                            </a>
                            <Link className='btn btn-primary btn-sm uppercase' href={'/signup'} target='_blank'>
                                {componentData?.signup_btn}
                            </Link>
                        </ul>
                    </div>
                    <div className='container z-[1000] flex md:hidden  py-5 '>
                        <div className='w-full z-[1000] flex items-center justify-between gap-6'>
                            <Link href={pageInfo?.country === 'global' ? '/' : pageInfo?.country}>
                                <Image
                                    src={'/assets/brand/msg91.svg'}
                                    width={300}
                                    height={100}
                                    className='h-[30px] w-auto'
                                    alt='MSG91'
                                />
                            </Link>
                            <button
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
