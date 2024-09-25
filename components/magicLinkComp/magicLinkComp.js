import Image from 'next/image';
import Link from 'next/link';
import styles from './magicLink.module.scss';
import {
    MdOutlineHealthAndSafety,
    MdOutlineStorefront,
    MdRocketLaunch,
    MdTouchApp,
} from 'react-icons/md';
import PreFooter from '@/components/preFooter';

export default function OtpMagicLinkComp({pageData}) {
  
    const icons = {
        send: MdRocketLaunch,
        click: MdTouchApp,
        access: MdTouchApp,
        MdOutlineHealthAndSafety: MdOutlineHealthAndSafety,
        MdOutlineStorefront: MdOutlineStorefront,
    };
    function renderIcon(iconName, class_name) {
        const IconComponent = icons[iconName];
        return <IconComponent className={styles[class_name]} />;
    }
    return (
        <>
            <div className="container d-flex flex-column flex-md-row align-items-center  justify-content-between my-md-5">
                <div className="d-flex flex-column gap-3 col-md-6 my-md-5 my-3">
                    <div className="d-flex align-items-center gap-1">
                        <Image src="/img/icon/otp.svg" width="40" height="40" alt="whatsApp logo" />
                        <span className="c-fs-2 c-fw-sb ">OTP Magic-link</span>
                    </div>
                    <p className="c-fs-3 c-fw-t ls-3 text-uppercase">Effortless Access, Instant Authentication</p>
                    <h1 className="heading c-fw-xb">Authenticate Seamlessly with Magic Link</h1>
                    <p className="c-fs-2">
                        Authenticating users is now easier and faster. Just send a single link, and your users can
                        verify themselves instantly.
                    </p>
                    <Link href="/signup?utm_campaign=tigerplugin&utm_source=tally&utm_medium=website" target="_blank">
                        <button className="btn btn-dark btn-lg rounded-1 btn-ft">Get started</button>
                    </Link>
                </div>
                <Image
                    src="/img/pageimg/whatapp-chatbot.png"
                    width={1080}
                    height={1080}
                    className="col-md-6 col-12 h-auto"
                    alt="whatsApp Hero Image"
                />
            </div>
            <div className="usecase_bg py-5">
                <div className="container d-flex flex-column gap-3 usecase_bg my-5">
                    <h2>What is Magic Link?</h2>
                    <p>
                        Magic Link is a simple, one-click authentication method that eliminates the need for passwords
                        or OTPs. Instead, users receive a secure, unique link via their preferred channel—email, SMS,
                        WhatsApp, RCS, or others. By clicking the link, they are instantly authenticated and granted
                        access to the platform or service. It’s a fast, secure, and user-friendly alternative to
                        traditional authentication methods, ensuring a frictionless experience while maintaining high
                        security standards. Whether logging into an app, verifying transactions, or accessing a portal,
                        Magic Link makes authentication effortless
                    </p>
                </div>
            </div>
            <div className="py-5">
                <div className="container d-flex flex-column gap-5 my-5">
                    <h2>How Does It Work?</h2>
                    <div className="d-flex flex-md-row flex-column gap-4">
                        {pageData.howWork.map((feature, index) => (
                            <div
                                key={index}
                                className={`d-grid usecase_bg p-lg-5 p-md-3 p-sm-5 p-2  col br-2 gap-lg-3 gap-md-2 gap-2 ${styles.feature}`}
                            >
                                <div
                                    className={`${styles.feature_icon_cont} d-flex align-items-center justify-content-center border border-2 rounded bg-white`}
                                >
                                    {renderIcon(feature.icon, 'feature_icon')}
                                </div>
                                <h3 className="c-fs-2">{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="usecase_bg py-5">
                <div className="container d-flex flex-column gap-5 usecase_bg my-5">
                    <h2>Why Choose Magic Link?</h2>
                    <div className="col-12 d-flex flex-wrap justify-content-between  gap-5">
                        {pageData.features.map((feature, index) => (
                            <div
                                key={index}
                                className={`d-grid usecase_bg br-2 col-sm-5 col-12 gap-lg-3 gap-md-2 gap-2 ${styles.feature}`}
                            >
                                <div
                                    className={`${styles.feature_icon_cont} d-flex align-items-center justify-content-center border border-2 rounded bg-white`}
                                >
                                    {renderIcon(feature.icon, 'feature_icon')}
                                </div>
                                <h3 className="c-fs-2">{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className=" py-5">
                <div className="container d-flex flex-column gap-5 my-5 ">
                    <h2>OTP Magic-Link Applications Across Industries</h2>
                    <div className="d-flex flex-column gap-5">
                        {pageData.useCases.map((useCase, i) => {
                            return (
                                <div
                                    className={`d-flex ${
                                        i % 2 === 0
                                            ? 'flex-lg-row flex-column-reverse'
                                            : 'flex-lg-row-reverse flex-column-reverse'
                                    }  gap-5 py-3 justify-content-center align-items-center`}
                                >
                                    <div className={`${styles.usecase_bg} p-md-3 p-xl-5 p-2 rounded-1 d-grid gap-3 col-12 col-lg-6`}>
                                        {renderIcon(useCase.icon, 'useCase_feature_icon')}
                                        <h3>{useCase?.name}</h3>
                                        <p>{useCase?.description}</p>
                                        <div className={`${styles.usecase_features} gap-2 gap-lg-3 gap-xl-4`}>
                                            {useCase?.features.map((feature, index) => {
                                                return (
                                                    <div
                                                    key={index}
                                                        className={`${styles.usecase_feature} p-3 bg-white border border-2 rounded `}
                                                    >
                                                        {feature}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <Image
                                        src={`/img/feature/${useCase?.img}.png`}
                                        width={800}
                                        height={800}
                                        className={`${styles.useCase_img} col-12 col-lg-5 p-1 `}
                                        alt="whatsApp Hero Image"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <PreFooter />
        </>
    );
}
