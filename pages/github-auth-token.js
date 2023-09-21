import React from "react";
import { getQueryParamsDeatils, getQueryStringFromObject } from "@/components/utils";

class githubToken extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let queryParams = getQueryParamsDeatils(this.props?.browserPathCase);
        if (queryParams) {
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

    render() {
        return (
            <section>Redirecting...</section>
        );
    }
}
export default githubToken;
