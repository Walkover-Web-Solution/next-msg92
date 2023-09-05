const Layout = require("../../../components/layout");
const TagPostList = require("../../../components/tagPostList");
const config = require('../../../components/lib/config');
const { countPosts, listPostContent } = require("../../../components/lib/posts");
const { getTag, listTags } = require("../../../components/lib/tags");
import Pagination from "@/components/pagination";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Index({ posts, tag, pagination, page }) {
 const router  = useRouter();


 const handleClick = () =>{
   router.back();
 }

  console.log(posts[0].title, "post in Index page");
  console.log(tag, "tag in Index page");
  console.log(pagination, "pagination in Index page");
  console.log(page,"page in Index page");
  // const relatedPost = posts.map((data)=>{
//     <a className="blog-card" href={"/guide/" + post.slug}>      
//     <Date date={parseISO(post.date)} />
//    {post?.thumbnail !== "" && <img src = {post?.thumbnail} />}
//     <div className="title">{post?.title}</div>
// </a>
  // })
  const url = `/guide/tags/${tag}` + (page ? `/${page}` : "");
//   const title = tag.name; 
  return (
  
    <div className={"container blog-home-container"}>
      <div className={"posts"}>
      <div className={"post-list"}>
      {posts.map((data)=>{
        console.log(data.title,"what");
        return(<div className="blog-card"><a href={`/guide/${data.slug}`}>{data.title}{data?.thumbnail !== "" && <img src = {data?.thumbnail} />}</a></div>)
      })}
     {/* <TagPostList posts={posts} tag={tag} pagination={pagination} /> */}
     <Pagination
        current={pagination.current}
        pages={pagination.pages}
        link={{
          href: () => "/guide/tags/[[...slug]]",
          as: (page) =>
            page === 1
              ? "/guide/tags/" + tag
              : `/guide/tags/${tag}/${page}`,
        }}
      />
     </div>
      </div>
     <div>
      <button onClick={handleClick}>Back</button>
     </div>
      </div>
  );
}

export async function getStaticProps({ params }) {
    let queries = []
    queries = params.slug;
  const [slug, page] = [queries[0], queries[1] || 1];
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
  const paths = listTags().flatMap((tag) => {
    const pages = Math.ceil(countPosts(tag.slug) / config.posts_per_page);

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