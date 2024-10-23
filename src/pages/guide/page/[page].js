import Layout from '@/components/Guide/layout';
import { countPosts, listPostContent } from '@/components/Guide/lib/posts';
import { listTags } from '@/components/Guide/lib/tags';
import PostList from '@/components/Guide/page/PostList';
import Head from 'next/head';
// import Head from "next/head";
export default function Index({ posts, tags, pagination }) {
    const url = '/guide';
    const title = 'All posts';
    return (
        <>
            <Head>
                <title>Page {pagination.current} | MSG91 Guide </title>
            </Head>
            <Layout>
                <PostList posts={posts} tags={tags} pagination={pagination} />
                {/* <TagPostList post ={posts} tags={tags} pagination={pagination} /> */}
            </Layout>
        </>
    );
}

export async function getStaticProps({ params }) {
    const page = parseInt(params.page);
    const posts = listPostContent(page, 18);
    const tags = listTags();
    const pagination = {
        current: page,
        pages: Math.ceil(countPosts() / 18),
    };
    return {
        props: {
            page,
            posts,
            tags,
            pagination,
        },
    };
}
export const getStaticPaths = async () => {
    const pages = Math.ceil(countPosts() / 18);
    const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
        params: { page: (it + 2).toString() },
    }));
    return {
        paths: paths,
        fallback: false,
    };
};
