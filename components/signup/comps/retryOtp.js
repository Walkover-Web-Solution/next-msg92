import React from 'react';
var interval;
class RetryOtp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { timer: 0 };
    }

    componentDidMount() {
        this.setState({ timer: 1 });
        this.startTimer();
    }

    startTimer() {
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => {
            this.setState({ timer: 1 });
            if (this.state.timer >= 35) {
                this.setState({ timer: 0 });
                clearInterval(interval);
            } else {
                this.setState({ timer: this.state.timer + 1 });
            }
        }, 1000);
    }

    render() {
        return (
            <>
                {this.state.timer ? (
                    <p className="col-dark my-3 c-fs-9 ">Retry in {36 - this.state.timer} seconds</p>
                ) : null}
                {!this.state.timer && this.props.emailRequestId && this.props.allowedRetry?.email ? (
                    <p className="col-dark my-3 c-fs-9 ">
                        Resend on{' '}
                        <a
                            href={undefined}
                            onClick={() => {
                                this.startTimer();
                                this.props.retryOtp(this.props.OTPRetryModes.Email, this.props.emailRequestId, false);
                            }}
                            className="col-primary c-fw-m p-3 cursor-pointer text-hover-underline"
                        >
                            Email
                        </a>
                    </p>
                ) : null}
                {!this.state.timer && this.props?.smsRequestId ? (
                    <p className="col-dark my-3 c-fs-9">
                        Resend on{' '}
                        {this.props.allowedRetry?.sms ? (
                            <a
                                href={undefined}
                                onClick={() => {
                                    this.startTimer();
                                    this.props.retryOtp(this.props.OTPRetryModes.Sms, this.props.smsRequestId, true);
                                }}
                                className="col-primary c-fw-600 p-3 cursor-pointer text-hover-underline"
                            >
                                Text
                            </a>
                        ) : null}
                        {this.props.allowedRetry?.whatsApp ? (
                            <span>
                                {this.props.allowedRetry?.sms && <span>or </span>}
                                <a
                                    href={undefined}
                                    onClick={() => {
                                        this.startTimer();
                                        this.props.retryOtp(
                                            this.props.OTPRetryModes.Whatsapp,
                                            this.props.smsRequestId,
                                            true
                                        );
                                    }}
                                    className="col-primary c-fw-600 p-3 cursor-pointer text-hover-underline"
                                >
                                    WhatsApp
                                </a>
                            </span>
                        ) : null}
                        {this.props.allowedRetry?.voice ? (
                            <span>
                                {(this.props.allowedRetry?.sms || this.props.allowedRetry?.whatsApp) && (
                                    <span>or </span>
                                )}
                                <a
                                    href={undefined}
                                    onClick={() => {
                                        this.startTimer();
                                        this.props.retryOtp(
                                            this.props.OTPRetryModes.Voice,
                                            this.props.smsRequestId,
                                            true
                                        );
                                    }}
                                    className="col-primary c-fw-600 p-3 cursor-pointer text-hover-underline c-fw-m"
                                >
                                    Call
                                </a>
                            </span>
                        ) : null}
                    </p>
                ) : null}
            </>
        );
    }
}
export default RetryOtp;
