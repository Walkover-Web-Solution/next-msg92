import Layout from '@/components/Guide/layout';
import { countPosts, listPostContent } from '@/components/Guide/lib/posts';
import { listTags } from '@/components/Guide/lib/tags';
import PostList from '@/components/Guide/page/PostList';
import Head from 'next/head';
export default function Index({ posts, tags, pagination }) {
    const url = '/guide';
    const title = 'All posts';
    return (
        <>
            <Head>
                <title>MSG91 Guide</title>
            </Head>
            <Layout>
                <PostList posts={posts} tags={tags} pagination={pagination} />
            </Layout>
        </>
    );
}

export async function getStaticProps() {
    const posts = listPostContent(1, 18);
    const tags = listTags();
    const pagination = {
        current: 1,
        pages: Math.ceil(countPosts() / 18),
    };
    return {
        props: {
            posts,
            tags,
            pagination,
        },
    };
}
