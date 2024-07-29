import React from 'react';
var intlClass;
var intl;
var changeFlagZIndexInterval;

class MobileInputComponent extends React.Component {
    onChange(stopFocus) {
        const input = document.getElementById('init-contact');
        const isValid = this.props?.required ? intlClass?.isRequiredValidNumber : intlClass?.isValidNumber;
        if (isValid) {
            input?.classList?.remove('invalid-input');
        } else {
            input?.classList?.add('invalid-input');
        }
        this.props?.onInput && this.props?.onInput(intlClass.phoneNumber);
        this.props?.setInvalid && this.props?.setInvalid(!isValid);
        if (!stopFocus) {
            setTimeout(() => input?.focus(), 200);
        }
    }
    render() {
        setTimeout(() => {
            if (typeof document !== 'undefined') {
                const parentDom = document.querySelector('body');
                const input = document.getElementById('init-contact');
                const customCssStyleURL = `${process.env.REDIRECT_URL}/intl-tel-input-custom.css`;
                if (input) {
                    intlClass = new IntlPhoneLib(input, parentDom, customCssStyleURL, this.props?.defaultValue);
                }
            }
        }, 50);
        return (
            <>
                <input
                    className="w-100 form-control"
                    type="text"
                    id="init-contact"
                    placeholder={this.props.placeholder}
                    onInput={(e) => {
                        this.onChange();
                    }}
                    onBlur={(e) => {
                        this.onChange(true);
                    }}
                    onFocus={(e) => {
                        this.onChange(true);
                    }}
                    defaultValue={this.props?.defaultValue}
                    disabled={this.props?.disabled}
                />
            </>
        );
    }
}
export default MobileInputComponent;

var INTL_INPUT_OPTION = {
    nationalMode: true,
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/js/utils.js',
    autoHideDialCode: false,
    separateDialCode: false,
    initialCountry: 'auto',
    geoIpLookup: function (callback) {
        fetch('https://api.db-ip.com/v2/free/self')
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                callback(data?.countryCode?.toLowerCase() || 'in');
            })
            .catch(function () {
                callback('in');
            });
    },
    formatOnDisplay: false,
};

var PHONE_NUMBER_REGEX = /^[0-9-+()\/\\ ]+$/;

class IntlPhoneLib {
    /**
     * Creates an instance of IntlPhoneLib.
     * @param {*} inputElement
     * @param {*} parentDom
     * @memberof IntlPhoneLib
     */
    constructor(inputElement, parentDom, customCssStyleURL, defaultValue, changeFlagZIndex = false, intlOptions = {}) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/js/intlTelInput.min.js';
        script.onload = () => {
            intl = window.intlTelInput(inputElement, { ...INTL_INPUT_OPTION, ...intlOptions });
            this.phoneNumber = defaultValue;
            this.checkMobileFlag(parentDom, changeFlagZIndex);
        };

        const intlStyleElement = document.createElement('link');
        intlStyleElement.rel = 'stylesheet';
        intlStyleElement.href = `https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/css/intlTelInput.css`;

        const customIntlStyleElement = document.createElement('link');
        customIntlStyleElement.rel = 'stylesheet';
        customIntlStyleElement.href = `${customCssStyleURL}`;

        if (parentDom) {
            parentDom.appendChild(script);
            parentDom.appendChild(intlStyleElement);
            parentDom.appendChild(customIntlStyleElement);
        }
        setTimeout(() => {
            document.head.appendChild(script);
            document.head.appendChild(intlStyleElement);
        }, 200);

        let ulEl = document.getElementById('iti-0__country-listbox');
        if (ulEl) {
            let flagEl = Array.from(document.getElementsByClassName('iti__flag'));
            for (let i = 0; i < flagEl.length; i++) {
                flagEl[i].style.backgroundImage =
                    'url(https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/img/flags@2x.png)';
            }
        }
        this.showCountryDropdown(parentDom);
    }

    set phoneNumber(number) {
        intl?.setNumber(number);
    }

    set setCountry(country) {
        intl?.setCountry(country);
    }

    get intlData() {
        return intl;
    }

    get phoneNumber() {
        return intl?.getNumber();
    }

    get isRequiredValidNumber() {
        return intl?.isValidNumber();
    }

    get isValidNumber() {
        return intl?.getNumber()?.length ? intl?.isValidNumber() : true;
    }

    get selectedCountryData() {
        return intl?.getSelectedCountryData();
    }

    get getExtension() {
        return intl?.getExtension();
    }

    checkMobileFlag(parentDom, changeFlagZIndex) {
        let count = 0;
        let interval = setInterval(() => {
            let mobileViewInit = document.querySelector('body.iti-mobile');
            let childCount = 0;
            let flagDropDownElInterval = setInterval(() => {
                let flagDropdownView = parentDom.querySelector('.iti__flag-container');
                if (changeFlagZIndex) {
                    changeFlagZIndexInterval = setInterval(() => {
                        let flagDropDown = document.querySelector('.iti--container');
                        flagDropDown?.setAttribute('style', 'z-index: 9999999');
                        if (flagDropDown) {
                            clearInterval(changeFlagZIndexInterval);
                        }
                    }, 100);
                }
                if (flagDropdownView || childCount > 10) {
                    clearInterval(flagDropDownElInterval);
                }
                childCount++;
            }, 200);
            count++;
            if (mobileViewInit || count > 5) {
                clearInterval(interval);
            }
        }, 200);
    }

    /**
     * showCountryDropdown in fixed position
     *
     *
     * @param {HTMLElement} parentDom
     * @memberof IntlPhoneLib
     */
    showCountryDropdown(parentDom) {
        setTimeout(() => {
            let shadowRoot = parentDom.querySelector('.iti__flag-container');
            let flagDropdownView = parentDom.querySelector('.iti__country-list');
            if (flagDropdownView) {
                shadowRoot.addEventListener('click', (event) => {
                    // Get Clicked button coordinates
                    const rect = shadowRoot.getBoundingClientRect();
                    // Add current input height form top position
                    const top = rect.top + 34;
                    // Add styles on country dropdown
                    flagDropdownView.setAttribute(
                        'style',
                        'position: fixed;top:' + top + 'px; left:' + rect.left + 'px'
                    );
                });
            }
        }, 700);
    }

    onlyPhoneNumber(e) {
        const inputChar = String.fromCharCode(e.charCode);
        if ((e.key !== 'Backspace' && !new RegExp(PHONE_NUMBER_REGEX).test(inputChar)) || e.code === 'Space') {
            e.preventDefault();
        }
    }

    clearChangeFlagZIndexInterval() {
        clearInterval(changeFlagZIndexInterval);
    }

    destroyIntlClass() {
        intl?.destroy();
    }
}
