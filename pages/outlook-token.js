import React from "react";
import { getQueryParamsDeatils, getQueryStringFromObject } from "@/components/utils";

class githubToken extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let queryParams = getQueryParamsDeatils(this.props?.browserPathCase);
        if (queryParams) {
            let queryValue = getQueryStringFromObject(queryParams);
            location.href = `${process.env.REDIRECT_URL}/signin?loginWithOutlook=true&${queryValue}`;
        }
    }

    render() {
        return (
            <section>Redirecting...</section>
        );
    }
}
export default githubToken;
