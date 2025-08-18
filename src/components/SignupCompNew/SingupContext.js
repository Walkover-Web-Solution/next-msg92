import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    emailToken: null,
    mobileToken: null,
    personal: { fullName: '', dob: '', password: '' },
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_EMAIL_TOKEN':
            return { ...state, emailToken: action.payload };
        case 'SET_MOBILE_TOKEN':
            return { ...state, mobileToken: action.payload };
        case 'SET_PERSONAL':
            return { ...state, personal: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

const SignupCtx = createContext();

export function SignupProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <SignupCtx.Provider value={{ state, dispatch }}>{children}</SignupCtx.Provider>;
}

export function useSignup() {
    return useContext(SignupCtx);
}
