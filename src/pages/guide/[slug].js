import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import * as fs from 'fs';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import Head from 'next/head';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import dynamic from 'next/dynamic';
import { fetchPostContent } from '@/components/Guide/lib/posts';
import { getTag } from '@/components/Guide/lib/tags';
import TagButton from '@/components/Guide/tags/TagButton';
import getPageInfo from '@/utils/getPageInfo';
import getCommonCompData from '@/utils/getCommonCompData';
import NotificationBarComp from '@/components/notificationBarComp/notificationBarComp';
import MenuBarComp from '@/components/menuBarComp/menuBarComp';
import FooterComp from '@/components/FooterComp/FooterComp';
import { useEffect } from 'react';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const component = { ReactPlayer };

const slugToPostContent = ((postContents) => {
    let hash = {};
    let fullPath = {};
    postContents.map((data) => {
        fullPath = data.fullPath;
    });
    postContents?.forEach((it) => (hash[it.slug] = it));
    return hash;
})(fetchPostContent());
export default function TestPage({
    source,
    title,
    metaTitle,
    description,
    author,
    date,
    thumbnailImage,
    tags,
    commonData,
    pageInfo,
    slugData,
}) {
    const router = useRouter();

    const handleClick = () => {
        router.push('/guide');
    };

    return (
        <>
            <Head>
                <title>{metaTitle}</title>

                <meta name='description' content={description} />
                <meta property='og:title' content={metaTitle} key='title' />
                <meta property='og:description' content={description} key='description' />
                <link rel='canonical' href={`https://msg91.com/guide/${router?.query?.slug}`} />
            </Head>
            <NotificationBarComp
                componentData={commonData?.notification}
                country={pageInfo?.country}
                pageInfo={pageInfo}
            />
            <MenuBarComp componentData={commonData?.menu} pageInfo={pageInfo} />
            <div className='wrapper container blog-container w-100 max-w-4xl flex flex-col gap-8 py-20'>
                <button className=' btn btn-md btn-primary' onClick={handleClick}>
                    <MdKeyboardArrowLeft className='text-xl' />
                    Back
                </button>
                <div className='blog-header flex flex-col gap-2'>
                    <div className='flex gap-1 text-gray-500'>
                        <span>{author},</span>
                        <span>{date}</span>
                    </div>
                    <h1 className='text-4xl font-bold'>{title}</h1>
                    {thumbnailImage !== '' && <img className='' src={thumbnailImage} alt={author} />}
                </div>
                <div className='body leading-normal flex flex-col gap-1 text-lg blog-body-cont text-gray-900'>
                    <MDXRemote {...source} components={component} />
                </div>
                <ul className={'flex flex-wrap gap-2'}>
                    {tags !== '' &&
                        tags?.map((it, i) => (
                            <li key={i}>
                                <TagButton tag={getTag(it)} />
                            </li>
                        ))}
                </ul>

                <button className=' btn btn-md btn-primary' onClick={handleClick}>
                    <MdKeyboardArrowLeft className='text-xl' />
                    Back
                </button>
            </div>
            <FooterComp componentData={commonData?.footer} pageInfo={pageInfo} />
        </>
    );
}

export async function getStaticPaths() {
    const paths = fetchPostContent().map((it) => '/guide/' + it.staticPath);
    return {
        paths,
        fallback: false,
    };
}
export async function getStaticProps(slug) {
    const slugData = slug.params.slug;
    const source = fs.readFileSync(slugToPostContent[slugData]?.fullPath, 'utf8');
    const pageInfo = getPageInfo({ slug: ['global', 'guide'] });
    const commonData = getCommonCompData(pageInfo?.country);
    const matterResult = matter(source, {
        engines: {
            yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
            // engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
        },
    });
    const thumbnailImage = matterResult?.data?.thumbnail;
    const title = matterResult?.data?.title;
    const metaTitle = matterResult?.data.metaTitle || title;
    const description = matterResult?.data?.description;
    const author = matterResult?.data?.author;
    const content = matterResult?.content;
    const tags = matterResult?.data?.tags;
    var date = new Date(matterResult?.data?.date);
    date = format(date, 'LLLL d, yyyy');
    const mdxSource = await serialize(content);
    return {
        props: {
            slugData,
            source: mdxSource || '',
            title: title || '',
            metaTitle: metaTitle,
            description: description || '',
            author: author || '',
            date: date,
            thumbnailImage: thumbnailImage || '',
            tags: tags || '',
            commonData,
            pageInfo,
        },
    };
}
