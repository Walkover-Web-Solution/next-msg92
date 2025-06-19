'use client';
import Image from 'next/image';
import styles from './Navbar.module.scss';
import { useEffect, useState } from 'react';
import { MdMenu, MdMenuBook, MdMenuOpen } from 'react-icons/md';

export default function Navbar({ data, pageInfo }) {
    console.log('⚡️ ~ :8 ~ Navbar ~ data:', data);
    const [nav, setNav] = useState('show');
    const [type, setType] = useState('products');
    useEffect(() => {
        if (nav === 'show') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [nav]);

    // const pricingPath = getPricingURL(pageInfo);
    // const hidden = componentData?.hide?.includes(pageInfo?.page);
    const handleMiniMenu = () => {
        if (nav === 'show') {
            setNav('hide');
        } else {
            setNav('show');
        }
    };

    return (
        <>
            {/* //LG Navigation Start */}
            <div className='container py-6  hidden md:flex'>
                <ul className={`${styles.navigation} lg:gap-8 gap-5 w-full items-center justify-start flex  `}>
                    <li className='text-md font-medium text-link flex items-center '>
                        <Image
                            width={120}
                            height={120}
                            src={'/assets/icons/products/hello.svg'}
                            className='h-8 w-fit mr-1'
                            alt='Hello Logo'
                        />
                        Hello
                    </li>
                    <li className='text-md font-medium text-link'>Integrations</li>
                    <li className='text-md font-medium text-link'>Pricing</li>
                </ul>
                <Image
                    width={360}
                    height={120}
                    src={'/assets/brand/msg91.svg'}
                    className='h-10 w-fit'
                    alt='MSG91 Logo'
                />
                <ul className='flex gap-8 w-full items-center justify-end'>
                    <li className='text-md font-medium text-link'>API Docs</li>
                    <li className='btn btn-primary btn-sm font-semibold uppercase'>Sign Up</li>
                </ul>
            </div>
            {/* //LG Navigation End */}
            {/* Small Navigation */}
            <div className='container py-2 flex md:hidden items-center justify-between'>
                <Image
                    width={360}
                    height={120}
                    src={'/assets/brand/msg91.svg'}
                    className='h-10 w-fit'
                    alt='MSG91 Logo'
                />
                <MdMenu className='text-3xl' />
            </div>
            {/* Small Navigation */}
            {/* Menu Content */}
            {/* <div className={styles.overlay}></div>
            <div className={styles.background}></div>
            <div className={styles.cont}>
                <div className='container mt-30'>
                    <div className='w-1/2 min-w-[720px] flex pe-10 flex-wrap'>
                        {data?.products_list?.map((list, idx) => (
                            <div key={idx} className='mb-10 pe-10 w-1/2'>
                                <span className='font-semibold text-sm text-gray-600'>{list?.name}</span>
                                <ul className='cont gap-2'>
                                    {list.products?.map((product, pidx) => (
                                        <li
                                            key={pidx}
                                            className='flex items-center gap-2 w-full hover:bg-secondary rounded p-2 '
                                        >
                                            <Image
                                                className='w-fit h-10'
                                                src={`/assets/icons/products/${product?.slug || 'hello'}.svg`}
                                                width={72}
                                                height={72}
                                                alt={`${product?.name} Logo`}
                                            />
                                            <div className='cont'>
                                                <span className='text-lg font-bold'>{product?.name}</span>
                                                {product?.description && (
                                                    <span className='text-sm text-gray-600'>
                                                        {product?.description}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
            {/* Menu Content */}
        </>
    );
}
