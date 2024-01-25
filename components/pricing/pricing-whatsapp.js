import { useEffect, useState } from "react";
import { setUtm } from "../pricingComp";

import inr from "@/data/wa-inr.json";
import aud from "@/data/wa-aud.json";
import eur from "@/data/wa-eur.json";
import gbp from "@/data/wa-gbp.json";
import idr from "@/data/wa-idr.json";
import usd from "@/data/wa-usd.json";
import restData from "@/data/wa-reset-country.json";

const pricingwp = ({ countryCode }) => {
  var change;
  var changeSymbol;
  if (
    countryCode === "US" ||
    countryCode === "AE" ||
    countryCode === "SG" ||
    countryCode === "PH"
  ) {
    change = "USD";
    changeSymbol = "$";
  } else if (countryCode === "GB" || countryCode === "ES") {
    change = "GBP";
    changeSymbol = "£";
  } else if (countryCode === "IN") {
    change = "INR";
    changeSymbol = "₹";
  }
  const [selectedCurrency, setSelectedCurrency] = useState(change);
  const [tableData, setTableData] = useState([]);

  // const changeCurrency = (currency) => {
  //   setSelectedCurrency(currency);
  //   fetchSubscriptionWhatsapp(currency, "5");
  //   switch (currency) {
  //     case "INR":
  //       setSymbol("₹");
  //       setOnetime("3000");
  //       break;
  //     case "USD":
  //       setSymbol("$");
  //       setOnetime("38");
  //       break;
  //     case "GBP":
  //       setSymbol("£");
  //       setOnetime("32");
  //       break;
  //   }
  // };
  let pricingData;

  useEffect(() => {
    if (selectedCurrency === "INR") {
      pricingData = inr;
    } else if (selectedCurrency === "USD") {
      pricingData = usd;
    } else if (selectedCurrency === "GBP") {
      pricingData = gbp;
    } else if (selectedCurrency === "IDR") {
      pricingData = idr;
    } else if (selectedCurrency === "AUD") {
      pricingData = aud;
    } else if (selectedCurrency === "EUR") {
      pricingData = eur;
    }
    setTableData(pricingData);
  }, [selectedCurrency]);

  useEffect(() => {
    setUtm();
  }, []);


  return (
    <>
      <div className="d-flex justify-content-center mb-4">
        <select
          style={{ width: "fit-content" }}
          className="form-select me-4"
          aria-label="Default select example"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="AUD">AUD</option>
          <option value="EUR">EUR</option>
          <option value="IDR">IDR</option>
        </select>
        {/* <select style={{width: 'fit-content'}} className="form-select" aria-label="Default select example" onChange={(e)=>setSelectedMode(e.target.value)}>
          <option value="Monthly">Monthly</option>
          <option value="Half yearly">Half Yearly</option>
          <option value="Yearly">Yearly</option>
        </select> */}
      </div>
      <div className="d-flex container gap-3 flex-column text-start">
        <div className="c-fs-5 mt-5">
          {/* MSG91 takes one time fee <strong>{symbol}{oneTimeWtsAppFee}</strong> to set up your WhatsApp Business account. */}
          Since we do not impose any service charge,{" "}
          <strong>{selectedCurrency === "INR" ? "GST" : "Taxes"}</strong> will
          be applied to WhatsApp pricing
        </div>

        <table class="table table-sm c-fs-5">
          <thead>
            <tr>
              <th scope="col">Market</th>
              <th scope="col">Currency</th>
              <th scope="col">Marketing</th>
              <th scope="col">Utility</th>
              <th scope="col">Authentication</th>
              <th scope="col">Service</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <>
                {item.Market.startsWith("Rest") ? (
                  <tr>
                    <td
                      data-bs-toggle="modal"
                      data-bs-target={`#${item.Market.replace(
                        / /g,
                        "-"
                      )}-market`}
                    >
                      {item?.Market}
                      <div
                        class="modal fade"
                        id={`${item.Market.replace(/ /g, "-")}-market`}
                        tabindex="-1"
                        aria-labelledby={`${item.Market.replace(
                          / /g,
                          "-"
                        )}-header`}
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1
                                class="modal-title fs-5"
                                id={`${item.Market.replace(/ /g, "-")}-header`}
                              >
                                {item.Market}
                              </h1>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th scope="col">Markets</th>
                                    <th scope="col">Calling Code</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {restData
                                    .find(
                                      (data) => data.Markets === item.Market
                                    )
                                    .ChildMarkets.map((child, index) => {
                                      return (
                                        <>
                                          <tr key={index}>
                                            <td>{child.Markets}</td>
                                            <td>{child.calling_code}</td>
                                          </tr>
                                        </>
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item?.Currency}</td>
                    <td>{item?.Marketing}</td>
                    <td>{item?.Utility}</td>
                    <td>{item?.Authentication}</td>
                    <td>{item?.Service}</td>
                  </tr>
                ) : (
                  <tr>
                    <td>{item?.Market}</td>
                    <td>{item?.Currency}</td>
                    <td>{item?.Marketing}</td>
                    <td>{item?.Utility}</td>
                    <td>{item?.Authentication}</td>
                    <td>{item?.Service}</td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default pricingwp;
