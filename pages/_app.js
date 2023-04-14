import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Headcomp from "@/components/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // const { slug } = router.query; 
  var  brawserPath = router.asPath;
  var path = brawserPath.split("/")[1];
  const getCountryCode = (a) => {
    // console.log(router,888888);
    var countryCode = path?.toUpperCase();
    path = path.length == 2 ? "/" + path : "";
    // console.log(a,countryCode);  
    if(countryCode ==='[COUNTRY]'){
      return getCountryCode(a+1);
    
    }
    return countryCode;
  }

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const data=getCountryCode(1)
  if(data!=='[COUNTRY]' && data.length!==0){
    return (
      <>
      <Headcomp />
      <Navbar brawserPath={brawserPath} />
      <Component {...pageProps} countryCode={data}/>
      <Footer path={path} />
    </>
  );
}
else{
  return (<>LOADING</>)
}
}
