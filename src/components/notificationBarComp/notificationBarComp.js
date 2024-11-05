import Link from 'next/link';
import { MdArrowDropDown, MdOutlineCall, MdOutlineLanguage, MdTranslate } from 'react-icons/md';
import availableCountries from '@/data/availableCountries.json';
import Image from 'next/image';
import getURL from '@/utils/getURL';
import { useRouter } from 'next/router';

export default function NotificationBarComp({ componentData, pageInfo }) {
    const router = useRouter();
    const visibility = router?.pathname.startsWith('/guide') ? true : false;
    const currentCountry = availableCountries.find((cont) => cont.shortname.toLowerCase() === pageInfo?.country);
    const hidden = componentData?.hide?.includes(pageInfo?.page);
    if (componentData && !hidden) {
        return (
            <div className='py-1 border border-b'>
                <div className='container flex gap-6 justify-end '>
                    {['br-pt', 'br'].includes(pageInfo?.country) && (
                        <div className='dropdown'>
                            <div tabIndex={0} role='button' className='flex gap-1 items-center '>
                                <MdTranslate fontSize={16} />
                                {currentCountry?.shortname === 'BR-PT' ? 'Portuguese' : 'English'}
                                <MdArrowDropDown fontSize={16} />
                            </div>
                            <div tabIndex={0} className='dropdown-content bg-neutral z-[9999] w-32 rounded shadow'>
                                <ul>
                                    <li className='cursor-pointer'>
                                        <a
                                            href={getURL('country', 'br')}
                                            className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '
                                        >
                                            English
                                        </a>
                                    </li>
                                    <li className='cursor-pointer'>
                                        <a
                                            href={getURL('country', 'br-pt')}
                                            className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '
                                        >
                                            Portuguese
                                        </a>
                                    </li>
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
                                    />
                                ) : (
                                    <MdOutlineLanguage fontSize={16} />
                                )}

                                {currentCountry?.name || 'Global'}
                                <MdArrowDropDown fontSize={16} />
                            </div>
                            <div tabIndex={0} className='dropdown-content bg-neutral z-[9999] w-60 rounded shadow'>
                                <ul>
                                    <li className='cursor-pointer'>
                                        <a
                                            href={getURL('country', '')}
                                            className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '
                                        >
                                            <Image src={`/assets/country-flags/global.svg`} width={18} height={18} />
                                            Global
                                        </a>
                                    </li>
                                    {/* /* Render the country list */}
                                    {availableCountries.map((cont, index) => {
                                        if (cont?.shortname?.toLowerCase() !== 'br')
                                            return (
                                                <li key={index} className='cursor-pointer'>
                                                    <a
                                                        href={getURL('country', cont?.shortname.toLowerCase())}
                                                        className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '
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

                    <Link className='text-link flex gap-1 items-center' href={'/contact-us'}>
                        <MdOutlineCall fontSize={16} />
                        {componentData?.support}
                    </Link>
                    <Link className='text-link ' href={'https://test.msg91.com/signin/'}>
                        {componentData?.login}
                    </Link>
                </div>
            </div>
        );
    }
}
