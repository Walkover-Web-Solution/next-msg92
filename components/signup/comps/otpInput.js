import React from "react";
class Otpinput extends React.Component {
  render() {
    let otpLength = Array.from({ length: this.props.otpLength }, (_, index) => index + 1)
    var valOtp = "";
    return (
      <>
        <div className="d-flex">
          {otpLength.map((x) => (
            <input
              type="text"
              className="form-control otp_input"
              placeholder="*"
              maxLength="1"
              key={x}
              id={this.props.tag + x}
              onChange={(e) => {
                // document.getElementById(x).target.value=e.target.value;
                valOtp += e.target.value;
                if (e.target.value !== undefined && e.target.value !== "") {
                  if (x <= this.props.otpLength - 1) {
                    document.getElementById(this.props.tag + (x + 1)).focus();
                  } else {
                    document.getElementById(this.props.tag + this.props.otpLength).focus();
                  }
                } else {
                  document.getElementById(this.props.tag + x).focus();
                }
              }}
            />
          ))}
          <button
            className="custom-signup-btn"
            onClick={() => {
              this.props.verifyOtp(valOtp, false), console.log(valOtp);
            }}
          >
            Verify
          </button>
        </div>
      </>
    );
  }
}
export default Otpinput;
