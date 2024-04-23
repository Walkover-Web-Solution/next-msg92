import Image from "next/image";

export default function AnnoucmentBar(){
    return(
        <>
        <div className="annoucment-bar ">
        <div className='container d-flex align-items-center gap-2 py-2 '> 
            <Image src='/img/webinar_ico.svg' width={125} height={58} alt="webinarImg" className="d-none d-md-block"/>
            <div className="d-flex flex-column ">
                <span className="c-fs-3 c-fw-b text-white">
                Join our webinar on 17th May
                </span>
                <span className="text-white-800 c-fs-5">
                Mastering E-commerce with WhatsApp Campaigns that Convert -<a className='text-white c-fw-b text-decoration-underline' href="https://forms.gle/2Er1hw4GYkupmebb8"> Register Now </a>and get benefits worth INR 25,000.
                </span>
            </div>
        </div>
        </div>

        </>
    )
}