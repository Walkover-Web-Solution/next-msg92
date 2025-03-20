import { MdOutlineInfo } from 'react-icons/md';

export default function InfoIcon({ content }) {
    return (
        <div className='tooltip w-fit h-fit tooltip-secondary' data-tip={content}>
            <MdOutlineInfo className='text-gray-500 text-sm' />
        </div>
    );
}
