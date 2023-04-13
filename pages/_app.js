import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Headcomp from "@/components/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const brawserPath = router.asPath;
  let path = brawserPath.split("/")[1];
  path = path.length == 2 ? "/" + path : "";

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Headcomp />
      <Navbar brawserPath={brawserPath} />
      <Component {...pageProps} />
      <Footer path={path} />
    </>
  );
}
