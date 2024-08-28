import styles from '@/components/NotificationBarComp/NotificationBarComp.module.scss';
import Link from 'next/link';
import { MdArrowDropDown, MdMoveDown, MdOutlineCall, MdOutlineLanguage, MdPinDrop } from 'react-icons/md';
export default function NotificationBarComp({ country }) {
    const pageData = require(`@/data/${country}/common.json`);
    const componentData = pageData?.notification;

    return (
        <div className='py-1 border border-b'>
            <div className='container flex gap-6 justify-end '>
                <span className='flex gap-1 items-center'>
                    <MdOutlineLanguage fontSize={16} />
                    {componentData?.support}
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
