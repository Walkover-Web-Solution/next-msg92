import TrustedBy from '@/components/trustedby';

export default function Certificates() {
    return (
        <>
            <div className="">
                <div className="container text-center d-flex flex-column gap-3 align-items-center ">
                    <h2 className="  mx-auto fw-bold heading mb-2 col-11 col-md-8">
                        Certified for Unparalleled Reliability and Security.{' '}
                    </h2>
                    <a href="https://control.msg91.com/signup/" className="btn btn-ft btn-dark rounded-1 c-fs-4">Get Started</a>

                    <TrustedBy />
                </div>
                <div className="bg-lightgrey py-3 py-md-5">

                <div className="container d-grid gap-3">
                    <h2 className='c-fs-1 c-fw-sb'>Certificates</h2>
                    <div className="d-grid gap-2 mb-5">
                        <h3 className='c-fs-2'>CASA</h3>
                        <embed src="/pdf/casa.pdf#view=FitH" type="application/pdf" width="100%" height="800px"></embed>
                    </div>
                    <div className="d-grid gap-2">
                        <h3 className='c-fs-2'>ISO</h3>
                        <embed src="/pdf/iso.pdf#view=FitH" type="application/pdf" width="100%" height="800px"></embed>
                    </div>
                </div>
                </div>

            </div>
        </>
    );
}