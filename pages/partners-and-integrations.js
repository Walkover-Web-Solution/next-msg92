import React from "react";
import { MdOutlineCheck, MdArrowForward } from "react-icons/md";
const partnersAndIntegrations = () => {
  return (
    <>
      <div className="container text-center  overflow-hidden ">
        <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
          <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
            <h1 className="heading py-3">Integrations & Add-ons</h1>
          </div>
          <h2 className="small-heading px-3 w-md-75 w-100 mx-auto pb-1">
            Add-ons that enable SMS notifications in your application with a
            single click.
          </h2>
          <a
                  target="_blank"
                  href="https://control.msg91.com/signup/"
                >
          <button className="btn btn-dark mt-3 c-fs-2" type="button">
            Get your API key
          </button>
          </a>
        </div>
      </div>
      <section className="w-100 py-5">
        <div className="text-center px-2 px-lg-0">
          <h2 className="sub-heading">
            MSG91 Add-ons for your preferred Platform
          </h2>
          <p className="c-fs-3 pt-2">
            Note – For paid plugins you will receive free credits, depending on
            the policy.
          </p>
        </div>
        <div className="container my-5 ">
          <iframe
            className="airtable-embed elementor-container"
            src="https://airtable.com/embed/shrYdNZpl7vaKdcvw?backgroundColor=red&viewControls=on"
            frameborder="0"
            onmousewheel=""
            width="100%"
            height="1200px"
          ></iframe>
        </div>

        <div className="container mt-5 text-center">
          <h2 className="small-heading">
            Don’t see the Add-on or Plugin you are looking for?
          </h2>
          <div className="col-12 px-2 px-lg-0 text-start mt-5 d-flex flex-column flex-lg-row justify-content-between">
            <div className="col-12 col-lg-7">
              <h3 className="py-2">Why Build MSG91 Plugins?</h3>
              <div className="mt-2 mt-lg-0">
                <span className="c-fs-2 text-green">
                  <MdOutlineCheck />
                </span>
                <span className="c-fs-4">
                  All the revenues on the plugin will be yours and it will be
                  your plugin.
                </span>
              </div>
              <div className="mt-2 mt-lg-0">
                <span className="c-fs-2 text-green">
                  <MdOutlineCheck />
                </span>
                <span className="c-fs-4">
                  We will provide free OTP SMS (one time) to every plug-in
                  users.
                </span>
              </div>
              <div className="mt-2 mt-lg-0">
                <span className="c-fs-2 text-green">
                  <MdOutlineCheck />
                </span>
                <span className="c-fs-4">
                  Mentoring for developing plug-in for your choice of platform.
                </span>
              </div>
              <div className="mt-2 mt-lg-0">
                <span className="c-fs-2 text-green">
                  <MdOutlineCheck />
                </span>
                <span className="c-fs-4">
                  We will promote your plugin using Google ad, blogs, mail to
                  all our 40K clients.
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-5 mt-4 mt-lg-0 bg-white p-5 rounded text-center d-flex justify-content-center align-content-center">
              <h3 className="small-heading">
                Up for creating one? Great!
                <p className="c-fs-4 mt-2">We would be glad to add you too.</p>
                <a href="/become-a-partner">
                <button className="c-fs-3 btn btn-dark btn-sm mt-3">
                 Become a partner
                </button>
                </a>
              </h3>
            </div>
          </div>
        </div>
      </section>
      <div className="container d-flex flex-column py-5 ">
        <h2 className="sub-heading py-4 ps-3 pe-md-0">
          Hear from our Partners
        </h2>
        <div className="w-100 d-flex flex-wrap  h-100 p-3 pe-3 pe-md-4 our-partner">
          <div className=" c-w-pp  pe-0 pe-md-5 our-partner h-100">
            <img className="mt-3" src="/img/the-weeky-img.png" />
            <div className="d-flex flex-column">
              <p className="c-fs-3 my-3">
                Our long standing Partnership with MSG91 has been very
                successful. The quality of services and support MSG91 provides
                is excellent. We have been treated with a positive response
                every single time.
              </p>
              <p className="c-fs-3 c-fw-m">Prateek Agrawal</p>
            </div>
          </div>
          <div className="c-w-pp mt-4 mt-md-0 h-100 pe-0 pe-md-5 our-partner pt-4 ">
            <img className="mt-3 " src="/img/rixyncs-img.png" />
            <div className=" d-flex flex-column justify-content-between">
              <p className="c-fs-3 my-3">
                We are happy partnering with MSG91, the team has been prompt in
                addressing the queries and taking our partnership ahead. Thank
                you MSG91
              </p>
              <p className="c-fs-3 c-fw-m t-auto">Bharat Kumar</p>
            </div>
          </div>
        </div>
        {/* <a
          className="mx-auto text-primary c-fs-4 c-fw-m mt-5"
          href="/partners-and-integrations"
        >
          Explore more partners <MdArrowForward />
        </a> */}
      </div>
    </>
  );
};
export default partnersAndIntegrations;
