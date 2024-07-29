/* Google chrome voice extension login with proxy */
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from 'react';
const contactus = () => {
    const [isToken, setIsToken] = useState(false);
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
        initVerification(configuration)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('proxy_auth_token')) {
            setIsToken(true);
        }
    }, []);
    return (
        <>
        <Head>
            <meta name="robots" content="noindex,nofollow" />
            <meta name="googlebot" content="noindex,nofollow" />
            <meta name="bingbot" content="noindex,nofollow" />

            <script
            type="text/javascript"            
            src="https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js"
            ></script>
        </Head>
        {isToken && (
            <div className="container text-center px-4 col-xs-12 col-sm-10 col-md-10 mx-auto  py-5">                
                <div style={{'height':'50px'}}></div>
                <h1 className="sub-heading" id="sub-heading">Wait...</h1>                
                <div style={{'height':'200px'}}></div>
            </div>
        )}
        {!isToken && (
            <div className="container d-flex h-100 justify-content-center align-items-center col-xs-12 col-sm-10 col-md-10 mx-auto">
                <div id="117230n1717247196665b1cdc48cc2"></div>
            </div>
        )}        
        </>
    );
};
export default contactus;
