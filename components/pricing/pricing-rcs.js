import { InlineWidget } from "react-calendly";


const pricingrcs = () => {
  return <>
    <div className="price-card rcs bg-white p-4 rounded-2">
      <h2 className="card-write c-fs-3 mb-3">Connect To Our Team For The Customized Pricing</h2>
      <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="fw-semibold  btn btn-dark rounded-1 py-2 px-3 mt-2">
        Get Started
      </button>
    </div>
    <div
                className="modal fade"
                id="sales-modal"
                tabIndex={-1}
                aria-labelledby="Schedule a meeting"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>

                        <div className="modal-body">
                            <InlineWidget
                                url="https://calendly.com/sales-msg91/pre-sales"
                                styles={{ height: '660px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
  </>;
};

export default pricingrcs;