import Link from "next/link";
export default function TagButton({ tag }) {
  return (
    <>
      <Link legacyBehavior href={"/guidetags/[[...slug]]"} as={`/guide?tags=${tag}`}>
        {tag}
      </Link>
    </>
  );
}