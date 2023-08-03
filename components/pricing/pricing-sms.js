import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import countries from "@/data/countries.json";
import { Typeahead } from 'react-bootstrap-typeahead';

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
  currencySymbol
}) => {  

  useEffect(() => {
    /* console.log('pricing-sms.js currency', currency);
    if(originCountry != null)
    {
      setOriginCountry(originCountry)
      setDestinationCountry(destinationCountry)
    } */

    // console.log(originCountry, destinationCountry);
  }, [pricing, originCountry, destinationCountry]);  
  return (
    <>
     <div>
     { originCountry?.length >= 1 && <div className="gap-3 d-flex flex-column flex-md-row   align-items-cnetre justify-content-center col-12 col-md-10 col-lg-7 m-auto pb-5">
       <Typeahead
       className="w-100"
          id="originCountry"
          placeholder="Origin Country"
          labelKey="name"
          onChange={(selected) => {
            setPricing([])
            if (selected[0]?.name)
              fetchSMSData(currency , selected[0]?.name, destinationCountry);
          }}
          options={countries}
          clearButton
          defaultSelected={[countries?.find(item => item.name === originCountry)]}
          inputProps={{
            autoComplete: "off" /* Add the autoComplete attribute here */
          }}
        />

        <div className="px-4">To</div>

        <Typeahead
          id="destinationCountry"
       className="w-100"

          placeholder="Destination Country"
          labelKey="name"
          onChange={(selected) => {
            setPricing([])
            if (selected[0]?.name)
              fetchSMSData(currency, originCountry, selected[0]?.name);
          }}
          options={countries}
          clearButton
          defaultSelected={[countries?.find(item => item.name === originCountry)]}
          inputProps={{
            autoComplete: "off" /* Add the autoComplete attribute here */
          }}
        />

      </div>}
      
      {originCountry == destinationCountry && originCountry != 'India' &&
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
                      <div className="card-body">
                        <h3 className="c-fs-3">{item[4]?.totalNoOfSms} SMS</h3>
                        <h5 className="c-fs-2 text-green mt-2">{currencySymbol}{item[4]?.rate}/SMS</h5>
                        <h2 className="c-fs-3 c-ff-b">{currencySymbol}{amountArr[index]} </h2>
                        <p className="c-fs-5">+18% GST</p>
                        <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                          Get Started
                        </a>
                      </div>
                    </div>
                  </div>                  
                  :
                  originCountry == 'India'
                  ?
                  <div className="card price-card sms border-0 text-center mb-4 mb-sm-0 c-bg-grey">
                    <div className="card-body">
                      <h3 className="c-fs-3">{item[4]?.totalNoOfSms} SMS</h3>
                      <h5 className="c-fs-2 mt-2 text-green">{currencySymbol}{item[4]?.rate}/SMS</h5>
                      <h2 className="c-fs-3 c-ff-b">{currencySymbol}{amountArr[index]} </h2>
                      <p className="c-fs-5">+18% GST</p>
                      <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                        Get Started
                      </a>
                    </div>
                  </div> 
                  :
                  <div className="card price-card sms border-0 text-center mb-4 mb-sm-0 c-bg-grey">
                    <div className="card-body">
                      <h3 className="c-fs-3">SMS Pricing</h3>
                      <h5 className="c-fs-2 mt-2 text-green">{currencySymbol}{item[4]?.rate}/SMS</h5>
                      <h2 className="c-fs-3 c-ff-b">-</h2>                      
                      <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
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
              <div className="card-body">
                <h3 className="c-fs-3">CUSTOM</h3>
                <h5 className="c-fs-2 mt-2 text-green">₹0.13/SMS</h5>
                <p className="c-fs-5">Talk to sales for a customized plan.</p>
                <button 
                style={{borderColor: 'white', color: 'white'}}
                data-bs-toggle="modal" data-bs-target="#custom-pricing-modal" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                  Talk to sales
                </button>
              </div>
            </div>
          : 
            <div className="card price-card sms border-0 text-center mb-4 mb-sm-0 c-bg-grey">
              <div className="card-body">
                <h3 className="c-fs-3">CUSTOM</h3>                
                <p className="c-fs-5">Talk to sales for a customized plan.</p>
                <button data-bs-toggle="modal" data-bs-target="#custom-pricing-modal" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                  Talk to sales
                </button>
              </div>
            </div>
        }

      </div>      
      </div>
    </>
  );
};

export default Pricingsms;
