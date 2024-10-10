import React from 'react';
var timer;
class RetryOtp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { timer: 0, interval: null };
    }

    componentDidMount() {
        this.setState({ timer: 1 });
        this.startTimer();
    }

    startTimer() {
        if (this.state.interval) {
            clearInterval(this.state.interval);
        }
        timer = setInterval(() => {}, 100);
        this.setState({
            interval: setInterval(() => {
                this.setState({ timer: 1 });
                if (this.state.timer >= 35) {
                    this.setState({ timer: 0 });
                    clearInterval(this.state.interval);
                } else {
                    this.setState({ timer: this.state.timer + 1 });
                }
            }, 1000),
        });
    }

    render() {
        return (
            <div>
                {this.state.timer ? <p className='text-sm '>Retry in {36 - this.state.timer} seconds</p> : null}
                {!this.state.timer && this.props.emailRequestId && this.props.allowedRetry?.email ? (
                    <p className='text-sm '>
                        Resend on{' '}
                        <a
                            href={undefined}
                            onClick={() => {
                                this.startTimer();
                                this.props.retryOtp(this.props.OTPRetryModes.Email, this.props.emailRequestId, false);
                            }}
                            className='text-link active-link'
                        >
                            Email
                        </a>
                    </p>
                ) : null}
                {!this.state.timer && this.props?.smsRequestId ? (
                    <p className='text-sm'>
                        Resend on{' '}
                        {this.props.allowedRetry?.sms ? (
                            <a
                                href={undefined}
                                onClick={() => {
                                    this.startTimer();
                                    this.props.retryOtp(this.props.OTPRetryModes.Sms, this.props.smsRequestId, true);
                                }}
                                className='text-link active-link'
                            >
                                Text
                            </a>
                        ) : null}
                        {this.props.allowedRetry?.whatsApp ? (
                            <span>
                                {this.props.allowedRetry?.sms && <span> or </span>}
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
                                    className='text-link active-link'
                                >
                                    WhatsApp
                                </a>
                            </span>
                        ) : null}
                        {this.props.allowedRetry?.voice ? (
                            <span>
                                {(this.props.allowedRetry?.sms || this.props.allowedRetry?.whatsApp) && (
                                    <span> or </span>
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
                                    className='text-link active-link'
                                >
                                    Call
                                </a>
                            </span>
                        ) : null}
                    </p>
                ) : null}
            </div>
        );
    }
}
export default RetryOtp;
