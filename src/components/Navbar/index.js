import Image from 'next/image';
import styles from './Navbar.module.scss';
import { MiniMenuButton, NavbarBlank, NavbarUtils } from './NavbarUtils';

export default function Navbar({ data, pageInfo }) {
    return (
        <>
            {/* //LG Navigation Start */}
            <div className='container py-6  hidden md:flex'>
                <ul className={`${styles.navigation} lg:gap-8 gap-5 w-full items-center justify-start flex  `}>
                    <NavbarUtils />
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
                <MiniMenuButton />
            </div>
            {/* Small Navigation */}
            {/* Menu Content */}
            <div id='nav_overlay' className={`${styles.overlay} `}></div>

            <div id='nav_main' className={`${styles.mainnav} `}>
                <div id='nav_bg' className={styles.background}></div>
                <NavbarBlank />
                <div id='nav_cont' className={styles.cont}>
                    <div className='container flex h-full'>
                        <div className='w-1/2 min-w-[720px] h-fit mt-30 flex pe-10 flex-wrap items-start justify-start'>
                            {data?.products_list?.map((list, idx) => (
                                <div key={idx} className='mb-10 pe-10 w-1/2 max-h-fit'>
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
                        <NavbarBlank />
                    </div>
                </div>
            </div>

            {/* Menu Content */}
        </>
    );
}
