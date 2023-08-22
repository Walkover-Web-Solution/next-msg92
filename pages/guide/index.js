

import { listPostContent, countPosts } from '../../components/lib/posts'
// import { getTag, listTags } from "../../components/lib/tags";
import Layout from "../../components/layout";
import PostList from "../../components/postList";
import config from "../../components/lib/config";
// import Head from "next/head";
// const tags = listTags;
// console.log(tags, "67");
export default function Index({ posts, tags, pagination }) {

  const url = "/guide";
  const title = "All posts";
  return (
    <Layout>
      <PostList posts={posts} tags={tags} pagination={pagination} />
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = listPostContent(1,config.posts_per_page);
  // const tags = listTags();
  // console.log(tags, "static-tags");
  const pagination = {
    current: 1,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  };
  return {
    props: {
      posts,
      // tags,
      pagination,
    },
  };
}
