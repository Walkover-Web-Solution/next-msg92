// import Head from "next/head";
// import Navigation from "./Navigation";

export default function Layout({ children }) {
    return (
        <div className='blog-root'>
            <main>{children}</main>
        </div>
    );
}
