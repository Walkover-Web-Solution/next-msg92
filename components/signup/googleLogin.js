import React from "react";
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = (props) => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => props.googleLoginResponse(tokenResponse),
    flow: 'auth-code',
    redirect_uri: process.env.REDIRECT_URL,
    access_type: "offline"
  });

  return (
    <button
      className="btn rounded google-login"
      onClick={() => login()}
    >
      <img src="/img/tie/google-logo.svg" alt="Google Icon" />
      <span>Google</span>
    </button>
  );
};

export default GoogleLoginButton;