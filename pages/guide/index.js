import Head from "next/head";
import { listPostContent, countPosts } from "../../components/lib/posts";
import { getTag, listTags } from "../../components/lib/tags";
import Layout from "../../components/layout";
import PostList from "../../components/postList";
import config from "../../components/lib/config";
export default function Index({ posts, tags, pagination, rawPath, tag, page }) {
    const url = "/guide";
    const title = "All posts";
    return (
        <>
            <Head>
                <title>MSG91 Guide</title>
            </Head>
            <Layout>
                <PostList posts={posts} tags={tags} pagination={pagination} rawPath={rawPath} tag={tag} page={page} />
            </Layout>
        </>
    );
}
export async function getServerSideProps(context) {
    const { query } = context;
    const tag = query?.tags ? query.tags : null;
    const page = query?.page ? query.page : null;
    const posts = listPostContent(page ? page : 1, config.posts_per_page, tag ? tag : null);
    const tags = listTags();
    const pagination = {
        current: 1,
        pages: Math.ceil(countPosts(tag) / config.posts_per_page),
    };
    return {
        props: {
            posts,
            tags,
            tag,
            page,
            pagination,
        },
    };
}
