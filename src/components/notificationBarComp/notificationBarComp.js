import Link from 'next/link';
import { MdArrowDropDown, MdLogin, MdOutlineCall, MdOutlineLanguage, MdTranslate } from 'react-icons/md';
import availableCountries from '@/data/availableCountries.json';
import Image from 'next/image';
import getURL from '@/utils/getURL';
import { useRouter } from 'next/router';
import specialPages from '@/data/specialPages.json';

export default function NotificationBarComp({ componentData, pageInfo }) {
    const router = useRouter();
    const visibility = specialPages?.global?.some((page) => router.asPath.startsWith(`/${page}`));
    const currentCountry = availableCountries.find((cont) => cont.shortname.toLowerCase() === pageInfo?.country);
    const hidden = componentData?.hide?.includes(pageInfo?.page);

    function handleCookies(country) {
        if (typeof window !== 'undefined' && country) {
            const cookieName = 'country';
            document.cookie = `${cookieName}=${country}; path=/; max-age=3600`; // 1 hour
        }
    }
    // Store the 'country' cookie value
    if (componentData && !hidden) {
        return (
            <div className='py-3 border border-b'>
                <div className='container flex  gap-6 justify-end '>
                    {currentCountry?.languages && (
                        <div className='dropdown'>
                            <div tabIndex={0} role='button' className='flex gap-1 items-center '>
                                <MdTranslate fontSize={16} />
                                {currentCountry?.language}
                                <MdArrowDropDown fontSize={16} />
                            </div>
                            <div tabIndex={0} className='dropdown-content bg-neutral z-[9999] w-32 rounded shadow'>
                                <ul>
                                    {currentCountry?.languages?.map((language, index) => {
                                        return (
                                            <li
                                                className='cursor-pointer'
                                                key={index}
                                                onClick={() => {
                                                    handleCookies(language?.link);
                                                }}
                                            >
                                                <a
                                                    href={getURL('country', language?.link, pageInfo)}
                                                    className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '
                                                >
                                                    {language?.language}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    )}
                    {!visibility && (
                        <div className='dropdown'>
                            <div tabIndex={0} role='button' className='flex gap-1 items-center '>
                                {currentCountry?.shortname ? (
                                    <Image
                                        src={`/assets/country-flags/${currentCountry?.shortname.toLowerCase()}.svg`}
                                        width={18}
                                        height={18}
                                        alt={currentCountry?.shortname.toLowerCase()}
                                        loading='lazy'
                                    />
                                ) : (
                                    <MdOutlineLanguage fontSize={16} />
                                )}

                                {currentCountry?.name || 'Global'}
                                <MdArrowDropDown fontSize={16} />
                            </div>
                            <div tabIndex={0} className='dropdown-content bg-neutral z-[9999] w-60 rounded shadow'>
                                <ul>
                                    <li
                                        className='cursor-pointer '
                                        onClick={() => {
                                            handleCookies('global');
                                        }}
                                    >
                                        {pageInfo?.country === 'global' ? (
                                            <div className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '>
                                                <Image
                                                    src={`/assets/country-flags/global.svg`}
                                                    width={18}
                                                    height={18}
                                                    alt='global'
                                                    loading='lazy'
                                                />
                                                Global
                                            </div>
                                        ) : (
                                            <a
                                                href={getURL('country', 'global', pageInfo)}
                                                className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '
                                            >
                                                <Image
                                                    src={`/assets/country-flags/global.svg`}
                                                    width={18}
                                                    height={18}
                                                    alt='global'
                                                    loading='lazy'
                                                />
                                                Global
                                            </a>
                                        )}
                                    </li>
                                    {/* /* Render the country list */}
                                    {availableCountries.map((cont, index) => {
                                        if (!cont?.hide)
                                            return (
                                                <li
                                                    key={index}
                                                    className='cursor-pointer'
                                                    onClick={() => {
                                                        handleCookies(cont?.shortname.toLowerCase());
                                                    }}
                                                >
                                                    {pageInfo?.country === cont?.shortname.toLowerCase() ? (
                                                        <div className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '>
                                                            {/* /* ${cont?.shortname} == 'in,us,gb etc. */}
                                                            <Image
                                                                src={`/assets/country-flags/${cont?.shortname.toLowerCase()}.svg`}
                                                                width={18}
                                                                height={18}
                                                                alt={cont?.name}
                                                                loading='lazy'
                                                            />

                                                            {cont?.name}
                                                        </div>
                                                    ) : (
                                                        <a
                                                            href={getURL(
                                                                'country',
                                                                cont?.shortname.toLowerCase(),
                                                                pageInfo
                                                            )}
                                                            className='px-2 py-1 hover:bg-secondary flex items-center gap-2 cursor-pointer '
                                                        >
                                                            {/* /* ${cont?.shortname} == 'in,us,gb etc. */}
                                                            <Image
                                                                src={`/assets/country-flags/${cont?.shortname.toLowerCase()}.svg`}
                                                                width={18}
                                                                height={18}
                                                                alt={cont?.name}
                                                                loading='lazy'
                                                            />

                                                            {cont?.name}
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
                        className='text-link flex gap-1 items-center'
                        href={getURL('contact-us', 'contact-us', pageInfo)}
                    >
                        <MdOutlineCall className='text-2xl sm:text-xl' />
                        <span className='hidden sm:block'>{componentData?.support}</span>
                    </a>
                    <a
                        className='text-link flex gap-1 items-center'
                        href={process.env.LOGIN_URL || 'https://control.msg91.com/signin/'}
                    >
                        <MdLogin className='text-2xl sm:text-xl' />
                        <span className='hidden sm:block'>{componentData?.login}</span>
                    </a>
                </div>
            </div>
        );
    }
}
