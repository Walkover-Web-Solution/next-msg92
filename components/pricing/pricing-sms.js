import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import countries from "@/data/countries.json";
import { Typeahead } from "react-bootstrap-typeahead";
import { setUtm } from "../pricingComp";

const Pricingsms = ({
  pricing,
  setPricing,
  amountArr,
  fetchSMSData,
  originCountry,
  setOriginCountry,
  destinationCountry,
  setDestinationCountry,
  currency,
  currencySymbol,
}) => {
  useEffect(() => {
    /* console.log('pricing-sms.js currency', currency);
    if(originCountry != null)
    {
      setOriginCountry(originCountry)
      setDestinationCountry(destinationCountry)
    } */

    // console.log(originCountry, destinationCountry);
    // Get all anchor tags in the document using querySelectorAll

    setUtm();
  }, [pricing, originCountry, destinationCountry]);
  return (
    <>
      <div>
        {originCountry?.length >= 1 && (
          <div className="gap-3 w-100 d-flex flex-column text-start flex-md-row align-items-center justify-content-start col-12 col-md-10 col-lg-7 pb-4">
            <span className="Send-sms c-fw-m">Send SMS from</span>
            <Typeahead
              className="w-25"
              id="originCountry"
              
              placeholder="Origin Country"
              labelKey="name"
              onChange={(selected) => {
                setPricing([]);
                if (selected[0]?.name)
                  fetchSMSData(currency, selected[0]?.name, destinationCountry);
              }}
              options={countries}
              clearButton
              defaultSelected={[
                countries?.find((item) => item.name === originCountry),
              ]}
              inputProps={{
                autoComplete: "off" /* Add the autoComplete attribute here */,
              }}
            />

            <div className="c-fw-m">To</div>

            <Typeahead
              className="w-25"
              id="destinationCountry"
              placeholder="Destination Country"
              labelKey="name"
              onChange={(selected) => {
                setPricing([]);
                if (selected[0]?.name)
                  fetchSMSData(currency, originCountry, selected[0]?.name);
              }}
              options={countries}
              clearButton
              defaultSelected={[
                countries?.find((item) => item.name === originCountry),
              ]}
            />
          </div>
        )}

        {/* {originCountry == destinationCountry && originCountry != 'India' &&
        <div className="note mb-5 c-fs-5">
          To avail this local pricing, <a href="/contact-us">contact</a> our team for <strong>Sender Id</strong> registration.
        </div>
        }


        <div className="d-flex flex-wrap flex-gap gap-3 justify-content-center w-100  card-container align-items-end">
        {pricing?.map((item, index) => {
          return (            
            <div key={`sms-card-${index}`} className="mx-3">

              {amountArr[index] ?
                amountArr[index] === '76500'
                  ?
                  <div className="text-center d-flex flex-column mb-4 mb-sm-0 align-items-center">
                    <div className="popular-chip c-fs-6">POPULAR</div>
                    <div className="card price-card sms text-center card-popular mb-4 mb-sm-0 c-bg-grey">
                      <div className="card-body justify-content-between">
                        <h3 className="c-fs-3">{item[4]?.totalNoOfSms} SMS</h3>
                        <h5 className="c-fs-2 text-green mt-2">{currencySymbol}{item[4]?.rate}/SMS</h5>
                        <h2 className="c-fs-3 c-ff-b">{currencySymbol}{amountArr[index]} </h2>
                        <p className="c-fs-5">+18% GST</p>
                        <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm">
                          Get Started
                        </a>
                      </div>
                    </div>
                  </div>                  
                  :
                  originCountry == 'India'
                  ?
                  <div className="card price-card sms border-0 text-center mb-4 mb-sm-0 c-bg-grey">
                    <div className="card-body justify-content-between">
                      <h3 className="c-fs-3">{item[4]?.totalNoOfSms} SMS</h3>
                      <h5 className="c-fs-2 mt-2 text-green">{currencySymbol}{item[4]?.rate}/SMS</h5>
                      <h2 className="c-fs-3 c-ff-b">{currencySymbol}{amountArr[index]} </h2>
                      <p className="c-fs-5">+18% GST</p>
                      <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm">
                        Get Started
                      </a>
                    </div>
                  </div> 
                  :
                  <div className="card price-card sms border-0 text-center mb-4 mb-sm-0 c-bg-grey">
                    <div className="card-body justify-content-between">
                      <h3 className="c-fs-3">SMS Pricing</h3>
                      <h5 className="c-fs-2 mt-2 text-green">{currencySymbol}{item[4]?.rate}/SMS</h5>
                      <h2 className="c-fs-3 c-ff-b"></h2>                      
                      <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm">
                        Get Started
                      </a>
                    </div>
                  </div>                   
                  : ""
              }              
            </div>
          );
        })}

        {originCountry == 'India' 
          ?         
            <div className="card sms border-0 text-center mb-4 mb-sm-0" style={{backgroundColor: '#212528', color: 'white'}}>
              <div className="card-body justify-content-between">
                <h3 className="c-fs-3">CUSTOM</h3>
                <h5 className="c-fs-2 mt-2 text-green">₹0.13/SMS</h5>
                <p className="c-fs-5">Talk to sales for a customized plan.</p>
                <button 
                style={{borderColor: 'white', color: 'white'}}
                data-bs-toggle="modal" data-bs-target="#sales-modal" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                  Talk to sales
                </button>
              </div>
            </div>
          : 
            <div className="card price-card sms border-0 text-center mb-4 mb-sm-0 c-bg-grey">
              <div className="card-body justify-content-between">
                <h3 className="c-fs-3">CUSTOM</h3>                
                <p className="c-fs-5">Talk to sales for a customized plan.</p>
                <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                  Talk to sales
                </button>
              </div>
            </div> */}
        {/* } */}

        {/* </div>       */}

        <div className="d-flex flex-column gap-3 align-items center mt-3">

          <div className="text-center text-dark c-fw-m">Number of SMS</div>

          <div className="progress-value-wrapper d-flex">
            <div className="progress-range-value text-start c-fw-m">0</div>
            <div className="progress-range-value text-start c-fw-m">16,500</div>
            <div className="progress-range-value text-start c-fw-m">30,000</div>
            <div className="progress-range-value text-start c-fw-m">60,000</div>
            <div className="progress-range-value text-start c-fw-m">150,000</div>
            <div className="progress-range-value text-start c-fw-m">450,00</div>
            <div className="progress-range-value text-start c-fw-m">900,000</div>
          </div>

          <div className="d-flex progress-range-wrapper position-relative">
            <div className="progress-indicator" style={{ width: "15%" }}></div>

            <div className="progress-range"></div>
            <div className="progress-range"></div>
            <div className="progress-range"></div>
            <div className="progress-range"></div>
            <div className="progress-range"></div>
            <div className="progress-range"></div>
            <div className="progress-range"></div>
          </div>

          <div className="progress-value-wrapper d-flex">
            <div className="progress-range-value c-fw-m">₹0.20</div>
            <div className="progress-range-value c-fw-m">₹0.25</div>
            <div className="progress-range-value c-fw-m">₹0.19</div>
            <div className="progress-range-value c-fw-m">₹0.18</div>
            <div className="progress-range-value c-fw-m">₹0.17</div>
            <div className="progress-range-value c-fw-m">₹0.16</div>
            <div className="progress-range-value c-fw-m">₹0.15</div>
          </div>
          <div className="text-center text-dark c-fw-m">Cost per SMS</div>
        </div>
        <div className="d-flex align-items-end mt-4 mb-3">
          <span className="c-fs-1 text-dark fw-bold">20,000 </span>
          <span className="c-fs-2 c-fw-500 text-dark">sms for</span>
          <span className="c-fs-1 text-green fw-bold">₹4,000</span>
          <span className="c-fs-2 c-fw-500 text-dark">+18%GST at</span>
          <span className="c-fs-1 text-green fw-bold">₹0.20</span>
          <span className="c-fs-2 c-fw-500 text-dark">per sms</span>
        </div>
        <button
          data-bs-toggle="modal"
          data-bs-target="#sales-modal"
          className="c-fs-4 btn btn-dark rounded-1 py-2 px-3 mt-4 mb-3"
        >
          Get Started
        </button>
        <div className="talk-to-sales connect-personalized mt-4">
          <span className="personalized d-block c-fs-4">
            Connect with our team for a personalized pricing and get up to{" "}
            <span className="text-green c-fs-4 fw-medium">₹0.13</span> per SMS
            to meet your needs.
          </span>
          <button
            type="button"
            className="btn btn-outline-dark mt-2 mb-4 border border-dark border-2 rounded-1 fw-semibold px-3"
          >
            Talk to Sales
          </button>
          <br />
          <a className="mt-3" href="#">
            <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
            <span className="link">Know more about SMS</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Pricingsms;
