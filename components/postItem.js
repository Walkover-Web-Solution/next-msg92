import Date from "./date";
import Link from "next/link";
import { parseISO } from "date-fns";

export default function PostItem({ post }) {
    console.log(post,"99999")
  return (
    <a href={"/guide/" + post.slug}>{post.title}
      
        <Date date={parseISO(post.date)} />
        <h2>{post.title}</h2>
        <style jsx>
          {`
            a {
              color: #222;
              display: inline-block;
            }
            h2 {
              margin: 0;
              font-weight: 500;
            }
          `}
        </style>
      
    </a>
  );
}
