// const { GetStaticPaths, GetStaticProps } = require("next");
const Layout = require("../../../components/layout");
// const BasicMeta = require("../../../components/meta/basicMeta");
// const OpenGraphMeta = require("../../../components/meta/OpenGraphMeta");
// const TwitterCardMeta = require("../../../components/meta/TwitterCardMeta");
const TagPostList = require("../../../components/tagPostList");
const config = require('../../../components/lib/config');
const { countPosts, listPostContent } = require("../../../components/lib/posts");
const { getTag, listTags } = require("../../../components/lib/tags");
import Link from "next/link";
import { useRouter } from "next/router";

// const list = listTags();
// console.log(list, "0086699999");

export default function Index({ posts, tag, pagination, page }) {
 const router = useRouter();
  const handleClick = () => {
   console.log("clicked");
    router.push('/guide')
  }
  console.log(posts[0].title, "post in Index page");
  console.log(tag, "tag in Index page");
  console.log(pagination, "pagination in Index page");
  console.log(page,"page in Index page");
  // const relatedPost = posts.map((data)=>{
  
  // })
  const url = `/guide/tags/${tag}` + (page ? `/${page}` : "");
//   const title = tag.name; 
  return (
  
    <div>
      {posts.map((data)=>{
        console.log(data.title,"what");
        return(<div className="d-flex p-2"><Link href={`/guide/${data.slug}`}>{data.title}</Link></div>)
      })}
     {/* <TagPostList posts={posts} tag={tag} pagination={pagination} /> */}
     <div>
      <button onClick={handleClick}>Back</button>
     </div>
      </div>
  );
}

export async function getStaticProps({ params }) {
    console.log(params, "params");
    let queries = []
    queries = params.slug;
  console.log(queries, "queries in tags");
  const [slug, page] = [queries[0], 1];
  console.log(slug, page, "slug page in single");
  const posts = listPostContent(
    page ? parseInt(page) : 1,
    config.posts_per_page,
    slug
  );
  console.log(posts, "posts in posts single");
  const tag = getTag(slug);
  console.log(tag, "tags in tag single");

  const pagination = {
    current: page ? parseInt(page) : 1,
    pages: Math.ceil(countPosts(slug) / config.posts_per_page),
  };
  console.log(pagination, "pagination in single");
  const props = {
    posts,
    tag,
    pagination: { current: pagination.current, pages: pagination.pages },
    page,
  };
  console.log(props ,"props in single");
  if (page) {
    console.log("inside page conditions");
    console.log(props.page, "inside page conditions single");
    props.page = page;
  }
  console.log(props, "inside props single");
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