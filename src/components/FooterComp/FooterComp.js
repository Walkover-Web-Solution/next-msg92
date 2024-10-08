import getRelativeURL from '@/utils/getRelativeURL';
import Link from 'next/link';

export default function FooterComp({ componentData, pageInfo }) {
    const hidden = componentData?.hide.includes(pageInfo?.page);

    if (componentData && !hidden) {
        return (
            <>
                <div className='bg-gray-800 pt-16 pb-10'>
                    <div className='container text-white grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10  '>
                        <div className='flex flex-col gap-10 w-full'>
                            {componentData?.products?.links.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <span className='font-semibold'>{componentData?.products?.name}</span>
                                    <ul className='flex flex-col gap-2'>
                                        {componentData?.products?.links.map((link, index) => {
                                            return (
                                                <li key={index} className='text-link-white'>
                                                    <Link
                                                        href={getRelativeURL(link?.link, 'product')}
                                                        className='text-gray-200 '
                                                    >
                                                        {link?.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                            {componentData?.utilities?.links.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <span className='font-semibold'>{componentData?.utilities?.name}</span>
                                    <ul className='flex flex-col gap-2'>
                                        {componentData?.utilities?.links.map((link, index) => {
                                            return (
                                                <li key={index} className='text-link-white'>
                                                    <Link
                                                        href={getRelativeURL(link?.link, 'product')}
                                                        className='text-gray-200'
                                                    >
                                                        {link?.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col gap-10 w-full'>
                            {componentData?.channels?.links.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <span className='font-semibold'>{componentData?.channels?.name}</span>
                                    <ul className='flex flex-col gap-2'>
                                        {componentData?.channels?.links.map((link, index) => {
                                            return (
                                                <li key={index} className='text-link-white'>
                                                    <Link
                                                        href={getRelativeURL(link?.link, 'product')}
                                                        className='text-gray-200'
                                                    >
                                                        {link?.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                            {componentData?.resources?.links.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <span className='font-semibold'>{componentData?.resources?.name}</span>
                                    <ul className='flex flex-col gap-2'>
                                        {componentData?.resources?.links.map((link, index) => {
                                            return (
                                                <li key={index} className='text-link-white'>
                                                    <Link
                                                        href={getRelativeURL(link?.link, 'product')}
                                                        className='text-gray-200'
                                                    >
                                                        {link?.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col gap-10 w-full'>
                            {componentData?.discover?.links.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <span className='font-semibold'>{componentData?.discover?.name}</span>
                                    <ul className='flex flex-col gap-2'>
                                        {componentData?.discover?.links.map((link, index) => {
                                            return (
                                                <li key={index} className='text-link-white'>
                                                    <Link href={link?.link} className='text-gray-200'>
                                                        {link?.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='bg-gray-900 pt-10 pb-16'>
                    <div className='container text-white flex  '>
                        <ul className='flex flex-wrap gap-4'>
                            {componentData?.policies?.links.length > 0 &&
                                componentData?.policies?.links.map((link, index) => {
                                    return (
                                        <li key={index} className='flex items-center gap-4'>
                                            <Link
                                                href={getRelativeURL(link?.link, 'product')}
                                                className='text-gray-200 text-link-white  '
                                            >
                                                {link?.name}
                                            </Link>
                                            <span>|</span>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}
