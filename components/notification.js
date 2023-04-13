import {MdLanguage, MdCall} from "react-icons/md"
import React, { useEffect } from "react";
import $ from "jquery";
import { useRouter } from "next/router";
import countries from "@/data/countries.json";
const Notification = () =>{
    const router = useRouter();
    var path = router.asPath.split("/")[1];
    var country = "Global";
    for (let x in countries) {
      if (path.toUpperCase() === countries[x].abbreviation) {
        country = countries[x].country;
        break;
      }
    }
    useEffect(() => {
      $("#change-country a").on("click", function () {
        var label = $(this).text();
        $("#change-country label").html(label);
      });
    }, []);
    return (
        <>
        <div className="section b-bottom-1">
        <div className="container d-flex align-items-center justify-content-between ">
            <div className="my-2 d-flex align-items-center">
                <button className="btn btn-success py-1 btn-sm c-fs-5 me-3">Update</button>
                <p className="c-fs-5 c-fw-m">Elevate Your Experience. The New and Improved Version Awaits ;)</p>
            </div>
            <div className="d-flex gap-5 align-items-center justify-content-end">
                <div className="d-flex  align-items-center">
                <div className="dropdown " id="change-country">  
                <a href="#" 
                className="text-dark"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ><span className="c-fs-4 d-flex align-items-center">{country}</span>
                </a>
                   <ul className="dropdown-menu">
                    <li>
                     <a href="/" className="dropdown-item c-fs-4">
                        Global
                      </a>
                    </li>
                    <li>
                     <a href="/in" className="dropdown-item c-fs-4">
                        India
                      </a>
                    </li>
                    <li>
                     <a href="/ae" className="dropdown-item c-fs-4">
                        United Arab Emirates
                      </a>
                    </li>
                    <li>
                     <a href="/ph" className="dropdown-item c-fs-4">
                        Philippines
                      </a>
                    </li>
                    <li>
                     <a href="/sg" className="dropdown-item c-fs-4">
                        Singapore
                      </a>
                    </li>
                    <li>
                     <a href="/es" className="dropdown-item c-fs-4">
                        Spain
                      </a>
                    </li>
                    <li>
                     <a href="/uk" className="dropdown-item c-fs-4">
                        United Kingdom
                      </a>
                    </li>
                    <li>
                     <a href="/us" className="dropdown-item c-fs-4">
                        United States
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
                <a href="/contact-us" className="text-dark"><span className="c-fs-4 d-flex align-items-center"><MdCall className="me-1"/>Support</span></a>
                <a href="#" className="text-dark"><span className="c-fs-4 d-flex align-items-center">Log In</span></a>
            </div>
            
        </div>
        </div>
        </>

    );
};
export default Notification;