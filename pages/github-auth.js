import React from "react";
import { getQueryParamsDeatils, getQueryStringFromObject } from "@/components/utils";

class githubLogin extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let queryParams = getQueryParamsDeatils(this.props?.browserPathCase);
        if (queryParams) {
            if (queryParams?.login === "true") {
                this.loginWithGitHubAccount(true);
            }
            if (queryParams?.signup === "true") {
                this.loginWithGitHubAccount(false);
            }
            if (queryParams?.githublogin === "true") {
                let queryValue = getQueryStringFromObject(queryParams);
                location.href = `${process.env.REDIRECT_URL}/login?${queryValue}`;
            }
            if (queryParams?.githubsignup === "true") {
                let queryValue = getQueryStringFromObject(queryParams);
                location.href = `${process.env.REDIRECT_URL}/signup?${queryValue}`;
            }
        }
    }

    loginWithGitHubAccount(loginProcess) {
        let state = Math.floor(100000000 + Math.random() * 900000000);
        let otherParams = loginProcess ? `githublogin=true` : `githubsignup=true`;
        location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&allow_signup=true&scope=user&redirect_uri=${process.env.REDIRECT_URL}/github-auth-token?${otherParams}&state=${state}`;
    }

    render() {
        return (
            <>
                <section>
                    {/* <button
                        style={{
                            border: "1px solid #000",
                            background: "var(--light-white-bg, #FFF)",
                        }}
                        onClick={() => this.loginWithGitHubAccount()}
                    >
                        <img src="/img/icon-github.svg" />
                    </button> */}
                </section>
            </>
        );
    }
}
export default githubLogin;
