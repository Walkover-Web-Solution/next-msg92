// const { GetStaticPaths, GetStaticProps } = require("next");
const Layout = require("../../../components/layout");
// const BasicMeta = require("../../../components/meta/basicMeta");
// const OpenGraphMeta = require("../../../components/meta/OpenGraphMeta");
// const TwitterCardMeta = require("../../../components/meta/TwitterCardMeta");
const TagPostList = require("../../../components/tagPostList");
const config = require('../../../components/lib/config');
const { countPosts, listPostContent } = require("../../../components/lib/posts");
const { getTag, listTags } = require("../../../components/lib/tags");

export default function Index({ posts, tag, pagination, page }) {
    console.log(posts, "post in Index page");
  console.log(tag, "tag in Index page");
  const url = `/guide/tags/${tag}` + (page ? `/${page}` : "");
//   const title = tag.name; 
  return (
    <Layout>
      <p>hello</p>
      {/* <BasicMeta url={url} title={title} /> */}
      {/* <OpenGraphMeta url={url} title={title} /> */}
      {/* <TwitterCardMeta url={url} title={title} /> */}
      <TagPostList posts={posts} tag={tag} pagination={pagination} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
    console.log(params, "params");
  const queries = params.slug;
  const [slug, page] = [queries[0], queries[1]];
  const posts = listPostContent(
    page ? parseInt(page) : 1,
    config.posts_per_page,
    slug
  );
  const tag = getTag(slug);
  const pagination = {
    current: page ? parseInt(page) : 1,
    pages: Math.ceil(countPosts(slug) / config.posts_per_page),
  };
  const props = {
    posts,
    tag,
    pagination: { current: pagination.current, pages: pagination.pages },
    page,
  };
  if (page) {
    props.page = page;
  }
  return {
    props,
  };
}

export async function getStaticPaths() {

  console.log("inside get static paths, please");
  const paths = listTags().flatMap((tag) => {
    const pages = Math.ceil(countPosts(tag.slug) / config.posts_per_page);
    console.log(pages, "pages in tag slug");
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            params: { slug: [tag.slug] },
          }
        : {
            params: { slug: [tag.slug, (page + 1).toString()] },
          }
    );
  });
  console.log(paths, "path in tags slug")
  return {
    paths: paths,
    fallback: false,
  };
}

// module.exports = {
//   // Index,
//   getStaticProps,
//   getStaticPaths,
// };