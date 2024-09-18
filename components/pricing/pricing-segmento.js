
const pricingsegmento = () => {

  return <>
    
      <div className="price-card rcs bg-white rounded-2 p-4">
      <h2 className="text-start fw-bold c-fs-1 text-green">Free</h2>
      <h3 className="card-write c-fs-3 my-3 c-fw-m">You can store user information for free using Segmento.</h3>
      <a
        href="/signup?service=segmento"
        target="_blank"
        className={`btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3`}
      >
          Get Started
      </a>
      </div>
      <a className="more-about" href="/segmento"> 
        <img src="/img/icon/link.svg" alt="Know more" className="icon me-2" />
        <span>Know more about Segmento</span>
      </a>
    </>
};

export default pricingsegmento;
