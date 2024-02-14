import Head from "next/head";
import metaData from "@/data/metadata.json";

const Headcomp = (browserPath , browserPathMeta) => {
  const countryList = ['in','ae','ph','sg','es','gb','us']
  const path = browserPath.browserPath.split('?')[0];
  var meta = (metaData[path]) ? metaData[path] : {'title':'','description':''};    
  const split = browserPath.browserPath.split('/');
  var country = '';  
  var pagePath = '';
  var page = '';
  var hreflang = 'en';
  
  //console.log('split', split);
  
  if(split.length === 2 && split[1].length){
    country = split[1].length === 2 ? split[1] : '';
    pagePath = split[1].length !== 2 ? `/${split[1]}` : `/${country}`;
    page = split[1].length === 2 ? '' : `/${split[1]}`;
    //console.log('1', country, pagePath, page)
  }
  
  if(split.length === 3){
    country = split[1].length === 2 ? split[1] : '';
    pagePath = split[1].length === 2 ? `/${country}/${split[2]}` : `/${split[1]}/${split[2]}`;
    page = split[2].length === 2 ? split[2] : `/${split[2]}`;
    //console.log('2', country, pagePath, page)
  }  
  
  if(split.length === 4){
    country = split[1];
    pagePath = `/${split[1]}/${split[2]}/${split[3]}`;
    page = `/${split[2]}/${split[3]}`;
    //console.log('3', country, pagePath, page)
  }  
  
  if(countryList.includes(country)){
    hreflang = `en-${country.toUpperCase()}`
  }
  
  /* if(meta === '' && path.includes("guide")){
    meta.title = 'MSG91 Guide'
  } */
  return (
    <>
      <Head>                
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"/>
        <meta name="google-site-verification" content="RfcBy_Lv1Ao1j0eP8UlMjJ44ik5_1YDKsRQSNFr9jEQ" />
        <link rel="icon" href="/fav.svg" />                
        <link rel="canonical" href={`https://msg91.com${pagePath}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://msg91.com${page}`} />        
        {country &&
          countryList.map((country) => (
            <link key={country} rel="alternate" hrefLang={`en-${country.toUpperCase()}`} href={`https://msg91.com/${country}${page}`} />
          ))
        }
      </Head>
    </>
  );
};

export default Headcomp;
