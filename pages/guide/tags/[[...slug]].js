
const config = require('../../../components/lib/config');
const { countPosts, listPostContent } = require("../../../components/lib/posts");
const { getTag, listTags } = require("../../../components/lib/tags");
import Pagination from "@/components/pagination";
import PostItem from "../../../components/postItem";
import { useRouter } from "next/router";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Head from "next/head";
export default function Index({ posts, tag, pagination, page }) {
 const router  = useRouter();


 const handleClick = () =>{
   router.back();
 }

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
    <>
       <Head>
        <title>{tag}</title>
        <meta property="og:title" content={`Explore our collection of articles tagged under ${tag} at GIDHH -The Best Accounting Software. Discover insightful content, tips, and resources related to ${tag}.`} key="title" />
      </Head>
<div className="blog">
<div className={"container blog-home-container"}>
  <div className={"posts"}>
  <button className="d-inline-block btn blog-container__back-btn mb-4" onClick={handleClick} ><MdKeyboardArrowLeft />Back</button>
    <div className={"post-list"}>
      {posts?.map((it, i) => (                        
          <PostItem key={i} post={it} />            
      ))}
    </div>
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
</div>
</>
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