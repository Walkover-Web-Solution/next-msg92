import Head from "next/head";
import metaData from "@/data/metadata.json";

const Headcomp = (browserPath) => {
  const list = ['in','ae','ph','sg','es','gb','us']
  const meta = metaData[browserPath.browserPath];    
  const country = browserPath.browserPath.split('/')[1];
  if(list.includes(country)){
    var hreflang = `en-${country.toUpperCase()}`
  }
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
        {country && 
          <link rel="alternate" hreflang={hreflang} href={`https://msg91.com/${country}`} />
        }
      </Head>
    </>
  );
};
export default Headcomp;
