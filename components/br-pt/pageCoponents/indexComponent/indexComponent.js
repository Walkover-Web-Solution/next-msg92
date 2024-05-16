import TrustedBy from "@/components/trustedby";
import { MdKeyboardArrowRight } from "react-icons/md";
import style from "./indexComponent.module.scss";
import Link from "next/link";

export default function IndexComponent({ pageData }) {
    return (
        <>
            <div className="container bg-gray-100 section-y">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-7 col-lg-7 d-flex flex-column gap-4 align-items-start hero-left">
                        {pageData?.tagline && (
                            <div className="home-pre-heading c-fs-4 uc">{`${pageData?.tagline}`}</div>
                        )}
                        {pageData?.heading && <h1 className="heading text-dark c-fw-xb">{`${pageData?.heading}`}</h1>}
                        {pageData?.subheading && (
                            <h2 className="small-heading text-dark">{`${pageData?.subheading}`}</h2>
                        )}
                        {pageData?.btn && (
                            <a
                                href="/signup"
                                target="_blank"
                                className="btn btn-dark px-3 py-1 mt-3 px-md-4 py-md-2 ls-3 utm rounded-1"
                            >
                                {`${pageData?.btn}`}
                            </a>
                        )}
                        <TrustedBy />
                    </div>
                    {pageData?.img && (
                        <div className="col-12 col-md-5 col-lg-5 col-sm-12 order-sm-0 hero-right">
                            <img src={pageData?.img} className="hero-img" alt="girl using all the channels" />
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-light section-y">
                <div className={`${style.grid} container`}>
                    {pageData?.products?.content.length > 0 &&
                        pageData?.products?.content.map((product, index) => {
                            return (
                                <>
                                    <Link href={`/${product?.slug}`} key={index}>
                                        <div
                                            className={` product-card ${product?.slug}-card flex-row text-dark h-100 `}
                                        >
                                            <div className="row">
                                                <div className="d-flex flex-column gap-3 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 align-items-start">
                                                    {product?.slug && (
                                                        <img
                                                            src={`./assets/img/icons/products/${product?.slug}.svg`}
                                                            className="pro-sec-ico"
                                                            alt={`${product?.slug} icon`}
                                                        />
                                                    )}

                                                    <div className="pre-heading c-fs-5">{product?.tagline}</div>
                                                    <div className="pro-heading small-heading">{product?.name}</div>
                                                    <div className="product-content c-fs-4">{product?.description}</div>
                                                    <div className="justify-content-between d-flex align-items-center">
                                                        <div className="pro-btn-text">
                                                            {pageData?.products?.learnmore}
                                                        </div>
                                                        <MdKeyboardArrowRight />
                                                    </div>
                                                </div>
                                                <div className="product-img d-flex justify-content-end col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 align-items-start">
                                                    <img
                                                        src={`./assets/img/pages/index/products/product-${product?.slug}.svg`}
                                                        alt={`${product?.name}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            );
                        })}
                </div>
            </div>
            
        </>
    );
}
