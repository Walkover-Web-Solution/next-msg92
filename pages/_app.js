import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/navbar";
import Headcomp from "@/components/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Headcomp/>
      <Navbar/>
      <Component {...pageProps} />
    </>
  );
}
