import Link from 'next/link';
export default function TagButton({ tag }) {
    return (
        <>
            <div className='bg-gray-200 py-1 px-4 rounded-full'>{tag}</div>
            {/* <a
                className='bg-gray-300 py-1 px-3 rounded-full'
                
                href={'/guide/tags/[[...slug]]'}
                as={`/guide/tags/${tag}`}
            >
                {tag}
            </a> */}
        </>
    );
}
