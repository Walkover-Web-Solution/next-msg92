import FooterComp from '@/components/FooterComp/FooterComp';
import Layout from '@/components/Guide/layout';
import { countPosts, listPostContent } from '@/components/Guide/lib/posts';
import { listTags } from '@/components/Guide/lib/tags';
import PostList from '@/components/Guide/page/PostList';
import MenuBarComp from '@/components/menuBarComp/menuBarComp';
import NotificationBarComp from '@/components/notificationBarComp/notificationBarComp';
import getCommonCompData from '@/utils/getCommonCompData';
import getGuidePageInfo from '@/utils/getGuidePageInfo';
import Head from 'next/head';
export default function Index({ posts, pagination, commonData, pageInfo }) {
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
                <PostList posts={posts} pagination={pagination} />
                <FooterComp componentData={commonData?.footer} pageInfo={pageInfo} />
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    const pageInfo = getGuidePageInfo(context);
    const posts = listPostContent(pageInfo?.pageNo, 18);
    const commonData = getCommonCompData('global');
    const pagination = {
        current: pageInfo?.pageNo,
        pages: Math.ceil(countPosts() / 18),
    };
    return {
        props: {
            posts,
            pagination,
            commonData,
            pageInfo,
        },
    };
}
