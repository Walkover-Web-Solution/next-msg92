import Image from "next/image";
const TrustedBy = () => {
    return(
        <>
        <div className="d-flex flex-column gap-3 my-md-5 my-2">
            <span className="c-fs-3 ">Trusted by<span className="c-fw-sb"> 30,000+ </span>businesses</span>
            <div className="d-flex gap-4 gap-md-5 flex-wrap align-items-center">
                <Image className="trustimage " src="/img/trusted/razorpay.svg" width="187" height="28" alt="Razorpay" title="Razorpay"/>
                <Image className="trustimage " src="/img/trusted/xiaomi.svg" width="187" height="28" alt="Xiaomi" title="Xiaomi"/>
                <Image className="trustimage " src="/img/trusted/unacademy.svg" width="187" height="28" alt="Unacademy" title="Unacademy"/>
                <Image className="trustimage d-none d-lg-block" src="/img/trusted/dream11.svg" width="187" height="28" alt="Dream11" title="Dream11"/>
                <Image className="trustimage" src="/img/trusted/indeed.svg" width="187" height="28" alt="Indeed" title="Indeed"/>
                <Image className="trustimage" src="/img/trusted/indian-oil.svg" width="32" height="32" alt="Indian Oil" title="Indian Oil"/>
                {/* <Image className="trustimage d-none d-md-block" src="/img/trusted/housing.svg" width="187" height="28" alt="trustimage" title="trustimage"/> */}
                <Image className="trustimage d-lg-block" src="/img/trusted/ixigo.svg" width="187" height="28" alt="Ixigo" title="Ixigo"/>
            </div>
        </div>
        
        </>
    )
};
export default TrustedBy;