import TrustedBy from "@/components/trustedby";
import { MdKeyboardArrowRight } from "react-icons/md";
import style from "./indexComponent.module.scss";
import Link from "next/link";
import Image from "next/image";
import FaqSection from "@/components/faqSection/faqSection";

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
            {pageData?.products && (
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
                                                        <div className="product-content c-fs-4">
                                                            {product?.description}
                                                        </div>
                                                        <div className="justify-content-between d-flex align-items-center">
                                                            <div className="pro-btn-text c-fs-5">
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
            )}
            {pageData?.channels && (
                <div className="container my-5 my-80">
                    <h2 className="sub-heading c-head mb-2 fw-bold">{`${pageData?.channels?.heading}`}</h2>
                    <p className="c-fs-2 col-12 col-md-11 col-lg-9">{`${pageData?.channels?.subheading}`}</p>
                    <div className="row mt-4 row-gap-26">
                        {pageData?.channels?.content?.length > 0 &&
                            pageData?.channels.content.map((channel, index) => {
                                return (
                                    <>
                                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4" key={index}>
                                            <a
                                                href={channel?.slug}
                                                className="product-card chn-btn w-100 h-100 d-flex align-items-center justify-content-between p-4 text-dark c-fs-2 bg-light"
                                            >
                                                <div className="d-flex flex-column gap-3">
                                                    <Image
                                                        className="me-2"
                                                        src={`./assets/img/icons/products/${channel?.slug}.svg`}
                                                        width={40}
                                                        height={40}
                                                        alt="cannels"
                                                    />
                                                    <span className="c-fw-b">{channel?.name}</span>
                                                    <div className="description c-fs-3">{channel?.description}</div>
                                                    <div className="justify-content-between d-flex align-items-center">
                                                        <div className="pro-btn-text c-fs-5">
                                                            {pageData?.products?.learnmore}
                                                        </div>
                                                        <MdKeyboardArrowRight />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </div>
            )}
            {pageData?.stats.length > 0 && (
                <div className="section bg-light stats-sec align-items-center my-80">
                    <div className="container h-100 d-flex flex-wrap text-lg-center text-start  align-items-center">
                        {pageData?.stats.map((stats) => {
                            return (
                                <>
                                    <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column  gap-2 py-3 py-sm-5">
                                        <h2 className="c-fs-1 c-fw-b">{stats?.stats}</h2>
                                        <h3 className="c-fs-3 d-flex flex-column gap-2">
                                            <span>{stats?.name}</span>
                                            <span>{stats?.each}</span>
                                        </h3>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            )}
            {pageData?.services?.content?.length > 0 && (
                <div className="container my-5 more-services-sec my-80">
                    <h2 className="sub-heading c-head fw-bold">{pageData?.services?.heading}</h2>
                    <div className="d-flex my-5 flex-lg-row flex-column gap-4">
                        {pageData?.services?.content.map((service, index) => {
                            return (
                                <a
                                    key={index}
                                    href={service?.link ? service.link : `/${service.slug}`}
                                    className=" text-dark col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 p-4 d-flex flex-column flex-sm-row flex-md-row flex-lg-column gap-3 rounded-2 more-services"
                                >
                                    <div className="d-flex flex-column gap-3">
                                        <div className="d-flex align-items-center">
                                            <span className="me-3">
                                                <Image
                                                    src={`./assets/img/icons/products/${service?.slug}.svg`}
                                                    width={36}
                                                    height={36}
                                                    alt="short-url"
                                                />
                                            </span>
                                            <span className="heading c-head fw-bold">{`${service?.name}`}</span>
                                        </div>
                                        <div className="">
                                            <Image
                                                className="more-services-img col-12"
                                                src="./img/short-url-img.svg"
                                                width={336}
                                                height={212}
                                                alt="short-url-img"
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column gap-3 justify-content-between  h-100">
                                        <div className="">
                                            <h2 className="mb-3 c-fs-3 fw-medium">{`${service?.heading}`}</h2>
                                            <p className="c-fs-4">{`${service?.description}`}</p>
                                        </div>

                                        <div className="justify-content-between d-flex align-items-center">
                                            <div className="pro-btn-text c-fs-5">{pageData?.services?.learnmore}</div>
                                            <MdKeyboardArrowRight />
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}

            {pageData?.customerstories?.content.length > 0 && (
                <div className="bg-light py-5">
                    <div className="container  ">
                        <h2 className="sub-heading c-head fw-bold mb-4">{pageData?.customerstories?.heading}</h2>

                        <div className="img-wapper d-flex flex-lg-row flex-column gap-4 m-0 p-0">
                            <a
                                href={pageData?.customerstories?.content[0]?.link}
                                className="col-12 col-lg-6 col-md-12 c-hover c-hover d-flex flex-lg-column flex-md-row flex-column bg-white text-dark rounded-2 p-0 overflow-hidden"
                            >
                                <div className="milkbasket-client-img d-flex justify-content-center align-items-center col-12 col-lg-12 col-md-4">
                                    <img src="/img/milkbasket-logo.png" className="h-25 " alt="milkbasket-client-img" />
                                </div>
                                <div className="c-fs-3 p-3 col-12 col-lg-12 col-md-8">
                                    <p className="pe-2 ">{pageData?.customerstories?.content[0]?.description}</p>
                                    <div className="d-flex justify-content-between text-dark c-fw-sb mt-3">
                                        <span className="fw-semibold">{pageData?.customerstories?.learnmore}</span>
                                        <span className="fs-4">
                                            <MdKeyboardArrowRight />
                                        </span>
                                    </div>
                                </div>
                            </a>
                            <div className="col-12 col-lg-6 col-md-12 row gap-4 gap-sm-3 gap-md-4 m-0 p-0 h-100 ">
                                <a
                                    href={pageData?.customerstories?.content[1]?.link}
                                    className="c-hover d-flex align-items-start flex-lg-row flex-md-row flex-column c-hover bg-white text-dark rounded-2 overflow-hidden p-0 h-50"
                                >
                                    <div className="secc-client-img d-flex justify-content-center align-items-center col-12 col-md-4 col-lg-4">
                                        <img className="h-50" src="/img/unacademy-logo.png" alt="secc-client-img" />
                                    </div>

                                    <div className="c-fs-3 p-3 col-12 col-lg-8">
                                        <p className="pe-2">{pageData?.customerstories?.content[1]?.description}</p>
                                        <div className="d-flex align-items-center justify-content-start text-dark c-fw-sb mt-3">
                                            <span className="me-3 fw-semibold">
                                                {pageData?.customerstories?.learnmore}
                                            </span>
                                            <MdKeyboardArrowRight />
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href={pageData?.customerstories?.content[2]?.link}
                                    className="c-hover d-flex align-items-start flex-lg-row flex-md-row flex-column c-hover bg-white text-dark rounded-2 overflow-hidden p-0"
                                >
                                    <div className="sec-client-img d-flex justify-content-center align-items-center col-12 col-md-4 col-lg-4">
                                        <img className="h-25" src="/img/ixigo-logo.png" alt="secc-client-img" />
                                    </div>
                                    <div className="c-fs-3 p-3 col-12 col-lg-8">
                                        <p className="pe-2">{pageData?.customerstories?.content[2]?.description}</p>
                                        <div className="d-flex align-items-center justify-content-start text-dark c-fw-sb mt-3">
                                            <span className="me-3 fw-semibold">
                                                {pageData?.customerstories?.learnmore}
                                            </span>
                                            <MdKeyboardArrowRight />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {pageData?.faq?.content.length > 0 && (
                <div className="container">
                    <FaqSection faqData={pageData?.faq?.content} faq={pageData?.faq} />
                </div>
            )}
        </>
    );
}
