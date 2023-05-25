import Head from "next/head";
import Script from "next/script";
import metaData from "@/data/metadata.json";

const Headcomp = (brawserPath) => {
  const meta = metaData[brawserPath.brawserPath];
  //console.log("meta", meta, brawserPath.brawserPath, metaData[brawserPath.brawserPath])
  let contry = brawserPath;
  return (
    <>
      <Head>
        <script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `var helloConfig = {
              widgetToken: "1d31e",
              hide_launcher: false
            };`,
          }}
        />
        <script
          type="text/javascript"
          onload="initChatWidget(helloConfig, 5000)"
          src="https://control.msg91.com/app/assets/widget/chat-widget.js"
        >
          {" "}
        </script>
        <script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NWZKLRJ');`,
          }}
        />
        <title>{meta?.title}</title>
        <meta name="discription" content={meta?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.svg" />
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"
          integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"
          integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ"
          crossorigin="anonymous"
        ></script>
      </Head>
    </>
  );
};
export default Headcomp;
