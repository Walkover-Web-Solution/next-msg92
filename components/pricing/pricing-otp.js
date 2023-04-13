import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import countries from "../../data/countries.json";
import { Typeahead } from 'react-bootstrap-typeahead';

const pricingotp = ({
  pricing,
  setPricing,
  amountArr,
  fetchSMSData,
  originCountry,
  setOriginCountry,
  destinationCountry,
  setDestinationCountry
}) => {
  useEffect(() => {
    // fetchSMSData(pricing, originCountry, destinationCountry)
  }, [pricing]);
  return (
    <>
      <div className="g-3 d-flex justify-content-center col-lg-5 m-auto pb-5">
        <Typeahead
          id="originCountry"
          labelKey="country"
          onChange={(selected) => {            
            //setOriginCountry(selected[0]?.country);
            setPricing([])
            if (selected[0]?.country)
              fetchSMSData([], selected[0]?.country, destinationCountry);
          }}
          options={countries}
          defaultInputValue={originCountry}
        />

        <div className="px-4">To</div>

        <Typeahead
          id="destinationCountry"
          labelKey="country"
          onChange={(selected) => {            
            //setDestinationCountry(selected[0]?.country);
            setPricing([])
            if (selected[0]?.country)
              fetchSMSData([], originCountry, selected[0]?.country);
          }}
          options={countries}
          defaultInputValue={destinationCountry}
        />

      </div>
      <div className="d-flex flex-wrap flex-gap justify-content-center w-100  card-container align-items-end">
        {pricing?.map((item, index) => {
          return (
            <div key={`sms-card-${index}`} className="mx-3">

              {amountArr[index] ?
                amountArr[index] === '48000'
                  ?
                  <div className="text-center d-flex flex-column mb-4 mb-sm-0 align-items-center">
                    <div className="popular-chip c-fs-6">POPULAR</div>
                    <div className="card price-card text-center card-popular border-primary mb-4 mb-sm-0 c-bg-grey">
                      <div className="card-body">
                        <h3 className="c-fs-3">{item[19]?.totalNoOfSms} SMS</h3>
                        <h5 className="c-fs-4 mt-2">₹{item[19]?.rate}/SMS</h5>
                        <p className="c-fs-5"> - </p>
                        <h2 className="c-fs-2 c-ff-b text-green">₹{amountArr[index]} </h2>
                        <p className="c-fs-5">+18% GST</p>
                        <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-primary mt-2">
                          Get Started
                        </a>
                      </div>
                    </div>
                  </div>
                  :
                  <div className="card  price-card border-0 text-center mb-4 mb-sm-0 c-bg-grey">
                    <div className="card-body">
                      <h3 className="c-fs-3">{item[19]?.totalNoOfSms} SMS</h3>
                      <h5 className="c-fs-4 mt-2">₹{item[19]?.rate}/SMS</h5>
                      <p className="c-fs-5"> - </p>
                      <h2 className="c-fs-2 c-ff-b text-green">₹{amountArr[index]} </h2>
                      <p className="c-fs-5">+18% GST</p>
                      <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-primary mt-2">
                        Get Started
                      </a>
                    </div>
                  </div>:""
              }
            </div>
          );
        })}
        <div className="card price-card border-0 text-center mb-4 mb-sm-0 c-bg-grey">
          <div className="card-body">
            <h3 className="c-fs-3">CUSTOM</h3>                  
            <p className="c-fs-5">Talk to sales for a customized plan.</p>
            <button data-bs-toggle="modal" data-bs-target="#custom-pricing-modal" className="c-fs-5 btn btn-sm w-100 btn-outline-primary mt-2">
              Talk to sales
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default pricingotp;
