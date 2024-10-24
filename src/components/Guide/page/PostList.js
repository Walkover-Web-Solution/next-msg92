import React from 'react';
import Pagination from './Pagination';
import PostItem from './PostItem';
// import TagButton from "./tagButton";

export default function PostList({ posts, tags, pagination }) {
    return (
        <div className='container'>
            <div className='flex flex-wrap gap-12'>
                {posts?.map((it, i) => (
                    <PostItem key={i} post={it} />
                ))}
            </div>
            <Pagination
                current={pagination.current}
                pages={pagination.pages}
                link={{
                    href: (page) => (page === 1 ? '/guide' : '/guide/page/[page]'),
                    as: (page) => (page === 1 ? null : '/guide/page/' + page),
                }}
            />
        </div>
    );
}
