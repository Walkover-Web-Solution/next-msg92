// import Head from "next/head";
// import Navigation from "./Navigation";

export default function Layout({ children }) {
  return (
    <div className="root">      
      <main>{children}</main>      
    </div>
  );
}
