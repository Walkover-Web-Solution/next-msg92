// Child Component
import React, { useEffect, useState } from 'react';
import PreFooter from '../preFooter';
import TrustedByOtherThanIndia from '../trustedByOtherThanIndia';
import Seo from '../seoComp';
import axios from "axios";
import { setUtm } from '../pricingComp';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

const HelloNewComponent = ({pageData, path, pricingPath}) => {
  const fetchSubscription = async (currencyChange) =>{
  var response = '';    
    try{
      const response = await axios.get(
      `https://subscription.msg91.com/api/plans?currency=${currencyChange}&ms_id=7`
    );
    setSubscriptionHello(response.data.data)
    // return subscriptionHello;
    }
    catch(error){
      console.log(error,"error");
    }
  }
  const [symbol, setSymbol] = useState('$');
  const [currencyChange, setCurrency] = useState('USD');
  const [selectedMode, setSelectedMode] = useState('Monthly');
  const [subscriptionHello, setSubscriptionHello] = useState(''); // Initialize subscriptionHello state
  useEffect(()=>{
    
    const fetchData = async () => {
      const data = await fetchSubscription(currencyChange);
      setSubscriptionHello(data)
    };
    fetchData();
  },[])
  var plans = [];
  var tempFeaturesArray = [];  
  for (let i = 0; i < subscriptionHello?.length; i++) {
    plans[i] = {};
    plans[i].channels = [];
    plans[i].features = [];
    const subscription = subscriptionHello[i]?.planFeatures?.map((data, index) => {
      if(data.is_visible === 1 && subscriptionHello[i]?.show_features){
        if (data.feature.key.includes("support_channel")) {
          plans[i].channels.push(data.feature.name);
        }
        else{          
          if(!tempFeaturesArray.includes(data.feature.name)){
            tempFeaturesArray.push(data.feature.name);
            plans[i].features.push(data.feature.name);
          }          
        }
      }
    })
  }
  const changeCurrency = async (currency) => {
    setCurrency(currency);
    fetchSubscription(currency)
    switch (currency) {
      case 'USD':
        setSymbol('$');
        setCurrency('USD');
        break;
      case 'GBP':
        setSymbol('£');
        setCurrency('GBP');
        break;
    }
  };
  useEffect(() => {
    setUtm();
    fetchSubscription(currencyChange)
  }, []);
  var i = 0;
  return (
    <>
      <div className="container overflow-hidden">
        <div className='row'>
          <div className="py-2 py-md-5 col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="intro">INTRODUCING</div>
            <div className="d-flex flex-sm-row">
              <h1 className={`heading-plus page-title ${pageData?.pagename}-heading c-fw-b`}>
                <img src={pageData?.icon} className="product-page-logo me-2" />
                <span className="hello">Hello</span>
                <br></br>
                An <span className="ai-fueled">AI-Fueled</span>
                <br></br>
                <span>Conversational HUB</span>
              </h1>
            </div>

            <div className='hero-img-mobile-wrp mt-3'>
              <img
                src="/images/hello/hero.svg"
                className="img-fluid mx-auto"
                alt="#"
              />
            </div>

            <p className={`c-fs-4 text-uppercase col-otp c-ls-20 mx-auto mt-5 ${pageData?.pagename}-dark`}>
              {pageData?.tagline}
            </p>
            
            <h2 className="small-heading w-md-75 w-100 mx-auto fw-normal mt-2">
              {pageData?.subheading}
            </h2>                
            
            <a href="https://control.msg91.com/signup/" className="btn btn-dark btn-lg c-fs-2 mt-5 utm get-started-hello" >
            GET STARTED
            </a>
            <TrustedByOtherThanIndia />
          </div>
          <div className='col-12 col-md-6 col-sm-12 order-sm-0'>
            <div className='hero-img-wrp'>
              <img
                src="/images/hello/hero.svg"
                className="img-fluid mx-auto"
                alt="#"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="discover py-5 py-md-5">
        <div className="container py-4">
          <h3 className='c-fs-1 c-fw-b'>Discover the Powerhouse Communication Solution </h3>
          <div className='c-fs-2 mt-3'>
            When it comes to revolutionizing communication, look no further than HELLO by MSG91.
          </div>
          <div className='c-fs-2 mt-3'>
            Our cutting-edge application is designed to empower businesses across every industry with a suite of features that are not only transformative but also tailored to your needs. 
          </div>          
          <div className="d-flex flex-wrap text-center text-sm-start  align-items-center">
              
            <h2 className="col-12 col-sm-6 col-lg-6 d-flex align-items-center my-4 gap-3 c-fs-2 c-fw-b">
              <img src="/images/hello/e-commerce.svg" />
              E-commerce
            </h2>
          
            <h2 className="col-12 col-sm-6 col-lg-6 d-flex align-items-center my-4 gap-3 c-fs-2 c-fw-b">
              <img src="/images/hello/fintech.svg" />
              Fintech
            </h2>                
              
            <h2 className="col-12 col-sm-6 col-lg-6 d-flex align-items-center my-4 gap-3 c-fs-2 c-fw-b">
              <img src="/images/hello/care.svg" />
              Healthcare              
            </h2>
            <h2 className="col-12 col-sm-6 col-lg-6 d-flex align-items-center my-4 gap-3 c-fs-2 c-fw-b">
              <img src="/images/hello/tech.svg" />
              Technology              
            </h2>          
          </div>
          <div className='c-fs-2 mt-3'>
            No matter if you're in ecommerce, fintech, healthcare, or any other field, HELLO is the ultimate solution to elevate your communication game.
          </div>
        </div>
      </div>

      <div className={`px-sm-0 d-flex flex-column justify-content-center justify-content-sm-start section hello-new-features py-5`}>        
        {pageData?.features?.map((item, index) => {          
          if(item?.content){
            i++;            
            return (
              <div key={`f-${index}`} 
                className={`container hnf flex-column d-flex my-3 my-md-5 align-items-center justify-content-md-between justify-content-center ${i%2 ? 'flex-md-row-reverse' : 'flex-md-row'} ${i%3 === 1 ? 'yellow' : ''}${i%3 === 2 ? 'purple' : ''}${i%3 === 0 ? 'blue' : ''}` }>
                <div className="col-12 col-md-6 d-flex justify-content-center">
                {item?.img &&
                  <img
                  src={item?.img}
                  className="feature-img "
                />
                }                
                </div>
                <div className="col-12 col-md-5 d-flex flex-column ">
                  {item?.icon &&
                    <img
                    src={item?.icon}
                    style={{width: "72px"}}
                    className="feature-img mb-3"
                  />
                  } 
                  <span className="c-fs-2 c-fw-b head">
                    {item?.heading}
                  </span>
                  <span className="c-fs-3  mt-3">
                    <span className='c-fw-b'>{item?.subheading}</span> {item?.content}
                  </span>
                </div>
              </div> 
            );            
          }
        })}
      </div>
      
      <div className="marquee-wrp py-3 py-md-5">
        {/* <marquee>This text will scroll from right to left</marquee> */}
        <div className="container">          
          <div className='c-fs-2 mt-3'>
            At MSG91, we're not just offering a communication solution; We're offering a game-changer for businesses of all sizes and industries.
          </div>
          <div className='c-fs-2 mt-3'>
            With HELLO, you're not just communicating – you're connecting, engaging, and thriving. Embrace the future of communication today.
          </div>                            
        </div>
        <div style={{'width':'100vw', overflow:'hidden'}}>
          <div className="marquee mt-5 mb-5">
            <span className="yellow">Connect</span>
            <span className="purple">Engage</span>
            <span className="blue">Thrive</span>          
            <span className="yellow">Connect</span>
            <span className="purple">Engage</span>
            <span className="blue">Thrive</span>          
            <span className="yellow">Connect</span>
            <span className="purple">Engage</span>
            <span className="blue">Thrive</span>          
            <span className="yellow">Connect</span>
            <span className="purple">Engage</span>
            <span className="blue">Thrive</span>          
            <span className="yellow">Connect</span>
            <span className="purple">Engage</span>
            <span className="blue">Thrive</span>          
            <span className="yellow">Connect</span>
            <span className="purple">Engage</span>
            <span className="blue">Thrive</span>          
            <span className="yellow">Connect</span>
            <span className="purple">Engage</span>
            <span className="blue">Thrive</span>          
            <span className="yellow">Connect</span>
            <span className="purple">Engage</span>
            <span className="blue">Thrive</span>          
            <span className="yellow">Connect</span>
            <span className="purple">Engage</span>
            <span className="blue">Thrive</span>          
          </div>
        </div>
        
        <div className="container">          
          <div className='c-fs-2 mt-3'>
            Ready to transform the way you communicate? Say HELLO to your business's next big leap. Get started with HELLO by MSG91 now and experience the difference firsthand.
          </div>
          <a href="https://control.msg91.com/signup/" className="btn btn-dark btn-lg c-fs-2 mt-4  mb-4 utm get-started-hello me-5" >
            GET STARTED
          </a>
          
          <a href="/contact-us" className="btn btn-outline-dark btn-lg c-fs-2 mt-4  mb-4 utm get-started-hello" >
            CONTACT SALES
          </a>

          
          <div className='c-fs-2 mt-3'>
            Unlock limitless possibilities with HELLO by MSG91. Your communication revolution starts here.
          </div>
        </div>
      </div>
      
      <div className='py-3 py-md-5 pricing-new-hello-wrp'>
        <div className='container'>
          <div className="d-flex align-items-center justify-content-between px-3">
            <div className='c-fs-1 c-fw-b ts2-white'>
              A plan for every business and budget, <br></br>Find yours today!
            </div>
            <select
              style={{ width: 'fit-content' }}
              className="form-select mt-4"
              aria-label="Default select example"
              onChange={(e) => changeCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div className="d-flex flex-wrap flex-gap gap-5 w-100  card-container mt-5 justify-content-center">
            {subscriptionHello?.length
              ? subscriptionHello?.map((item, index) => {            
                return (
                  <div key={`email-card-${index}`} className="mx-3 flex-fill">
                    <div className="d-flex h-100 align-items-start">
                      {/* <div className="popular-chip c-fs-6">POPULAR</div> */}
                      <div className="price-card email card  mb-4 mb-sm-0 c-bg-grey border-0 h-100 flex-fill">
                        <div className="card-body text-center">
                          <h3 className="c-fs-3">{item.name}</h3>
                          <h5 className="mt-2 c-fs-2 text-green">
                            {symbol}
                            {selectedMode === 'Monthly'
                              ? item?.plan_amounts[0]?.plan_amount
                              : item?.plan_amounts[1]?.plan_amount}
                            /{selectedMode === 'Monthly' ? 'Month' : 'Yearly'}
                          </h5>
                          <a
                            href="https://control.msg91.com/signup/"
                            target="_blank"
                            className="c-fs-5 btn w-100 btn-outline-dark mt-4 utm"
                          >
                            Get Started
                          </a>
                          <div className="c-fs-6 mt-2 text-start feature-list">
                            <hr style={{ borderColor: "#999" }}></hr>
                            <div className="c-fs-6 mb-2 mt-2 ">
                              <span className="c-fs-6 mb-2 mt-2">Included</span>
                              <div className="ms-4">
                                <div>
                                  {' '}
                                  {
                                    item.plan_services[0].service_credit
                                      .service_credit_rates[0].free_credits
                                  }{' '}
                                  {item.plan_services[0].service_credit.service.name}{' '}
                                </div>
                                <div>
                                  {
                                    item.plan_services[1].service_credit
                                      .service_credit_rates[0].free_credits
                                  }{' '}
                                  {item.plan_services[1].service_credit.service.name}
                                </div>
                              </div>
                            </div>
                            <div className="c-fs-4 mb-2 mt-3 ">
                              <p>Features</p>                          
                            </div>
                            {index > 0 &&                        
                                <div>
                                  <span className="text-green me-2">
                                    <MdDone />
                                  </span>
                                  <strong>All {subscriptionHello[index-1].name} Plan Features</strong>
                                </div>
                            }
                            {
                                plans[index].features && 
                                plans[index].features
                                .map((data, index) => {                              
                                  return (
                                    <div key={`data-${index}`}>
                                        <p>
                                          <span className="text-green me-2">
                                            <MdDone />
                                          </span>
                                          {data}
                                        </p>
                                    </div>                                  
                                  );
                                })
                              }

                            {index === 0 &&
                              <div className="c-fs-6 mb-2"> 
                                <span className="text-green me-2"><MdDone /></span> Supported Channels
                                <ul className='mt-1 mb-1' style={{marginLeft: "7px", listStyle: "none", paddingLeft: '21px'}}>
                                  {plans[index].channels.map((data, index) => {
                                    return (
                                      <li key={`data-${index}`}>
                                        {data}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            }

                          </div>

                          {item.postpaid_allowed && (
                            <div className="c-fs-6 text-start feature-list mt-3 ms-4">
                              <span>Extra</span>
                              <div>
                                {symbol}{
                                  item.plan_services[0].service_credit
                                    .service_credit_rates[0].follow_up_rate
                                }/
                                {item.plan_services[0].service_credit.service.name}
                              </div>
                              <div>                            
                                <div></div>
                                {symbol}
                                {
                                  item.plan_services[1].service_credit
                                    .service_credit_rates[0].follow_up_rate
                                }
                                /ticket
                              </div>
                            </div>
                          )}                      
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
              : ''}
            {/* <div className="mx-3">
              <div className="card price-card email border-0  mb-4 mb-sm-0 c-bg-grey">
                <div className="card-body justify-content-between">
                  <h3 className="c-fs-3">CUSTOM</h3>
                  <p className="c-fs-5">Talk to sales for a customized plan.</p>
                  <Link
                    data-bs-toggle="modal#"
                    data-bs-target="#sales-modal"
                    className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2"
                    href="/contact-us"
                  >
                    Talk to sales
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
          
          <div className='px-3 mt-5 mb-4'>
            <div className='price-card p-4 d-flex flex-wrap align-items-center'>
              <div className="c-fs-2 col-12 col-md-8 col-lg-8">For a personalised plan to meet your custom need.</div>
              <a href="/contact-us" className="btn btn-outline-dark btn-lg c-fs-2 utm get-started-hello col-12 col-md-4 col-lg-4" >
                CONTACT SALES
              </a>
            </div>
          </div>

        </div>
      </div>
      
    </>
  );
};

export default HelloNewComponent;