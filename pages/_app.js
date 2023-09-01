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

    function getCookie(cookieName) {
      var name = cookieName + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var cookieArray = decodedCookie.split(';');
    
      for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return null; // Return null if the cookie is not found
    }
    
    const search = window.location.search;
    if(search.includes("utm_")){      
      setCookie('msg91_query', window.location.search, 30);
      const q = window.location.search;
    }
    
    // Get all anchor tags in the document using querySelectorAll
    var anchorTags = document.querySelectorAll(".utm");
    var queryString = window.location.search;
    
    // Loop through the anchor tags
    for (var i = 0; i < anchorTags.length; i++) {
      var href = anchorTags[i].getAttribute("href"); // Get the current href value
      if (href) {        
        anchorTags[i].setAttribute("href", href + getCookie('msg91_query'));
      }
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
