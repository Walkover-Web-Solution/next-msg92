import TrustedBy from "@/components/trustedby";
import Image from "next/image";
import Link from "next/link";

export default function Certificates() {
    return (
        <>
            <div className="">
                <div className="container text-center d-flex flex-column gap-3 align-items-center py-3 py-md-5 ">
                    <h2 className="  mx-auto fw-bold heading my-2 col-11 col-md-8">
                        Certified for Unparalleled Reliability and Security.{" "}
                    </h2>
                    <a href="https://control.msg91.com/signup/" className="btn btn-ft btn-dark rounded-1 c-fs-4">
                        Get Started
                    </a>

                    <TrustedBy />
                </div>
                <div className="bg-lightgrey py-3 py-md-5">
                    <div className="container">
                        <h2 className="c-fs-1 c-fw-sb mb-4">Certificates</h2>
                        
                        <div className="d-flex gap-5">
                            <div className="col d-flex flex-column gap-4">
                                <h3 className="c-fs-2">CASA</h3>
                                <a href="/pdf/casa.pdf" target="_blank">
                                    <Image
                                        src="/images/certificate_casa.png"
                                        width={1080}
                                        height={1080}
                                        className="w-100 h-auto"
                                        alt="casa certificate"
                                    />
                                </a>
                            </div>
                            <div className="col d-flex flex-column gap-4">
                                <h3 className="c-fs-2">ISO</h3>
                                <a
                                    href="/pdf/iso.pdf"
                                    target="_blank"
                                >
                                    <Image
                                        src="/images/certificate_iso.png"
                                        width={1080}
                                        height={1080}
                                        className="w-100 h-auto"
                                        alt="casa certificate"
                                    />
                                </a>
                            </div>
                        </div>
                        
                        <div className="d-flex gap-5 mt-4">
                            <div className="col d-flex flex-column gap-4">
                                <h3 className="c-fs-2">SOC 2 Type 2</h3>
                                <a href="/pdf/soc2.pdf" target="_blank">
                                    <Image
                                        src="/images/certificate_soc.png"
                                        width={1080}
                                        height={1080}
                                        className="w-100 h-auto"
                                        alt="casa certificate"
                                    />
                                </a>
                            </div>
                            <div className="col d-flex flex-column gap-4">
                                <h3 className="c-fs-2">Kratikal Secure</h3>
                                <a
                                    href="/pdf/kratikal.pdf"
                                    target="_blank"
                                >
                                    <Image
                                        src="/images/certificate_kratikal.png"
                                        width={1080}
                                        height={1080}
                                        className="w-100 h-auto"
                                        alt="casa certificate"
                                    />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
