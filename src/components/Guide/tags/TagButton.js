import Link from 'next/link';
export default function TagButton({ tag }) {
    return (
        <>
            <Link legacyBehavior href={'/guide/tags/[[...slug]]'} as={`/guide/tags/${tag}`}>
                {tag}
            </Link>
        </>
    );
}
