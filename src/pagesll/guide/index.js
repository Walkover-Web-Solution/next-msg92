import FooterComp from '@/components/FooterComp/FooterComp';
import Layout from '@/components/Guide/layout';
import { countPosts, listPostContent } from '@/components/Guide/lib/posts';
import { listTags } from '@/components/Guide/lib/tags';
import PostList from '@/components/Guide/page/PostList';
import MenuBarComp from '@/components/menuBarComp/menuBarComp';
import NotificationBarComp from '@/components/notificationBarComp/notificationBarComp';
import getCommonCompData from '@/utils/getCommonCompData';
import getPageInfo from '@/utils/getPageInfo';
import Head from 'next/head';
export default function Index({ posts, tags, pagination, commonData, pageInfo }) {
    const url = '/guide';
    const title = 'All posts';
    return (
        <>
            <Head>
                <title>MSG91 Guide</title>
            </Head>
            <NotificationBarComp
                componentData={commonData?.notification}
                country={pageInfo?.country}
                pageInfo={pageInfo}
            />
            <MenuBarComp componentData={commonData?.menu} pageInfo={pageInfo} />
            <Layout>
                <PostList posts={posts} tags={tags} pagination={pagination} />
                <FooterComp componentData={commonData?.footer} pageInfo={pageInfo} />
            </Layout>
        </>
    );
}

export async function getStaticProps({ params }) {
    const posts = listPostContent(1, 18);
    const tags = listTags();
    const pageInfo = getPageInfo(params);
    const commonData = getCommonCompData(pageInfo?.country);
    const pagination = {
        current: 1,
        pages: Math.ceil(countPosts() / 18),
    };
    return {
        props: {
            posts,
            tags,
            pagination,
            commonData,
            pageInfo,
        },
    };
}
