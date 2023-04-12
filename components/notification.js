import {MdLanguage, MdCall} from "react-icons/md"
const Notification = () =>{
    return (
        <>
        <div className="section b-bottom-1">
        <div className="container d-flex align-items-center justify-content-between ">
            <div className="my-2 d-flex align-items-center">
                <button className="btn btn-success py-1 btn-sm c-fs-5 me-3">Update</button>
                <p className="c-fs-5 c-fw-m">Elevate Your Experience. The New and Improved Version Awaits ;)</p>
            </div>
            <div className="d-flex gap-5 align-items-center justify-content-end">
                <a href="#" className="text-dark"><span className="c-fs-4 d-flex align-items-center"><MdLanguage className="me-1"/>Global</span></a>
                <a href="#" className="text-dark"><span className="c-fs-4 d-flex align-items-center"><MdCall className="me-1"/>Support</span></a>
                <a href="#" className="text-dark"><span className="c-fs-4 d-flex align-items-center">Log In</span></a>
            </div>
            
        </div>
        </div>
        </>

    );
};
export default Notification;