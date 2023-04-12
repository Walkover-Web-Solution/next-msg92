import React from "react";
import Footer from "@/components/footer";
import { MdKeyboardArrowRight, MdDone } from "react-icons/md";
import { InlineWidget } from "react-calendly";
const msg91ForStartups = () => {
  return (
    <>
      <div className="container mt-md-5 my-md-0 my-5 d-flex flex-column-reverse flex-md-row justify-content-between">
        <div className="d-flex col-md-6 col-12 justify-content-center flex-column align-items-md-start me-md-5 me-0 mt-4 mt-md-0 text-center text-md-start align-items-center">
          <h1 className="heading">Expand your Vision with us</h1>
          <p className="c-fs-1">
            Get a complimentary communication API package for every product
            Startup.
          </p>
          <a href="/startups-form" className="btn btn-primary c-fs-4 mt-2">Apply Now</a>
        </div>
        <div className="col-12 col-md-6">

        <img className="startup-home-img flip-vertical  " src="/img/startup-home-img.svg" width="648" height="291"  />
        </div>
      </div>
      <section className="c-bg-grey p-5 text-center small-heading">
        "Today we help you, tomorrow we can change the world together."
      </section>
      <div className=" p-5 text-center justify-content-center">
        <h3 className="sub-heading">
          Grow your Startup with Robust Infrastructure
        </h3>
        <div className="d-flex flex-column flex-md-row gap-5 gap-md-0 my-5 align-items-center justify-content-center">
          <div className="signup-cont c-bg-grey p-4 d-flex flex-column align-items-center justify-content-center">
            <span className="c-fs-2 c-fw-sb">Sign up</span>
            <p className="c-fs-4 mt-2">
              Sign up with your official email ID and integrate MSG91 API.
            </p>
          </div>

          <div className=" d-none p-5 c-fs-1 c-col-grey d-md-flex flex-column align-items-center justify-content-center">
            <MdKeyboardArrowRight />
          </div>
          <div className="signup-cont c-bg-grey p-4 d-flex flex-column align-items-center justify-content-center">
            <span className="c-fs-2 c-fw-sb">Apply</span>
            <p className="c-fs-4 mt-2">
              If you fulfill criteria, you can apply for the startup program.
            </p>
          </div>

          <div className=" p-5 c-fs-1 c-col-grey d-none d-md-flex flex-column align-items-center justify-content-center">
            <MdKeyboardArrowRight />
          </div>
          <div className="signup-cont c-bg-grey p-4 d-flex flex-column align-items-center justify-content-center">
            <span className="c-fs-2 c-fw-sb">Enjoy</span>
            <p className="c-fs-4 mt-2">
              You are good to go to avail the benifits.
            </p>
          </div>
        </div>
      </div>
      <div className="container px-3 px-md-auto">
        <h2 className="sub-heading">Benifits of Startup Program</h2>
        <div className="mt-2 ">
          <span className="c-fs-1 c-fw-b text-green">
            <MdDone />
          </span>
          <span className="c-fs-4 ms-2">
            25000 SMS credits every months for 6 months.
          </span>
        </div>
        <div className="mt-2 ">
          <span className="c-fs-1 c-fw-b text-green">
            <MdDone />
          </span>
          <span className="c-fs-4 ms-2">
            Can be used for OTP, Transactional SMS, Emails.
          </span>
        </div>
        <div className=" mt-2">
          <span className="c-fs-1 c-fw-b text-green">
            <MdDone />
          </span>
          <span className="c-fs-4 ms-2">
            Leverage our Cloud contact center HELLO and Customer Segmentation
            product.
          </span>
        </div>
        <div className="mt-2 ">
          <span className="c-fs-1 c-fw-b text-green">
            <MdDone />
          </span>
          <span className="c-fs-4 ms-2">
            Get support from our Superherose to integrate scalable APIs.
          </span>
        </div>
      </div>
      <section className="my-5 py-5 c-bg-grey">
        <div className="container px-3 px-md-auto">
          <h2 className="sub-heading my-2">Our Collaborators</h2>
          <p className="c-fs-4 w-100 mb-2 ">
            We’re proud to be associated with a growing set of Venture
            Capitalists, Accelerators,Incubators and Crowdfunding platforms
            across to inspire, identify and develop end-to-end solutions for
            businesses to discover and engage.
          </p>
          <iframe className="airtable-embed" src="https://airtable.com/embed/shrMAxbTEzIuHmC2j?backgroundColor=cyan&viewControls=on" style={{background: 'transparent', border: '1px solid #ccc', height: '100vh', width: '100%'}} />

        </div>
      </section>
      <div className="container px-3 px-md-auto">
        <h2 className="sub-heading">
          Checklist to become a part of the program
        </h2>
        <div className=" ">
          <span className="c-fs-1 c-fw-b text-green">
            <MdDone />
          </span>
          <span className="c-fs-4 ms-2">New MSG91 subscriber</span>
        </div>
        <div className=" ">
          <span className="c-fs-1 c-fw-b text-green">
            <MdDone />
          </span>
          <span className="c-fs-4 ms-2">Sign up from a private domain ID</span>
        </div>
        <div className=" ">
          <span className="c-fs-1 c-fw-b text-green">
            <MdDone />
          </span>
          <span className="c-fs-4 ms-2">
            Associated with our preferred collaborators
          </span>
        </div>
      </div>
      
      <Footer />
    </>
  );
};
export default msg91ForStartups;
