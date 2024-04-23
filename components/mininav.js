import React, { useEffect } from "react";
import Image from "next/image";
import $ from "jquery";


const Mininav = ({ path }) => {
  
  return (
    <>
      <div className="mininav container d-md-none d-block annoucmentbar" id="mininav">
        <div className="overlay-menu container d-flex flex-wrap gap-3 p-3 mininav-cont">
          <div className="menu mt-4 d-flex flex-column ">
            <p className="c-fs-3 c-fw-sb text-grey text-uppercase ">
              Applications
            </p>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href={`${path}/hello`}
            >
              <Image
                src="/img/icon/hello.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <div className="">
                <h4 className="c-fs-2">Hello</h4>
                <p className="c-fs-5">Ticketing and Chat</p>
              </div>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href={`${path}/campaign`}
            >
              <Image
                src="/img/icon/campaign.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <div className="">
                <h4 className="c-fs-2">Campaign</h4>
                <p className="c-fs-5">Event Based Automation</p>
              </div>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href={`${path}/segmento`}
            >
              <Image
                src="/img/icon/segmento.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <div className="">
                <h4 className="c-fs-2">Segmento</h4>
                <p className="c-fs-5">Contact Managment</p>
              </div>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href={`${path}/otp`}
            >
              <Image src="/img/icon/otp.svg" width={40} height={40} alt="ico" />
              <div className="">
                <h4 className="c-fs-2">OTP</h4>
                <p className="c-fs-5">Simplified OTP Platform</p>
              </div>
            </a>
          </div>
          <div className="menu mt-4 d-flex flex-column">
            <p className="c-fs-3 c-fw-sb text-grey text-uppercase ">
              Utilities
            </p>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href={`${path}/shorturl`}
            >
              <Image
                src="/img/icon/shorturl.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <div className="">
                <h4 className="c-fs-2">Shorturl</h4>
                <p className="c-fs-5">Cutomise and Track URL's</p>
              </div>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href={`${path}/knowledgebase`}
            >
              <Image
                src="/img/icon/knowledgebase.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <div className="">
                <h4 className="c-fs-2">KnowledgeBase</h4>
                <p className="c-fs-5">Manage Help Docs and Guides</p>
              </div>
            </a>
          </div>
          <div className="menu mt-4 d-flex flex-column ">
            <p className="c-fs-3 c-fw-sb text-grey text-uppercase ">Channels</p>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href={`${path}/sms`}
            >
              <Image src="/img/icon/sms.svg" width={40} height={40} alt="ico" />
              <h4 className="c-fs-2">SMS</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href={`${path}/email`}
            >
              <Image
                src="/img/icon/email.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">Email</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href={`${path}/voice`}
            >
              <Image
                src="/img/icon/voice.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">Voice</h4>
            </a>
            <a
              className="d-flex gap-3 align-items-center product-menu-btn p-3"
              href={`${path}/whatsapp`}
            >
              <Image
                src="/img/icon/whatsapp.svg"
                width={40}
                height={40}
                alt="ico"
              />
              <h4 className="c-fs-2">WhatsApp</h4>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mininav;
