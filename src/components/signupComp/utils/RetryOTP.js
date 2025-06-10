import React from 'react';
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
        const newInterval = setInterval(() => {
            this.setState((prevState) => {
                const newTimer = prevState.timer + 1;
                if (newTimer >= 35) {
                    clearInterval(newInterval);
                    return { timer: 0, interval: null };
                }
                return { timer: newTimer };
            });
        }, 1000);
        this.setState({ interval: newInterval });
    }

    render() {
        return (
            <>
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
            </>
        );
    }
}
export default RetryOtp;
