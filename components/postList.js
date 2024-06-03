import React from "react";
import PostItem from "./postItem";
import Pagination from "./pagination";
import NopageComp from "./404Comp/404Comp";
// import TagButton from "./tagButton";

export default function PostList({ posts, pagination, rawPath, tag, page }) {
    if (posts?.length) {
        return (
            <div className="blog">
                <div className={"container blog-home-container"}>
                    <div className={"posts"}>
                        <div className={"post-list"}>
                            {posts?.map((it, i) => (
                                <PostItem key={i} post={it} />
                            ))}
                        </div>
                        {pagination?.pages > 1 && (
                            <Pagination
                                current={pagination.current}
                                pages={pagination.pages}
                                rawPath={rawPath}
                                tag={tag}
                                page={page}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return <NopageComp />;
    }
}
