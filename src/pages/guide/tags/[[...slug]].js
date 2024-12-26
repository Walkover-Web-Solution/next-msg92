import { useRouter } from 'next/router';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Head from 'next/head';
import Pagination from '@/components/Guide/page/Pagination';
import { countPosts, listPostContent } from '@/components/Guide/lib/posts';
import { getTag, listTags } from '@/components/Guide/lib/tags';
import PostItem from '@/components/Guide/page/PostItem';
import getPageInfo from '@/utils/getPageInfo';
import getCommonCompData from '@/utils/getCommonCompData';
import NotificationBarComp from '@/components/notificationBarComp/notificationBarComp';
import MenuBarComp from '@/components/menuBarComp/menuBarComp';
import FooterComp from '@/components/FooterComp/FooterComp';
export default function Index({ posts, tag, pagination, page, commonData, pageInfo }) {
    const router = useRouter();
    const handleClick = () => {
        router.back();
    };
    const url = `/guide/tags/${tag}` + (page ? `/${page}` : '');
    return (
        <>
            <Head>
                <title>{tag} | MSG91 Guide</title>
                <meta
                    property='og:title'
                    content={`Explore our collection of articles tagged under ${tag} at MSG91 -The Best Cloud Communication Platform. Discover insightful content, tips, and resources related to ${tag}.`}
                    key='title'
                />
                <link rel='canonical' href={`https://msg91.com/guide/tags/${pageInfo?.pathURL}`} />
            </Head>
            <NotificationBarComp
                componentData={commonData?.notification}
                country={pageInfo?.country}
                pageInfo={pageInfo}
            />
            <MenuBarComp componentData={commonData?.menu} pageInfo={pageInfo} />
            <div className='blog bg-neutral py-8'>
                <div className={'container blog-home-container'}>
                    <div className={'posts flex flex-col gap-4'}>
                        <button className='btn w-fit' onClick={handleClick}>
                            <MdKeyboardArrowLeft />
                            Back
                        </button>
                        <h1 className='text-3xl font-semibold text-center capitalize'>
                            Browse Blogs by Category: {tag}
                        </h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 '>
                            {posts?.map((it, i) => (
                                <PostItem key={i} post={it} />
                            ))}
                        </div>
                        <Pagination
                            current={pagination.current}
                            pages={pagination.pages}
                            link={{
                                href: () => '/guide/tags/[[...slug]]',
                                as: (page) => (page === 1 ? '/guide/tags/' + tag : `/guide/tags/${tag}/${page}`),
                            }}
                        />
                    </div>
                </div>
            </div>
            <FooterComp componentData={commonData?.footer} pageInfo={pageInfo} />
        </>
    );
}

export async function getStaticProps({ params }) {
    let queries = [];
    queries = params.slug;
    const [slug, page] = [queries[0], queries[1] || 1];
    const posts = listPostContent(page ? parseInt(page) : 1, 18, slug);
    const tag = getTag(slug);
    const pageInfo = getPageInfo(params);
    const commonData = getCommonCompData(pageInfo?.country);

    const pagination = {
        current: page ? parseInt(page) : 1,
        pages: Math.ceil(countPosts(slug) / 18),
    };
    const props = {
        posts,
        tag,
        pagination: { current: pagination.current, pages: pagination.pages },
        page,
        pageInfo,
        commonData,
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
        const pages = Math.ceil(countPosts(tag.slug) / 18);

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
