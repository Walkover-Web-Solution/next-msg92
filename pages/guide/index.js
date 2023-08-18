

import { listPostContent, countPosts } from '../../components/lib/posts'
// import { listTags } from "../../lib/tags";
import Layout from "../../components/layout";
import PostList from "../../components/postList";
// import config from "../../lib/config";
import Head from "next/head";

export default function Index({ posts, tags, pagination }) {
  console.log(posts, "3456");
  console.log(posts, "post in index");
  const url = "/guide";
  const title = "All posts";
  return (
    <Layout>
      <p>rashi khandelwal</p>
      <PostList posts={posts} tags={tags} pagination={pagination} />
      <PostList post = {"hello1"} />
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = listPostContent(1);
  console.log(posts, "list post content");
  // const tags = listTags();
  const pagination = {
    current: 1,
    pages: Math.ceil(countPosts() / "10"),
  };
  return {
    props: {
      posts,
      // tags,
      pagination,
    },
  };
}
