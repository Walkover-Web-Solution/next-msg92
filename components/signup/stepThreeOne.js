import { MdCheckCircle } from 'react-icons/md';
const StepThreeOne = () => {
    return (
        <>
            <div className="step-threeone d-grid gap-4">
                <div className="step-three__progress d-flex align-items-center gap-3 ">
                    <div className="ico-green align-items-center gap-1 c-fs-5 d-none d-lg-flex">
                        <MdCheckCircle className="ico-green" /> Verify email & mobile number
                    </div>
                    <span className="progress-line line-green d-none d-lg-block "></span>
                    <div className="d-flex  align-items-center gap-1 c-fs-5 ">
                        <MdCheckCircle className="" />
                        Enter details
                    </div>
                </div>
                <div className="d-flex gap-3 flex-column flex-md-row ">
                    <input
                        type="text"
                        className="form-control w-100"
                        placeholder="First Name"
                        name="firstName"
                        value="First Name"
                    />
                    <input
                        type="text"
                        className="form-control w-100"
                        placeholder="Last Name"
                        name="lastName"
                        value="Last Name"
                    />
                </div>
                <div className="d-grid gap-4">
                    <div className="d-flex flex-wrap gap-3 align-items-center">
                        <p>Piyush invited you in walkover</p>
                        <div className="d-flex gap-3 align-items-center">
                            <button className="btn btn-sm btn-accept rounded">Accept</button>
                            <button className="btn btn-sm btn-reject rounded">Reject</button>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap gap-3 align-items-center">
                        <p>Rahul invited you in MSG91</p>
                        <MdCheckCircle className="ico-green" />
                        <div className="d-flex gap-3 align-items-center d-none">
                            <button className="btn btn-sm btn-accept rounded">Accept</button>
                            <button className="btn btn-sm btn-reject rounded">Reject</button>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="btn btn-login-prime">Create new compony</button>
                </div>
            </div>
        </>
    );
};
export default StepThreeOne;
