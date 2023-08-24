import Link from "next/link";

export default function Tag({ tag }) {
  console.log(tag, "taglink");
  return (
    <div>
       <Link  legacyBehavior href={"/guide/tags/[[...slug]]"} as={`/guide/tags/${tag}`}>
      <a>{"#" + tag}</a>
    </Link>
    </div>
  );
}
