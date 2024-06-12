import Head from "next/head";
import { listPostContent, countPosts } from "../../components/lib/posts";
import { getTag, listTags } from "../../components/lib/tags";
import Layout from "../../components/layout";
import PostList from "../../components/postList";
import config from "../../components/lib/config";
export default function Index({ posts, tags, pagination, rawPath, limit }) {
    console.log("🚀 ~ Index ~ limit:", limit)
    const pageQurey = {
        page: rawPath?.split("page=")[1] || null,
        tag: rawPath?.split("tag=")[1] || null,
    };

    return (
        <>
            <Head>
                <title>MSG91 Guide</title>
            </Head>
            <Layout>
                <PostList posts={posts} tags={tags} pagination={pagination} pageQurey={pageQurey} limit={6} />
            </Layout>
        </>
    );
}

export async function getStaticProps() {
    const limit = 6;
    const posts = listPostContent(1, config.posts_per_page);
    const tags = listTags();
    const pagination = {
        current: 1,
        pages: Math.ceil(countPosts() / limit),
    };
    return {
        props: {
            posts,
            tags,
            pagination,
            limit
        },
    };
}
