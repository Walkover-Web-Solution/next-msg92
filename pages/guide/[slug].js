import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import * as fs from "fs";
import { fetchPostContent } from '../../components/lib/posts';

// import Test from '../components/test'

// const components = { Test }

const slugToPostContent = (postContents => {
 
    let hash = {}
    let fullPath = {}
    postContents.map((data)=>{
      fullPath = data.fullPath
    })
    postContents?.forEach(it => hash[it.slug] = it)
    return hash;
  })(fetchPostContent());
  // const d = fetchPostContent()

  const postContent = fetchPostContent();
export default function TestPage({ source }) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} />
    </div>
  )
}

export async function getStaticPaths() {
  // const paths = [];
  const paths = fetchPostContent().map(it => "/guide/" + it.slug);
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
  const slugData = slug.params.slug;
    const source = fs.readFileSync(slugToPostContent[slugData]?.fullPath, "utf8");
  // MDX text - can be from a local file, database, anywhere
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}