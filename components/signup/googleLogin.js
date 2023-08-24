import React from "react";
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = (props) => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => props.googleLoginResponse(tokenResponse),
    flow: 'auth-code',
  });

  return (
    <button
      className="entry__right_section__container__entry_with--btn-with-text"
      style={{
        border: "1px solid var(--primary-light-theme, #1E75BA)",
      }}
      onClick={() => login()}
    >
      <img src="/img/tie/google-logo.svg" alt="Google Icon" />
      <span>Google</span>
    </button>
  );
};

export default GoogleLoginButton;