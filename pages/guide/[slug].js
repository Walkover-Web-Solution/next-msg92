import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from "fs";
import { fetchPostContent } from '../../components/lib/posts';

// import Test from '../components/test'

// const components = { Test }

const slugToPostContent = (postContents => {
  // console.log("inside slugToPostContent")
  console.log(postContents, "post contents");
 
    let hash = {}
    let fullPath = {}
    postContents.map((data)=>{
      console.log(data.fullPath,"map data full");
      fullPath = data.fullPath
    })
    // postContents?.forEach(it => hash[it.slug] = it)
    // console.log(hash, "hash");
    return fullPath;
  })(fetchPostContent());
  // const d = fetchPostContent()

  const postContent = fetchPostContent();
  // console.log(fullPath, "full path");
  console.log(postContent, "post content in fetch post content");
export default function TestPage({ source }) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} />
    </div>
  )
}

export async function getStaticPaths() {
  // const paths = [];
  const paths = fetchPostContent().map(it => "/guide/" + "test-blog");
  console.log(paths, "paths");
      // paths.push({
      //   params: {
      //     slug: "mastering-the-art-of-effective-communication-unveiling-the-secrets-to-successful-sms-campaigns-for-engaging-audiences"          
      //   },
      // });    
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(slug) {
  console.log(slug, "slugggg");
  const slugData = slug.params.slug;
  // console.log(slug, "big slug");
    // console.log('slug in slug file',JSON.stringify(slug.params.slug));
    console.log(slugData, "-------------------------------");
  //  const slugPath = JSON.stringify(params.params.slug);
  //  console.log(slugPath, "slug path");
  //  const fullPath = 'mastering-the-art-of-effective-communication-unveiling-the-secrets-to-successful-sms-campaigns-for-engaging-audiences'
    // const source = fs.readFileSync(slugToPostContent[slugData]?.fullPath, "utf8");
    // const source = fs.readFileSync(slugToPostContent[slugData]?.fupath, "utf8");

    // const source = fs.readFileSync("/Users/anshdubey/Downloads/msg91-next/next-msg92/_posts/blog/test-blog.mdx", "utf8");
    const source = fs.readFileSync(fullPath, "utf8");
    console.log(source, "source in slug");
    // const source = "hello"
  // MDX text - can be from a local file, database, anywhere
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}