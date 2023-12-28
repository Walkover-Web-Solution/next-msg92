import {MdLanguage, MdCall, MdExpandMore, MdLogin} from "react-icons/md"
import React, { useEffect } from "react";
import $ from "jquery";
import { useRouter } from "next/router";
import countries from "@/data/countries.json";
import { getCookie, setCookie } from "@/components/utils";

const Notification = (mininav) =>{
    const router = useRouter();
    var path = router.asPath.split("/")[1];
    var country = "Global";
    for (let x in countries) {
      if (path.toUpperCase() === countries[x].sortname) {
        country = countries[x].name;
        break;
      }
    }
    useEffect(() => {
      $("#change-country a").on("click", function () {
        var label = $(this).text();
        $("#change-country label").html(label);        
        var cc = $(this).attr('href').substring(1);
        setCookie('country_code', cc, 30);
      });      

    }, []);
    return (
        <>
        <div className="section b-bottom-1 ashish">
        <div className="container d-flex align-items-center justify-content-between notification">
            <div className="my-2 d-flex align-items-center">
                {/* <button className="btn btn-success py-1 btn-sm c-fs-5 me-3">Update</button>
                <p className="c-fs-5 c-fw-m">Elevate Your Experience. The New and Improved Version Awaits ;)</p> */}
            </div>
            <div className="d-flex gap-4 align-items-center justify-content-end">
              <div className="dropdown d-flex d-flex  align-items-center"> 
                <a href={undefined}
                className="align-items-center d-flex text-dark cp"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                  <MdLanguage className="me-1"/> 
                  <span className="c-fs-5 d-flex align-items-center">{country}</span>
                  <MdExpandMore className="ms-1"/>
                </a>
                <ul className="dropdown-menu" id="change-country">
                  <li>
                    <a href="/?" className="dropdown-item c-fs-5">
                      Global
                    </a>
                  </li>
                  <li>
                    <a href="/in" className="dropdown-item c-fs-5">
                      India
                    </a>
                  </li>
                  <li>
                    <a href="/ae" className="dropdown-item c-fs-5">
                      United Arab Emirates
                    </a>
                  </li>
                  <li>
                    <a href="/ph" className="dropdown-item c-fs-5">
                      Philippines
                    </a>
                  </li>
                  <li>
                    <a href="/sg" className="dropdown-item c-fs-5">
                      Singapore
                    </a>
                  </li>
                  <li>
                    <a href="/es" className="dropdown-item c-fs-5">
                      Spain
                    </a>
                  </li>
                  <li>
                    <a href="/gb" className="dropdown-item c-fs-5">
                      United Kingdom
                    </a>
                  </li>
                  <li>
                    <a href="/us" className="dropdown-item c-fs-5">
                      United States
                    </a>
                  </li>
                </ul>
              </div>
              <a href="/contact-us" className="text-dark"><span className="c-fs-5 d-flex align-items-center"><MdCall className="me-1"/>Contact</span></a>
              {/* <a href="https://control.msg91.com/signin/" target="_blank" className="text-dark utm"><span className="c-fs-5 d-flex align-items-center"><MdLogin className="me-1"/>Login</span></a> */}
              <a href="/signin" target="_blank" className="text-dark utm"><span className="c-fs-5 d-flex align-items-center"><MdLogin className="me-1"/>Login</span></a>
            </div>
            
        </div>
        </div>
        </>

    );
};
export default Notification;