import { MdLanguage, MdCall, MdExpandMore, MdLogin, MdGTranslate } from "react-icons/md";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import countries from "@/data/countries.json";
import availableCountries from "@/data/available-countries.json";
import { getCookie, setCookie } from "@/components/utils";

const baseUrl = process.env.LOGIN_URL;


const Notification = ({ path, compData, pathArray }) => {
    const [country, setCountry] = useState("");
    const [countryShort, setCountryShort] = useState("/?");
    const [language, setLanguage] = useState("English");    

    useEffect(() => {
        path = path ? path : getCookie("country_code");        
        if (path?.startsWith("/")) {
            path = path.substring(1);
        }

        let lang = path === "br" ? "English" : "Portuguese";

        setLanguage(lang);

        if (!country) {
            setCountry("Global");
            setCountryShort("/?")
        }

        for (let x in availableCountries) {
            if (path?.toUpperCase() === availableCountries[x].shortname) {
                setCountry(availableCountries[x].name);
                setCookie("country_code", availableCountries[x].shortname.toLowerCase(), 30);
                setCountryShort(availableCountries[x].shortname.toLowerCase())
                break;
            }
        }
    }, []);
    return (
        <>
            <div className="section b-bottom-1">
                <div className="container d-flex align-items-center justify-content-between notification">
                    <div className="my-2 d-flex align-items-center"></div>
                    <div className="d-flex gap-4 align-items-center justify-content-end">
                        {(pathArray[1] === "br" || pathArray[1] === "br-pt") && (
                            <div className="dropdown d-flex align-items-center">
                                <a
                                    href={undefined}
                                    className="align-items-center d-flex text-dark cp"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    role="button"
                                >
                                    <MdGTranslate className="me-1" />
                                    <span className="c-fs-5 d-flex align-items-center">{language}</span>
                                    <MdExpandMore className="ms-1" />
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="/br" className="dropdown-item c-fs-5">
                                            English
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/br-pt" className="dropdown-item c-fs-5">
                                            Portuguese
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}

                        <div className="dropdown d-flex d-flex  align-items-center">
                            <a
                                href={undefined}
                                className="align-items-center d-flex text-dark cp"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                            >
                                {countryShort === '/?' || countryShort === '?' || countryShort === '' || countryShort === '/' ? (
                                    <MdLanguage className="me-1" />
                                ) : (
                                    <img src={`/assets/country-flags/${countryShort === '/br-pt' ? '/br' : countryShort }.svg`} className="nav-flag" />
                                )}

                                <span className="c-fs-5 d-flex align-items-center">{country}</span>
                                <MdExpandMore className="ms-1" />
                            </a>
                            <ul className="dropdown-menu" id="change-country">
                                <li>
                                    <a href="/?" className="dropdown-item c-fs-5 d-flex align-items-center">
                                        <MdLanguage className="me-2" />
                                        Global
                                    </a>
                                </li>
                                <li>
                                    <a href="/in" className="dropdown-item c-fs-5 d-flex align-items-center">
                                        <img src="/assets/country-flags/in.svg" className="nav-flag" />
                                        India
                                    </a>
                                </li>
                                <li>
                                    <a href="/br-pt" className="dropdown-item c-fs-5 d-flex align-items-center">
                                        <img src="/assets/country-flags/br.svg" className="nav-flag" />
                                        Brazil
                                    </a>
                                </li>
                                <li>
                                    <a href="/ae" className="dropdown-item c-fs-5 d-flex align-items-center">
                                        <img src="/assets/country-flags/ae.svg" className="nav-flag" />
                                        United Arab Emirates
                                    </a>
                                </li>
                                <li>
                                    <a href="/ph" className="dropdown-item c-fs-5 d-flex align-items-center">
                                        <img src="/assets/country-flags/ph.svg" className="nav-flag" />
                                        Philippines
                                    </a>
                                </li>
                                <li>
                                    <a href="/sg" className="dropdown-item c-fs-5 d-flex align-items-center">
                                        <img src="/assets/country-flags/sg.svg" className="nav-flag" />
                                        Singapore
                                    </a>
                                </li>
                                <li>
                                    <a href="/es" className="dropdown-item c-fs-5 d-flex align-items-center">
                                        <img src="/assets/country-flags/es.svg" className="nav-flag" />
                                        Spain
                                    </a>
                                </li>
                                <li>
                                    <a href="/gb" className="dropdown-item c-fs-5 d-flex align-items-center">
                                        <img src="/assets/country-flags/gb.svg" className="nav-flag" />
                                        United Kingdom
                                    </a>
                                </li>
                                <li>
                                    <a href="/us" className="dropdown-item c-fs-5 d-flex align-items-center">
                                        <img src="/assets/country-flags/us.svg" className="nav-flag" />
                                        United States
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <a href="/contact-us" className="text-dark">
                            <span className="c-fs-5 d-flex align-items-center">
                                <MdCall className="me-1" />
                                {compData?.notification?.contact}
                            </span>
                        </a>
                        <a href={`${process.env.LOGIN_URL}/signin/`} target="_blank" className="text-dark utm">
                            <span className="c-fs-5 d-flex align-items-center">
                                <MdLogin className="me-1" />
                                {compData?.notification.login}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Notification;