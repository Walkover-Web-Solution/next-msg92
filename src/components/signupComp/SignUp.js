import React from 'react';
import { MdCheck, MdDone } from 'react-icons/md';

import { toast } from 'react-toastify';
import { MdCheckCircle } from 'react-icons/md';
import { getCookie, getQueryParamsDeatils, setCookie } from '@/utils/utilis';
import Image from 'next/image';
import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';
import StepThree from './StepThree/StepThree';

const SUCCESS_REDIRECTION_URL = process.env.API_BASE_URL + '/api/nexusRedirection.php?session=:session';

const OTPRetryModes = {
    Sms: '11',
    Voice: '4',
    Email: '3',
    Whatsapp: '12',
};
const MOBILE_REGEX = /^[+]?[0-9]{7,15}$/;
const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.sendOtp = this.sendOtp.bind(this);
        this.retryOtp = this.retryOtp.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);

        let queryParams = getQueryParamsDeatils(this.props?.browserPathCase);

        this.state = {
            activeStep: queryParams?.['code'] ? 2 : 1,
            signupByGitHub: queryParams?.['githubsignup'] ? true : false,
            githubCode: queryParams?.['code'],
            githubState: queryParams?.['state'],
            widgetData: null,
            allowedRetry: null,
            emailAccessToken: null,
            smsAccessToken: null,
            preselectedService: null,
            isLoading: false,
        };
    }

    componentDidMount = () => {
        this.otpWidgetSetup();
        const queryParams = getQueryParamsDeatils(this.props?.browserPathCase);
        if (queryParams?.service) {
            this.setState({ preselectedService: queryParams.service });
        }
        try {
            const url = process.env.API_BASE_URL + '/api/v5/nexus/checkSession';
            const payload = { session: getCookie('sessionId') };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            };
            fetch(url, requestOptions)
                .then((response) => response?.json())
                .then((result) => {
                    if (result?.status === 'success') {
                        location.href = SUCCESS_REDIRECTION_URL?.replace(':session', payload.session);
                    }
                });
        } catch (error) {
            console.log('No Session Found');
        }
    };

    setStep = (step) => {
        if (step === 1) {
            this.setState({
                emailIdentifier: null,
                emailAccessToken: null,
                smsIdentifier: null,
                smsAccessToken: null,
                signupByGitHub: false,
                githubCode: null,
                githubState: null,
                thirdStepData: null,
                smsIdentifierBackup: null,
                emailIdentifierBackup: null,
                hideMobileRetry: null,
                hideEmailRetry: null,
                isLoading: false,
            });
        } else if (step === 2) {
            if (this.state?.signupByGitHub && !this.state?.githubCode) {
                return this.setStep(1);
            }
        } else if (step === 3) {
            this.setState({
                emailAccessToken: null,
                smsAccessToken: null,
                githubCode: null,
                githubState: null,
                smsSuccessMessage: null,
                emailSuccessMessage: null,
                smsIdentifierBackup: this.state.smsIdentifier || '',
                emailIdentifierBackup: this.state.emailIdentifier || '',
                smsIdentifier: null,
                emailIdentifier: null,
            });
        }
        this.setState({
            activeStep: step,
        });
    };

    otpWidgetSetup = () => {
        const head = document.getElementsByTagName('head')[0];
        const currentTimestamp = new Date().getTime();
        const otpWidgetScript = document.createElement('script');
        otpWidgetScript.type = 'text/javascript';
        otpWidgetScript.src = `${process.env.WIDGET_SCRIPT}?v=${currentTimestamp}`;
        otpWidgetScript.onload = () => {
            const configuration = {
                widgetId: process.env.OTP_WIDGET_TOKEN,
                tokenAuth: process.env.WIDGET_AUTH_TOKEN,
                success: (data) => {},
                failure: (error) => {},
                exposeMethods: true,
            };
            window.initSendOTP(configuration);
            const widgetDataInterval = setInterval(() => {
                let widgetData = window.getWidgetData();
                if (widgetData) {
                    this.setState({
                        widgetData: window.getWidgetData(),
                        allowedRetry: {
                            email: widgetData?.processes?.find(
                                (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Email
                            ),
                            whatsApp: widgetData?.processes?.find(
                                (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Whatsapp
                            ),
                            voice: widgetData?.processes?.find(
                                (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Voice
                            ),
                            sms: widgetData?.processes?.find(
                                (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Sms
                            ),
                        },
                    });
                    clearInterval(widgetDataInterval);
                }
            }, 1000);
        };
        head.appendChild(otpWidgetScript);
    };

    identifierChange = (notByEmail) => {
        if (notByEmail) {
            if (this.state.smsIdentifier || this.state.smsAccessToken) {
                this.setState({ smsIdentifier: null, smsAccessToken: null });
            }
            return;
        } else {
            if (this.state.emailIdentifier || this.state.emailAccessToken) {
                this.setState({ emailIdentifier: null, emailAccessToken: null });
            }
            if (this.state.signupByGitHub) {
                this.setState({ signupByGitHub: false, githubCode: null, githubState: null });
            }
            return;
        }
    };

    sendOtp = (identifier, notByEmail) => {
        if (!new RegExp(EMAIL_REGEX).test(identifier) && !notByEmail) {
            toast.error('Invalid email address.');
            return;
        }
        if (!new RegExp(MOBILE_REGEX).test(identifier) && notByEmail) {
            toast.error('Invalid mobile number.');
            return;
        }
        this.setState({ isLoading: true });
        window.sendOtp(
            identifier,
            (data) => {
                if (notByEmail) {
                    this.setState({
                        smsRequestId: data?.message,
                        smsIdentifier: identifier,
                        smsSuccessMessage: 'OTP has been successfully sent to',
                        hideMobileRetry: null,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        emailRequestId: data?.message,
                        emailIdentifier: identifier,
                        emailSuccessMessage: 'OTP has been successfully sent to',
                        hideEmailRetry: null,
                        isLoading: false,
                    });
                }
            },
            (error) => {
                toast.error(error?.message);
                this.setState({ isLoading: false });
            }
        );
    };

    retryOtp(retryBy, requestId, notByEmail) {
        window.retryOtp(
            retryBy,
            (data) => {
                if (notByEmail) {
                    this.setState({ smsSuccessMessage: 'OTP resent successfully.' });
                } else {
                    this.setState({ emailSuccessMessage: 'OTP resent successfully.' });
                }
            },
            (error) => {
                // retry count excceded
                if (error?.code === 704) {
                    this.setState({ [notByEmail ? 'hideMobileRetry' : 'hideEmailRetry']: true });
                }
                toast.error(error?.message);
            },
            requestId
        );
    }

    verifyOtp = (otp, requestId, notByEmail) => {
        window.verifyOtp(
            `${otp}`,
            (data) => {
                if (!notByEmail) {
                    this.setState({
                        emailAccessToken: data.message,
                        emailSuccessMessage: 'Email verified.',
                    });
                } else {
                    this.setState({
                        smsAccessToken: data.message,
                        smsSuccessMessage: 'Mobile verified.',
                    });
                }
            },
            (error) => {
                toast.error(error?.message);
            },
            requestId
        );
    };

    validateUserForCompany = () => {
        if (!this.state.smsAccessToken || (!this.state.emailAccessToken && !this.state?.githubCode)) {
            toast.error('Email and Mobile should be verified.');
            return;
        }
        let url = process.env.API_BASE_URL + '/api/v5/nexus/validateEmailSignUp';
        const utmObj = Object.fromEntries(
            getCookie('msg91_query')
                ?.replace('?', '')
                ?.split('&')
                ?.map((v) => v.split('=')) ?? []
        );
        const payload = {
            'session': getCookie('sessionId'),
            'mobileToken': this.state.smsAccessToken,
            ...utmObj,
            // "utm_term": "utm_term",
            // "utm_medium": "utm_medium",
            // "utm_source": "utm_source",
            // "utm_campaign": "utm_campaign",
            // "utm_content": "utm_content",
            // "utm_matchtype": "utm_matchtype",
            // "ad": "ad",
            // "adposition": "adposition",
            // "reference": "reference",
            // "source": "msg91"
        };
        if (this.state.githubCode && this.state.signupByGitHub) {
            payload['code'] = this.state.githubCode;
            payload['state'] = this.state.githubState;
            url = process.env.API_BASE_URL + '/api/v5/nexus/validateGithubSignUp';
        } else {
            payload['emailToken'] = this.state.emailAccessToken;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };
        this.setState({ isLoading: true });
        fetch(url, requestOptions)
            .then((response) => response?.json())
            .then((result) => {
                this.setSession(result);
                this.setState({
                    sessionDetails: result?.data?.sessionDetails,
                    isLoading: false,
                    emailAccessToken: null,
                    smsAccessToken: null,
                    githubCode: null,
                    githubState: null,
                    smsSuccessMessage: null,
                    emailSuccessMessage: null,
                    smsIdentifierBackup: this.state.smsIdentifier || '',
                    emailIdentifierBackup: this.state.emailIdentifier || '',
                    smsIdentifier: null,
                    emailIdentifier: null,
                });
                if (result?.status === 'success') {
                    if (result?.data?.data?.nextStep === 'createNewCompany') {
                        this.setStep(3);
                    } else if (result?.data?.data?.nextStep === 'loginIntoExistingAccount') {
                        this.setState({ isLoading: true });
                        location.href = SUCCESS_REDIRECTION_URL?.replace(
                            ':session',
                            result?.data?.sessionDetails?.PHPSESSID
                        );
                    } else if (result?.data?.data?.nextStep === 'hasInvitations') {
                        this.setState({ invitations: result?.data?.data?.invitations });
                        this.setStep(3);
                    }
                } else if (result?.hasError) {
                    toast.error(result?.errors?.[0] ?? result?.errors);
                    if (this.state.signupByGitHub) {
                        setTimeout(() => {
                            this.setStep(1);
                        }, 200);
                    }
                }
            })
            .catch((err) => {
                this.setState({
                    isLoading: false,
                    emailAccessToken: null,
                    smsAccessToken: null,
                    githubCode: null,
                    githubState: null,
                    smsSuccessMessage: null,
                    emailSuccessMessage: null,
                    smsIdentifierBackup: this.state.smsIdentifier || '',
                    emailIdentifierBackup: this.state.emailIdentifier || '',
                    smsIdentifier: null,
                    emailIdentifier: null,
                });
                console.error(err);
            });
    };

    setSession = (result) => {
        const sessionId = result?.data?.sessionDetails?.PHPSESSID;
        if (sessionId) {
            setCookie('sessionId', sessionId, 30);
        }
    };

    finalSubmit = (data, createCompany) => {
        const url = process.env.API_BASE_URL + '/api/v5/nexus/finalRegister';
        this.setState({ thirdStepData: { ...data, acceptInviteForCompanies: [], rejectInviteForCompanies: [] } });
        const payload = {
            'companyDetails': createCompany
                ? {
                      'industry': data?.industryType,
                      'state': data?.stateName,
                      'cityId': data?.cityId || '0',
                      'customCity': data?.otherCity,
                      'country': data?.countryName,
                      'city': data?.city === 'other' ? '' : data?.city,
                      'zipcode': data?.pincode,
                      'address': data?.address,
                      'gstNo': data?.gstNumber,
                      'countryId': data?.country,
                      'stateId': data?.stateProvince,
                      'companyName': data?.companyName,
                      'service': data?.serviceNeeded,
                      'vatNo': data?.vatNumber,
                  }
                : {},
            'userDetails': {
                'firstName': data?.firstName,
                'lastName': data?.lastName,
            },
            'acceptInviteForCompanies': data.acceptInviteForCompanies,
            'rejectInviteForCompanies': data.rejectInviteForCompanies,
            'session': getCookie('sessionId'),
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };
        this.setState({ isLoading: true });
        fetch(url, requestOptions)
            .then((response) => response?.json())
            .then((result) => {
                this.setState({ isLoading: false });
                this.setSession(result);
                if (result?.status === 'success') {
                    this.setStep(4);
                    setTimeout(() => {
                        location.href = SUCCESS_REDIRECTION_URL?.replace(
                            ':session',
                            result?.data?.sessionDetails?.PHPSESSID
                        );
                    }, 10);
                } else if (result?.hasError) {
                    toast.error(result?.errors?.[0] ?? result?.errors);
                }
            })
            .catch((err) => {
                this.setState({ isLoading: false });
                console.error(err);
            });
    };

    render() {
        return (
            <>
                <section className='signup d-flex flex-column flex-md-row-reverse '>
                    <div className='flex md:flex-row flex-col-reverse'>
                        <div className='flex flex-col bg-secondary sm:px-10 px-4 sm:py-20 py-10  gap-8 xl:w-1/4 lg:w-1/3 md:w-1/2 w-full md:min-h-dvh'>
                            <div className='md:flex hidden flex-col  gap-5'>
                                <Image
                                    src={'/assets/brand/msg91.svg'}
                                    width={420}
                                    height={420}
                                    className='w-32'
                                    alt='msg91-logo'
                                />
                                <h1 className='text-2xl font-medium'>{this.props.data.heading}</h1>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <h2 className='text-xl'>{this.props.data.subheading}</h2>
                                <ul className='flex flex-col gap-3'>
                                    {this.props.data?.features.map((feature, index) => {
                                        return (
                                            <li key={index} className='flex items-center gap-2'>
                                                <MdCheck fontSize={20} className='text-accent' /> {feature}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <p className='text-lg'>{this.props.data?.trusted}</p>
                        </div>

                        <div className='lg:px-20 sm:px-10 px-4 sm:py-20 py-10 flex flex-col gap-12 w-full '>
                            {/* <Image
                                src={'/assets/brand/msg91.svg'}
                                width={420}
                                height={420}
                                className='w-32'
                                alt='msg91-logo'
                            /> */}

                            {this.state.activeStep === 4 ? (
                                <h1 className='text-2xl font-semibold text-success'>Account created Successfully!</h1>
                            ) : (
                                <h1 className='text-2xl font-semibold '>Create an account</h1>
                            )}

                            {/* STEP #1 */}
                            {this.state.activeStep === 1 && <StepOne setStep={this.setStep} />}

                            {/* STEP #2 */}
                            {(this.state.activeStep === 2 || this.state.activeStep === 1) && (
                                <div className={this.state.activeStep !== 2 ? 'hidden' : ''}>
                                    <StepTwo
                                        sendOtp={this.sendOtp}
                                        setStep={this.setStep}
                                        verifyOtp={this.verifyOtp}
                                        widgetData={this.state.widgetData}
                                        allowedRetry={this.state.allowedRetry}
                                        retryOtp={this.retryOtp}
                                        validateUserForCompany={this.validateUserForCompany}
                                        identifierChange={this.identifierChange}
                                        OTPRetryModes={OTPRetryModes}
                                        smsRequestId={this.state?.smsRequestId}
                                        emailRequestId={this.state?.emailRequestId}
                                        smsIdentifier={this.state?.smsIdentifier}
                                        emailIdentifier={this.state?.emailIdentifier}
                                        smsSuccessMessage={this.state?.smsSuccessMessage}
                                        emailSuccessMessage={this.state?.emailSuccessMessage}
                                        smsAccessToken={this.state?.smsAccessToken}
                                        emailAccessToken={this.state?.emailAccessToken}
                                        signupByGitHub={this.state?.signupByGitHub}
                                        githubCode={this.state?.githubCode}
                                        smsIdentifierBackup={this.state?.smsIdentifierBackup}
                                        emailIdentifierBackup={this.state?.emailIdentifierBackup}
                                        hideMobileRetry={this.state?.hideMobileRetry}
                                        hideEmailRetry={this.state?.hideEmailRetry}
                                        isLoading={this.state?.isLoading}
                                    />
                                </div>
                            )}

                            {/* STEP #3 */}
                            {this.state.activeStep === 3 && (
                                <StepThree
                                    invitations={this.state.invitations}
                                    preselectedService={this.state.preselectedService}
                                    setStep={this.setStep}
                                    finalSubmit={this.finalSubmit}
                                    formData={this.state?.thirdStepData}
                                    isLoading={this.state?.isLoading}
                                />
                            )}
                            {this.state.activeStep === 4 && (
                                <div className='flex flex-col gap-8 2xl:w-2/3 xl:w-2/3  max-w-[600px]'>
                                    <div className='flex sm:flex-row flex-col sm:items-center gap-4 text-green-600'>
                                        <div className='flex items-center gap-2'>
                                            <MdCheckCircle fontSize={18} className={'text-green-600'} />
                                            <span>Verify email & mobile number</span>
                                        </div>
                                        <span className='sm:w-[60px] w-[1px] sm:ml-0 ml-2 sm:h-[1px] h-6 bg-slate-400'></span>
                                        <div className='flex items-center gap-2 '>
                                            <MdCheckCircle fontSize={18} />
                                            <span>Enter details</span>
                                        </div>
                                    </div>
                                    <p className=''>Redirecting...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </>
        );
    }
}
