import { InlineWidget } from 'react-calendly';
import React from 'react';
import { MdDoneOutline, MdArrowForward } from 'react-icons/md';

export async function getStaticProps() {    
  let data = null;
  try {
      const response = await fetch("https://api.airtable.com/v0/appxLAuNWLqf7kh4j/STARTUP%20PAGE%20-%20WEBSITE%20DISPLAY?maxRecords=3&view=Grid%20view", {
          headers: {
              Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          },
      });
      data = response.data;
      //console.log('getStaticProps', data);
  } catch (error) {
      console.error("There was an error fetching the data!", error);
  }
  
  return {
      props: {
          data : data || {}
      },
  };
}

const becomeApartner = () => {
  return (
    <>
      <div className='container text-center d-flex flex-column align-items-center justify-content-center pt-5 my-3'>
        <h1 className='heading c-head '>MSG91 Partner Program</h1>
        <p className='c-fs-2 mt-2 text-center w-100 w-md-50'>
          Leverage your communication tactics with the MSG91 CPaaS solution
        </p>
        <a href='#partnership-meet' className='btn btn-dark c-fs-3 mt-3 mb-5'>
          Apply Now
        </a>
        {/* <Trustedsec className="" /> */}
      </div>
      <section className='section pb-5'>
        <div className='container'>
          <h2 className='sub-heading ps-3 ps-lg-0 pe-md-0  c-head '>
            Partnership Solutions
          </h2>          
          <div className=' d-flex flex-column flex-md-row-reverse justify-content-between align-items-center py-5'>
            <div className=' c-w-pp p-1 p-md-0 col-12 col-md-6 '>
              <h3 className=' c-fs-1 c-fw-m  c-head '>
                Affiliated Partnership
              </h3>
              <p className='c-fs-3'>
                Turn your referrals into recurring revenue with MSG91 for
                Affiliates Program. Co-sell through our powerful APIs and simply
                monetize existing relationships by referring us to growing
                businesses.
              </p>
            </div>
            <img
              className='m-3 col-12 col-md-5 mt-md-0 '
              src='/img/affiliated-partnership-img.png'
              alt='affiliated partnership image'
            ></img>
          </div>
          {/* <div className=' d-flex flex-column flex-md-row justify-content-between align-items-center pb-5'>
            <div className=' c-w-pp p-md-0  col-12 col-md-6 '>
              <h3 className=' c-fs-1 c-fw-m  c-head '>
                Consultation Partnership
              </h3>
              <p className='c-fs-3'>
                We provide you with human resources list of expert team of
                coders and developers required to grow your Business. Our
                development team is excellently trained and professional in
                bringing out the best version of your business into digital
                universe.
              </p>
            </div>
            <img
              className=' col-12 col-md-5 mt-md-0 '
              src='/img/consulation-partnership-img.png'
             
            ></img>
          </div> */}
          <div className='gap-4 d-flex flex-column flex-md-row justify-content-between align-items-center pb-5'>
            <div className=' c-w-pp p-1 p-md-0 col-12 col-md-6 '>
              <h3 className=' c-fs-1 c-fw-m  c-head '>
                Integration / Add-on Partnership
              </h3>
              <p className='c-fs-3'>
                If you are a CRM solution, marketing platform, e-commerce
                builder, or any other SaaS product, You can integrate MSG91 in
                your platform to enable communication across channels like
                WhatsApp, Text SMS, Email, Voice, RCS, Telegram etc from right
                within. As an added perk, you will also be featured here.
              </p>
            </div>
            <img
              className=' mt-md-0 col-12 col-md-5 '
              src='/img/integration-partnership-img.png'
              alt='integration partnership image'
            />
          </div>
          <div className=' mb-4 d-flex flex-column  flex-md-row-reverse justify-content-between align-items-center'>
            <div className=' c-w-pp p-md-0 col-12 col-md-6 '>
              <h3 className=' c-fs-1 c-fw-m  c-head '>MSG91 For Startups</h3>
              <p className='c-fs-3'>
                If you are an Incubator, Accelerator, Venture Capital Fund,
                Co-working Space etc, offer our Complimentary Startup Package to
                your portfolio and empower them with the best in class
                communication APIs right from the start.
              </p>
            </div>
            <img
              className='m-3 col-12 col-md-5 mt-3 mt-md-0'
              src='/img/msg91-for-startups-img.png'
              alt='msg91 for startups image'
            ></img>
          </div>
        </div>
      </section>
      <div className='container d-flex px-5 pb-5' id='partnership-meet'>
        <InlineWidget
          url='https://calendly.com/partnership-msg91/discussion'
          styles={{ width: '100%', height: '700px' }}
        />
      </div>
      <section className='section'>
        <div className='container d-flex flex-wrap'>
          <div className='c-w-pp p-3 '>
            <MdDoneOutline className='c-fs-1 text-primary' />
            <h2 className='small-heading c-fw-m my-3'>Deep Integration</h2>
            <p className='c-fs-3'>
              MSG91 APIs enable you to code the services as a part of your own
              product. Allow your users to seamlessly experience the power of
              communication in your tool.
            </p>
          </div>
          <div className='c-w-pp  p-3 '>
            <MdDoneOutline className='c-fs-1 text-primary' />
            <h2 className='small-heading c-fw-m my-3'>Revenue Sharing</h2>
            <p className='c-fs-3'>
              We mean it when we say, it’s your product. Even though the
              customer uses MSG91 APIs, we only charge for our volume cost.
              Remaining revenue remains yours.
            </p>
          </div>
          <div className='c-w-pp  p-3'>
            <MdDoneOutline className='c-fs-1 text-primary' />
            <h2 className='small-heading c-fw-m my-3'>Service Resilience</h2>
            <p className='c-fs-3'>
              We ensure that the APIs see a 99.99% success rate. Challenges we
              face at the backend, are our responsibility. It’s our commitment
              to make your business seamless.
            </p>
          </div>
          <div className='c-w-pp  p-3'>
            <MdDoneOutline className='c-fs-1 text-primary' />
            <h2 className='small-heading c-fw-m my-3'>Customer Support</h2>
            <p className='c-fs-3'>
              We treat your customers as ours when it comes to support. Our
              support team handles their queries and addresses their concerns if
              any.
            </p>
          </div>
        </div>
      </section>
      <div className='container d-flex flex-column py-3 '>
        <h2 className='sub-heading py-4 ps-3 pe-md-0  c-head '>
          Hear from our Partners
        </h2>
        <div className='w-100 d-flex flex-wrap  h-100 p-3 pe-3 pe-md-4 our-partner'>
          <div className=' c-w-pp  pe-0 pe-md-5 our-partner h-100'>
            <img className='mt-3' src='/img/the-weeky-img.png' alt='weeky image'/>
            <div className='d-flex flex-column'>
              <p className='c-fs-3 my-3'>
                Our long standing Partnership with MSG91 has been very
                successful. The quality of services and support MSG91 provides
                is excellent. We have been treated with a positive response
                every single time.
              </p>
              <p className='c-fs-3 c-fw-m'>Prateek Agrawal</p>
            </div>
          </div>
          <div className='c-w-pp mt-4 mt-md-0 h-100 pe-0 pe-md-5 our-partner py-3 '>
            <img className='mt-3 ' src='/img/rixyncs-img.png' alt='rixyncs image'/>
            <div className=' d-flex flex-column justify-content-between'>
              <p className='c-fs-3 my-3'>
                We are happy partnering with MSG91, the team has been prompt in
                addressing the queries and taking our partnership ahead. Thank
                you MSG91
              </p>
              <p className='c-fs-3 c-fw-m t-auto'>Bharat Kumar</p>
            </div>
          </div>
        </div>
        <a
          className='mx-auto text-primary c-fs-4 c-fw-m py-5'
          href='/partners-and-integrations'
        >
          Explore more partners <MdArrowForward />
        </a>
      </div>
    </>
  );
};
export default becomeApartner;
