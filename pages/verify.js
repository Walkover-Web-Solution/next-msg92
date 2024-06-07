import Head from "next/head";
const contactus = () => {
    return (
        <>
        <Head>
            <meta name="robots" content="noindex,nofollow" />
            <meta name="googlebot" content="noindex,nofollow" />
            <meta name="bingbot" content="noindex,nofollow" />
        </Head>
            <div className="container text-center px-4 col-xs-12 col-sm-10 col-md-10 mx-auto  py-5">
                <div style={{'height':'50px'}}></div>
                <h1 className="sub-heading" id="sub-heading">You have logged in successfully!</h1>
                <div className="small-heading p-3 w-md-75 w-100 mx-auto fw-normal" id="small-heading">
                    Redirecting...
                </div>
                <div style={{'height':'200px'}}></div>
            </div>
        </>
    );
};
export default contactus;
