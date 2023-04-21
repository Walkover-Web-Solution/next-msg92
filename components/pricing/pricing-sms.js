import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import countries from "@/data/countries.json";
import { Typeahead } from 'react-bootstrap-typeahead';

const pricingvoice = ({
  pricing,
  setPricing,
  amountArr,
  fetchSMSData,
  originCountry,
  setOriginCountry,
  destinationCountry,
  setDestinationCountry
}) => {
  //console.log('pricing', pricing);
  // useEffect(() => {
  //   if(originCountry != null)
  //   {
  //     setOriginCountry(originCountry)
  //     setDestinationCountry(destinationCountry)
  //   }
  // }, [pricing, originCountry, destinationCountry]);
  // console.log(pricing,1324567382);
  return (
    <>
     <div>
     { originCountry.length >= 1 && <div className="g-3 d-flex justify-content-center col-lg-5 m-auto pb-5">
       <Typeahead
          id="originCountry"
          labelKey="country"
          onChange={(selected) => {            
            setPricing([])
            if (selected[0]?.country)
              fetchSMSData([], selected[0]?.country, destinationCountry);
          }}
          options={countries}
          // value={originCountry}
          defaultInputValue={originCountry}
        />

        <div className="px-4">To</div>

        <Typeahead
          id="destinationCountry"
          labelKey="country"
          onChange={(selected) => {            
            setPricing([])
            if (selected[0]?.country)
              fetchSMSData([], originCountry, selected[0]?.country);
          }}
          options={countries}
          defaultInputValue={destinationCountry}
        />

      </div>}
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
                        <h5 className="c-fs-2 text-green mt-2">₹{item[4]?.rate}/SMS</h5>
                        <h2 className="c-fs-3 c-ff-b">₹{amountArr[index]} </h2>
                        <p className="c-fs-5">+18% GST</p>
                        <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                          Get Started
                        </a>
                      </div>
                    </div>
                  </div>
                  :
                  <div className="card price-card sms border-0 text-center mb-4 mb-sm-0 c-bg-grey">
                    <div className="card-body">
                      <h3 className="c-fs-3">{item[4]?.totalNoOfSms} SMS</h3>
                      <h5 className="c-fs-2 mt-2 text-green">₹{item[4]?.rate}/SMS</h5>
                      <h2 className="c-fs-3 c-ff-b">₹{amountArr[index]} </h2>
                      <p className="c-fs-5">+18% GST</p>
                      <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                        Get Started
                      </a>
                    </div>
                  </div>:""
              }              
            </div>
          );
        })}
        <div className="card price-card sms border-0 text-center mb-4 mb-sm-0 c-bg-grey">
          <div className="card-body">
            <h3 className="c-fs-3">CUSTOM</h3>                  
            <p className="c-fs-5">Talk to sales for a customized plan.</p>
            <button data-bs-toggle="modal" data-bs-target="#custom-pricing-modal" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
              Talk to sales
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default pricingvoice;
