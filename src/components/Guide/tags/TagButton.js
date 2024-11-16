import Link from 'next/link';
export default function TagButton({ tag }) {
    return (
        <>
            <Link
                className='bg-gray-300 py-1 px-3 rounded-full'
                legacyBehavior
                href={'/guide/tags/[[...slug]]'}
                as={`/guide/tags/${tag}`}
            >
                {tag}
            </Link>
        </>
    );
}
