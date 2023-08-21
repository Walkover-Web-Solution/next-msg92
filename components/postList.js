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
      </ul>      
    </div>
  );
}
