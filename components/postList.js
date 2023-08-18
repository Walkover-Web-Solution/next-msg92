import React from "react";
import PostItem from "./postItem";
// import TagLink from "./TagLink";
// import Pagination from "./Pagination";

export default function PostList({ posts, tags, pagination }) {
    console.log(posts, "12345 postlist");
  return (
    <div className={"container"}>
      <div className={"posts"}>
        <ul className={"post-list"}>
            <li>post item</li>
          {posts?.map((it, i) => (
            
            <li key={i}>
              <PostItem post={it} />
            </li>
          ))}
        </ul>
        {/* <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? "/posts" : "/posts/page/[page]"),
            as: (page) => (page === 1 ? null : "/posts/page/" + page),
          }}
        /> */}
      </div>
      <ul className={"categories"}>
        <li>hello in list</li>
      </ul>
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .posts {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .posts li {
          margin-bottom: 1.5rem;
        }
        .post-list {
          flex: 1 0 auto;
        }
        .categories {
          display: none;
        }
        .categories li {
          margin-bottom: 0.75em;
        }

        @media (min-width: 769px) {
          .categories {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
