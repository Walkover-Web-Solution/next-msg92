import { useMsal } from '@azure/msal-react';
import React, { useState } from 'react';
import { loginRequest } from "@/components/msalAuthConfig";

function MsalLogin() {
    const { instance } = useMsal();

    function msalLogin() {
        // https://codesandbox.io/s/ms-identity-javascript-react-spa-il6zk
        instance.loginPopup(loginRequest).catch(e => {
            console.log(e);
        });
    }

    return (
        <>
            <button
                style={{
                    border: "1px solid var(--primary-light-theme, #1E75BA)",
                    background: "var(--light-white-bg, #FFF)",
                }}
                onClick={() => msalLogin()}
            >
                <img src="/img/microsoft-svg.svg" />
            </button>
        </>
    );
}

export default MsalLogin;
