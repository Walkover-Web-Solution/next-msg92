import { MdArrowDropDown, MdCall, MdLogin, MdOutlineLanguage } from 'react-icons/md';

export default function NotificationBar({ data, pageInfo }) {
    return (
        <div className='container flex  justify-between py-2 '>
            {/* <span>The quick brown fox jumps over the lazy dog</span> */}
            <div className=' ms-auto flex gap-6 items-center'>
                <div className='flex items-center gap-1 text-link'>
                    <MdOutlineLanguage className='text-lg' />
                    Global
                    <MdArrowDropDown className='text-lg' />
                </div>
                <div className='flex items-center gap-1 text-link'>
                    <MdCall className='text-lg' />
                    {data?.support}
                </div>
                <div className='flex items-center gap-1 text-link'>
                    <MdLogin className='text-lg' />
                    {data?.login}
                </div>
            </div>
        </div>
    );
}
