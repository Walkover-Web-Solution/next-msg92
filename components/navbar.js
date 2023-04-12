import Image from "next/image";
import { useEffect, useState } from "react";
import $ from "jquery";
import ProductMenu from "./productmenu";
import Notification from "./notification";

const navbar = () => {
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
      <ProductMenu />
      <Notification />
      <nav className="w-100 py-2 sticy align-items-center d-flex " id="navbar">
        <div className="container d-flex align-items-center justify-content-between c-fs-4 c-fw-m">
          <div className=" d-flex gap-5 w-nav-menu align-items-center justify-content-start ">
            <a className="text-dark" href="#" id="product-link">
              <span className="c-fs-4 c-fw-m">Products</span>
            </a>
            <a className="text-dark" href="#" id="integrations-link">
              <span className="c-fs-4 c-fw-m">Integrations</span>
            </a>
            <a className="text-dark" href="/pricing" id="pricing-link">
              <span className="c-fs-4 c-fw-m">Pricing</span>
            </a>
          </div>
          <div className="msg91-logo-cont  align-items-center justify-content-center d-flex">
            <a href="">
              <img className="msg91-logo" src="/img/logo.svg" alt="MSG91" />
            </a>
          </div>
          <div className=" d-flex gap-5 w-nav-menu align-items-center justify-content-end">
            <a className="" href="/" id="apidocs-link">
              <span className="c-fs-4 c-fw-m text-dark">API Doc</span>
            </a>
            <a className="" href="/" id="signup-btn">
              <button className="btn btn-dark   c-fs-4 c-fw-sb  px-3">
                SIGN UP
              </button>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
export default navbar;
