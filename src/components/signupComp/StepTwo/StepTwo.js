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
            emailIdentifier: props.emailIdentifierBackup || '',
            smsIdentifier: props.smsIdentifierBackup || '',
            sourceValue: '',
        };
        smsIdentifier = this.state.smsIdentifier;
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search);
        const query = queryParams.toString();
        const sourceValue = queryParams.get('source');
        this.setState({ sourceValue });
    }

    handleSourceChange = (event) => {
        const value = event.target.value;
        const utmData = getCookie('msg91_query');
        if (utmData.includes('&source')) {
            setCookie('msg91_query', utmData.replace(/&source=([\w_-])+/, '&source=' + sourceValue), 30);
        } else {
            setCookie('msg91_query', utmData + '&source=' + sourceValue, 30);
        }
    };

    render() {
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
                                <div className='flex sm:flex-row flex-col items-start w-1/3 max-w-[360px] min-w-[280px] gap-4'>
                                    <div className='flex flex-col items-start gap-6 w-full '>
                                        <div className='flex gap-2 items-center w-full '>
                                            {this.props?.signupByGitHub ? (
                                                <div>
                                                    Email Verified <MdCheckCircle className='ico-green' />
                                                </div>
                                            ) : (
                                                <input
                                                    className='input border-gray-300 focus:outline-none w-full focus:border-accent h-10'
                                                    type='email'
                                                    id='emailIdentifier'
                                                    placeholder='Email Address*'
                                                    defaultValue={this.state.emailIdentifier}
                                                    onInput={(e) => this.props.identifierChange(false)}
                                                    disabled={this.props?.emailAccessToken}
                                                />
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
                                            disabled={this.props?.isLoading}
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
                        <div className='w-full flex flex-col gap-2 '>
                            <label htmlFor='contact'>Verify Mobile number</label>
                            <div className='flex xl:flex-row flex-col gap-10'>
                                <div className='flex flex-col items-start w-1/3 max-w-[360px] min-w-[280px] gap-4'>
                                    <div className='flex sm:flex-row flex-col  gap-6 w-full'>
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
                                            ></MobileInputComponent>

                                            <span className='mt-3'>
                                                {this.props?.smsAccessToken && (
                                                    <MdCheckCircle className='text-green-600' />
                                                )}
                                            </span>
                                        </div>
                                        {this.props?.smsAccessToken ? (
                                            <button
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
                                                disabled={this.props?.isLoading}
                                            >
                                                Get OTP
                                            </button>
                                        )}
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
                                    className=' h-10 w-full'
                                    autoComplete='on'
                                    aria-label='Select Source'
                                    name='source'
                                    onChange={this.handleSourceChange}
                                >
                                    <option value=''>Select Source</option>
                                    <option value='search_engine'>Search engine (Google, Bing, Yahoo, etc)</option>
                                    <option value='recommended_by_friend'>Recommended by friend or colleague</option>
                                    <option value='social_media'>Social Media</option>
                                    <option value='blog'>Blog or Publication</option>
                                    <option value='advertisement'>Advertisement</option>
                                    <option value='event'>Event</option>
                                    <option value='tiedelhincr'>TiEDelhiNCR</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex  gap-4'>
                        <button className='btn btn-accent btn-outline btn-md' onClick={() => this.props.setStep(1)}>
                            {' '}
                            <MdKeyboardArrowLeft />
                            Back
                        </button>
                        <button
                            className=' btn btn-md btn-accent disabled:bg-gray-300 disabled:text-primary'
                            onClick={() =>
                                this.props?.smsAccessToken &&
                                (this.props?.emailAccessToken || this.props?.githubCode) &&
                                this.props.validateUserForCompany()
                            }
                            disabled={
                                !this.props?.smsAccessToken ||
                                (!this.props?.emailAccessToken && !this.props?.githubCode) ||
                                this.props?.isLoading
                            }
                        >
                            {' '}
                            Next <MdKeyboardArrowRight />
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
export default StepTwo;
