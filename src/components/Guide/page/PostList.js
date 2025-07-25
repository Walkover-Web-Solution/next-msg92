import React from 'react';
import Pagination from './Pagination';
import PostItem from './PostItem';
import MenuBarComp from '@/components/menuBarComp/menuBarComp';

export default function PostList({ posts, tags, pagination }) {
    return (
        <>
            <div className='bg-[#cce1dc]'>
                <div className='container flex flex-col  mx-auto gap-6 py-20 '>
                    <h1 className='text-3xl font-semibold text-center'>
                        Explore the Latest Insights and Updates on MSG91
                    </h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 '>
                        {posts?.map((post, index) => post.slug && <PostItem key={index} post={post} />)}
                    </div>
                    <div>
                        <Pagination current={pagination.current} pages={pagination.pages} />
                    </div>
                </div>
            </div>
        </>
    );
}
