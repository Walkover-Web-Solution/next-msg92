import data from "@/data/compContent/getStartedComp.json";
export default function GetStartedSection({ pricingPath, pathArray }) {
    
    let compData = {};
    if (pathArray && pathArray.length > 0) {
        compData = data[pathArray[1]];
    }
    else{
      compData = {}
    }
    return (
        <>
        
            <div className="c-bg-grey p-5">
                <div className="container d-flex flex-column flex-md-row gap-4 align-items-center justify-content-between">
                    <span className=" c-fs-3 c-fw-b">
                        {compData?.heading || " Start building your ideal customer engagement experience"}
                    </span>
                    <div className=" d-flex row  gap-3">
                        <a href="/contact-us" className="btn btn-ft px-3 py-2 btn-outline-dark c-fs-4 col ">
                            {compData?.content?.contactsales || "Contact sales"}
                        </a>
                        {pricingPath && (
                          <a href={pricingPath} className="btn btn-ft px-3 py-2 btn-outline-dark c-fs-4 col">
                              {compData?.content?.pricing || "Pricing"}
                          </a>
                        )}
                        <a
                            href="https://control.msg91.com/signup/"
                            target="_blank"
                            className="btn btn-ft px-3 py-2 btn-dark c-fs-4 utm col-12 col-md w-100"
                        >
                            {compData?.content?.getstarted || "  Get started"}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
