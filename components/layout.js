// import Head from "next/head";
// import Navigation from "./Navigation";

export default function Layout({ children }) {
    console.log(children,"0000");
  return (
    <div className="root">      
      <main>{children}</main>      
    </div>
  );
}
