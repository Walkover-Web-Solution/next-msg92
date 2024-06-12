import React from "react";
import PostItem from "./postItem";
import Pagination from "./pagination";
// import TagButton from "./tagButton";

export default function PostList({ posts, pagination, pageQurey, limit }) {
    const startWith = pageQurey?.page ? pageQurey.page * limit : 0;
    const endWith = pageQurey?.page ? pageQurey.page * limit + limit : limit;
    return (
        <div className="blog">
            <div className={"container blog-home-container"}>
                <div className={"posts"}>
                    <div className={"post-list"}>
                        {posts?.slice(startWith, endWith)?.map((it, i) => (
                            <PostItem key={i} post={it} />
                        ))}
                    </div>
                    <Pagination current={pageQurey?.page} pages={pagination.pages} pageQurey={pageQurey} />
                </div>
            </div>
        </div>
    );
}
