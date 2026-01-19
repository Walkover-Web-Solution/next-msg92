import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdCheckCircle, MdCheckCircleOutline } from 'react-icons/md';
import Otpinput from '../utils/InputOTP';
import MobileInputComponent from '../utils/MobileInputComponent';
import { toast } from 'react-toastify';
import RetryOtp from '../utils/RetryOTP';
import { getCookie, setCookie } from '@/utils/utilis';

var smsIdentifier = '';
var mobileInvalid = false;

class StepTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailInputValue: props.emailIdentifierBackup || '',
            emailIdentifier: props.emailIdentifierBackup || '',
            smsIdentifier: props.smsIdentifierBackup || '',
            sourceValue: '',
            optionValue: '',
        };
        smsIdentifier = this.state.smsIdentifier;

        this.sourceOptions = [
            { value: '/', label: 'Select Source' },
            { value: 'search_engine', label: 'Search engine (Google, Bing, Yahoo, etc)' },
            { value: 'recommended_by_friend', label: 'Recommended by friend or colleague' },
            { value: 'social_media', label: 'Social Media' },
            { value: 'blog', label: 'Blog or Publication' },
            { value: 'advertisement', label: 'Advertisement' },
            { value: 'event', label: 'Event' },
            { value: 'tiedelhincr', label: 'TiEDelhiNCR' },
            { value: 'other', label: 'Other' },
        ];
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search);
        const query = queryParams.toString();
        const sourceValue = queryParams.get('source') || queryParams.get('utm_source');
        this.setState({ sourceValue: sourceValue });
        if (this.sourceOptions.some((option) => option.value === sourceValue)) {
            this.setState({ optionValue: sourceValue });
            this.setState({ sourceValue: sourceValue });
        } else if (this.sourceOptions.some((option) => option.label === sourceValue)) {
            const lableValue = this.sourceOptions.find((option) => option.label === sourceValue).value;
            this.setState({ sourceValue: lableValue });
            this.setState({ optionValue: lableValue });
        } else if (sourceValue && this.sourceOptions.some((option) => option.value != sourceValue)) {
            this.setState({ sourceValue: sourceValue });
            this.setState({ optionValue: 'other' });
        }
    }

    updateSourceInUrlAndCookie(value) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('source', value);
        window.history.replaceState(null, '', currentUrl.toString());
        const utmData = getCookie('msg91_query');
        if (utmData?.includes('&source=')) {
            setCookie('msg91_query', utmData.replace(/&source=([\w_-])+/, '&source=' + value), 30);
        } else if (utmData?.includes('?source=')) {
            setCookie('msg91_query', utmData.replace(/\?source=([\w_-])+/, '?source=' + value), 30);
        } else {
            setCookie('msg91_query', utmData ? utmData + '&source=' + value : '?source=' + value, 30);
        }
    }

    handleSourceChange = (event) => {
        const value = event.target.value;
        if (this.sourceOptions.some((option) => option.value === value)) {
            this.setState({ optionValue: value, sourceValue: value });
            this.updateSourceInUrlAndCookie(value);
        } else {
            this.setState({ optionValue: 'other', sourceValue: value });
            this.updateSourceInUrlAndCookie(value);
        }
    };

    handleBackClick = () => {
        this.props.setStep(1);
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('githubsignup');
        currentUrl.searchParams.delete('code');
        currentUrl.searchParams.delete('state');
        currentUrl.searchParams.delete('source');
        window.history.replaceState(null, '', currentUrl.toString());
        // smsIdentifier = '';
        // mobileInvalid = false;
        // this.setState({
        //     smsIdentifier: '',
        // });
    };
    render() {
        const isLoading =
            ((this.props?.smsAccessToken && this.props?.emailAccessToken) || this.props?.githubCode) &&
            this.props?.isLoading;
        return (
            <>
                <div className='flex flex-col gap-12'>
                    <div className='signup flex flex-col gap-8 w-full'>
                        <div className='flex sm:flex-row flex-col sm:items-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <MdCheckCircle
                                    fontSize={18}
                                    className={
                                        this.props?.smsAccessToken && this.props?.emailAccessToken
                                            ? 'text-green-600'
                                            : 'text-gray-500'
                                    }
                                />
                                <span>Verify email & mobile number</span>
                            </div>
                            <span className='sm:w-[60px] w-[1px] sm:ml-0 ml-2 sm:h-[1px] h-6 bg-slate-400'></span>
                            <div className='flex items-center gap-2 text-slate-500'>
                                <MdCheckCircleOutline fontSize={18} />
                                <span>Enter details</span>
                            </div>
                        </div>

                        <div className='w-full flex flex-col gap-2 '>
                            <label htmlFor='email'>Verify email</label>
                            <div className='flex xl:flex-row flex-col gap-10'>
                                <div className='flex sm:flex-row flex-col items-start w-fit gap-4'>
                                    <div className='flex flex-col items-start gap-6 w-[300px]  '>
                                        <div className='flex gap-2 items-center w-full '>
                                            {this.props?.signupByGitHub ? (
                                                <div className='flex items-center gap-2'>
                                                    Email Verified{' '}
                                                    <MdCheckCircle className='ico-green text-green-600' />
                                                </div>
                                            ) : (
                                                <div className='w-full flex flex-col'>
                                                    <input
                                                        className={`input focus:outline-none w-full focus:border-accent h-10 ${
                                                            this.state.emailInputValue.length >= 255
                                                                ? 'border-red-500'
                                                                : 'border-gray-300'
                                                        }`}
                                                        type='email'
                                                        id='emailIdentifier'
                                                        placeholder='Email Address*'
                                                        defaultValue={this.state.emailIdentifier}
                                                        onInput={(e) => {
                                                            this.setState({ emailInputValue: e.target.value });
                                                            this.props.identifierChange(false);
                                                        }}
                                                        disabled={this.props?.emailAccessToken || isLoading}
                                                        maxLength={255}
                                                    />
                                                    <span className='text-[10px] h-2 text-red-500'>
                                                        {this.state.emailInputValue.length >= 255 &&
                                                            'Maximum Email Length: 255'}
                                                    </span>
                                                </div>
                                            )}
                                            <span>
                                                {this.props?.emailAccessToken && (
                                                    <MdCheckCircle className='text-green-600' />
                                                )}
                                            </span>
                                        </div>
                                        {this.props?.emailIdentifier &&
                                        this.props?.emailSuccessMessage &&
                                        !this.props?.emailAccessToken ? (
                                            <p className='text-sm text-success'>
                                                {this.props?.emailSuccessMessage} {this.props?.emailIdentifier}.
                                            </p>
                                        ) : null}
                                    </div>

                                    {this.props?.emailAccessToken || this.props?.signupByGitHub ? (
                                        <button
                                            disabled={isLoading}
                                            className='btn btn-accent btn-otp'
                                            onClick={(e) => this.props.identifierChange(false)}
                                        >
                                            Change{this.props?.signupByGitHub ? '' : '/Re-verify'} Email
                                        </button>
                                    ) : (
                                        <button
                                            className='btn btn-accent btn-otp btn-outline'
                                            onClick={() =>
                                                this.props.sendOtp(
                                                    document.getElementById('emailIdentifier').value,
                                                    false
                                                )
                                            }
                                            disabled={this.props?.isLoading || isLoading}
                                        >
                                            Get OTP
                                        </button>
                                    )}
                                </div>

                                {this.props?.emailIdentifier && !this.props?.emailAccessToken ? (
                                    <>
                                        <div className='xl:block hidden  h-fill w-[1px] bg-gray-100'></div>
                                        <div className='flex flex-col gap-4'>
                                            <Otpinput
                                                tag='email'
                                                verifyOtp={this.props.verifyOtp}
                                                otpLength={this.props.widgetData?.otpLength}
                                                requestId={this.props.emailRequestId}
                                                notByEmail={false}
                                            />
                                            {this.props?.hideEmailRetry ? null : (
                                                <RetryOtp
                                                    allowedRetry={this.props.allowedRetry}
                                                    OTPRetryModes={this.props.OTPRetryModes}
                                                    retryOtp={this.props.retryOtp}
                                                    emailRequestId={this.props.emailRequestId}
                                                ></RetryOtp>
                                            )}
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-2 clint-input-container'>
                            <label htmlFor='contact'>Verify Mobile number</label>
                            <div className='flex xl:flex-row flex-col gap-10'>
                                <div className='flex sm:flex-row flex-col w-fit gap-4 '>
                                    <div className='flex flex-col items-start gap-6 w-[300px] '>
                                        <div className='flex gap-2 max-h-10 w-full'>
                                            <MobileInputComponent
                                                onInput={(event) => {
                                                    const value = event?.replace('+', '');
                                                    if (value !== smsIdentifier) {
                                                        smsIdentifier = value;
                                                        this.props.identifierChange(true);
                                                    }
                                                }}
                                                required={true}
                                                disabled={this.props?.smsAccessToken}
                                                defaultValue={smsIdentifier ? '+' + smsIdentifier : ''}
                                                setInvalid={(event) => (mobileInvalid = event)}
                                                placeholder='Mobile Number*'
                                            />

                                            <span className='mt-3'>
                                                {this.props?.smsAccessToken && (
                                                    <MdCheckCircle className='text-green-600' />
                                                )}
                                            </span>
                                        </div>
                                        {this.props?.smsIdentifier &&
                                        this.props?.smsSuccessMessage &&
                                        !this.props?.smsAccessToken ? (
                                            <p className='text-success text-sm'>
                                                {this.props?.smsSuccessMessage} +
                                                {this.props?.smsIdentifier?.replace('+', '')}
                                            </p>
                                        ) : null}
                                    </div>
                                    {this.props?.smsAccessToken ? (
                                        <button
                                            disabled={isLoading}
                                            className='btn btn-accent btn-otp'
                                            onClick={(e) => this.props.identifierChange(true)}
                                        >
                                            Change/Re-verify Mobile Number
                                        </button>
                                    ) : (
                                        <button
                                            className='btn btn-accent btn-otp btn-outline'
                                            onClick={() =>
                                                mobileInvalid
                                                    ? toast.error('Invalid mobile number.')
                                                    : this.props.sendOtp(smsIdentifier, true)
                                            }
                                            disabled={this.props?.isLoading || isLoading}
                                        >
                                            Get OTP
                                        </button>
                                    )}
                                </div>
                                {this.props?.smsIdentifier && !this.props?.smsAccessToken && (
                                    <div className='xl:block hidden h-fill w-[1px] bg-gray-100'></div>
                                )}
                                <div className='flex flex-col gap-2'>
                                    {this.props?.smsIdentifier && !this.props?.smsAccessToken ? (
                                        <>
                                            <div className='flex flex-col gap-4'>
                                                <Otpinput
                                                    tag='sms'
                                                    verifyOtp={this.props.verifyOtp}
                                                    otpLength={this.props.widgetData?.otpLength}
                                                    requestId={this.props.smsRequestId}
                                                    notByEmail={true}
                                                />
                                                {this.props?.hideMobileRetry ? null : (
                                                    <RetryOtp
                                                        allowedRetry={this.props.allowedRetry}
                                                        OTPRetryModes={this.props.OTPRetryModes}
                                                        retryOtp={this.props.retryOtp}
                                                        smsRequestId={this.props.smsRequestId}
                                                    ></RetryOtp>
                                                )}
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className=' w-1/3 max-w-[360px] min-w-[280px] flex flex-col gap-2'>
                            <label htmlFor='contact'>Select source</label>
                            <div className='rounded border px-2 w-full'>
                                <select
                                    className=' h-10 w-full bg-white focus:outline-none'
                                    autoComplete='on'
                                    aria-label='Select Source'
                                    name='source'
                                    onChange={this.handleSourceChange}
                                >
                                    {this.sourceOptions.map((source, index) => {
                                        return (
                                            <option
                                                selected={this.state.optionValue === source?.value}
                                                key={index}
                                                value={source?.value}
                                            >
                                                {source?.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            {this.state.optionValue === 'other' && (
                                <input
                                    disabled={isLoading}
                                    className='input border-gray-300 focus:outline-none w-full focus:border-accent h-10'
                                    type='text'
                                    placeholder='Other'
                                    value={this.state.sourceValue || ''}
                                    onChange={(e) => {
                                        this.setState({ sourceValue: e.target.value });
                                    }}
                                    onBlur={(e) => {
                                        this.handleSourceChange(e);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex  gap-4'>
                        <button className='btn btn-accent btn-outline btn-md' onClick={this.handleBackClick}>
                            {' '}
                            <MdKeyboardArrowLeft />
                            Back
                        </button>
                        <button
                            className=' btn btn-md btn-accent disabled:bg-gray-300 disabled:text-primary'
                            onClick={() => {
                                if (
                                    this.props?.smsAccessToken &&
                                    (this.props?.emailAccessToken || this.props?.githubCode)
                                ) {
                                    this.props.validateUserForCompany();
                                }
                            }}
                            disabled={
                                !this.state.optionValue ||
                                this.state.optionValue === '/' ||
                                !this.props?.smsAccessToken ||
                                (!this.props?.emailAccessToken && !this.props?.githubCode) ||
                                this.props?.isLoading
                            }
                        >
                            Next
                            {((this.props?.smsAccessToken && this.props?.emailAccessToken) || this.props?.githubCode) &&
                            this.props?.isLoading ? (
                                <span className='loading loading-spinner loading-sm'></span>
                            ) : (
                                <MdKeyboardArrowRight className='text-[20px]' />
                            )}
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
export default StepTwo;
