import React from 'react';
class Otpinput extends React.Component {
    render() {
        let otpLength = Array.from({ length: this.props.otpLength }, (_, index) => index + 1);
        return (
            <>
                <div className="d-flex gap-3 ver-input">
                    <div className="d-flex gap-3 ver-input__input">
                        {otpLength.map((x) => (
                            <input
                                type="text"
                                className="form-control otp-input"
                                placeholder="*"
                                maxLength="1"
                                key={x}
                                id={this.props.tag + x}
                                onKeyDown={(event) => {
                                    const integerRegex = /[0-9]{1}/;
                                    if (integerRegex.test(event.key)) {
                                        if (x < this.props.otpLength) {
                                            const inputEle = document.getElementById(this.props.tag + (x + 1));
                                            if (event.target.value) {
                                                inputEle.value = event.key;
                                            }
                                            setTimeout(() => {
                                                inputEle.focus();
                                            });
                                        }
                                    } else if (event.key === 'Backspace') {
                                        if (!event.target.value && x > 1) {
                                            const inputEle = document.getElementById(this.props.tag + (x - 1));
                                            inputEle.value = '';
                                            setTimeout(() => {
                                                inputEle.focus();
                                            });
                                        }
                                    } else {
                                        event.preventDefault();
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
