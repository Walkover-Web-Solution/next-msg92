import Link from 'next/link';
import { MdArrowDropDown, MdLogin, MdOutlineCall, MdOutlineLanguage, MdTranslate } from 'react-icons/md';
import availableCountries from '@/data/availableCountries.json';
import Image from 'next/image';
import getURL from '@/utils/getURL';
import { useRouter } from 'next/router';

export default function NotificationBarComp({ componentData, pageInfo }) {
    const router = useRouter();
    const visibility = router?.pathname.startsWith('/guide') ? true : false;
    const currentCountry = availableCountries.find((cont) => cont.shortname === pageInfo?.country);
    const hidden = componentData?.hide?.includes(pageInfo?.page);
    const languages = availableCountries?.find(
        (country) => country?.languages && country?.shortname === pageInfo?.country
    );
    if (componentData && !hidden) {
        return (
            <div className='py-3 border border-b'>
                <div className='container flex  gap-6 justify-end '>
                    {languages?.languages && languages?.languages?.length > 0 && (
                        <div className='dropdown'>
                            <div tabIndex={0} role='button' className='flex gap-1 items-center '>
                                <MdTranslate fontSize={16} />
                                {languages?.language}
                                <MdArrowDropDown fontSize={16} />
                            </div>

                            <div tabIndex={0} className='dropdown-content bg-neutral z-[9999] w-32 rounded shadow'>
                                <ul>
                                    {languages?.languages?.map((lang, index) => {
                                        return (
                                            <li key={index} className='cursor-pointer'>
                                                <a
                                                    href={getURL('country', lang?.route, pageInfo)}
                                                    className={`px-2 py-1 hover:bg-secondary flex items-center gap-2 cursor-pointer ${
                                                        pageInfo?.country === lang?.route &&
                                                        'bg-secondary pointer-events-none'
                                                    }`}
                                                >
                                                    {lang?.name}
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
                                    />
                                ) : (
                                    <MdOutlineLanguage fontSize={16} />
                                )}

                                {currentCountry?.name || 'Global'}
                                <MdArrowDropDown fontSize={16} />
                            </div>
                            <div tabIndex={0} className='dropdown-content bg-neutral z-[9999] w-60 rounded shadow'>
                                <ul className='cursor-pointer'>
                                    <li className='cursor-pointer '>
                                        <a
                                            href={getURL('country', 'global', pageInfo)}
                                            className={`px-2 py-1 hover:bg-secondary flex items-center gap-2 cursor-pointer ${
                                                pageInfo?.country === 'global' && 'bg-secondary pointer-events-none'
                                            }`}
                                        >
                                            <Image
                                                src={`/assets/country-flags/global.svg`}
                                                width={18}
                                                height={18}
                                                alt='global'
                                            />
                                            Global
                                        </a>
                                    </li>
                                    {/* /* Render the country list */}
                                    {availableCountries.map((cont, index) => {
                                        if (!cont?.nestedLanguage)
                                            return (
                                                <li key={index} className='cursor-pointer'>
                                                    <a
                                                        href={getURL('country', cont?.shortname, pageInfo)}
                                                        className={`px-2 py-1 hover:bg-secondary flex items-center gap-2 cursor-pointer ${
                                                            pageInfo?.country === cont?.shortname &&
                                                            'bg-secondary pointer-events-none'
                                                        }`}
                                                    >
                                                        {/* /* ${cont?.shortname} == 'in,us,gb etc. */}
                                                        <Image
                                                            src={`/assets/country-flags/${cont?.shortname.toLowerCase()}.svg`}
                                                            width={18}
                                                            height={18}
                                                            alt={cont?.name}
                                                        />

                                                        {cont?.name}
                                                    </a>
                                                </li>
                                            );
                                    })}
                                </ul>
                            </div>
                        </div>
                    )}

                    <Link
                        className='text-link flex gap-1 items-center'
                        href={getURL('contact-us', 'contact-us', pageInfo)}
                    >
                        <MdOutlineCall className='text-2xl sm:text-xl' />
                        <span className='hidden sm:block'>{componentData?.support}</span>
                    </Link>
                    <Link
                        className='text-link flex gap-1 items-center'
                        href={process.env.LOGIN_URL || 'https://control.msg91.com/signin/'}
                    >
                        <MdLogin className='text-2xl sm:text-xl' />
                        <span className='hidden sm:block'>{componentData?.login}</span>
                    </Link>
                </div>
            </div>
        );
    }
}
