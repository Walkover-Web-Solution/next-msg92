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
                <meta name="google-site-verification" content="RfcBy_Lv1Ao1j0eP8UlMjJ44ik5_1YDKsRQSNFr9jEQ" />
            </Head>
        </>
    );
}
