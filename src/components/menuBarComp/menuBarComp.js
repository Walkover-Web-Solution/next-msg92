import Image from 'next/image';
import { MdMenu, MdArrowDropDown, MdLogin, MdOutlineCall, MdOutlineLanguage, MdTranslate } from 'react-icons/md';

import availableCountries from '@/data/availableCountries.json';
import specialPages from '@/data/specialPages.json';
import { useRouter } from 'next/router';
import styles from './MenuBarComp.module.scss';
import { BtnWithHideIco, LinkText } from '../UIComponent/Buttons/LinkButton';
import { useEffect, useState } from 'react';
import getURL from '@/utils/getURL';
import getPricingURL from '@/utils/pricing/getPricingURL';

export default function MenuBarComp({ componentData, notificationData, pageInfo }) {
    const [nav, setNav] = useState('hide');
    const [type, setType] = useState('products');
    const pricingPath = getPricingURL(pageInfo);

    const router = useRouter();

    const currentCountry = availableCountries.find((country) => country.shortname.toLowerCase() === pageInfo?.country);
    const iconOnlyCountries = ['br', 'br-pt', 'ph', 'fil-ph'];

    const useIconOnlyControls = iconOnlyCountries.includes(pageInfo?.country);

    const showCountrySelector = !specialPages?.global?.some((page) => router.asPath.startsWith(`/${page}`));

    const notificationHidden = notificationData?.hide?.includes(pageInfo?.page);

    const handleCookies = (country) => {
        if (typeof window !== 'undefined' && country) {
            document.cookie = `country=${country}; path=/; max-age=3600`;
        }
    };

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
                <div className={`${styles.minicont} nav-${nav}`}>
                    <div className={`${styles.navigationMobile} container pt-28 w-full`}>
                        <div className={styles.mobileMenuScroll}>
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
                                        href={pricingPath}
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
                <div className={`${styles.cont} nav-${nav}`}>
                    <div className={`${styles.navigationDesktop} container flex`}>
                        <div className={styles.menuPanel}>
                            <div className={styles.menuHeaderSpacer} aria-hidden='true' />
                            <div className={styles.menuScroll}>
                                {type === 'products' && (
                                    <div className='py-6 grid grid-cols-2 gap-12 h-fit pb-8'>
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
                                    <div className='py-6 min-w-[640px] pb-8'>
                                        <div className=' flex flex-col gap-2 h-fit w-[300px]'>
                                            {componentData?.integrations_list?.content?.length > 0 &&
                                                componentData?.integrations_list?.content.map((integration, index) => {
                                                    return (
                                                        <a
                                                            key={index}
                                                            href={integration?.link}
                                                            //check before mergining isha
                                                            {...(integration?.link?.startsWith('https://msg91.com') ||
                                                            integration?.link?.startsWith('/')
                                                                ? {}
                                                                : { target: '_blank', rel: 'noopener noreferrer' })}
                                                        >
                                                            <div className='flex items-center gap-2 p-2 rounded hover:bg-secondary w-full LinkButtonCard'>
                                                                <div className='w-8 h-8 flex items-center justify-center'>
                                                                    <Image
                                                                        className='h-fit w-8'
                                                                        src={
                                                                            integration?.icon ||
                                                                            'https://placehold.co/20'
                                                                        }
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.background} nav-${nav}`}></div>
                {nav === 'show' && (
                    <div
                        role='presentation'
                        onMouseEnter={() => {
                            setNav('hide');
                            setType('products');
                        }}
                        className={styles.overlay}
                    ></div>
                )}

                <div className='border-b border-slate-100'>
                    <div className='container hidden lg:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 py-4'>
                        <ul className='z-[1000] flex items-center gap-4'>
                            <li
                                onMouseEnter={() => {
                                    setNav('show');
                                    setType('products');
                                }}
                                className={`${nav === 'show' && type === 'products' ? 'active-link ' : ''}text-link`}
                            >
                                {componentData?.products}
                            </li>

                            <li
                                onMouseEnter={() => {
                                    setNav('show');
                                    setType('integrations');
                                }}
                                className={`${
                                    nav === 'show' && type === 'integrations' ? 'active-link ' : ''
                                }text-link`}
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

                            <li>
                                <a
                                    onMouseEnter={() => {
                                        setNav('hide');
                                        setType('products');
                                    }}
                                    href='https://docs.msg91.com/overview'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-link'
                                >
                                    {componentData?.apidocs}
                                </a>
                            </li>
                        </ul>

                        <div className='flex justify-center'>
                            <a
                                href={pageInfo?.country === 'global' ? '/' : `/${pageInfo?.country}`}
                                className='flex items-center justify-center'
                            >
                                <Image
                                    src='/assets/brand/msg91.svg'
                                    width={300}
                                    height={100}
                                    className='h-[40px] w-auto'
                                    alt='MSG91'
                                    loading='lazy'
                                    sizes='160px'
                                />
                            </a>
                        </div>

                        <div className='z-[1000] flex items-center justify-end gap-2 xl:gap-4'>
                            {notificationData && !notificationHidden && (
                                <>
                                    {currentCountry?.languages && (
                                        <div className='dropdown'>
                                            <div
                                                tabIndex={0}
                                                role='button'
                                                className='flex items-center gap-1 text-link'
                                            >
                                                <MdTranslate fontSize={16} />
                                                {!useIconOnlyControls && currentCountry?.language}
                                                <MdArrowDropDown fontSize={16} />
                                            </div>

                                            <div
                                                tabIndex={0}
                                                className='dropdown-content bg-neutral z-[9999] w-32 rounded shadow'
                                            >
                                                <ul>
                                                    {currentCountry.languages.map((language, index) => (
                                                        <li
                                                            key={index}
                                                            className='cursor-pointer'
                                                            onClick={() => handleCookies(language?.link)}
                                                        >
                                                            <a
                                                                href={getURL('country', language?.link, pageInfo)}
                                                                className='px-2 py-1 hover:bg-secondary flex items-center gap-2'
                                                            >
                                                                {language?.language}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {showCountrySelector && (
                                        <div className='dropdown'>
                                            <div
                                                tabIndex={0}
                                                role='button'
                                                className='flex items-center gap-1 text-link'
                                            >
                                                {currentCountry?.shortname ? (
                                                    <Image
                                                        src={`/assets/country-flags/${currentCountry.shortname.toLowerCase()}.svg`}
                                                        width={18}
                                                        height={18}
                                                        alt={currentCountry.shortname}
                                                        loading='lazy'
                                                    />
                                                ) : (
                                                    <MdOutlineLanguage fontSize={16} />
                                                )}

                                                {!useIconOnlyControls && (
                                                    <span className='hidden min-[1200px]:inline'>
                                                        {currentCountry?.name || 'Global'}
                                                    </span>
                                                )}
                                                <MdArrowDropDown fontSize={16} />
                                            </div>

                                            <div
                                                tabIndex={0}
                                                className='dropdown-content bg-neutral z-[9999] w-60 rounded shadow'
                                            >
                                                <ul>
                                                    <li
                                                        key='global'
                                                        className='cursor-pointer'
                                                        onClick={() => handleCookies('global')}
                                                    >
                                                        {pageInfo?.country === 'global' ? (
                                                            <div className='px-2 py-1 hover:bg-secondary flex items-center gap-2'>
                                                                <Image
                                                                    src='/assets/country-flags/global.svg'
                                                                    width={18}
                                                                    height={18}
                                                                    alt='Global'
                                                                    loading='lazy'
                                                                />
                                                                Global
                                                            </div>
                                                        ) : (
                                                            <a
                                                                href={getURL('country', 'global', pageInfo)}
                                                                className='px-2 py-1 hover:bg-secondary flex items-center gap-2'
                                                            >
                                                                <Image
                                                                    src='/assets/country-flags/global.svg'
                                                                    width={18}
                                                                    height={18}
                                                                    alt='Global'
                                                                    loading='lazy'
                                                                />
                                                                Global
                                                            </a>
                                                        )}
                                                    </li>

                                                    {availableCountries.map((country, index) => {
                                                        if (country?.hide) return null;

                                                        const countryCode = country.shortname.toLowerCase();

                                                        const isCurrentCountry = pageInfo?.country === countryCode;

                                                        const countryContent = (
                                                            <>
                                                                <Image
                                                                    src={`/assets/country-flags/${countryCode}.svg`}
                                                                    width={18}
                                                                    height={18}
                                                                    alt={country.name}
                                                                    loading='lazy'
                                                                />
                                                                {country.name}
                                                            </>
                                                        );

                                                        return (
                                                            <li
                                                                key={countryCode || index}
                                                                className='cursor-pointer'
                                                                onClick={() => handleCookies(countryCode)}
                                                            >
                                                                {isCurrentCountry ? (
                                                                    <div className='px-2 py-1 hover:bg-secondary flex items-center gap-2'>
                                                                        {countryContent}
                                                                    </div>
                                                                ) : (
                                                                    <a
                                                                        href={getURL('country', countryCode, pageInfo)}
                                                                        className='px-2 py-1 hover:bg-secondary flex items-center gap-2'
                                                                    >
                                                                        {countryContent}
                                                                    </a>
                                                                )}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    <a
                                        className='text-link flex items-center gap-1 whitespace-nowrap'
                                        href={getURL('contact-us', 'contact-us', pageInfo)}
                                    >
                                        <MdOutlineCall className='text-xl' />
                                        {!useIconOnlyControls && <span>{notificationData?.support}</span>}
                                    </a>

                                    <a
                                        className='text-link flex items-center gap-1 whitespace-nowrap'
                                        href={process.env.LOGIN_URL || 'https://control.msg91.com/signin/'}
                                    >
                                        <MdLogin className='text-xl' />
                                        {!useIconOnlyControls && <span>{notificationData?.login}</span>}
                                    </a>
                                </>
                            )}

                            <a
                                className='btn btn-primary btn-sm uppercase whitespace-nowrap'
                                href={getURL('signup', pageInfo?.page)}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {componentData?.signup_btn}
                            </a>
                        </div>
                    </div>
                    <div
                        className={`container z-[1000] flex lg:hidden py-5 ${
                            nav === 'show' ? 'fixed inset-x-0 top-0 bg-white' : ''
                        }`}
                    >
                        <div className='w-full z-[1000] flex items-center gap-3'>
                            <a
                                href={pageInfo?.country === 'global' ? '/' : `/${pageInfo?.country}`}
                                className='shrink-0'
                            >
                                <Image
                                    src='/assets/brand/msg91.svg'
                                    width={300}
                                    height={100}
                                    className='h-[30px] w-auto'
                                    alt='MSG91'
                                    loading='lazy'
                                    sizes='90px'
                                />
                            </a>

                            <div className='ml-auto flex items-center gap-1'>
                                {notificationData && !notificationHidden && (
                                    <>
                                        {currentCountry?.languages?.length > 0 && (
                                            <div className='dropdown'>
                                                <div
                                                    tabIndex={0}
                                                    role='button'
                                                    aria-label='Select language'
                                                    className='flex items-center justify-center'
                                                >
                                                    <MdTranslate fontSize={18} />
                                                    <MdArrowDropDown fontSize={16} />
                                                </div>

                                                <div className='dropdown-content bg-neutral z-[9999] w-32 rounded shadow'>
                                                    <ul>
                                                        {currentCountry.languages.map((language, index) => (
                                                            <li
                                                                key={language?.link || index}
                                                                className='cursor-pointer'
                                                                onClick={() => handleCookies(language?.link)}
                                                            >
                                                                <a
                                                                    href={getURL('country', language?.link, pageInfo)}
                                                                    className='px-2 py-2 hover:bg-secondary flex items-center gap-2'
                                                                >
                                                                    {language?.language}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                        {showCountrySelector && (
                                            <div className='dropdown'>
                                                <div
                                                    tabIndex={0}
                                                    role='button'
                                                    aria-label='Select country'
                                                    className='flex items-center justify-center'
                                                >
                                                    {currentCountry?.shortname ? (
                                                        <Image
                                                            src={`/assets/country-flags/${currentCountry.shortname.toLowerCase()}.svg`}
                                                            width={18}
                                                            height={18}
                                                            alt={currentCountry.name}
                                                            loading='lazy'
                                                        />
                                                    ) : (
                                                        <MdOutlineLanguage fontSize={18} />
                                                    )}
                                                    <MdArrowDropDown fontSize={16} />
                                                </div>

                                                <div className='dropdown-content bg-neutral z-[9999] w-60 rounded shadow'>
                                                    <ul>
                                                        <li
                                                            onClick={() => handleCookies('global')}
                                                            className='cursor-pointer'
                                                        >
                                                            {pageInfo?.country === 'global' ? (
                                                                <div className='px-2 py-2 flex items-center gap-2'>
                                                                    <Image
                                                                        src='/assets/country-flags/global.svg'
                                                                        width={18}
                                                                        height={18}
                                                                        alt='Global'
                                                                    />
                                                                    Global
                                                                </div>
                                                            ) : (
                                                                <a
                                                                    href={getURL('country', 'global', pageInfo)}
                                                                    className='px-2 py-2 flex items-center gap-2'
                                                                >
                                                                    <Image
                                                                        src='/assets/country-flags/global.svg'
                                                                        width={18}
                                                                        height={18}
                                                                        alt='Global'
                                                                    />
                                                                    Global
                                                                </a>
                                                            )}
                                                        </li>

                                                        {availableCountries.map((country) => {
                                                            if (country?.hide) return null;

                                                            const code = country.shortname.toLowerCase();
                                                            const isCurrent = pageInfo?.country === code;

                                                            return (
                                                                <li
                                                                    key={code}
                                                                    className='cursor-pointer'
                                                                    onClick={() => handleCookies(code)}
                                                                >
                                                                    {isCurrent ? (
                                                                        <div className='px-2 py-2 flex items-center gap-2'>
                                                                            <Image
                                                                                src={`/assets/country-flags/${code}.svg`}
                                                                                width={18}
                                                                                height={18}
                                                                                alt={country.name}
                                                                            />
                                                                            {country.name}
                                                                        </div>
                                                                    ) : (
                                                                        <a
                                                                            href={getURL('country', code, pageInfo)}
                                                                            className='px-2 py-2 flex items-center gap-2'
                                                                        >
                                                                            <Image
                                                                                src={`/assets/country-flags/${code}.svg`}
                                                                                width={18}
                                                                                height={18}
                                                                                alt={country.name}
                                                                            />
                                                                            {country.name}
                                                                        </a>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}

                                        <a
                                            href={getURL('contact-us', 'contact-us', pageInfo)}
                                            aria-label='Contact Us'
                                            className='flex items-center justify-center'
                                        >
                                            <MdOutlineCall fontSize={18} />
                                        </a>

                                        <a
                                            href={process.env.LOGIN_URL || 'https://control.msg91.com/signin/'}
                                            aria-label='Log In'
                                            className='flex items-center justify-center'
                                        >
                                            <MdLogin fontSize={18} />
                                        </a>
                                    </>
                                )}

                                <button
                                    className='btn btn-icon shrink-0'
                                    aria-label={nav === 'show' ? 'Close menu' : 'Open menu'}
                                    onClick={handleMiniMenu}
                                >
                                    <MdMenu fontSize={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
