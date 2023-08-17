import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import data from "@/data/content.json";
//import fs from "fs";

// import Test from '../components/test'

// const components = { Test }

/* const slugToPostContent = (postContents => {
    let hash = {}
    postContents.forEach(it => hash[it.slug] = it)
    return hash;
  })(fetchPostContent()); */

export default function TestPage({ source }) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} />
    </div>
  )
}

export async function getStaticPaths() {
  const paths = [];
  
      paths.push({
        params: {
          slug: "mastering-the-art-of-effective-communication-unveiling-the-secrets-to-successful-sms-campaigns-for-engaging-audiences"          
        },
      });    
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(slug) {
    console.log('slug',slug.params.slug);
    //const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
    const source = "hello"
  // MDX text - can be from a local file, database, anywhere
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}