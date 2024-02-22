import Head from 'next/head';
import metaData from '@/data/metadata.json';

const Headcomp = (browserPath, browserPathMeta) => {


    const countryList = ['in', 'ae', 'ph', 'sg', 'es', 'gb', 'us'];
    const exptns = {
        'gbl': [
            'contact-us',
            'blog',
            'partners-and-integrations',
            'about-us',
            'developers',
            'startups',
            'become-a-partner',
            'certificates',
            'case-studies',
            'terms-of-use',
            'privacy-policy',
            'gdpr',
            'refund-policy',
            'cookie-policy',
            'startup-policy',
            'fair-pricing-policy',
            'no-spam',
            'login',
            'signup',
            'signin',
            'guide',
            "startups-form",
            "thank-you"
        ],
    };

    const path = browserPath.browserPath.split('?')[0];
    var meta = metaData[path] ? metaData[path] : { 'title': '', 'description': '' };
    var pathPage, pathCountry, isOnlyGlobal;
    const pathArrRaw = browserPath.browserPath.split('?');
    const pathArr = pathArrRaw[0].split('/');
    if (pathArr.length == 2) {
        if (countryList.includes(pathArr[1])) {
            pathPage = '';
            pathCountry = '/' + pathArr[1];
        } else {
            if (pathArr[1]) {
                pathPage = '/' + pathArr[1];
            } else {
                pathPage = '';
            }
            pathCountry = '';
            isOnlyGlobal = exptns.gbl.includes(pathArr[1]);
        }
    } else {
        if (countryList.includes(pathArr[1])) {
            pathCountry = '/' + pathArr[1];
            pathPage = '/' + pathArr.slice(2).join('/');
        } else {
            pathPage = '/' + pathArr.slice(1).join('/');
            pathCountry = '';
            isOnlyGlobal = exptns.gbl.includes(pathArr[1]);
        }
    }

    return (
        <>
            <Head>
                <title>{meta?.title}</title>
                <meta name="description" content={meta?.description} />
                <meta
                    name="viewport"
                    content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
                />
                <meta name="google-site-verification" content="RfcBy_Lv1Ao1j0eP8UlMjJ44ik5_1YDKsRQSNFr9jEQ" />
                <link rel="icon" href="/fav.svg" />
                {process.env.ENVIRONMENT === 'test' && (
                    <>
                        <meta name="robots" content="noindex" />
                        <meta name="googlebot" content="noindex" />
                        <meta name="robots" content="noindex,nofollow" />
                    </>
                )}
                <link rel="canonical" href={`https://msg91.com${pathPage}`} />
                <link rel="alternate" hrefLang="x-default" href={`https://msg91.com${pathPage}`} />
                {!isOnlyGlobal && (
                    <>
                        <link rel="alternate" hrefLang="en-IN" href={`https://msg91.com/in${pathPage}`} />
                        <link rel="alternate" hrefLang="en-GB" href={`https://msg91.com/gb${pathPage}`} />
                        <link rel="alternate" hrefLang="en-PH" href={`https://msg91.com/ph${pathPage}`} />
                        <link rel="alternate" hrefLang="en-SG" href={`https://msg91.com/sg${pathPage}`} />
                        <link rel="alternate" hrefLang="en-ES" href={`https://msg91.com/es${pathPage}`} />
                        <link rel="alternate" hrefLang="en-US" href={`https://msg91.com/us${pathPage}`} />
                    </>
                )}
            </Head>
        </>
    );
};

export default Headcomp;
