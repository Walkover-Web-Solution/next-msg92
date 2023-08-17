import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
 
export default function Post({ source }) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} />
    </div>
  );
}
 
export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const source = 'Some **mdx** text, with a component';
  const mdxSource = await serialize(source);
  return { props: { source: mdxSource } };
}