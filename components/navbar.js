import Image from "next/image";
import Mininav from "./mininav";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import $ from "jquery";
import { MdSegment,MdClose } from "react-icons/md";
import ProductMenu from "./productmenu";
import Notification from "./notification";
import Link from "next/link";
import { getCookie } from "./utils";
//import AnnoucmentBar from "./annoucmentBar/AnnouncementBar";
import content from '@/data/pageContent/br-pt.json';
import contentGlobal from '@/data/pageContent/global.json';

const navbar = ({ browserPath, pricingPath, appPath, pageSlug, pathArray}) => {
  console.log('navbar', browserPath, pricingPath, appPath, pageSlug);
  const compData = browserPath === '/br-pt' ? content.components.navbar : contentGlobal.components.navbar; 
   const products = {
    '/sms': 'SMS',
    '/email': 'Email', 
    '/voice': 'Voice', 
    '/whatsapp': 'WhatsApp', 
    '/rcs' : 'RCS', 
    '/otp': 'OTP', 
    '/numbers': 'Numbers', 
    '/hello': 'Hello', 
    '/segmento': 'Segmento', 
    '/campaign': 'Campaign', 
    '/shorturl': 'URL Shortener', 
    '/knowledgebase': 'KnowledgeBase', 
  }
  var title = products[pageSlug];
  var path = browserPath.split("/")[1];
  path = path.length === 2 ? "/" + path : "";  
  
  const [showOverlay, setShowOverlay] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [show, setShow] = useState(false);
  var mininav_notification = "d-block";
  const toggleOverlay = () => {
    setShowOverlay(true);
  };  
  useEffect(() => {
    $("#product-link").on("mouseenter", function () {
      $("#overlaymenucont, #productmenu, #bgoverlay").addClass("active");
      $("#integrationsmenu").removeClass("active");
      $("body").addClass("oh");
    });
    $("#integrations-link").on("mouseenter", function () {
      $("#overlaymenucont, #integrationsmenu, #bgoverlay").addClass("active");
      $("#productmenu").removeClass("active");
      $("body").addClass("oh");
    });
    $("#pricing-link").on("mouseenter", function () {
      $(
        "#overlaymenucont, #productmenu, #bgoverlay, #integrationsmenu"
      ).removeClass("active");
      $("body").removeClass("oh");
    });
    $("#bgoverlay").on("mouseenter", function () {
      $(
        "#overlaymenucont, #productmenu, #bgoverlay, #integrationsmenu"
      ).removeClass("active");
      $("body").removeClass("oh");
    });
    $("#mininav-tog-open").on("click", function () {
      $("body").addClass("overflow-hidden");
      $("#mininav-tog-open").addClass("d-none");
      $("#mininav-tog-hidden").addClass("d-block");
      $("#mininav-tog-hidden").removeClass("d-none");
    });
    $("#mininav-tog-hidden").on("click", function () {
      $("body").removeClass("overflow-hidden");
      $("#mininav-tog-hidden").addClass("d-none");
      $("#mininav-tog-open").addClass("d-block");
      $("#mininav-tog-open").removeClass("d-none");
    });
    var countryCodee = getCookie('country_code');
    setCountryCode(countryCodee)
  }, []);
  var notification_class = "d-block";
  function showNotification() {
   var notification_class = "d-block";
  }
  function hideNotification() {
    var notification_class = "d-none";
  }
  const [showInnerComponent, setShowInnerComponent] = useState(true);

  const handleClick = () => {
    setShowInnerComponent(!showInnerComponent);
  };
  return (
    <>
    {/* <div className="d-block d-md-none">
      {showInnerComponent && <Notification mininav={notification_class} />}
      <AnnoucmentBar/>
    </div>     */}
      {show && <Mininav path={path} />}
      <div className="d-none d-md-block">
        <Notification path={path} compData={compData} pathArray={pathArray} />
        {/* <AnnoucmentBar/> */}
      </div>
      <nav className="w-100 py-2 sticy align-items-center d-flex " id="navbar">
        <div className="container relative d-none align-items-center d-md-flex justify-content-between c-fs-4 c-fw-m nav-menu-cont">
          <div className=" d-flex gap-4 gap-lg-4 gap-xl-5 w-nav-menu align-items-center justify-content-start nav-menu">
            <a
              className={`nav-link menu-opt text-dark ${title ? 'active' : ''}`}
              href={undefined}
              id="product-link"
            >
              <div className="c-fs-4 c-fw-m">
                {
                title 
                ? 
                <div className="d-flex align-items-center gap-2">
                  <img width="24" height="24" data-nimg="1" src={`/img/icon/${title.toLowerCase().replace(/ +/g, "")}.svg`} alt="products icon"/>
                  {title}
                </div>
                : `${compData?.menu?.products || 'Products'}`
                }
              </div>
              <div className="nav-line"></div>
            </a>
            <a
              className="nav-link menu-opt text-dark"
              href={undefined}
              id="integrations-link"
            >
              
              <span className="c-fs-4 c-fw-m">{`${compData?.menu?.integrations || 'Integrations'}`}</span>
              <div className="nav-line"></div>
            </a>
            { browserPath !== '/shorturl' && <Link
              className={`nav-link menu-opt text-dark ${
                browserPath === "/pricing" ? "active" : ""
              }`}
              href={countryCode && countryCode !== '?' ? "/" + countryCode + pricingPath : pricingPath}
              id="pricing-link" 
            >              
              <span className="c-fs-4 c-fw-m">{`${compData?.menu?.pricing || 'Pricing'}`}</span>
              <div className="nav-line"></div>
            </Link> }
          </div>
          
          <div className="msg91-logo-cont  align-items-center justify-content-center d-flex" id="main-logo">
            <a href={`${path}/`}>
              <img className="msg91-logo ms-5 ps-5" src="/img/logo.svg" alt="MSG91" />
            </a>
          </div>
          <div className=" d-flex gap-4 gap-lg-4 gap-xl-5 w-nav-menu align-items-center justify-content-end">
            <Link
              className="nav-link menu-opt text-dark"
              href="https://docs.msg91.com/overview"
              target="_blank"
              id="apidocs-link"
            >
              <span className="c-fs-4 c-fw-m ">{`${compData?.menu?.api || 'API Docs'}`}</span>
              <div className="nav-line"></div>
            </Link>
            <Link
              // href="https://control.msg91.com/signup/"
              href="/signup"
              target="_blank"
              className="btn btn-dark c-fs-4 c-fw-sb px-3 utm"
              id="signup-btn"
            >
            {`${compData?.menu?.signup || 'Sign Up'}`}
            </Link>
          </div>
          <ProductMenu path={path} compData={compData} />
        </div>
        <div className="container relative d-md-none d-flex align-items-center justify-content-between c-fs-4 c-fw-m nav-menu-cont">
          <div className="msg91-logo-cont  align-items-center justify-content-center d-flex">
            <Link href={`${path}/`}>
              <img className="msg91-logo" src="/img/logo.svg" alt="MSG91" />
            </Link>
          </div>
          <div
            style={{ height: "40px", width: "40px" }}
            className="d-flex justify-content-center align-items-center"
          >
            <MdSegment
              className="one"
              style={{fontSize: '32px'}}
              id="mininav-tog-open"
              onClick={() => {
                setShow(!show);hideNotification();handleClick();
              }}
              />
            <MdClose
              className="c-fs-1 two d-none z-mininav"
              id="mininav-tog-hidden"
              onClick={() => {
                setShow(!show);showNotification();handleClick();
              }}
            />
          </div>
        </div>
      </nav>
    </>
  );
};
export default navbar;
