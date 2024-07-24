import Head from 'next/head';

export default function HeadComp({data}) {
    return (
        <>
            <Head>
                <title>{data?.title}</title>
                <meta name="description" content={data?.description} />
                <meta
                    name="viewport"
                    content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
                />

            </Head>
        </>
    );
}
