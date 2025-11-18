import Link from 'next/link';
import { MdArrowDropDown, MdLogin, MdOutlineCall, MdOutlineLanguage, MdTranslate } from 'react-icons/md';
import availableCountries from '@/data/availableCountries.json';
import Image from 'next/image';
import getURL from '@/utils/getURL';
import { useRouter } from 'next/router';
import specialPages from '@/data/specialPages.json';
import { useState } from 'react';
export default function NotificationBarComp({ componentData, pageInfo }) {
    const router = useRouter();
    const visibility = specialPages?.global?.some((page) => router.asPath.startsWith(`/${page}`));
    const currentCountry = availableCountries.find((cont) => cont.shortname.toLowerCase() === pageInfo?.country);
    const hidden = componentData?.hide?.includes(pageInfo?.page);
    const [showModal, setShowModal] = useState(false);
    function handleCookies(country) {
        if (typeof window !== 'undefined' && country) {
            const cookieName = 'country';
            document.cookie = `${cookieName}=${country}; path=/; max-age=3600`; // 1 hour
        }
    }
    // Store the 'country' cookie value
    if (componentData && !hidden) {
        return (
            <div className='py-3 border border-b flex'>
                <div className='container flex justify-between items-center flex-col sm:flex-row gap-2'>
                    <div className='text-sm flex flex-col gap-0'>
                        <span className='text-red-500 rounded-md'>
                            Today, due to Cloudflare outage, MSG91, ChatGPT, Canva and multiple other website
                            experienced intermittent downtime.
                        </span>

                        <span className='flex items-center gap-1 text-red-500 '>
                            <span className='text-blue-500 cursor-pointer' onClick={() => setShowModal(true)}>
                                Click here
                            </span>
                            for the best possible solution.
                        </span>
                    </div>
                    <div className='flex gap-6 justify-end w-full sm:w-auto'>
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

                {showModal && (
                    <div
                        className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
                        onClick={() => setShowModal(false)}
                    >
                        <div
                            className='bg-white rounded shadow-lg p-6 max-w-2xl w-full relative'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className='flex justify-end'>
                                <button
                                    className='text-gray-700 hover:text-gray-900 text-xl'
                                    onClick={() => setShowModal(false)}
                                    aria-label='Close Modal'
                                >
                                    &times;
                                </button>
                            </div>
                            <div className='mb-4 text-lg font-medium'>
                                <div>
                                    <p>
                                        To ensure uninterrupted service during outages like these, please use the
                                        following <b>backup endpoint</b> whenever Cloudflare DNS is down:
                                    </p>
                                    <div className='my-3 p-3 bg-gray-100 rounded font-mono text-blue-800 select-all break-all'>
                                        <a
                                            href='https://msg91backup.phone91.com/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='underline text-blue-700 hover:text-blue-900'
                                        >
                                            https://msg91backup.phone91.com
                                        </a>
                                    </div>
                                    <ul className='list-disc pl-6 text-sm text-gray-700 mb-2 '>
                                        <li className='mb-2'>
                                            <b>Note:</b> This is only a backup endpoint, not the main URL, hence should
                                            only be used in emergencies. Please keep it configured as a reserved
                                            fallback only.
                                        </li>
                                        <li>
                                            <b>Example:</b> If your primary request to <b>https://control.msg91.com/</b>{' '}
                                            times out, retry the request using the backup endpoint above.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
