import React from "react";
class Otpinput extends React.Component {
  render() {
    var valOtp = "";
    return (
      <>
        <div className="d-flex">
          {[1, 2, 3, 4, 5, 6].map((x) => (
            <input
              type="text"
              className="form-control otp_input"
              placeholder="*"
              maxLength="1"
              id={this.props.tag + x}
              onChange={(e) => {
                // document.getElementById(x).target.value=e.target.value;
                valOtp += e.target.value;
                if (e.target.value !== undefined && e.target.value !== "") {
                  if (x <= 5) {
                    document.getElementById(this.props.tag + (x + 1)).focus();
                  } else {
                    document.getElementById(this.props.tag + 6).focus();
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
