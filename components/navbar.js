import Image from "next/image";
const navbar = () => {
  return (
    <>
      <nav className="navbar sticky">
        <div className="msg91-logo-cont  d-flex">
          <a href="">
            <Image className="msg91-logo" src="/img/logo.svg" alt="MSG91" layout="fill" />
          </a>
        </div>
        <div className="c-s-">

        </div>
      
      </nav>
    </>
  );
};
export default navbar;
