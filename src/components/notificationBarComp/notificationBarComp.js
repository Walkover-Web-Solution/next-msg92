import Link from 'next/link';
import { MdArrowDropDown, MdOutlineCall, MdOutlineLanguage } from 'react-icons/md';
export default function NotificationBarComp({ componentData, country }) {
    if (componentData) {
        return (
            <div className='py-1 border border-b'>
                <div className='container flex gap-6 justify-end '>
                    <span className='flex gap-1 items-center uppercase'>
                        <MdOutlineLanguage fontSize={16} />
                        {country}
                        <MdArrowDropDown fontSize={16} />
                    </span>
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
