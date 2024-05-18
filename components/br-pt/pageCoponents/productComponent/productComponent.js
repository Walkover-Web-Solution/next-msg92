import CodeComponent from "@/components/codeComponent/codeComponent";
import TrustedBy from "@/components/trustedby";

export default function productComponent({ pageData, pathArray }) {
   console.log("🚀 ~ productComponent ~ pathArray:", pathArray)
   
    var i = 0;
    return (
        <>
            <div className="product-banner-wrp">
                <div className="container text-center overflow-hidden">
                    <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
                        <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
                            <img src={pageData?.icon} className="product-page-logo me-2" alt="product page logo" />
                            <h1 className={`heading page-title ${pageData?.slug}-heading`}>{pageData?.name}</h1>
                        </div>

                        <p className={`c-fs-4 text-uppercase col-otp c-ls-20 mx-auto mt-3 ${pageData?.slug}-dark`}>
                            {pageData?.tagline}
                        </p>
                        <div className="p-3">
                            <h2 className="small-heading w-md-75 w-100 mx-auto fw-normal mb-2">{pageData?.heading}</h2>
                            <p className="small-heading w-md-75 w-100 mx-auto fw-normal">{pageData?.subheading}</p>
                        </div>
                        <a href={`/signup?service=${pageData.slug}`} className="btn btn-dark btn-lg c-fs-2 mt-3 utm">
                            {pageData.name === "KnowledgeBase" && (
                                <span className="d-flex">
                                    Get started <mark className="highlight ms-2">FREE forever</mark>
                                </span>
                            )}
                            {pageData.name !== "KnowledgeBase" && <span>{pageData?.btntext}</span>}
                        </a>
                    </div>
                    <TrustedBy pathArray={pathArray} />
                    {pageData?.code ? (
                        <CodeComponent pageData={pageData} />
                    ) : (
                        <img
                            src={`/assets/img/pages/${pageData?.slug}/banner-${pageData?.slug}.svg`}
                            className="img-fluid product-page-img mx-auto"
                            alt="product image"
                        />
                    )}
                </div>
            </div>
            <div className={`px-sm-0 d-flex flex-column justify-content-center justify-content-sm-start section mt-5`}>
                <span className="container sub-heading c-head   pt-4 pt-md-0">{pageData?.features?.heading}</span>
                {pageData?.features?.content.map((item, index) => {
                    if (item?.content) {
                        i++;
                        return (
                            <div
                                key={`f-${index}`}
                                className={`container flex-column d-flex my-3 my-md-5 align-items-center justify-content-md-between justify-content-center  ${
                                    i % 2 ? "flex-md-row-reverse" : "flex-md-row"
                                }`}
                            >
                                <div className="col-12 col-md-6 d-flex justify-content-center">
                                    {item?.img && <img src={item?.img} className="feature-img " alt="feature image" />}
                                </div>
                                <div className="col-12 col-md-5 d-flex flex-column ">
                                    <span className="c-fs-2 c-fw-b ">{item?.heading}</span>
                                    <span className="c-fs-3  mt-3">
                                        <span className="c-fw-b">{item?.subheading}</span> {item?.content}
                                    </span>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </>
    );
}
