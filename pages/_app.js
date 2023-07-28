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
  console.log('_app', brawserPath);
  if (brawserPath !== '/') {
    const pattern = /\/([^/?]+)/;
    const result = brawserPath.match(pattern);
    //console.log('1', result,  brawserPath);
    brawserPath = result ? result[0] : brawserPath;
  }
  var path = brawserPath.split("/")[1];
  const year = new Date().getFullYear();
  //console.log('path _app', path);
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
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
