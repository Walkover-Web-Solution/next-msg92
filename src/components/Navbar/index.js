import Image from 'next/image';
import styles from './Navbar.module.scss';
import { MiniMenuButton, NavbarBlank, NavbarUtils } from './NavbarUtils';
import { LinkButton, LinkText } from '../1UIComponents/Buttons';

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
            <div
                className={`${styles.navigation} container py-2 flex md:hidden items-center justify-between relative bg-white`}
            >
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
            <div id='nav_overlay' className={`${styles.overlay}`}></div>

            <div id='nav_main' className={`${styles.mainnav} `}>
                <div id='nav_bg' className={`${styles.background} w-full lg:min-w-[920px] md:min-w-[600px] md:max-w-[86%]`}></div>
                <NavbarBlank />
                <div id='nav_cont' className={styles.cont}>
                    <div className='container flex h-full overflow-y-scroll'>
                        <div id='nav_products' className='hidden w-full lg:min-w-[720px] md:min-w-[340px] mt-32 flex-wrap h-fit md:max-w-[86%]'>
                            {data?.products_list?.map((list, idx) => (
                                <div key={idx} className='mb-10 pe-10 lg:w-1/2 md:w-full sm:w-1/2 w-full max-h-fit'>
                                    <span className='font-semibold text-sm text-gray-600'>{list?.name}</span>
                                    <ul className='cont gap-2'>
                                        {list.products?.map((product, pidx) => (
                                            <li
                                                key={pidx}
                                                className='flex items-center gap-2 w-full hover:bg-secondary rounded p-2 LinkButtonCard'
                                            >
                                                <Image
                                                    className='w-fit h-10'
                                                    src={`/assets/icons/products/${product?.slug || 'hello'}.svg`}
                                                    width={72}
                                                    height={72}
                                                    alt={`${product?.name} Logo`}
                                                />
                                                <div className='cont'>
                                                    <LinkText customClasses={'text-base font-semibold'}>
                                                        {product?.name}
                                                    </LinkText>
                                                    {product?.description && (
                                                        <span className='text-sm text-gray-500'>
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
                        <div id='nav_integrations' className='hidden w-full lg:min-w-[720px] md:min-w-[340px] mt-32 flex-wrap h-fit md:max-w-[86%]'>
                            {data?.integrations_list && (
                                <ul className='cont gap-4 lg:w-1/2 md:w-full sm:w-1/2 w-full max-h-fit'>
                                    {data?.integrations_list?.content?.map((product, pidx) => (
                                        <li
                                            key={pidx}
                                            className='flex items-center gap-4 w-full hover:bg-secondary rounded px-4 py-2 LinkButtonCard'
                                        >
                                            <Image
                                                className='w-10 h-fit max-h-10'
                                                src={product?.icon}
                                                width={72}
                                                height={72}
                                                alt={`${product?.name} Logo`}
                                            />
                                            <div className='cont'>
                                                <LinkText customClasses={'text-base font-semibold'}>
                                                    {product?.name}
                                                </LinkText>
                                                {product?.description && (
                                                    <span className='text-sm text-gray-600'>
                                                        {product?.description}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                    <LinkButton
                                        href={'/'}
                                        content={data?.integrations_list?.explore_btn}
                                        customClasses={'text-base font-semibold text-link'}
                                    ></LinkButton>
                                </ul>
                            )}
                        </div>
                        <NavbarBlank />
                    </div>
                </div>
            </div>

            {/* Menu Content */}
        </>
    );
}
