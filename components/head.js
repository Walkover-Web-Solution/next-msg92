import Head from "next/head";
import metaData from "@/data/metadata.json";

const Headcomp = (brawserPath) => {
  const meta = metaData[brawserPath.brawserPath];
  let contry = brawserPath;
  return (
    <>
      <Head>                
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="RfcBy_Lv1Ao1j0eP8UlMjJ44ik5_1YDKsRQSNFr9jEQ" />
        <link rel="icon" href="/fav.svg" />        
        <link rel="canonical" href={`https://msg91.com${brawserPath.brawserPath}`} />
      </Head>
    </>
  );
};
export default Headcomp;
