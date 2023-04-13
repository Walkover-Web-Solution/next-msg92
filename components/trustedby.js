import Image from "next/image";
const TrustedBy = () => {
    return(
        <>
        <div className="d-flex flex-column gap-3 my-5">
            <span className="c-fs-3 ">Trusted by<span className="c-fw-sb"> 30,000+ </span>businesses</span>
            <div className="d-flex gap-3 justify-content-center">
                <Image src="/img/trusted/ixigo.svg" width="187" height="28" alt="trustimage"/>
                <Image src="/img/trusted/unacademy.svg" width="187" height="28" alt="trustimage"/>
                <Image src="/img/trusted/dream11.svg" width="187" height="28" alt="trustimage"/>
                <Image src="/img/trusted/indeed.svg" width="187" height="28" alt="trustimage"/>
                <Image src="/img/trusted/housing.svg" width="187" height="28" alt="trustimage"/>
            </div>
        </div>
        
        </>
    )
};
export default TrustedBy;