import Link from "next/link";
import style from "./404Comp.module.scss";

export default function NopageComp() {
    return (
        <>
            <div className="nopage_cont w-100 d-flex flex-column align-items-center justify-content-center py-5 container">
                <span className={`${style.nopage_heading}`}>404</span>
                <h1 className="c-fs-1 c-fw-b text-center">
                    The page you're trying to reach isn't available or doesn't exist.
                </h1>
                <div className="d-flex flex-wrap mt-5 gap-3 align-items-center justify-content-center">
                    <Link className="btn btn-dark btn-lg " href={"/"}>
                        Go To Home
                    </Link>
                    <Link className="btn btn-outline-dark btn-lg" href={"/contact-us"}>
                        Contact Support
                    </Link>
                </div>
            </div>
        </>
    );
}
