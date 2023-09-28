// Parent Component
import React, { useEffect } from "react";
import PreFooter from "@/components/preFooter";

const ParentComponent = ({ pricingPath }) => {
  //const data = json.global.hello;
  useEffect(() => {
    var qrcode = new QRCode(document.getElementById("qrcode"), {
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
    });
    $(function () {
      $("#wq-copy-btn").on("click", function (event) {
        event.preventDefault();
        var elementText = $("#whatsappChatWidgetStartChat").attr("href");
        navigator.clipboard.writeText(elementText);
        $(".wq-copied").show();
      });
      
      $("#wq-copy-code").on("click", function (event) {
        event.preventDefault();
        var elementText = $("#widget-code").text();
        navigator.clipboard.writeText(elementText);        
      });

      $(".wq-create-link-btn").on("click", function (event) {
        event.preventDefault();
        var wp_number = $("#wqinputphone").val();
        var wp_message = $("#wqinputtext").val();
        var wp_welcome = $("#whatsappChatWidgetWelcomeText").val();
        var wp_brand = $("#whatsappChatWidgetBrandImage").val();
        
        // Example usage
        if (wp_number == "") {
          alert("Please enter a phone number.");
        } else {
          var wp_end_url = `https://wa.me/${wp_number}?text=${encodeURIComponent(
            wp_message
          )}`;
          $("#whatsappChatWidgetStartChat").attr("href", wp_end_url);
          $("#dataBox").val(wp_end_url);
          $(".wq-link-display-box").html(wp_end_url);

          makeQrCode();          
          widgetCode(wp_brand, wp_welcome, wp_message, wp_number);            
        }
      });

      const downloadBtn = document.getElementById("downloadBtn");
      const qrcode1 = document.getElementById("qrcode");
      const toHideClassName = "hide";
      function makeQrCode() {
        var elText = document.getElementById("dataBox");
        if (!elText.value) {
          alert("Input a text");
          elText.focus();
          return;
        }
        qrcode.makeCode(elText.value);
      }

      downloadBtn.onclick = function (e) {
        e.preventDefault();
        // Image tag
        const img = qrcode1.getElementsByTagName("img")[0];

        // Canvas tag
        const canvas = qrcode1.getElementsByTagName("canvas")[0];

        // Padding to QRCode
        const padding = 40;

        // Adding padding to width and height
        canvas.width = canvas.width + padding;
        canvas.height = canvas.height + padding;

        // Canvas context
        const context = canvas.getContext("2d");
        // Clearing previous content
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Making the background white
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        // Adding the image of QRCode
        // x and y are padding / 2
        context.drawImage(img, padding / 2, padding / 2);

        // Getting base64 url
        const image = canvas.toDataURL("image/png", 1);
        const filename = "WhatsApp-QR-code-" + Date.now() + ".png";
        downloadImage(image, filename);
        //reset height and width
        canvas.width = 150;
        canvas.height = 150;
      };

      function downloadImage(image, filename) {
        console.log(image);
        console.log(filename);
        // Creating hidden <a> tag to download
        var element = document.createElement("a");
        element.setAttribute("href", image);
        element.setAttribute("download", filename);
        element.setAttribute("class", toHideClassName);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }

      function widgetCode(barndImage, welcomeText, preFilledMsg, mobile) {
        var html = `          
var options = {
  brandSetting: {
    autoShow: true,
    backgroundColor: "#0a6114", // only for old version
    borderRadius: "25", // only for old version
    brandImg: "${barndImage}",
    brandImgData: null,
    brandName: "MSG91", // only for old version
    brandSubTitle: "", // only for old version
    ctaText: trsntext,
    welcomeText: "${welcomeText}", 
    messageText: "${preFilledMsg}",
    phoneNumber: "${mobile}",
    autoShow: false,
  },
  chatButtonSetting: {
    backgroundColor: "#00E785", //now is used as Brand Color
    borderRadius: "25",//only for old version
    ctaText: trsntext,
    ctaIconWATI: true, //new property for chosen icon (WATI - true, whatsApp - false)
    marginLeft: "0",
    marginRight: "20",
    marginBottom: "20",
    position: "right",
  },
  enabled: true,
  isNewChatWidget: true // new property to switch between old and new widget 
}
&lt;script type="text/javascript" onload="CreateWhatsappChatWidget(options)" src="https://msg91.com/js/waWidget.js"\&gt; &lt;/script&gt;`;
        
          $("#widget-code").html(html);        
          hljs.highlightAll();
          $("#widget-code-wrp").show();
          $("#widget-form").hide();
      }
    });
  });
  return (
    <>
      <script type="text/javascript" src="/js/qrcode.js" defer></script>
      <script type="text/javascript" src="/js/jquery.min.js"></script>
      <script src="/js/highlight.min.js"></script>
      <link rel="stylesheet" href="/monokai.min.css" />
      <link rel="stylesheet" href="/walink.css" />
      <div className="product-banner-wrp">
        <div className="container text-center overflow-hidden">
          <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
            <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
              <img
                src="/img/icon/whatsapp.svg"
                className="product-page-logo me-2"
              />
              <h1 className="heading page-title hello-heading">
                free-whatsapp-link-generator
              </h1>
            </div>
            <p className="c-fs-4 text-uppercase col-otp c-ls-20 mx-auto mt-3 hello-dark">
              Generate WhatsApp click to chat QR code/Widget/Link
            </p>
            <div className="p-3">
              <p className="small-heading w-md-75 w-100 mx-auto fw-normal">
                Simple tool to create WhatsApp click to chat QR code/Widget/Link
                for your website or landing pages.
              </p>
            </div>
            <a
              href="https://control.msg91.com/signup/?a=a&b=b&utm_=c"
              className="btn btn-dark btn-lg c-fs-2 mt-3 utm"
            >
              Get started for FREE
            </a>
          </div>
          <img
            src="/img/pageimg/wame.png"
            className="img-fluid product-page-img mx-auto"
            alt="#"
          />
        </div>
      </div>

      <div className="container px-4 py-5" id="featured-3">
        <h3 className="sub-heading c-head pt-4 pt-md-0">
          3 steps to creating a QR code/Widget/Link
        </h3>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
              <img src="/img/icon/dialpad.svg" className="" />
            </div>
            <h3 className="c-fs-2 c-fw-b">Step1</h3>
            <p className="c-fs-3  mt-3">
              Enter your country code and your WhatsApp Business number, and add
              a welcome message if desired.
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
              <img src="/img/icon/dashboard_customize.svg" className="" />
            </div>
            <h3 className="c-fs-2 c-fw-b ">Step2</h3>
            <p className="c-fs-3  mt-3">
              Personalize your widget, QR code, or link to align with your
              brand's visual guidelines and identity.
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
              <img src="/img/icon/auto_awesome.svg" className="" />
            </div>
            <h3 className="c-fs-2 c-fw-b ">Step3</h3>
            <p className="c-fs-3  mt-3">
              Lastly, simply click the 'Generate Now' button to create your
              widget, QR code, or link. It's that simple!
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 py-5" id="featured-3">
        <h3 className="sub-heading c-head pt-4 pt-md-0">
          Create QR Code/Widget/Link
        </h3>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-2">
          <div className="col-md-6" id="widget-form">
            <form className="needs-validation me-5" noValidate="">
              <h4 className="mb-3">Type your WhatsApp Number</h4>
              <div className="row g-3">
                <div className="col-12">
                  <p className="mb-3">
                    Enter your WhatsApp number along with your country code
                    (without the ‘+’ symbol). For instance, if your country code
                    is +91 and your WhatsApp number is 872849182, just type
                    91872849182.
                  </p>
                  <label htmlFor="wqinputphone" className="form-label">
                    WhatsApp number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="wqinputphone"
                    placeholder="eg. 919000012345"
                    required=""
                  />
                </div>

                <div className="col-12">
                  <p className="mb-3">
                    Automatically send this text when a user clicks on your chat
                    link, making it easier to start a conversation.
                  </p>
                  <label htmlFor="wqinputtext" className="form-label">
                    Pre-Filled Message{" "}
                    <span className="text-secondary">(Optional)</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="wqinputtext"
                    placeholder="eg. Hello, I have a question about your service. Can you please help me?"
                    defaultValue={""}
                  />

                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
              </div>

              <h4 className="mb-3 mt-5">Widget Customisation</h4>
              <div className="row g-3">
                <div className="col-12">
                  <label
                    htmlFor="whatsappChatWidgetWelcomeText"
                    className="form-label"
                  >
                    Welcome text
                  </label>
                  <div className="input-group has-validation">
                    <textarea
                      className="form-control"
                      id="whatsappChatWidgetWelcomeText"
                      placeholder="Hi there! How can I help you?"
                      required=""
                      defaultValue={"Hi there!\nHow can I help you?"}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label
                    htmlFor="whatsappChatWidgetBrandImage"
                    className="form-label"
                  >
                    Brand image URL
                    <span className="text-secondary">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="whatsappChatWidgetBrandImage"
                    placeholder="https://storage.googleapis.com/92283/image.png"
                  />
                </div>
              </div>

              <button
                className="wq-create-link-btn btn btn-success btn-lg mt-5"
                type="submit"
              >
                Generate Now
              </button>
            </form>
          </div>

          <div className="col-md-6" id="widget-preview">            
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="">Widget preview</span>
              </h4>
              {/* <img src="/img/widget-preview.svg" className="" /> */}

              <div
              className="col s8 adjustbxflex mb-5"
              style={{ justifyContent: "center" }}
            >
              <div
                className="whatsappchat-settings-componen"
                id="whatsappChatWidgetPreview"
                style={{ justifyContent: "center" }}
              >
                <div className="iwer">
                  <div
                    id="whatsappChatWidgetHeaderPreview"
                    style={{                      
                      backgroundColor: "#fff",                      
                      borderRadius: "25px",                                            
                      height: '50px',
                      width: '50px',
                      boxShadow: "rgba(0, 0, 0, 0.4) 2px 2px 6px",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src="/img/msg91-icon-blue.svg"
                      id="whatsappChatWidgetBrandImagePreview"
                      alt="Brand Image"
                      style={{                        
                        height: '24px'
                      }}
                    />
                    {/* <div style="margin-left: 20px;">
                                      <div id="whatsappChatWidgetBrandPreview" style="font-size: 16px; font-weight: 700;">WATI</div>
                                      <div id="whatsappChatWidgetBrandSubTitlePreview" style="font-size: 13px; line-height: 18px; margin-top: 4px;color:#000;">Typically replies within a day</div>
                                  </div> */}
                  </div>
                  <div>
                    <div
                      style={{
                        backgroundColor: "white",
                        display: "inline-block",
                        margin: "0px 0px",
                        padding: "10px 0px",
                        borderRadius: 10,
                      }}
                    >
                      {/* <div id="whatsappChatWidgetBrandPreview2" style="font-size: 13px; font-weight: 700; line-height: 18px; color: rgba(0, 0, 0, 0.4);">WATI</div> */}
                      <div
                        id="whatsappChatWidgetWelcomeTextPreview"
                        style={{
                          fontSize: "20px",
                          lineHeight: "26px",
                          marginTop: "4px",
                          color: "rgb(17, 17, 17)",
                        }}
                      >
                        Got any questions?
                        <br /> We’re here to help.
                      </div>
                    </div>
                      <div id="qrcode" className="my-3"></div>
                      <div>
                      Scan this QR code to initiate a WhatsApp chat with us.
                      </div>
                  </div>
                  <div id="whatsappChatWidgetButtonPreview">
                    <a
                      id="whatsappChatWidgetStartChat"
                      role="button"
                      target="_blank"
                      rel="noopener"
                      href=""
                      title="WhatsApp"
                      style={{
                        background: "#1D1D1B !important",                        
                        borderRadius: 8,
                        textDecoration: "none",
                        cursor: "pointer",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "18px 20px",
                        borderWidth: "initial",
                        borderStyle: "none",
                        borderColor: "initial",
                        borderImage: "initial",
                        overflow: "hidden",
                      }}
                    >
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: "block" }}
                      >
                        <path
                          d="M0.00401338 20L1.35601 15.032C0.465151 13.5049 -0.00289063 11.768 1.34322e-05 10C1.34322e-05 4.477 4.47701 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C8.23279 20.0029 6.49667 19.5352 4.97001 18.645L0.00401338 20ZM6.39101 5.308C6.26188 5.31602 6.13569 5.35003 6.02001 5.408C5.91153 5.46943 5.81251 5.54622 5.72601 5.636C5.60601 5.749 5.53801 5.847 5.46501 5.942C5.09542 6.423 4.89662 7.01342 4.90001 7.62C4.90201 8.11 5.03001 8.587 5.23001 9.033C5.63901 9.935 6.31201 10.89 7.20101 11.775C7.41501 11.988 7.62401 12.202 7.84901 12.401C8.9524 13.3725 10.2673 14.073 11.689 14.447L12.258 14.534C12.443 14.544 12.628 14.53 12.814 14.521C13.1053 14.506 13.3896 14.4271 13.647 14.29C13.813 14.202 13.891 14.158 14.03 14.07C14.03 14.07 14.073 14.042 14.155 13.98C14.29 13.88 14.373 13.809 14.485 13.692C14.568 13.606 14.64 13.505 14.695 13.39C14.773 13.227 14.851 12.916 14.883 12.657C14.907 12.459 14.9 12.351 14.897 12.284C14.893 12.177 14.804 12.066 14.707 12.019L14.125 11.758C14.125 11.758 13.255 11.379 12.724 11.137C12.668 11.1126 12.608 11.0987 12.547 11.096C12.4786 11.089 12.4095 11.0967 12.3443 11.1186C12.2791 11.1405 12.2193 11.1761 12.169 11.223V11.221C12.164 11.221 12.097 11.278 11.374 12.154C11.3325 12.2098 11.2754 12.2519 11.2098 12.2751C11.1443 12.2982 11.0733 12.3013 11.006 12.284C10.9409 12.2666 10.877 12.2445 10.815 12.218C10.691 12.166 10.648 12.146 10.563 12.109L10.558 12.107C9.98592 11.8572 9.45624 11.5198 8.98801 11.107C8.86201 10.997 8.74501 10.877 8.62501 10.761C8.23159 10.3842 7.88873 9.95801 7.60501 9.493L7.54601 9.398C7.50364 9.33416 7.46937 9.2653 7.44401 9.193C7.40601 9.046 7.50501 8.928 7.50501 8.928C7.50501 8.928 7.74801 8.662 7.86101 8.518C7.9551 8.39832 8.04289 8.27382 8.12401 8.145C8.24201 7.955 8.27901 7.76 8.21701 7.609C7.93701 6.925 7.64701 6.244 7.34901 5.568C7.29001 5.434 7.11501 5.338 6.95601 5.319C6.90201 5.313 6.84801 5.307 6.79401 5.303C6.65972 5.29633 6.52515 5.29866 6.39101 5.308Z"
                          fill="white"
                        />
                      </svg>
                      <span
                        id="whatsappChatWidgetButtonTextPreview"
                        style={{
                          marginLeft: 8,
                          marginRight: 8,
                          zIndex: 1,
                          color: "rgb(255, 255, 255)",
                        }}
                      >
                        Chat With Us
                      </span>
                      <svg
                        width={9}
                        height={14}
                        viewBox="0 0 9 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "auto", display: "block" }}
                      >
                        {" "}
                        <path
                          d="M1 1L7 7L1 13"
                          stroke="white"
                          strokeWidth={2}
                          strokeLinecap="round"
                        />{" "}
                      </svg>
                    </a>
                  </div>
                  <div className="img text-center space_btm">
                    <img
                      alt="Wati"
                      src="https://www.wati.io/wp-content/uploads/2023/04/wati-powered.svg"
                    />
                  </div>
                  <div className="wa-widget-sen-button">
                    <img
                      src="/img/icon/walink-whatsapp.svg"
                      className="product-page-logo me-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{marginTop: '80px'}}></div>            
            <div id="wq-generated-output" className="d-flex align-items-center mb-5">
              <div className="wq-link-display-box me-2">https://wa.me/WhatsApp number?text=Pre-Filled Message</div>              
              <div className="wq-action-btn-group">
                <input type="text" id="dataBox" style={{ display: "none" }} />
                <button className="wq-action-btn" id="wq-copy-btn">
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 330 330"
                    style={{ enableBackground: "new 0 0 330 330" }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        d="M35,270h45v45c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V75c0-8.284-6.716-15-15-15h-45V15
                            c0-8.284-6.716-15-15-15H35c-8.284,0-15,6.716-15,15v240C20,263.284,26.716,270,35,270z M280,300H110V90h170V300z M50,30h170v30H95
                            c-8.284,0-15,6.716-15,15v165H50V30z"
                      />
                      
                    </g>
                  </svg>
                  Copy Link
                </button>
              </div>
              <p className="wq-copied ms-3" style={{ display: "none" }}>
                Copied!
              </p>
            </div>
            
            <div className="wq-action-btn-group">
              <button className="downloadBtn" id="downloadBtn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                >
                  <title>download</title>
                  <path d="M17 12v5H3v-5H1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z" />
                  <path d="M10 15l5-6h-4V1H9v8H5l5 6z" />
                </svg>
                Download QR Code
              </button>
            </div>            
          </div>

          <div className="col-md-6" id="widget-code-wrp" style={{display: 'none'}}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="d-flex mb-3">
                <span>Copy and paste this code before the tag on every page of your website.</span>
              </h4>
              <div className="wq-action-btn-group">
                <button className="wq-action-btn" id="wq-copy-code">
                    <svg
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 330 330"
                      style={{ enableBackground: "new 0 0 330 330" }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          d="M35,270h45v45c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V75c0-8.284-6.716-15-15-15h-45V15
                              c0-8.284-6.716-15-15-15H35c-8.284,0-15,6.716-15,15v240C20,263.284,26.716,270,35,270z M280,300H110V90h170V300z M50,30h170v30H95
                              c-8.284,0-15,6.716-15,15v165H50V30z"
                        />
                        
                      </g>
                    </svg>
                    Copy code
                </button>
              </div>
            </div>            
            <pre>
              <code id="widget-code">                  
              </code>
            </pre>
          </div>
        </div>
      </div>

      <PreFooter pricingPath={pricingPath} />
    </>
  );
};

export default ParentComponent;