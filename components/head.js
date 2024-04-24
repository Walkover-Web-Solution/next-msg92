import Head from "next/head";
import metaData from "@/data/metadata.json";

const Headcomp = (browserPath) => {
    const countryList = ["in", "ae", "ph", "sg", "es", "gb", "us"];
    const exptns = {
        "gbl": [
            "contact-us",
            "blog",
            "partners-and-integrations",
            "about-us",
            "developers",
            "startups",
            "become-a-partner",
            "certificates",
            "case-studies",
            "terms-of-use",
            "privacy-policy",
            "gdpr",
            "refund-policy",
            "cookie-policy",
            "startup-policy",
            "fair-pricing-policy",
            "no-spam",
            "login",
            "signup",
            "signin",
            "guide",
            "startups-form",
            "thank-you",
        ],
    };

    const path = browserPath.browserPath.split("?")[0];
    var meta = metaData[path] ? metaData[path] : { "title": "", "description": "" };
    var pathPage, pathCountry, isOnlyGlobal;
    const pathArrRaw = browserPath.browserPath.split("?");
    const pathArr = pathArrRaw[0].split("/");
    if (pathArr.length == 2) {
        if (countryList.includes(pathArr[1])) {
            pathPage = "";
            pathCountry = "/" + pathArr[1];
        } else {
            if (pathArr[1]) {
                pathPage = "/" + pathArr[1];
            } else {
                pathPage = "";
            }
            pathCountry = "";
            isOnlyGlobal = exptns.gbl.includes(pathArr[1]);
        }
    } else {
        if (countryList.includes(pathArr[1])) {
            pathCountry = "/" + pathArr[1];
            pathPage = "/" + pathArr.slice(2).join("/");
        } else {
            pathPage = "/" + pathArr.slice(1).join("/");
            pathCountry = "";
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
                {process.env.REDIRECT_URL === "https://web.msg91.com" && (
                    <>
                        <meta name="robots" content="noindex,nofollow" />
                        <meta name="googlebot" content="noindex,nofollow" />
                        <meta name="bingbot" content="noindex,nofollow" />
                    </>
                )}
                <link rel="canonical" href={`https://msg91.com${pathArrRaw[0]}`} />

                {!isOnlyGlobal && pathCountry && (
                    <>
                        <link
                            rel="alternate"
                            hrefLang={`en-${pathArr[1].toUpperCase()}`}
                            href={`https://msg91.com${pathCountry}${pathPage}`}
                        />
                    </>
                )}
                {isOnlyGlobal ||
                    (!pathCountry && (
                        <>
                            <link rel="alternate" hrefLang="en" href={`https://msg91.com${pathPage}`} />
                        </>
                    ))}
                <script type="text/javascript">
                    function googleTranslateElementInit(){" "}
                    {new google.translate.TranslateElement({ pageLanguage: "en" }, "google_translate_element")}
                </script>
                <script
                    type="text/javascript"
                    src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                ></script>
            </Head>
        </>
    );
};

export default Headcomp;
