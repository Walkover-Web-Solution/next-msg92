const PreFooter =()=>{
    return(
        <>
            <div className="c-bg-grey py-5  d-flex flex-column justify-content-sm-center align-items-center">
                <div className="py-4  container text-center d-md-flex justify-content-sm-between align-items-center flex-xl-row flex-lg-column flex-sm-column flex-md-column"> 
                    <span className="pro-heading c-head">Register with us to give voice to your business</span>
                    <div className="mt-3 mt-xxl-0 d-flex flex-wrap justify-content-center gap-3">
                        <a href="/contact-us" className="btn px-4 py-3 btn-outline-dark c-fs-4 ">Contact sales</a>
                        <a href="/pricing" className="btn px-4 py-3 btn-outline-dark c-fs-4 ">Pricing</a>
                        <a href="https://control.msg91.com/signup/" className="btn px-4 py-3 btn-dark c-fs-4 "> Get started</a>
                    </div>
                </div>                          
            </div>
        </>

    );
};
export default PreFooter;
