import React from "react";
class Otpinput extends React.Component {
  render() {
    var val = "";
    return (
      <>
        <div className="d-flex">
          {[1, 2, 3, 4].map((x) => (
            <input
              type="text"
              className="form-control otp_input"
              placeholder="*"
              maxLength="1"
              id={this.props.tag+x}
              onChange={(e) => {
                // document.getElementById(x).target.value=e.target.value;
                val += e.target.value;
                if (x <= 3) {
                  document.getElementById(this.props.tag+ (x+1)).focus();
                } else {
                  document.getElementById(this.props.tag+4).focus();
                }
              }}
            />
          ))}
          <button
            className="custom-signup-btn"
            onClick={() => {
              this.props.verifyOtp("0000", false), console.log(val);
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
