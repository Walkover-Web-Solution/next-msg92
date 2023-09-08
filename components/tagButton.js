import Link from "next/link";
import TagContent  from "./lib/tags";
export default function TagButton({ tag }) {
  return (
    <>
      <Link legacyBehavior href={"/guide/tags/[[...slug]]"} as={`/guide/tags/${tag}`}>
        <a>{tag}</a>
      </Link>
      <style jsx>{`
        a {
          display: inline-block;
          border-radius: 3px;
          background-color: rgba(21, 132, 125, 0.2);
          color: #15847d;
          transition: background-color 0.3s ease;
          padding: 0.25em 0.5em;
        }
        a:active,
        a:hover {
          background-color: rgba(21, 132, 125, 0.4);
        }
      `}</style>
    </>
  );
}