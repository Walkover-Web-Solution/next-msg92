import Image from 'next/image';
import Link from 'next/link';
import { MdMenu } from 'react-icons/md';

export default function MenuBarComp({ componentData, pageInfo }) {
    const getPricingPath = () => {
        let path = '/pricing/hello';
        switch (pageInfo?.country) {
            case 'global':
                if (pageInfo?.page !== 'pricing') {
                    path = '/pricing/' + ((pageInfo?.page !== 'home' && pageInfo?.page) || 'hello');
                } else {
                    path = '/pricing/hello';
                }
                break;

            default:
                if (pageInfo?.page !== 'pricing') {
                    path =
                        '/' +
                        pageInfo?.country +
                        '/pricing/' +
                        ((pageInfo?.page !== 'home' && pageInfo?.page) || 'hello');
                } else {
                    path = '/' + pageInfo?.country + '/pricing/' + 'hello';
                }
                break;
        }
        return process.env.NEXT_PUBLIC_BASE_URL + path;
    };

    if (componentData) {
        return (
            <div>
                <div className='container hidden lg:flex items-center py-5 '>
                    <ul className='w-full flex gap-6'>
                        <li className='text-link'>{componentData?.products}</li>
                        <li className='text-link'>{componentData?.integrations}</li>
                        <Link className='text-link' href={getPricingPath()}>
                            {componentData?.pricing}
                        </Link>
                    </ul>
                    <div className='w-full items-center flex justify-center'>
                        <Image
                            src={'/assets/brand/msg91.svg'}
                            width={300}
                            height={100}
                            className='h-[40px] w-auto'
                            alt='MSG91'
                        />
                    </div>
                    <ul className='w-full flex justify-end gap-6'>
                        <li className='text-link'>{componentData?.apidocs}</li>
                        <Link className='btn btn-primary btn-sm uppercase' href={'/signup'}>
                            {componentData?.signup_btn}
                        </Link>
                    </ul>
                </div>
                <div className='container flex lg:hidden items-center justify-between py-5 '>
                    <Image
                        src={'/assets/brand/msg91.svg'}
                        width={300}
                        height={100}
                        className='h-[30px] w-auto'
                        alt='MSG91'
                    />
                    <button className='btn btn-icon'>
                        <MdMenu fontSize={24} />
                    </button>
                </div>
            </div>
        );
    }
}
