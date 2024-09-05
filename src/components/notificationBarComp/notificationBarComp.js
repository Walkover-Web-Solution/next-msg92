import Link from 'next/link';
import { MdArrowDropDown, MdOutlineCall, MdOutlineLanguage } from 'react-icons/md';
import availableCountries from '@/data/availableCountries.json';
import Image from 'next/image';
import getRelativeURL from '@/utils/getRelativeURL';
export default function NotificationBarComp({ componentData, country }) {
    const currentCountry = availableCountries.find((cont) => cont.shortName === country);
    if (componentData) {
        return (
            <div className='py-1 border border-b'>
                <div className='container flex gap-6 justify-end '>
                    <div className='dropdown'>
                        {/* /* Render the currentCountry in notification bar */}
                        <div tabIndex={0} role='button' className='flex gap-1 items-center '>
                            {currentCountry?.shortName ? (
                                <Image
                                    src={`/assets/country-flags/${currentCountry?.shortName}.svg`}
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
                                    <a href={`/`} className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '>
                                        <Image src={`/assets/country-flags/global.svg`} width={18} height={18} />
                                        Global
                                    </a>
                                </li>
                                {/* /* Render the country list */}
                                {availableCountries.map((cont, index) => {
                                    return (
                                        <li key={index} className='cursor-pointer'>
                                            <a
                                                href={getRelativeURL(cont?.shortName, 'country')}
                                                className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '
                                            >
                                                {/* /* ${cont?.shortName} == 'in,us,gb etc. */}
                                                <Image
                                                    src={`/assets/country-flags/${cont?.shortName}.svg`}
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

                    <Link className='text-link flex gap-1 items-center' href={'/contact-us'}>
                        <MdOutlineCall fontSize={16} />
                        {componentData?.support}
                    </Link>
                    <Link className='text-link ' href={'/signin'}>
                        {componentData?.login}
                    </Link>
                </div>
            </div>
        );
    }
}
