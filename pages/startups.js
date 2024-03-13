import React from 'react';
import { MdKeyboardArrowRight, MdDone } from 'react-icons/md';
import { InlineWidget } from 'react-calendly';
const msg91ForStartups = () => {
  return (
    <>
      <div className='container d-flex justify-content-center flex-column text-center my-5 gap-3 '>
        <div>
          <h1 className='heading'>Expand your vision with us</h1>
        </div>

        <div>
          <p className='small-heading p-2'>
            Get a complimentary communication API package tailored to meet your needs
          </p>
        </div>

        <div>
          <a
            href='/startups-form/'
            className='btn btn-dark small-heading px-3 py-2 mt-3 c-fw-sb px-md-4 py-md-3 ls-3'
          >
            Apply Now
          </a>
        </div>
      </div>

      <section className='bg-dark p-5 text-white my-80 text-center small-heading'>
        Today we help you, tomorrow we can change the world together
      </section>
      <div className=' my-80 text-center justify-content-center'>
        <h2 className='c-head sub-heading mt-3'>
          Grow your Startup with Robust Infrastructure
        </h2>
        <div className='container d-flex flex-column flex-md-row gap-5 gap-md-0 my-5 align-items-center justify-content-md-between justify-content-cenetr'>
          <div className='signup-cont startUpCart  p-3 d-flex flex-column align-items-center justify-content-center'>
            <span className='c-fs-2 c-fw-sb'>Sign up</span>
            <p className='c-fs-4 mt-2'>
              Sign up with your official email ID and integrate MSG91 API
            </p>
          </div>

          <div className=' d-none p-2 p-lg-2 p-xl-4 c-fs-1 c-col-grey d-md-flex flex-column align-items-center justify-content-center'>
            <MdKeyboardArrowRight />
          </div>
          <div className='signup-cont startUpCart p-4 d-flex flex-column align-items-center justify-content-center'>
            <span className='c-fs-2 c-fw-sb'>Apply</span>
            <p className='c-fs-4 mt-2'>
              If you fulfill criteria, you can apply for the startup program
            </p>
          </div>

          <div className='d-none p-2 p-lg-2 p-xl-4 c-fs-1 c-col-grey d-md-flex flex-column align-items-center justify-content-center'>
            <MdKeyboardArrowRight />
          </div>
          <div className='signup-cont startUpCart p-4 d-flex flex-column align-items-center justify-content-center'>
            <span className='c-fs-2 c-fw-sb'>Enjoy</span>
            <p className='c-fs-4 mt-2'>
              You are good to go to avail the benifits
            </p>
          </div>
        </div>
      </div>
      <div className='container px-3 px-md-auto'>
        <h2 className='sub-heading c-head'>Benefits of Startup Program</h2>
        <div className='mt-2 '>
          <span className='c-fs-1 c-fw-b text-green'>
            <MdDone />
          </span>
          <span className='c-fs-4 ms-2'>
            25000 SMS credits every month for 6 months
          </span>
        </div>
        <div className='mt-2 '>
          <span className='c-fs-1 c-fw-b text-green'>
            <MdDone />
          </span>
          <span className='c-fs-4 ms-2'>
            Can be used for OTP, Transactional/Promotional SMS, Emails, WhatsApp or Voice
          </span>
        </div>
        <div className=' mt-2'>
          <span className='c-fs-1 c-fw-b text-green'>
            <MdDone />
          </span>
          <span className='c-fs-4 ms-2'>
            Leverage our Cloud contact center <b>HELLO</b>, Contact Management tool <b>SEGMENTO</b>, Event Based Automation tool <b>CAMPAIGN</b> and FAQ software <b>KNOWLEDGEBASE</b> to drive your sales
          </span>
        </div>
        <div className='mt-2 '>
          <span className='c-fs-1 c-fw-b text-green'>
            <MdDone />
          </span>
          <span className='c-fs-4 ms-2'>
            Get support from our Superheroes to integrate scalable APIs
          </span>
        </div>
      </div>
      <section className='my-80 '>
        <div className='container px-3 px-md-auto'>
          <h2 className='sub-heading  c-head'>Our Collaborators</h2>
          <p className='c-fs-3 col-12 col-md-10 mb-4 '>
            We’re proud to be associated with a growing set of Venture
            Capitalists, Accelerators, Incubators and Crowdfunding platforms
            across to inspire, identify and develop end-to-end solutions for
            businesses to discover and engage.
          </p>
          <iframe
            className='airtable-embed'
            src='https://airtable.com/embed/shrMAxbTEzIuHmC2j?backgroundColor=cyan&viewControls=on'
            title='airtable-embed'
            style={{
              background: 'transparent',
              border: '1px solid #ccc',
              height: '100vh',
              width: '100%',
            }}
          />
        </div>
      </section>
      <div className='container px-3 px-md-auto my-80'>
        <h2 className='c-head sub-heading'>
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
