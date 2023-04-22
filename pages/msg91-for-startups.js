import React from 'react';
import { MdKeyboardArrowRight, MdDone } from 'react-icons/md';
import { InlineWidget } from 'react-calendly';
const msg91ForStartups = () => {
  return (
    <>
      <div className='container d-flex justify-content-center flex-column text-center my-5 gap-4 '>
        <div>
          <h1 className='heading'>Expand your vision with us</h1>
        </div>

        <div>
          <p className='c-fs-2 p-2'>
            Get a complimentary communication API package for every product
            Startup.
          </p>
        </div>

        <div>
          <a
            href='https://control.msg91.com/signup/'
            className='btn btn-dark c-fs-4 mt-2'
          >
            Apply Now
          </a>
        </div>
      </div>

      <section className=' mt-5 mb-3 p-5 text-center small-heading'>
        "Today we help you, tomorrow we can change the world together."
      </section>
      <div className=' p-2 text-center justify-content-center'>
        <h3 className='sub-heading mt-3'>
          Grow your Startup with Robust Infrastructure
        </h3>
        <div className='container d-flex flex-column flex-md-row gap-5 gap-md-0 my-5 align-items-center justify-content-md-between justify-content-cenetr'>
          <div className='signup-cont startUpCart  p-3 d-flex flex-column align-items-center justify-content-center'>
            <span className='c-fs-2 c-fw-sb'>Sign up</span>
            <p className='c-fs-4 mt-2'>
              Sign up with your official email ID and integrate MSG91 API.
            </p>
          </div>

          <div className=' d-none p-2 p-lg-2 p-xl-4 c-fs-1 c-col-grey d-md-flex flex-column align-items-center justify-content-center'>
            <MdKeyboardArrowRight />
          </div>
          <div className='signup-cont startUpCart p-4 d-flex flex-column align-items-center justify-content-center'>
            <span className='c-fs-2 c-fw-sb'>Apply</span>
            <p className='c-fs-4 mt-2'>
              If you fulfill criteria, you can apply for the startup program.
            </p>
          </div>

          <div className='d-none p-2 p-lg-2 p-xl-4 c-fs-1 c-col-grey d-md-flex flex-column align-items-center justify-content-center'>
            <MdKeyboardArrowRight />
          </div>
          <div className='signup-cont startUpCart p-4 d-flex flex-column align-items-center justify-content-center'>
            <span className='c-fs-2 c-fw-sb'>Enjoy</span>
            <p className='c-fs-4 mt-2'>
              You are good to go to avail the benifits.
            </p>
          </div>
        </div>
      </div>
      <div className='container px-3 px-md-auto'>
        <h2 className='sub-heading'>Benifits of Startup Program</h2>
        <div className='mt-2 '>
          <span className='c-fs-1 c-fw-b text-green'>
            <MdDone />
          </span>
          <span className='c-fs-4 ms-2'>
            25000 SMS credits every months for 6 months.
          </span>
        </div>
        <div className='mt-2 '>
          <span className='c-fs-1 c-fw-b text-green'>
            <MdDone />
          </span>
          <span className='c-fs-4 ms-2'>
            Can be used for OTP, Transactional SMS, Emails.
          </span>
        </div>
        <div className=' mt-2'>
          <span className='c-fs-1 c-fw-b text-green'>
            <MdDone />
          </span>
          <span className='c-fs-4 ms-2'>
            Leverage our Cloud contact center HELLO and Customer Segmentation
            product.
          </span>
        </div>
        <div className='mt-2 '>
          <span className='c-fs-1 c-fw-b text-green'>
            <MdDone />
          </span>
          <span className='c-fs-4 ms-2'>
            Get support from our Superherose to integrate scalable APIs.
          </span>
        </div>
      </div>
      <section className='my-5 py-5 '>
        <div className='container px-3 px-md-auto'>
          <h2 className='sub-heading py-3'>Our Collaborators</h2>
          <p className='c-fs-4 w-100 pb-3 '>
            We’re proud to be associated with a growing set of Venture
            Capitalists, Accelerators,Incubators and Crowdfunding platforms
            across to inspire, identify and develop end-to-end solutions for
            businesses to discover and engage.
          </p>
          <iframe
            className='airtable-embed'
            src='https://airtable.com/embed/shrMAxbTEzIuHmC2j?backgroundColor=cyan&viewControls=on'
            style={{
              background: 'transparent',
              border: '1px solid #ccc',
              height: '100vh',
              width: '100%',
            }}
          />
        </div>
      </section>
      <div className='container px-3 px-md-auto pb-5'>
        <h2 className='sub-heading'>
          Checklist to become a part of the program
        </h2>
        <div className=' '>
          <span className='c-fs-1 c-fw-b text-green'>
            <MdDone />
          </span>
          <span className='c-fs-4 ms-2'>New MSG91 subscriber</span>
        </div>
        <div className=' '>
          <span className='c-fs-1 c-fw-b text-green'>
            <MdDone />
          </span>
          <span className='c-fs-4 ms-2'>Sign up from a private domain ID</span>
        </div>
        <div className=' '>
          <span className='c-fs-1 c-fw-b text-green'>
            <MdDone />
          </span>
          <span className='c-fs-4 ms-2'>
            Associated with our preferred collaborators
          </span>
        </div>
      </div>
    </>
  );
};
export default msg91ForStartups;
