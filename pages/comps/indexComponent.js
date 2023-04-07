import { useRouter } from "next/router";
import TrustedBy from "@/components/trustedby"
const indexComp = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <>
      <div className="container d-flex flex-column gap-4 align-items-center text-center mt-60">
        <h1 className="heading text-dark col-10 col-xxl-8 col-xl-8 ">Cloud Communication platform for all your ideas!</h1>
        <h3 className="small-heading text-dark">Secure and robust APIs for SMS, Email, Voice, Authentication and more.</h3>
        <a className=""><button className="btn btn-dark small-heading c-fw-sb ls-3 btn-lg">Get Started</button></a>
        <TrustedBy/>
      </div>
    </>
  );
};
export default indexComp;
