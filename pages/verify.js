/* Google chrome voice extension login with proxy */
import Head from "next/head";
import { useEffect } from 'react';
const contactus = () => {
    useEffect(() => {
        var configuration = {
            referenceId: '117230n1717247196665b1cdc48cc2',
            success: (data) => {
                // get verified token in response
                console.log('success response', data);
            },
            failure: (error) => {
                // handle error
                console.log('failure reason', error);
            },
        };
    }, []);

    return (
        <>
        <Head>
            <meta name="robots" content="noindex,nofollow" />
            <meta name="googlebot" content="noindex,nofollow" />
            <meta name="bingbot" content="noindex,nofollow" />
            <script
            type="text/javascript"
            onload="initVerification(configuration)"
            src="https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js"
            ></script>
        </Head>
        <div className="container text-center px-4 col-xs-12 col-sm-10 col-md-10 mx-auto  py-5">
            <div id="117230n1717247196665b1cdc48cc2"></div>
            
            <div style={{'height':'50px'}}></div>
            <h1 className="sub-heading" id="sub-heading">Wait...</h1>
            <div className="small-heading p-3 w-md-75 w-100 mx-auto fw-normal" id="small-heading">
                
            </div>
            <div style={{'height':'200px'}}></div>
        </div>
        </>
    );
};
export default contactus;
