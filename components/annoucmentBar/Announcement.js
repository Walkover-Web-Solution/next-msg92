import Image from "next/image";
import styles from "./AnnouncementBar.module.scss"; // Using CSS Modules
import Link from "next/link";

export default function Announcement({ imageSrc, title, description, linkText, linkHref, isVisible }) {
    return (
        <div className={`${styles.announcement} ${isVisible ? styles.show : styles.hide}`}>
            <Image
                src={imageSrc}
                width={125}
                height={58}
                alt="webinarImg"
                className="d-md-block d-none"
            />
            <div className="d-flex flex-column">
                <span className="c-fs-3 c-fw-b text-white">{title}</span>
                <span className="text-white-800 c-fs-5">
                    {description}{" "}
                    <Link
                        className="text-white c-fw-b text-decoration-underline"
                        href={linkHref}
                        target="_blank"
                    >
                        {linkText}
                    </Link>
                </span>
            </div>
        </div>
    );
}
