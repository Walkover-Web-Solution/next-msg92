var WIDGET_SCRIPT_BASE = (function () {
    var script = document.currentScript;
    if (!script || !script.src) {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            if ((scripts[i].src || '').indexOf('appleMessagesWidget.js') !== -1) {
                script = scripts[i];
                break;
            }
        }
    }
    if (script && script.src) {
        return script.src.replace(/\/js\/[^/?#]+(?:[?#].*)?$/, '');
    }
    return '';
})();

function getWidgetBaseUrl() {
    return String(WIDGET_SCRIPT_BASE || '').replace(/\/$/, '');
}

async function CreateAppleMessagesWidget(
    option = {
        businessId: '',
        intentId: '',
        groupId: '',
        preFilledMessage: '',
        chatButtonSetting: {
            backgroundColor: '#50EE6A',
            ctaText: 'Message Us',
            marginLeft: '0',
            marginRight: '20',
            marginBottom: '20',
            position: 'right',
        },
        enabled: true,
    }
) {
    // Wait for DOM to be ready before initializing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initWidgetLogic(option);
        });
        return;
    }

    initWidgetLogic(option);
}

function initWidgetLogic(option) {
    // Device detection - for button visibility
    function isAppleDevice() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return (
            /iPad|iPhone|iPod/.test(userAgent) ||
            (navigator.userAgent.includes('Mac') && navigator.maxTouchPoints > 1) ||
            /Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)
        );
    }

    const showButton = isAppleDevice();

    // Ensure chatButtonSetting exists with defaults
    if (!option.chatButtonSetting) {
        option.chatButtonSetting = {
            backgroundColor: '#007AFF',
            ctaText: 'Message Us',
            marginLeft: '0',
            marginRight: '20',
            marginBottom: '20',
            position: 'right',
        };
    }

    if (option.enabled == false) {
        return;
    }

    // Build Apple Messages link
    function buildAppleLink(data) {
        if (!data.businessId) return '';
        let url = `https://bcrw.apple.com/urn:biz:${data.businessId}`;
        const params = [];
        if (data.intentId) {
            params.push(`biz-intent-id=${encodeURIComponent(data.intentId)}`);
        }
        if (data.groupId) {
            params.push(`biz-group-id=${encodeURIComponent(data.groupId)}`);
        }
        if (data.preFilledMessage) {
            params.push(`body=${encodeURIComponent(data.preFilledMessage)}`);
        }
        if (params.length > 0) {
            url += '?' + params.join('&');
        }
        return url;
    }

    var widgetBaseUrl = getWidgetBaseUrl();

    // Load QR code library if not defined
    function loadQRCodeLibrary() {
        if (typeof QRCode === 'undefined') {
            var qrScript = document.createElement('script');
            qrScript.src = widgetBaseUrl + '/js/qrcode.js';
            qrScript.onload = function () {
                // Wait for widget HTML to be inserted before generating QR code
                setTimeout(function () {
                    generateQRCode();
                }, 100);
            };
            document.body.appendChild(qrScript);
        } else {
            // Wait for widget HTML to be inserted before generating QR code
            setTimeout(function () {
                generateQRCode();
            }, 100);
        }
    }

    function generateQRCode() {
        var qrcodeElement = document.getElementById('qrcode');
        if (qrcodeElement) {
            var qrcode = new QRCode(qrcodeElement, {
                width: 150,
                height: 150,
                colorDark: '#000000',
                colorLight: '#ffffff',
            });
            qrcode.makeCode(buildAppleLink(option));
        }
    }

    var css = document.createElement('STYLE');
    var defaultSvg = `<svg   id="apple-widget-svg" width="24" height="24" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><circle cx="19" cy="19" r="19" fill="${option.chatButtonSetting.backgroundColor}"></circle><path d="M19 6.57 C11.32 6.57 5.07 11.78 5.07 18.39 C5.07 22.52 7.5 26.16 11.85 28.54 C11.29 29.9 10.48 31.04 9.42 31.96 C11.5 31.77 13.39 31.02 15.12 29.75 C16.37 30.06 17.68 30.21 19 30.21 C26.68 30.21 32.93 25 32.93 18.39 C32.93 11.78 26.68 6.57 19 6.57Z" fill="#ffffff"></path></svg>`;

    // Wait for DOM to be ready before initializing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }

    function initWidget() {
        if (option.preFilledMessage) {
            option.preFilledMessage = option.preFilledMessage.replaceAll(
                '{{page_link}}',
                encodeURIComponent(window.location.href)
            );
            option.preFilledMessage = option.preFilledMessage.replaceAll(
                '__page_link__',
                encodeURIComponent(window.location.href)
            );
            option.preFilledMessage = option.preFilledMessage.replaceAll('{{page_title}}', window.document.title);
            option.preFilledMessage = option.preFilledMessage.replaceAll('__page_title__', window.document.title);
            option.preFilledMessage = option.preFilledMessage.replaceAll('\n', '%0A');
        }

        const appleLink = buildAppleLink(option);

        insertWidgetHTML(appleLink);
    }

    function insertWidgetHTML(appleLink) {
        document.body.insertAdjacentHTML(
            'beforeend',
            `<div id="apple-chat-widget">
                <div class="apple-widget-send-button">
                    ${defaultSvg}
                    <svg id="apple-widget-opened-svg" width="23" height="13" viewBox="0 0 23 13" fill="none" style="pointer-events: none; display: none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.20001 1.7334L11.6154 11.1488L21.0308 1.7334" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square"/>
                    </svg>
                </div>
            </div>`
        );
        document.querySelector('#apple-chat-widget')?.insertAdjacentHTML(
            'beforeend',
            `<div class='apple-chat-bubble'>
                <div class="apple-chat-bubble-close-button">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" style="pointer-events: none; display: block;"
                     xmlns="http://www.w3.org/2000/svg">
                     <path d="M3.6001 4.1001L8.4001 8.9001M3.6001 8.9001L8.4001 4.1001" stroke="white" stroke-width="1.33333"/>
                    </svg>
                </div>
                 <div class="apple-chat-bubble-text'>
                     ${option.chatButtonSetting.ctaText}
                </div>
            </div>`
        );
        document.querySelector('#apple-chat-widget')?.insertAdjacentHTML(
            'beforeend',
            `<div class='apple-chat-box'>
                 <img class='apple-chat-box-brand'
                    onError='this.src= "${widgetBaseUrl}/assets/icons/products/imessage.svg";' 
                    src='${widgetBaseUrl}/assets/icons/products/imessage.svg'/> 
     
                 <div class='apple-chat-box-content-chat-welcome'>
                      Got any questions?<br/>We're here to help.
                 </div>
                 <div id="qrcode"></div>
                 <div>Scan this QR code to start an Apple Messages for Business conversation.</div> 
                 ${
                     showButton
                         ? `
                 <a
                    role="button"
                    target="_blank"
                    href="${appleLink}"
                    title="Apple Messages" class="apple-chat-box-content-send-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block">
                            <path
                                d="M20.314 3.44995C18.2979 1.43114 15.6165 0.214135 12.7696 0.0256927C9.92272 -0.16275 7.10439 0.690221 4.83975 2.42568C2.57511 4.16114 1.01862 6.66071 0.46029 9.45869C-0.0980434 12.2567 0.37986 15.1622 1.80496 17.6339L0.136719 23.7268L6.37072 22.0922C8.09496 23.0312 10.027 23.5232 11.9903 23.5233H11.9954C14.3211 23.5235 16.5946 22.834 18.5285 21.5422C20.4624 20.2503 21.9699 18.414 22.8603 16.2655C23.7506 14.117 23.984 11.7527 23.5307 9.47156C23.0775 7.19043 21.9581 5.09491 20.314 3.44995ZM11.9954 21.5378H11.9927C10.2423 21.5379 8.52396 21.0674 7.01776 20.1755L6.66064 19.9639L2.96032 20.9337L3.94792 17.327L3.71536 16.9574C2.56347 15.1217 2.05427 12.9553 2.2678 10.7987C2.48133 8.64215 3.40549 6.61767 4.89499 5.04356C6.3845 3.46944 8.35488 2.43495 10.4964 2.1027C12.6379 1.77046 14.8291 2.15931 16.7255 3.20812C18.622 4.25693 20.1161 5.90623 20.973 7.89674C21.83 9.88725 22.0011 12.1061 21.4596 14.2045C20.918 16.3029 19.6945 18.1618 17.9813 19.489C16.2682 20.8162 14.1625 21.5365 11.9954 21.5366V21.5378Z"
                                fill="white" />
                        </svg>
                        <span class="apple-chat-box-content-send-btn-text">${option.chatButtonSetting.ctaText}</span>
                        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: auto; display: block;">
                          <path d="M1 1L7 7L1 13" stroke="white" stroke-width="2" stroke-linecap="round" />
                        </svg>
                  </a>`
                         : ''
                 }
      
    
                <div class='apple-chat-box-poweredby'>                    
                    <a href="https://msg91.com" target="_blank" class="apple-chat-box-poweredby-link">
                      <img src="${widgetBaseUrl}/img/poweredby.svg">
                    </a>
                </div>
            </div>
            `
        );

        const openedSvg = document.querySelector('#apple-widget-opened-svg');
        if (openedSvg) {
            openedSvg.style.display = 'none';
        }

        document.querySelector('#apple-chat-widget').addEventListener('click', function (event) {
            // Check if click is on the send button or its children
            const sendButton = event.target.closest('.apple-widget-send-button');
            const bubbleText = event.target.closest('.apple-chat-bubble-text');
            const closeButton = event.target.closest('.apple-chat-bubble-close-button');

            if (sendButton) {
                if (sendButton.classList.contains('apple-widget-send-button-clicked')) {
                    // Close the widget
                    document.querySelector('.apple-chat-box').classList.remove('apple-chat-box-visible');
                    const widgetSvg = document.querySelector('#apple-widget-svg');
                    if (widgetSvg) {
                        widgetSvg.style.display = 'block';
                    }
                    const openedSvg = document.querySelector('#apple-widget-opened-svg');
                    if (openedSvg) {
                        openedSvg.style.display = 'none';
                    }
                    document.querySelector('.apple-chat-bubble').style.cssText = '';
                    sendButton.classList.remove('apple-widget-send-button-clicked');
                } else {
                    // Open the widget
                    document.querySelector('.apple-chat-box').classList.add('apple-chat-box-visible');
                    const widgetSvg = document.querySelector('#apple-widget-svg');
                    if (widgetSvg) {
                        widgetSvg.style.display = 'none';
                    }
                    const openedSvg = document.querySelector('#apple-widget-opened-svg');
                    if (openedSvg) {
                        openedSvg.style.display = 'block';
                    }
                    document.querySelector('.apple-chat-bubble').style.display = 'none';
                    sendButton.classList.add('apple-widget-send-button-clicked');
                }
            } else if (bubbleText) {
                // Open the widget when clicking on bubble text
                document.querySelector('.apple-chat-box').classList.add('apple-chat-box-visible');
                const widgetSvg = document.querySelector('#apple-widget-svg');
                if (widgetSvg) {
                    widgetSvg.style.display = 'none';
                }
                const openedSvg = document.querySelector('#apple-widget-opened-svg');
                if (openedSvg) {
                    openedSvg.style.display = 'block';
                }
                document.querySelector('.apple-chat-bubble').style.display = 'none';
                const sendButton = document.querySelector('.apple-widget-send-button');
                if (sendButton) {
                    sendButton.classList.add('apple-widget-send-button-clicked');
                }
            } else if (closeButton) {
                // Close the bubble
                document.querySelector('.apple-chat-bubble').classList.add('apple-chat-bubble-closed');
            }
        });
        window.onload = function () {
            setTimeout(function () {
                document.querySelector('.apple-chat-box').classList.add('apple-chat-box-transition');
            }, 100);
        };

        // Load QR code after widget HTML is inserted
        setTimeout(function () {
            loadQRCodeLibrary();
        }, 100);
    }

    var styles = `          
          #qrcode {
            background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzMzMycgc3Ryb2tlLXdpZHRoPSc0JyBzdHJva2UtZGFzaGFycmF5PScxMDAnIHN0cm9rZS1kYXNob2Zmc2V0PSc1MCcgc3Ryb2tlLWxpbmVjYXA9J3NxdWFyZScvPjwvc3ZnPg==);
            width: 200px;
            height: 200px;
            padding: 25px;
            box-sizing: border-box;
          }
          #apple-chat-widget{
            display: ${option.enabled ? 'block' : 'none'};
            font-family: sans-serif !important;
          }
          .apple-chat-box-content-send-btn-text{
              font-family: sans-serif !important;
              font-weight: 500;
              font-size: 16px;
              line-height: 20px;
              color: #FFFFFF !important;
          }
          .apple-chat-box-content-send-btn{
              background-color: #1D1D1B !important;              
              border-radius: 8px;
              text-decoration: none;
              cursor: pointer;
              position: relative;
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 16px 20px;
              border-width: initial;
              border-style: none;
              border-color: initial;
              border-image: initial;
              overflow: hidden;
              opacity: 1 !important;
          }
          .apple-chat-box-content-chat-welcome{        
              font-family: sans-serif !important;
              font-size: 20px;
              line-height: 150%;
              color: #000000;
          }
          .apple-chat-box-brand{
              width: 52px;
              height: 52px;              
          }
          .apple-chat-box{
              background-color: white;
              z-index: 16000160 !important;              
              margin-bottom: 72px;
              min-width: 200px;
              max-width: 300px;
              position: fixed !important;
              bottom: ${option.chatButtonSetting.marginBottom}px !important;
              ${
                  option.chatButtonSetting.position == 'left'
                      ? 'left : ' + option.chatButtonSetting.marginLeft + 'px'
                      : 'right : ' + option.chatButtonSetting.marginRight + 'px'
              };
              border-radius: 32px;
              border: 2px solid #363636;            
              padding: 32px 32px 16px;
              min-height: 279px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 12px;
              pointer-events: none;
              opacity: 0;
              scale: 0;
              transform-origin: ${option.chatButtonSetting.position == 'left' ? 'left' : 'right'} bottom;
              
          }
          .apple-chat-box-visible{
              pointer-events: auto;
              opacity: 1;
              scale: 1;
          }
          .apple-chat-box-transition {
              transition: scale 150ms ease-in, opacity 250ms ease-in;
          }
          .apple-widget-send-button {
              margin: 0 0 ${option.chatButtonSetting.marginBottom}px 0 !important;      
              position: fixed !important;
              z-index: 16000160 !important;
              bottom: 0 !important;
              text-align: center !important;
              height: 50px;
              min-width: 50px;              
              border-radius: 100px;
              visibility: visible;
              transition: none !important;
              background-color: ${option.chatButtonSetting.backgroundColor};
              box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.4);
              ${
                  option.chatButtonSetting.position == 'left'
                      ? 'left : ' + option.chatButtonSetting.marginLeft + 'px'
                      : 'right : ' + option.chatButtonSetting.marginRight + 'px'
              };
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
          }
       
          .apple-chat-box-poweredby{
              margin-left: auto;
              margin-right: auto;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 3px;
              font-family: sans-serif !important;
              font-size: 12px;
              line-height: 18px;
              color: #999999;
          }
          .apple-chat-box-poweredby-link{
              font-weight: 600;
              color: #666666 !important;
              text-decoration: none !important;
          }
          .apple-chat-box-poweredby-link::hover{
              color: #666666 !important;
              text-decoration: none !important;
          }
  
          .apple-chat-bubble{
              display: none;
              align-items: center;
              gap: 8px;
              z-index: 16000160 !important;
              position: fixed !important;
              margin-bottom: 63px;
              bottom: ${option.chatButtonSetting.marginBottom}px !important;
              ${
                  option.chatButtonSetting.position == 'left'
                      ? 'left : ' + option.chatButtonSetting.marginLeft + 'px'
                      : 'right : ' + option.chatButtonSetting.marginRight + 'px'
              };
          }
          .apple-chat-bubble-closed{
            display: none;
          }
          .apple-chat-bubble-close-button{
              height: 20px;
              min-width: 20px;
              background: ${option.chatButtonSetting.backgroundColor};
              border-radius: 24px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              order: ${option.chatButtonSetting.position == 'left' ? '0' : '1'};
          }
          .apple-chat-bubble-text{
             font-family: sans-serif !important;
             background: ${option.chatButtonSetting.backgroundColor};
             border: 1px solid #363636;
             box-shadow: 2px 3px 0px ${option.chatButtonSetting.backgroundColor};
             border-radius: 24px;
             padding: 8px 16px;

             font-weight: 500;
             font-size: 14px;
             line-height: 150%;
             color: #FFFFFF;
             cursor: pointer;
          }
          
  
          @media only screen and (max-width: 600px) {
              .apple-chat-box
              {
                  width: auto;
                  position: fixed !important;
                  right: 20px!important;
                  left: 20px!important;
              }
          }
      `;

    var styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}
