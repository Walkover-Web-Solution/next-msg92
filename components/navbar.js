import Image from "next/image";
const navbar = () => {
  return (
    <>
      <nav className="w-100 ">
        <div className="container d-flex justify-content-between">
          <div className="msg91-logo-cont w-nav-menu  d-flex">
            <a href="">
              <img
                className="msg91-logo"
                src="/img/logo.svg"
                alt="MSG91"
                
              />
            </a>
          </div>
          <div className=" d-flex ">
            <a className="" href="/">
              Hello
            </a>
            <a className="" href="/">
              Hello
            </a>
            <a className="" href="/">
              Hello
            </a>
            <a className="" href="/">
              Hello
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
export default navbar;
