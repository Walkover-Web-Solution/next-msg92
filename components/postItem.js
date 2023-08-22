import Date from "./date";
import Link from "next/link";
import { parseISO } from "date-fns";

export default function PostItem({ post }) {
  return (
    <a href={"/guide/" + post.slug}>      
        <Date date={parseISO(post.date)} />
        <div className="title">{post.title}</div>
    </a>
  );
}
