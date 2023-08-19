import { serialize } from 'next-mdx-remote/serialize'

import { MDXRemote } from 'next-mdx-remote'
import * as fs from "fs";
import { fetchPostContent } from '../../components/lib/posts';
import yaml  from "js-yaml";

import matter from 'gray-matter';
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

  // const postContent = fetchPostContent();  
export default function TestPage({ source , title, author, date}) {
  return (
    <div className="wrapper">
      <h1>{title}</h1>
      <h6>{author}</h6>
      <p>{date}</p>
      <MDXRemote {...source} />
    </div>
  )
}

export async function getStaticPaths() {
  // const paths = [];
  const paths = fetchPostContent().map(it => "/guide/" + it.staticPath);
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
    const matterResult = matter(source, {
      engines: {
        yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        // engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
      },
    });

    const title = matterResult?.data?.title;
    const author = matterResult?.data?.author;
    const date = matterResult?.data?.date;
    const content = matterResult?.content;
    // console.log(matterResult?.content,"matterResult?.data?");
    // console.log(content,"content00");
  // MDX text - can be from a local file, database, anywhere
  const mdxSource = await serialize(content)
  // const mdxSource = await renderToString(content, { scope: matterResult });
  // console.log(mdxSource,"generated");
  return { props: { source: mdxSource, title: title, author: author, date: date} }
}