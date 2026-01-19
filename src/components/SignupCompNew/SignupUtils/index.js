import React, { createContext, useContext, useReducer } from 'react';
import { initialState } from './constants';
import { reducer } from './reducer';

// Re-export everything from modular files
export { otpWidgetSetup, cleanupOtpWidget } from './widgetUtils';
export { sendOtp, verifyOtp, resetEmailOtp, resetPhoneOtp } from './otpUtils';
export {
    validateSignUp,
    validateEmailSignup,
    finalRegistration,
    fetchCountries,
    fetchStatesByCountry,
    fetchCitiesByState,
    getCountryIdFromName,
} from './apiUtils';
export { setInitialStates, handleGithubSignup, setDetails, handleUtmParams } from './helperUtils';

// Export default checkSession
export { default } from './apiUtils';

// Context and Provider
const SignupCtx = createContext();

export function SignupProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <SignupCtx.Provider value={{ state, dispatch }}>{children}</SignupCtx.Provider>;
}

export function useSignup() {
    return useContext(SignupCtx);
}
