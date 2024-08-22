import Head from 'next/head';

export default function HeadComp({ data }) {
    return (
        <>
            <Head>
                <title>{data?.title}</title>
                <meta name='description' content={data?.description} />
                <meta property='og:title' content={data?.title} />
                <meta property='og:description' content={data?.description} />
                <meta property='og:image' content={'/assets/brand/favicon.svg'} />
                <link rel='icon' href='/assets/brand/favicon.svg' />
                <meta
                    name='viewport'
                    content='width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no'
                />
            </Head>
        </>
    );
}
