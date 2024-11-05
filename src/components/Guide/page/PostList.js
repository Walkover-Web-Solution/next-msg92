import React from 'react';
import Pagination from './Pagination';
import PostItem from './PostItem';

export default function PostList({ posts, tags, pagination }) {
    return (
        <div className='bg-[#cce1dc]'>
            <div className='container  mx-auto gap-6 py-20 '>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 '>
                    {posts?.map((post, index) => post.slug && <PostItem key={index} post={post} />)}
                </div>
                <div>
                    <Pagination
                        current={pagination.current}
                        pages={pagination.pages}
                        link={{
                            href: (page) => (page === 1 ? '/guide' : '/guide/page/[page]'),
                            as: (page) => (page === 1 ? null : '/guide/page/' + page),
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
