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
  var brawserPathCase = brawserPath;
  var brawserPathMeta = brawserPath;
  if (brawserPath !== '/') {
    const pattern = /\/([^/?]+)/;
    const result = brawserPath.match(pattern);
    brawserPath = result ? result[0] : brawserPath;
  }
  var path = brawserPath.split("/")[1];
  const year = new Date().getFullYear();
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    
    function setCookie(name, value, days) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + days);
    
      const cookieValue = encodeURIComponent(value) + (days ? '; expires=' + expirationDate.toUTCString() : '');
      document.cookie = name + '=' + cookieValue + '; path=/';
    }
    
    if(window.location.search){
      // Set a cookie that expires after one month
      setCookie('msg91_query', window.location.search, 30);
      const q = window.location.search.substring(1);
      const params = JSON.parse('{"' + decodeURI(q.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');      
      for(let param in params){        
        setCookie(param, params[param], 30);
      };
    }

  }, []);
    return (
      <>
      <Headcomp brawserPath={brawserPathMeta} />
      <Navbar brawserPath={brawserPath} />
      <Component {...pageProps} path={path} browserPath={brawserPath} browserPathCase={brawserPathCase}/>
      <Footer path={path} year={year} />
    </>
    );
}
