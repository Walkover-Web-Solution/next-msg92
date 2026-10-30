import Image from 'next/image';
import { useSignup, setDetails, validateSignUp } from '../SignupUtils';
import { fetchCountries } from '../SignupUtils/apiUtils';
import { useEffect, useState } from 'react';
import FormInput from '../components/FormInput';
import CountrySearchSelect from '../components/CountrySearchSelect';
import { useCountrySelector } from '../hooks/useCountrySelector';

export default function StepTwo() {
    const { state, dispatch } = useSignup();

    const [name, setName] = useState(
        state.userDetails?.firstName ? `${state.userDetails.firstName} ${state.userDetails.lastName || ''}`.trim() : ''
    );
    const [companyName, setCompanyName] = useState(state.companyDetails?.companyName || '');
    const [continueAllowed, setContinueAllowed] = useState(false);

    const {
        countries,
        selectedCountry: localSelectedCountry,
        setSelectedCountry: setLocalSelectedCountry,
    } = useCountrySelector();

    const selectedCountry = state.selectedCountry || localSelectedCountry;

    useEffect(() => {
        if (!state.countries) {
            fetchCountries(dispatch);
        }
    }, []);

    useEffect(() => {
        if (state.selectedCountry && state.selectedCountry.id !== localSelectedCountry?.id) {
            setLocalSelectedCountry(state.selectedCountry);
        }
    }, [state.selectedCountry]);

    useEffect(() => {
        if (state.mobileOtpVerified && name && companyName) {
            setContinueAllowed(true);
        } else {
            setContinueAllowed(false);
        }
    }, [state.mobileOtpVerified, name, companyName]);

    const handleCountrySelect = (country) => {
        dispatch({ type: 'SET_SELECTED_COUNTRY', payload: country || null });
        setLocalSelectedCountry(country || null);
    };

    const handleDetailsBlur = (type) => {
        if (type === 'name') {
            setDetails('userDetails', dispatch, name);
        } else if (type === 'companyName') {
            setDetails('companyName', dispatch, companyName);
        }
    };

    const handleContinue = () => {
        if (!continueAllowed) return;

        if (state.signupByGitHub && !state.githubCode) {
            dispatch({ type: 'RESET_GITHUB_SIGNUP' });
            dispatch({ type: 'SET_ACTIVE_STEP', payload: 1 });
            return;
        }

        if (!state.mobileOtpVerified || !state.mobileToken) {
            dispatch({ type: 'SET_ERROR', payload: 'Email and Mobile should be verified.' });
            dispatch({ type: 'SET_ACTIVE_STEP', payload: 1 });
            return;
        }

        setDetails('companyName', dispatch, companyName);
        setDetails('userDetails', dispatch, name);

        if (state.session) {
            dispatch({ type: 'SET_ACTIVE_STEP', payload: 3 });
        } else {
            validateSignUp(dispatch, state);
        }
    };

    const clearGithubUrlParams = () => {
        if (typeof window === 'undefined') return;
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('githubsignup');
        currentUrl.searchParams.delete('code');
        currentUrl.searchParams.delete('state');
        window.history.replaceState(null, '', currentUrl.toString());
    };

    const handleBack = () => {
        if (state.signupByGitHub) {
            dispatch({ type: 'RESET_GITHUB_SIGNUP' });
            clearGithubUrlParams();
        }
        dispatch({ type: 'SET_ACTIVE_STEP', payload: 1 });
    };

    return (
        <div className='cont cont_gap'>
            <Image width={160} height={80} className='w-fit h-12' src={'/assets/brand/msg91.svg'} alt='MSG91 Logo' />
            <div className='cont gap-2'>
                <h1 className='text-2xl text-primary'>Personal Details</h1>
                <p className='text-sm text-gray-500'>Tell us a bit about yourself to finish setting up</p>
                {state.signupByGitHub && <p className='text-sm text-success'>Email verified via GitHub</p>}
            </div>
            <div className='cont gap-3'>
                <FormInput
                    label='Full Name'
                    name='Name'
                    type='text'
                    required
                    placeholder='John Doe'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleDetailsBlur('name')}
                />

                <FormInput
                    label='Company Name'
                    name='companyName'
                    type='text'
                    required
                    placeholder='Walkover'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onBlur={() => handleDetailsBlur('companyName')}
                />

                <div className='cont gap-1'>
                    <p className='text-gray-500'>Country</p>
                    <CountrySearchSelect
                        countries={countries}
                        value={selectedCountry}
                        onChange={handleCountrySelect}
                        placeholder='Search country...'
                    />
                </div>
            </div>
            <div className='flex gap-4'>
                <button className='btn btn-primary btn-outline btn-md' onClick={handleBack}>
                    Back
                </button>
                <button onClick={handleContinue} className='btn btn-accent btn-md' disabled={!continueAllowed}>
                    Continue
                </button>
            </div>
        </div>
    );
}
