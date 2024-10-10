import Image from 'next/image';
import Link from 'next/link';
import { MdMenu } from 'react-icons/md';
import styles from './menuBarComp.module.scss';
import { BtnWithHideIco } from '../UIComponent/Buttons/LinkButton';
import getRelativeURL from '@/utils/getRelativeURL';
import { useState } from 'react';

export default function MenuBarComp({ componentData, pageInfo }) {
    const [nav, setNav] = useState('hide');
    const [type, setType] = useState('products');
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
        return process.env.NEXT_PUBLIC_BASE_URL + path;
    };
    const hidden = componentData?.hide?.includes(pageInfo?.page);
    if (componentData && !hidden) {
        return (
            <>
                <div className={`${styles.cont} nav-${nav} `}>
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
                                                                <Link href={getRelativeURL(product?.slug, 'product')}>
                                                                    <div className='flex items-center gap-2 py-2 px-2 rounded hover:bg-secondary w-full LinkButtonCard'>
                                                                        <Image
                                                                            className='h-10'
                                                                            src={`/assets/icons/products/${product?.slug}.svg`}
                                                                            alt='hello'
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
                            <div className='mt-32 grid grid-cols-2 gap-12 h-fit min-w-[640px]'>
                                {componentData?.products_list?.length > 0 &&
                                    componentData?.products_list.map((category, index) => {
                                        return (
                                            <div key={index} className='flex flex-col gap-3 w-full '>
                                                <span className='text font-medium'>{category?.name} </span>
                                                <div className='flex flex-col gap-2'>hello</div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                        <div
                            className='w-full'
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
                            console.log('Mouse entered overlay');
                            setNav('hide');
                            setType('products');
                        }}
                        className={styles.overlay}
                    ></div>
                )}

                <div>
                    <div className='container hidden lg:flex items-center py-5 '>
                        <ul className='w-full z-[1000] flex gap-6'>
                            <li
                                onMouseEnter={() => {
                                    setNav('show');
                                    setType('products');
                                }}
                                className='text-link'
                            >
                                {componentData?.products}
                            </li>
                            <li
                                onMouseEnter={() => {
                                    setNav('show');
                                    setType('integrations');
                                }}
                                className='text-link'
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
                            <Image
                                src={'/assets/brand/msg91.svg'}
                                width={300}
                                height={100}
                                className='h-[40px] w-auto'
                                alt='MSG91'
                            />
                        </div>
                        <ul className='w-full flex justify-end gap-6'>
                            <li className='text-link'>{componentData?.apidocs}</li>
                            <Link className='btn btn-primary btn-sm uppercase' href={'/signup'}>
                                {componentData?.signup_btn}
                            </Link>
                        </ul>
                    </div>
                    <div className='container flex lg:hidden items-center justify-between py-5 '>
                        <Image
                            src={'/assets/brand/msg91.svg'}
                            width={300}
                            height={100}
                            className='h-[30px] w-auto'
                            alt='MSG91'
                        />
                        <button className='btn btn-icon'>
                            <MdMenu fontSize={24} />
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
