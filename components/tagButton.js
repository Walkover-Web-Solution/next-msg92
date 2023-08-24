import Link from "next/link";
// import { TagContent } from "../lib/tags";
export default function TagButton({ tag }) {
  console.log(tag, "tag button");
//   const tagMain = JSON.stringify(tag)
//   const tagContent = tagMain?.split("'")[1];
//   const tagggggg = tagContent?.split("#")[1];
//   console.log(tagggggg, "taggggggg");
//   console.log(tagContent, "tag content");
//   console.log(tagMain?.split("#")[1], "tag main");
  return (
    <>
      <Link legacyBehavior href="/guide/tags/[tag]" as={`/guide/tags/${tag}`}>
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
