import Head from "next/head";
const zapier = () => {
  return (
    <>
      <Head>
        <script
          type="module"
          src="https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.esm.js"
        ></script>
        <link
          rel="stylesheet"
          href="https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.css"
        />
      </Head>
      <div className="container mb-4">
      <zapier-zap-templates
        theme="light"
        apps="msg91"
        create-without-template="hide"
        limit="10"
        link-target="new-tab"
        presentation="row"
        use-this-zap="show"
        ></zapier-zap-templates>
        </div>
    </>
  );
};
export default zapier;
