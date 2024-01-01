import { MdDone, MdClose, MdKeyboardArrowRight,MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Typeahead } from 'react-bootstrap-typeahead';
//import countries from "@/data/countries-tmp.json";
import axios from 'axios';

const PricingCalls = ({ countryCode }) => {
  const [countries, setCountries] = useState();
  const [price, setPrice] = useState();
  /* const changeCurrency = (currency) => {  
    switch (currency) {
      case "INR":
        setSymbol("₹");
        break;
      case "USD":
        setSymbol("$");
        break;
      case "GBP":
        setSymbol("£");
        break;
      default:
        setSymbol("₹");
        break;
    }
  }; */

  const fetchCountries = async () => {
    const response = await axios.get(`https://testvoice.phone91.com/public/country/`, {
      headers: {
        withCredentials: false
      },
    });
    //console.log('setCountries', response.data);
    setCountries(response.data);    
  };
  
  const fetchPrice = async (cid) => {
    console.log('fetchPrice1',cid, cid.length);
    if(cid){
      const response = await axios.get(`https://testvoice.phone91.com/public/pricing/?cid=${cid}&dialplan_id=244`, {
        headers: {
          withCredentials: false
        },
      });    
      setPrice(response.data);    
      console.log('fetchPrice',cid, response.data);
    }
  };
  
  useEffect(() => {
    fetchCountries();    
  }, [countryCode]);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-4">          
          <Typeahead
            id="country"
            placeholder="Country"
            labelKey="name"
            onChange={(selected) => {
              if(selected.length){
                console.log('on change', selected, selected.length, selected[0].id);
                fetchPrice(selected[0].id)
              }
            }}
            options={countries}
            clearButton
            /* defaultSelected={[countries?.find(item => item.country_code === countryCode)]} */
          />
        </div>        
      </div>      

      {price && (
        <div className="voice-price-table">
            
            <div className="d-flex flex-column justify-content-center py-3">
              <div className="mb-2">Outgoing call charges/min</div>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Network</th>
                    <th>International rates</th>
                    <th>Local rates</th>
                  </tr>
                </thead>
                <tbody>
                  {price.data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.network}</td>
                      <td>{`${item.international_rates_min} - ${item.international_rates_max}`}</td>
                      <td>{`${item.local_rates_min} - ${item.local_rates_max}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div>
              <a href="">Click here</a> to download the detailed network and prefix wise pricing sheet.
            </div>
            
            <div className="d-flex justify-content-center">
              <div className="add-on-services my-5 w-auto">
                <strong>Add-On Services</strong>
                  <div className="d-flex justify-content-center services">
                    <ul className="me-5">
                      <li>Call recording</li>
                      <li>Call monitoring</li>
                      <li>Analytics</li>
                    </ul>
                    <ul className="">
                      <li>Call recording</li>
                      <li>Call monitoring</li>
                      <li>Analytics</li>
                    </ul>
                  </div>
                <div>All the Add-On Services are FREE of cost.</div>
              </div>
            </div>
            
            <div className="d-flex justify-content-center">
              <div className="notes w-75">
                *<strong>International rate</strong>: calls are routed through premium A-Z routes and CLI can be any valid number. Calls without a CLI, with invalid CLI, with manipulated CLI, with CLI originated from unidentified, closed or unallocated prefix ranges, with CLI not in E.164 format, with CLI not matching ITU standards might be blocked or charged at the highest price.            
                <br></br>
                *<strong>Origin Based Rate</strong>: calls originating in any country of the European Economic Area will be charged             
                <br></br>
                *<strong>Local Rate</strong>: calls are routed through local operators’ in-country network. Only numbers on your MSG91 account can be used.
              </div>
            </div>
        </div>
      )}
    </>
  );
};

export default PricingCalls;