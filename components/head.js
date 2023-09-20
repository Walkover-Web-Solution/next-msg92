import Head from "next/head";
import metaData from "@/data/metadata.json";

const Headcomp = (browserPath) => {
  const meta = metaData[browserPath.browserPath];
  console.log('', JSON.stringify(browserPath));
  console.log('meta',meta);
  let contry = browserPath;
  return (
    <>
      <Head>                
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"/>
        <meta name="google-site-verification" content="RfcBy_Lv1Ao1j0eP8UlMjJ44ik5_1YDKsRQSNFr9jEQ" />
        <link rel="icon" href="/fav.svg" />        
        
        <link rel="canonical" href={`https://msg91.com${browserPath.browserPath}`} />
        
        <link rel="alternate" hreflang="x-default" href="https://msg91.com" />
        <link rel="alternate" hreflang="en-GB" href="https://msg91.com/uk" />
        <link rel="alternate" hreflang="en-AE" href="https://msg91.com/ae" />
        <link rel="alternate" hreflang="en-IN" href="https://msg91.com/in" />
        <link rel="alternate" hreflang="en-US" href="https://msg91.com/us" />
        <link rel="alternate" hreflang="en-PH" href="https://msg91.com/ph" />
        <link rel="alternate" hreflang="en-SG" href="https://msg91.com/sg" />
        <link rel="alternate" hreflang="es-ES" href="https://msg91.com/es" />
        <link rel="alternate" hreflang="en-GB" href="https://msg91.com/uk" />
        <link rel="alternate" hreflang="en-US" href="https://msg91.com/us" />
      </Head>
    </>
  );
};
export default Headcomp;
