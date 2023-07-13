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
  if (brawserPath === '/') {
    brawserPath = brawserPath
    console.log(brawserPath,982222)
  }
  else{
    const pattern = /\/([^/?]+)/;
    const result = brawserPath.match(pattern);
    console.log (result);  
    brawserPath = result[0];
    console.log (brawserPath,8899)
  }

  var path = brawserPath.split("/")[1];
  console.log(path,99,brawserPath);

  const year = new Date().getFullYear();
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
    return (
      <>
      <Headcomp brawserPath={brawserPath} />
      <Navbar brawserPath={brawserPath} />
      <Component {...pageProps} path={path} browserPath={brawserPath} browserPathCase={brawserPathCase}/>
      <Footer path={path} year={year} />
    </>
    );
}
