export const MOBILE_REGEX = /^[+]?[0-9]{7,15}$/;
export const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.  ,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const OTPRetryModes = {
    Sms: '11',
    Voice: '4',
    Email: '3',
    Whatsapp: '6',
};

export const WIDGET_POLLING_CONFIG = {
    MAX_ATTEMPTS: 10,
    INTERVAL_MS: 1000,
};

export const initialState = {
    //Temporary Data
    activeStep: 2,
    widgetData: null,
    allowedRetry: null,
    isLoading: false,
    source: null,
    session: null,
    error: null,
    otpSent: false,
    emailIdentifier: null,
    emailRequestId: null,
    emailToken: null,

    githubCode: null,
    githubState: null,

    mobileIdentifier: null,
    mobileRequestId: null,
    mobileToken: null,
    mobileOtpVerified: false,

    //Final Register Data
    userDetails: { firstName: '', lastName: '' },
    companyDetails: {
        industry: null,
        state: null,
        zipcode: null,
        city: null,
        address: null,
        gstNo: null,
        cityId: null,
        countryId: null,
        stateId: null,
        customCity: '',
        companyName: null,
        country: null,
        service: [],
    },
    invites: [],
    acceptInviteForCompanies: [],
    rejectInviteForCompanies: [],
    utm_term: null,
    utm_medium: null,
    utm_source: null,
    utm_campaign: null,
    utm_content: null,
    utm_matchtype: null,
    ad: null,
    adposition: null,
    reference: null,
    countries: null,
};
