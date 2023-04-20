import Image from "next/image";
import Mininav from "./mininav";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import $ from "jquery";
import ProductMenu from "./productmenu";
import Notification from "./notification";

const navbar = ({brawserPath}) => {
  // console.log('navbar.js', brawserPath)
  var path = brawserPath.split("/")[1];
  path = (path.length == 2) ? '/'+path : '';
  const [showOverlay, setShowOverlay] = useState(false);
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
      $("#overlaymenucont, #productmenu, #bgoverlay, #integrationsmenu").removeClass("active");
      $("body").removeClass("oh");
    });
    $("#bgoverlay").on("mouseenter", function () {
      $("#overlaymenucont, #productmenu, #bgoverlay, #integrationsmenu").removeClass("active");
      $("body").removeClass("oh");
    });
  }, []);
  

  return (
    <>
      <Notification />
      {/* <Mininav path={path}/> */}
      <nav className="w-100 py-2 sticy align-items-center d-flex " id="navbar">
        <div className="container relative d-flex align-items-center justify-content-between c-fs-4 c-fw-m nav-menu-cont">
          <div className=" d-flex gap-5 w-nav-menu align-items-center justify-content-start nav-menu">            
            <a className="nav-link menu-opt text-dark" href="#" id="product-link">
              <span className="c-fs-4 c-fw-m">Products</span>
              <div className="nav-line"></div>
            </a>
            <a className="nav-link menu-opt text-dark" href="#" id="integrations-link">
              <span className="c-fs-4 c-fw-m">Integrations</span>
              <div className="nav-line"></div>
            </a>
            <a className={`nav-link menu-opt text-dark ${brawserPath === '/pricing' ? 'active' : ''}`} href={`${path}/pricing`} id="pricing-link">
              <span className="c-fs-4 c-fw-m">Pricing</span>
              <div className="nav-line"></div>
            </a>
          </div>
          <div className="msg91-logo-cont  align-items-center justify-content-center d-flex">
            <a href={`${path}/`}>
              <img className="msg91-logo" src="/img/logo.svg" alt="MSG91" />
            </a>
          </div>
          <div className=" d-flex gap-5 w-nav-menu align-items-center justify-content-end">
            <a className="" href="https://docs.msg91.com/reference/overview" target="_blank"id="apidocs-link">
              <span className="c-fs-4 c-fw-m text-dark">API Docs</span>
            </a>            
            <a href="https://control.msg91.com/signup/" target="_blank" className="btn btn-dark c-fs-4 c-fw-sb px-3" id="signup-btn">
              SIGN UP
            </a>            
          </div>
          <ProductMenu path={path} />
        </div>
      </nav>
    </>
  );
};
export default navbar;
