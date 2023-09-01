import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Headcomp from "@/components/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  var showNavbar = false;
  var brawserPath = router.asPath;
  var brawserPathCase = brawserPath;
  var brawserPathMeta = brawserPath;
  if (brawserPath !== '/') {
    const pattern = /\/([^/?#]+)/;
    const result = brawserPath.match(pattern);
    brawserPath = result ? result[0] : brawserPath;

  }
  var path = brawserPath.split("/")[1];
  const year = new Date().getFullYear();
  if (brawserPath !== '/login' && brawserPath !== '/signup' && brawserPath !== '/github-auth') {
    showNavbar = true;
  }

  return (
    <>
      <Headcomp brawserPath={brawserPathMeta} />
      {showNavbar && <Navbar brawserPath={brawserPath} />}
      <Component {...pageProps} path={path} browserPath={brawserPath} browserPathCase={brawserPathCase} />
      {showNavbar && <Footer path={path} year={year} />}
    </>
  );
}
