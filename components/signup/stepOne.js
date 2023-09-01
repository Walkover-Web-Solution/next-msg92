import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

class StepOne extends React.Component {
  render() {
    return (
      <>
        <div className="d-none entry__right_section__container--logo-visible-in-small">
          <img
            src="/images/msgOriginalsvg.png"
            width="auto"
            height="40px"
            alt="MSG91 Logo"
            className=""
          />
        </div>
        <h1>Create an account</h1>
        <div className="entry__right_section__container__entry_with d-flex mb-4 me-4">
          <div className="signup_with__right mt-2">
            <span className="d-inline-block mb-4">Are you a developer?</span>

            <div className="d-flex align-items-center">
              <a href="/github-auth?signup=true">
                <button
                  className="me-3"
                  style={{ border: "1px solid #000" }}
                  onClick={() => this.props.signupByGitHubAccount()}
                >
                  <img
                    src="/img/icon-github.svg"
                    width="24px"
                    height="24px"
                    alt="Github Icon"
                  />
                </button>
              </a>
            </div>
          </div>
        </div>

        <span className="d-block line_on_right c-fs-6 mb-4">or</span>

        <button
          className="entry__right_section__container__entry_button mb-4"
          onClick={() => this.props.setStep(2)}
        >
          Sign up with Email
          <MdKeyboardArrowRight />
        </button>

        <p className="c-fs-6 mb-4">
          If you already have an account,{" "}
          <a href="/login" className="text_blue">
            Login
          </a>
        </p>
      </>
    );
  }
}
export default StepOne;
