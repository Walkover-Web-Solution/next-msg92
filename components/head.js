import Head from "next/head";
import metaData from "@/data/metadata.json";

const Headcomp = (browserPath , browserPathMeta) => {
  console.log(browserPath.browserPath, "browser path");
  const list = ['in','ae','ph','sg','es','gb','us']
  const meta = metaData[browserPath.browserPath];
//   const meta = {
//     "title": "Free Whatsapp Link generator| MSG91 - India",
//     "description":"Generate WhatsApp links and QR codes easily with our WhatsApp Link Generator. Start chatting instantly!."
// }
  console.log(meta, "meta data");
  const country = browserPath.browserPath.split('/')[1];
  console.log(country, 'country ');
  const generator = browserPath?.browserPath?.split('/')[2];
  console.log(generator, "generator data");
  if(list.includes(country)){
    var hreflang = `en-${country.toUpperCase()}`
    console.log(hreflang, "href lang");
  }
  if(generator === 'free-whatsapp-link-generator'){
    console.log("true");
    var generator_true = true;
  }
//   console.log(browserPath.browserPath,222)
//   var path = browserPath.browserPath.split("/")[1];
//   var product = browserPath.browserPath.split("/")[3];
//   var browserPathClean = null;

//   console.log(product,323233)

//   if(path!=='[COUNTRY]' && path.length!==0 && product!== "product" && product!== "[product]"){
//     console.log(path,product, "data in product page");

//     browserPathClean = browserPath.browserPath
//     if(browserPathClean !== null){
//       console.log("not null")
//     }
//     console.log(browserPathClean,"clean")
// }
  return (
    <>
      <Head>                
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"/>
        <meta name="google-site-verification" content="RfcBy_Lv1Ao1j0eP8UlMjJ44ik5_1YDKsRQSNFr9jEQ" />
        <link rel="icon" href="/fav.svg" />        
        {generator_true ? <link rel="canonical" href={`https://msg91.com/free-whatsapp-link-generator`} /> : <link rel="canonical" href={`https://msg91.com${browserPath.browserPath}`} /> }
        
        
        <link rel="alternate" hreflang="x-default" href="https://msg91.com" />
        {/* <link rel="alternate" hreflang={hreflang} href={`https://msg91.com/${country}`} /> */}
         {country && 
           <link rel="alternate" hreflang={hreflang} href={`https://msg91.com/${country}`} />
        } 
      </Head>
    </>
  );
};
export default Headcomp;
