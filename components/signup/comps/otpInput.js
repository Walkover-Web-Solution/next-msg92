import React from 'react';

const integerRegex = /^(?!\.)\d+$/;

function setValueInInputs(value, tag, otpLength) {
    if (value?.trim()?.length === +otpLength) {
        for (let i = 1; i <= +otpLength; i++) {
            const inputEle = document.getElementById(tag + i);
            if (inputEle) {
                inputEle.value = +value.charAt(i - 1);
                if (i === +otpLength) {
                    inputEle.focus();
                }
            }
        }
        return true;
    } else {
        return false;
    }
}

class Otpinput extends React.Component {
    render() {
        let otpLength = Array.from({ length: this.props.otpLength }, (_, index) => index + 1);
        return (
            <>
                <div className="d-flex gap-3 ver-input">
                    <div className="d-flex gap-3 ver-input__input">
                        {otpLength.map((x) => (
                            <input
                                type="number"
                                inputmode="numeric"
                                className="form-control otp-input"
                                placeholder="*"
                                autoComplete="off"
                                min="0"
                                max="9"
                                key={x}
                                id={this.props.tag + x}
                                onPaste={(event) => {
                                    const pastedData = (event.clipboardData || window.clipboardData)?.getData('Text');
                                    if (integerRegex.test(pastedData)) {
                                        setValueInInputs(pastedData, this.props.tag, this.props.otpLength);
                                    }
                                    event?.preventDefault();
                                }}
                                onKeyDown={(event) => {
                                    if (event.ctrlKey || event.metaKey) {
                                        return false;
                                    }

                                    if (integerRegex.test(event.key)) {
                                        if (x < this.props.otpLength) {
                                            const inputEle = document.getElementById(this.props.tag + (x + 1));
                                            if (event.target.value) {
                                                inputEle.value = event.key;
                                            }
                                            setTimeout(() => {
                                                inputEle.focus();
                                            }, 20);
                                        } else if (x === +this.props.otpLength && event.target.value) {
                                            event.preventDefault();
                                        }
                                        setTimeout(() => {
                                            const inputEle = document.getElementById(this.props.tag + x);
                                            if (inputEle?.value?.length > 1) {
                                                inputEle.value = inputEle.value?.slice(0, 1);
                                            }
                                        }, 20);
                                    } else if (event.key === 'Backspace') {
                                        if (!event.target.value && x > 1) {
                                            const inputEle = document.getElementById(this.props.tag + (x - 1));
                                            inputEle.value = '';
                                            setTimeout(() => {
                                                inputEle.focus();
                                            }, 20);
                                        }
                                    } else {
                                        event?.preventDefault();
                                        setTimeout(() => {
                                            const inputEle = document.getElementById(this.props.tag + x);
                                            if (integerRegex.test(inputEle?.value)) {
                                                if (
                                                    !setValueInInputs(
                                                        inputEle?.value,
                                                        this.props.tag,
                                                        this.props.otpLength
                                                    )
                                                ) {
                                                    if (inputEle?.value?.length > 1) {
                                                        const nextInputEle = document.getElementById(
                                                            this.props.tag + (x + 1)
                                                        );
                                                        if(nextInputEle) {
                                                            nextInputEle.value = inputEle.value?.slice(1);
                                                            nextInputEle.focus();
                                                        }
                                                        inputEle.value = inputEle.value?.slice(0, 1);
                                                    }
                                                }
                                            } else {
                                                inputEle.value = '';
                                            }
                                        }, 20);
                                    }
                                }}
                            />
                        ))}
                    </div>
                    <button
                        className="btn btn-login-prime-o c-fs-7"
                        onClick={() => {
                            let valOtp = '';
                            for (let i = 1; i <= +this.props.otpLength; i++) {
                                valOtp += document.getElementById(this.props.tag + i).value;
                            }
                            if (valOtp?.length === +this.props.otpLength) {
                                this.props.verifyOtp(valOtp, this.props.requestId, this.props.notByEmail);
                            }
                        }}
                    >
                        Verify
                    </button>
                </div>
            </>
        );
    }
}
export default Otpinput;
