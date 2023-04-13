import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/navbar";
import Headcomp from "@/components/head";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const brawserPath = router.asPath;

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);


  return (
    <>
      <Headcomp />
      <Navbar brawserPath={brawserPath} />
      <Component {...pageProps} />
    </>
  );
}
