// Parent Component
import React, { useEffect } from "react";
import PreFooter from "@/components/preFooter";
const ParentComponent = ({ pricingPath, path }) => {
  //const data = json.global.hello;  
  console.log('path', path);
  useEffect(() => {
    var hasChild = document.getElementById("qrcode").hasChildNodes();
    
    if(!hasChild) {
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
          $(this).find('span').text('Copied!');
        });
        
        $("#wq-copy-code").on("click", function (event) {
          event.preventDefault();
          var elementText = $("#widget-code").text();
          navigator.clipboard.writeText(elementText);
          $(this).find('span').text('Copied!')
        });
        
        $("#edit").on("click", function () {
          $("#widget-dummy-preview, #widget-form").show();
          $("#widget-preview, #widget-code-wrp").hide();
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
            $("#widget-dummy-preview").hide();
            $("#widget-preview").show();
            $("#whatsappChatWidgetStartChat").attr("href", wp_end_url);
            $("#dataBox").val(wp_end_url);
            $(".wq-link-display-box").html(wp_end_url);
            $("#whatsappChatWidgetBrandImagePreview").attr('src', (wp_brand) ? wp_brand : 'https://msg91.com/img/icon/walink-whatsapp.svg')
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
          
          // Creating hidden <a> tag to download
          var element = document.createElement("a");
          element.setAttribute("href", image);
          element.setAttribute("download", filename);
          element.setAttribute("class", toHideClassName);
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }
    /* 
    {
      brandSetting: {
        brandImg: 'https://msg91.com/img/icon/walink-whatsapp.svg',                        
        welcomeText: 'I have some questions about MSG91, \ncan you help?',
        messageText: 'I’ve some questions about MSG91, can you help?',
        phoneNumber: '85252859384',
      },
      chatButtonSetting: {
        backgroundColor: '#25D366',      
        ctaText: 'Chat with us',
        ctaIconMSG: true,
        marginLeft: '0',
        marginRight: '20',
        marginBottom: '20',
        position: 'right',
      },
      enabled: true,
    }
      */
        function widgetCode(barndImage, welcomeText, preFilledMsg, mobile) {
          var html = `&lt;script&gt;
    var options = {
    brandSetting: {
      brandImg: "${barndImage}",
      welcomeText: \`${welcomeText}\`, 
      messageText: \`${preFilledMsg}\`,
      phoneNumber: "${mobile}",
    },
    chatButtonSetting: {
      backgroundColor: "#24d366", //now is used as Brand Color
      ctaText: 'Chat with us',
      marginLeft: "0",
      marginRight: "20",
      marginBottom: "20",
      position: "right",
    },
    enabled: true,
    isNewChatWidget: true // new property to switch between old and new widget 
    }
    &lt;/script&gt;
    &lt;script type="text/javascript" onload="CreateWhatsappChatWidget(options)" src="https://msg91.com/js/waWidget.js"\&gt; &lt;/script&gt;`;
          
            $("#widget-code").html(html);        
            hljs.highlightAll();          
            $("#widget-code-wrp").show();
            $("#widget-form").hide();
        }
      });    
    }    
  });
  return (
    <>
      <script type="text/javascript" src="/js/qrcode.js" defer></script>
      <script type="text/javascript" src="/js/jquery.min.js"></script>
      <script src="/js/highlight.min.js"></script>
      <link rel="stylesheet" href="/atom-one-dark.min.css" />
      <link rel="stylesheet" href="/walink.css" />
      <div className="product-banner-wrp">
        <div className="container text-center overflow-hidden">
          <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
            <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
              <img
                src="/img/icon/whatsapp.svg"
                className="product-page-logo me-2"
                alt="whatsapp logo"

              />
              <h1 className="heading hello-heading">
                Free WhatsApp link generator
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
              href="#generate"
              className="btn btn-dark btn-lg c-fs-2 mt-3"
            >
              Generate
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
        <h2 className="sub-heading c-head pt-4 pt-md-0">
          3 steps to creating a QR code/Widget/Link
        </h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
              <img src="/img/icon/dialpad.svg" className="" alt="dialpad logo"/>
            </div>
            <h3 className="c-fs-2 c-fw-b">Step1</h3>
            <p className="c-fs-3  mt-3">
              Enter your country code and your WhatsApp Business number, and add
              a welcome message if desired.
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
              <img src="/img/icon/dashboard_customize.svg" className="" alt="dashboard customize logo"/>
            </div>
            <h3 className="c-fs-2 c-fw-b ">Step2</h3>
            <p className="c-fs-3  mt-3">
              Personalize your widget, QR code, or link to align with your
              brand's visual guidelines and identity.
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
              <img src="/img/icon/auto_awesome.svg" className="" alt="auto awesome logo"/>
            </div>
            <h3 className="c-fs-2 c-fw-b ">Step3</h3>
            <p className="c-fs-3  mt-3">
              Lastly, simply click the 'Generate Now' button to create your
              widget, QR code, or link. It's that simple!
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 py-5" id="generate">
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

          <div className="col-md-6" id="widget-dummy-preview">            
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="">Widget preview</span>
              </h4>
              <img src="/img/widget-preview.svg" className="" alt="widget preview logo"/>
          </div>

          <div className="col-md-6" id="widget-preview" style={{display: 'none'}}>
            <h4 className="d-flex align-items-center">
              <span className="">Widget preview</span>
              <button id="edit" type="button" className="btn btn-link">Edit</button>
            </h4>
            <div id="wq-generated-output" className="d-flex align-items-center mb-3">
              <div className="wq-link-display-box me-2">https://wa.me/WhatsApp number?text=Pre-Filled Message</div>
            </div>
            <div className="preview-bg">              
              <div className="wq-action-btn-group d-flex justify-content-between mb-4">
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
                  <span>Copy Link</span>
                </button>
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
                <input type="text" id="dataBox" style={{ display: "none" }} />
                                
              </div>
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
                      height: '50px',
                      width: '50px',                      
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src="https://msg91.com/img/icon/hello.svg"
                      id="whatsappChatWidgetBrandImagePreview"
                      alt="Brand Image"
                      style={{                        
                        height: '100%'
                      }}
                    />
                    {/* <div style="margin-left: 20px;">
                                      <div id="whatsappChatWidgetBrandPreview" style="font-size: 16px; font-weight: 700;">MSG91</div>
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
                      {/* <div id="whatsappChatWidgetBrandPreview2" style="font-size: 13px; font-weight: 700; line-height: 18px; color: rgba(0, 0, 0, 0.4);">MSG91</div> */}
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
                    <img src="https://msg91.com/img/poweredby.svg" />
                  </div>
                  <div className="wa-widget-sen-button">
                  <svg
                    id="wa-widget-opened-svg"
                    width={23}
                    height={13}
                    viewBox="0 0 23 13"
                    fill="none"
                    style={{ pointerEvents: "none", display: "block" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.20001 1.7334L11.6154 11.1488L21.0308 1.7334"
                      stroke="#000"
                      strokeWidth={2}
                      strokeLinecap="square"
                    />
                  </svg>
                  </div>
                </div>
              </div>
              </div>            
            </div>
          </div>

          <div className="col-md-6" id="widget-code-wrp" style={{display: 'none'}}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="d-flex" style={{lineHeight:'38px'}}>
                <span>Widget code snipet</span>
              </h4>                            
            </div>            
            <p className="mb-3">Copy and paste this code on every page of your website.</p>
            <pre style={{position:'relative'}}>
            <div className="wq-action-btn-group wq-copy-code">
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
                    <span>Copy code</span>
                </button>
              </div>
              <code id="widget-code" className="language-javascript">                  
              </code>
            </pre>
          </div>
        </div>
        <div>
              <h2 className="c-head c-fs-1 mt-5 mb-2">FAQs</h2>

              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                     How does a WhatsApp link work?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                    WhatsApp links use a specific URL format that,
                    when clicked, opens the WhatsApp app on a user's 
                    device and starts a chat with the provided phone number or message.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      Is it possible to add a predefined message with the WhatsApp link?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                    Yes, absolutely. When utilizing the <a href={`${path}/whatsapp`}>WhatsApp API</a>, you can include a pre-filled message along with the phone number in the link. Services like MSG91 offer WhatsApp link generators that allow you to easily create these links.                    
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      Is it possible to generate a WhatsApp link for a business account?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                    Yes, WhatsApp link generators can create links for both personal and business accounts. 
                    Business accounts often have additional features suitable for customer interactions.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFour"
                      aria-expanded="false"
                      aria-controls="flush-collapseFour"
                    >
                      Are WhatsApp links cross-platform compatible?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingFour"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                    Yes, WhatsApp links work across different platforms, including iOS, Android, 
                    and web browsers, ensuring a seamless experience for users regardless of their device.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFive"
                      aria-expanded="false"
                      aria-controls="flush-collapseFive"
                    >
                      How can I generate a WhatsApp link?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingFive"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                    You can generate a WhatsApp link by appending the phone number to 
                    the WhatsApp URL: https://wa.me/phonenumbers. For example, to create a link for 
                    the number 1234567890, the URL would be https://wa.me/1234567890.
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>

      <PreFooter pricingPath={pricingPath} />
    </>
  );
};

export default ParentComponent;