import { MDXRemote } from 'next-mdx-remote';

export default function SLAComp({ data, mdxData }) {
    return (
        <>
            <div className='container sla-container'>{mdxData && <MDXRemote {...mdxData} />}</div>
        </>
    );
}
