import React from 'react';
import { GrAndroid, GrApple } from 'react-icons/gr';
import {
  MdOutlinePeopleAlt,
  MdOutlineChatBubbleOutline,
  MdThumbUpOffAlt,
} from 'react-icons/md';

const developers = () => {
  return (
    <>
      <div className='container'>
        <div className=' mx-auto text-center justify-content-center py-2 py-md-5 col-12'>
          <div className='d-flex justify-content-center align-items-center flex-column flex-sm-row py-3'>
            <h1 className='heading'>Hello Developers</h1>
          </div>
          <h2 className='small-heading px-3 col-md-10 col-12 mx-auto pb-2'>
            Integrate SMS, Email, Voice API with Java, PHP, HTTP Scripts. Build
            apps, innovation and ideas for rapid growing business, or just
            integrate for your team development.
          </h2>
          <a target='_blank' href='https://docs.msg91.com/reference/send-sms'>
            <button
              className='btn btn-dark small-heading px-3 py-2 mt-3 c-fw-sb px-md-4 py-md-3 ls-3 '
              type='button'
            >
              Explore Documentation
            </button>
          </a>
        </div>
      </div>
        <div className='container my-80'>
          <h2 className='c-head sub-heading'>
            One API to revolutionalise the way developers integrate
          </h2>
          <p className='c-fs-3 mt-2'>
            A single, unified API to simplify communication across multiple
            architectures. Build integrations faster and deliver a unified
            experience across channels for faster performance, more productivity
            and greater innovation.
          </p>
          <p className='c-fs-3 c-fw-b mt-3'>
            {' '}
            Just integrate and forget the rest of the challenges.
          </p>
        </div>
      <div className='container my-80'>
        <h2 className='c-head sub-heading'>
          We enable communication in your awesome products
        </h2>
        <div className='d-flex w-100 mt-3'>
          <div className='col  flex-column flex-md-row  d-flex align-items-center my-4 justify-content-md-between justify-content-center gap-5 mx-auto'>
            <div className='d-flex gap-2 align-items-center justify-content-center flex-column developers-card  developerCard p-4'>
              <span>
                <img
                  src='/img/Developers/Dev_thumps.svg'
                  className='devImgSize'
                  alt='Dev thumps logo'
                />
              </span>
              <p className='c-fs-3 text-center '>Engineered for reliability</p>
            </div>
            <div className=' d-flex gap-2 align-items-center justify-content-center flex-column developers-card  developerCard p-4'>
              <span>
                <img
                  src='/img/Developers/Dev_coms.svg'
                  className='devImgSize'
                  alt='Dev coms logo'
                />
              </span>
              <p className='c-fs-3 text-center'>Communication addons</p>
            </div>
            <div className=' d-flex gap-2 align-items-center justify-content-center flex-column developers-card  developerCard p-4'>
              <span>
                <img
                  src='/img/Developers/Dev_users.svg'
                  className='devImgSize'
                  alt='Dev users logo'
                />
              </span>
              <p className='c-fs-3 text-center'>Problem solvers at service</p>
            </div>
          </div>
        </div>
      </div>
        <div className='container my-80 '>
          <h2 className='c-head sub-heading'>
            Why MSG91 API is developer friendly for real?
          </h2>
          <div className='mt-3'>
            <p className='c-fs-3 c-fw-b'>Powerful sending infrastructure</p>
            <p className='c-fs-3'>
              Easy API integration and a simple, HTTP or JSON/XML API enables
              your App with Text, Voice and Email functionality. Scale quickly,
              whether it’s a matter of communicating to 10 users or 10 million.
              Build exactly what you need with flexible APIs.
            </p>
          </div>
          <div className='mt-5'>
            <p className='c-fs-3 c-fw-b'>Tracking and analytics</p>
            <p className='c-fs-3'>
              Searchable logs means you always know what is happening to your
              messages, while tags make it easy to report on your data and all
              that via our efficient panel and webhooks.
            </p>
          </div>
          <div className='mt-5'>
            <p className='c-fs-3 c-fw-b'>
              Manage your contact and SMS campaigns wisely
            </p>
            <p className='c-fs-3'>
              Track and optimise your SMS campaign and know how your customer is
              interacting with your messages.
            </p>
          </div>
        </div>
      <div className='container d-flex flex-md-row  flex-column  justify-content-betweeen d-flex my-5 '>
        <div className='col-12 col-md-6 pe-0 pe-md-4 mb-4 mb-md-0 d-flex flex-column align-content-center justify-content-center'>
          <h2 className='small-heading'>
            Start your custom code adventure now
          </h2>
          <p className='c-fs-3'>
            Easily integrate MSG91 APIs for Sending SMS, OTP verification or
            communicate across channels. Access sample codes in Ruby, Python,
            PHP, Java and more.
          </p>
        </div>
        <div className='col-md-6 col-12'>
          <img
            className='developers-code-img w-100'
            src='/img/developers-code-img.png'
            alt='#'
          />
        </div>
      </div>
      <div className='container my-5 text-center d-flex flex-column align-items-center gap-4'>
        <h2 className='small-heading mt-5'>5 Minute Setup</h2>
        <p className='c-fs-3 col-12 col-md-9'>
          Build real-time communications into your apps in a few minutes and a
          few lines of code.The SDKs seamlessly connect to MSG91 global
          infrastructure.
        </p>
        <div className='col-4 justify-content-center gap-5 d-flex'>
          <div className='dev-page-ico '>
            <div className='mx-auto d-flex justify-content-center align-items-center'>
              <a href='https://play.google.com/store/apps/details?id=com.hellornapp' aria-label="Android image">
                {' '}
                <GrAndroid className='heading iconColor p-1' />{' '}
              </a>
            </div>
            <p className='c-fs-2'>Android</p>
          </div>
          <div className='dev-page-ico'>
            <div className='mx-auto d-flex justify-content-center align-items-center'>
              <a href='https://apps.apple.com/in/app/msg91/id981827687' aria-label="iso image">
                {' '}
                <GrApple className='heading iconColor p-1' />{' '}
              </a>
            </div>
            <p className='c-fs-2'>iOS</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default developers;
