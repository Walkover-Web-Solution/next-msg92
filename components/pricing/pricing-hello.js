import { MdDoneOutline, MdClose } from "react-icons/md";
const pricinghello = () => {
  return <>
  <div className=" d-flex col-10 col-lg-11 flex-md-row flex-column mx-auto border">
    <div className=" col-12 col-md-8 col-xl-9  text-start p-4">
      <h3>Customer support Platform</h3>
      <div className="d-flex"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">Integrate multiple channels on a single platform - Email, RCS, social media, call & more</p></div>
      <div className="d-flex mt-2"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">Track, monitor, analyze agent performance</p></div>
      <div className="d-flex mt-2"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">18*7 free customer support</p></div>
    </div>
    <div className="c-bg-grey col-12 col-md-4 col-xl-3  p-4 text-start">
      <h3 className="c-fs-3">Access platform for FREE</h3>
      <p className="c-fs-4 mt-2">Pay only for the channels you use</p>
      <a href="https://control.msg91.com/signup/" target="_blank" className="btn btn-primary mt-3 px-5">Get Started</a>
    </div>
    </div>
    </>;
};

export default pricinghello;
