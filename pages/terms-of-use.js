import React from "react";
import Terms from "@/components/termsofuse/terms";
import Link from "next/link";
const termsofuse = () => {
  return (
    <>
      <div className=" d-flex flex-column flex-md-row container terms-cont py-5">
        <div className="d-flex  align-items-center d-block d-md-none">
          <div className="dropdown " id="change-country">
            <button
              className=" dropdown-toggle btn m-0 p-0 mb-4 c-fs-1  text-dark"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <label className=" c-fs-2">Terms</label>
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link href="/terms-of-use" className="dropdown-item c-fs-4">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/startup-policy" className="dropdown-item c-fs-4">
                  Startup Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="dropdown-item c-fs-4">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="dropdown-item c-fs-4">
                  GDPR
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="dropdown-item c-fs-4">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="dropdown-item c-fs-4">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/fair-using-picing"
                  className="dropdown-item c-fs-4"
                >
                  Fair Pricing Policy
                </Link>
              </li>
              <li>
                <Link href="/no-spam" className="dropdown-item c-fs-4">
                  No Spam
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="gap-3 d-none d-md-flex flex-column  col-12 flex-wrap mb-3 col-md-4 col-lg-3 terms-nav">
          <a href="/terms-of-use">
            <span className="c-fs-3 text-primary">Terms</span>
          </a>
          <a href="privacy-policy">
            <span className="c-fs-3 text-black">Privacy Policy </span>
          </a>
          <a href="gdpr">
            <span className="c-fs-3 text-black">GDPR</span>
          </a>
          <a href="refund-policy">
            <span className="c-fs-3 text-black">Refund Policy</span>
          </a>
          <a href="cookie-policy">
            <span className="c-fs-3 text-black">Cookie Policy</span>
          </a>
          <a href="startup-policy">
            <span className="c-fs-3 text-black">Startup Policy</span>
          </a>
          <a href="fair-pricing-policy">
            <span className="c-fs-3 text-black">Fair Pricing Policy</span>
          </a>
          <a href="no-spam">
            <span className="c-fs-3 text-black">No Spam</span>
          </a>
        </div>
        <div className="col-12 col-md-8 col-lg-9 h-100">
          <Terms />
        </div>
      </div>
    </>
  );
};

export default termsofuse;
