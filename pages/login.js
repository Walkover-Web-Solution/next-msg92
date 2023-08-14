const logIn = () => {
  console.log("inside login page");
    return (
      <>
        <section className="entry d-flex  ">
          <div className="entry__left_section col-xl-3 col-lg-5 col-md-5">  
            <img
              src="/images/msgOriginalsvg.png"
              className="entry__left_section__brand_logo"
            />
            <div className="container">
            <img
              src="/img/tie/login-page-left-section-banner.svg"
              className="entry__left_section__banner pe-4 img-fluid"
            />
            </div>
          </div>
          <div className="entry__right_section col-xl-9 col-lg-8 col-md-7 col-sm-12 col-12">
            <div className="container entry__right_section__container">
              <div className="d-none mb-5 entry__right_section__container--logo-visible-in-small">
                <img
                  src="/images/msgOriginalsvg.png"
                  width="auto"
                  height="40px"
                  alt="MSG91"
                  className=""
                />
              </div>
              <h1>Welcome back!</h1>
              <div className="entry__right_section__container__entry_with mb-4">
                <span className="d-inline-block mt-3 p-2 mb-3">Login with</span>
  
                <div className="d-flex align-items-center flex-wrap login-icon-cont" style={{gap: "16px"}}>
                  <button className="entry__right_section__container__entry_with--btn-with-text" style={{border: "1px solid var(--primary-light-theme, #1E75BA)"}}>
                    <img
                      src="/img/tie/google-logo.svg"
                      alt="Google Icon"
                      />
                      <span>Google</span>
                      </button>
                    <button style={{border: "1px solid var(--primary-light-theme, #1E75BA)", background: "var(--light-white-bg, #FFF)"}}>
                    <img 
                      src="/img/microsoft-svg.svg"
                    />
                    </button>
                    <button style={{border: "1px solid #D94C44"}}>
                    <img
                    src="/img/icon-zogo.svg"
                    />
                    </button>
                    <button style={{border:"1px solid #000", background: "var(--light-white-bg, #FFF)"}}>
                    <img 
                    src="/img/icon-github.svg"
                    />
                  </button>
                    <button style={{border: "1px solid #E24329", background: "var(--light-white-bg, #FFF)"}}>
                    <img 
                    src="/img/icon-gitlab.svg"
                    />
                    </button>
                    
                  <button style={{border:"1px solid #2684FF", background: "var(--light-white-bg, #FFF)"}}>
                    <img
                    src="/img/icon-group.svg"
                    />
                  </button>
                </div>
              </div>
  
              <span className="d-block line_on_right c-fs-6 mb-4">or</span>
  
              <button className="c-col-white entry__right_section__container__entry_button mb-4">
                Login with OTP
              </button>
  
              <p className="c-fs-6 mb-4">
                Trouble logging in ? <a href="#" className="text_blue">Click here</a>
              </p>
              <a href="#" className="c-fs-6 text_blue">Create new account</a>
            </div>
          </div>
        </section>
      </>
    );
  };
  export default logIn;