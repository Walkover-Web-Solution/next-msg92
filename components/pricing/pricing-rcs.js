
const pricingrcs = () => {
  return <>
    <div className="price-card rcs bg-white p-4">
    <h3 className="text-start fw-bold fs-4 text-green">Free</h3>
      <h3 className="card-write c-fs-4 mt-3">OTP widget/SDK usage is free. </h3>
      <h3 className="card-write c-fs-4 mb-3">Channel wise pricing will be applicable for sending message.</h3>
      <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="c-fs-4 btn btn-dark rounded-1 py-2 px-3 mt-2">
        Get Started
      </button>
      {/* <a href="/contact-us" className="btn btn-outline-dark col-6 col-sm-5 col-md-3 mx-auto mt-3">Talk to an Expert</a> */}
    </div>
    <a className="link" href="#"> 
            <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
            <span>Know more about RCS</span>
          </a>
  </>;
};

export default pricingrcs;
