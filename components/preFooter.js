const PreFooter =()=>{
    return(
        <>
        <div className="mx-auto col-10  my-5 p-0 p-lg-5  d-flex flex-column justify-content-sm-center align-items-center">
            <div className=" c-bg-grey  p-3 p-lg-5  container text-center d-md-flex justify-content-sm-between align-items-center flex-xl-row flex-lg-column flex-sm-column flex-md-column"> 
                <span className="small-heading ">Experience The Awesomeness</span>
                <div className="mt-3 mt-lg-0">
                    <a href="/pricing" className="btn btn-outline-dark my-1 c-fs-4 mx-2"> See Pricing</a>
                    <a href="https://control.msg91.com/signup/" className="btn btn-dark ms-lg-4 my-1 c-fs-4 mx-2"> Get started for free</a>
                </div>
            </div>
            <div className=" mt-5  d-flex flex-column align-items-center text-center justify-content-center mx-2">
                <p className="c-fs-3 my-4">Have More Questions? We’re always here to help you!</p>
                <a href="/contact-us" className="btn btn-outline-dark px-3 py-2 c-fs-4 mx-auto">Talk to Sales</a>
            </div>
              
            </div>
        </>

    );
};
export default PreFooter;
