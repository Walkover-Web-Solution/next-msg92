import Head from "next/head";
import metaData from "@/data/metadata.json";

const Headcomp = (browserPath , browserPathMeta) => {
  const countryList = ['in','ae','ph','sg','es','gb','us']
  const meta = metaData[browserPath.browserPath];  
  
  const split = browserPath.browserPath.split('/');
  var country = null;  
  var page = null;
  var hreflang = null;
  
  if(split.length === 2){
    country = split[1].length === 2 ? split[1] : '';
    page = split[1].length !== 2 ? split[1] : '';
  }
  if(browserPath.browserPath.split('/').length === 3){
    country = split[1].length === 2 ? split[1] : '';
    page = split[1].length === 2 ? split[2] : `${split[1]}/${split[2]}`;
  }      

  if(countryList.includes(country)){
    hreflang = `en-${country.toUpperCase()}`
  }
  //console.log('country', country, 'page', page, 'hreflang', hreflang);  

  return (
    <>
      <Head>                
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"/>
        <meta name="google-site-verification" content="RfcBy_Lv1Ao1j0eP8UlMjJ44ik5_1YDKsRQSNFr9jEQ" />
        <link rel="icon" href="/fav.svg" />                
        <link rel="canonical" href={`https://msg91.com${browserPath.browserPath}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://msg91.com/${page}`} />
        { hreflang &&
          <link rel="alternate" hrefLang={hreflang} href={`https://msg91.com${browserPath.browserPath}`} />      
        }
      </Head>
    </>
  );
};

export default Headcomp;
