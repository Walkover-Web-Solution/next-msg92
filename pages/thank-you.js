import { useEffect, useState } from "react";
import { MdOutlineEmail, MdCall, MdWhatsapp } from "react-icons/md";
import { InlineWidget, PopupButton } from "react-calendly";
const contactus = ({path}) => {
    var [salesNumber, setSalesNumber] = useState('+91 88895 00704');
    useEffect(() => {
        fetch('https://api.db-ip.com/v2/free/self')
        .then(response => response.json())
        .then(response => {
            console.log('CONTACT US', response);
            if(response.countryName !== 'India'){
                setSalesNumber('+65 31595004');
            }
        })
        .catch(error => {            
            console.log('error', error);
        });    
    }, []);
    return (
        <>
            <div className="container text-center px-4 col-xs-12 col-sm-10 col-md-10 mx-auto  py-5">
                <div style={{'height':'50px'}}></div>
                <h1 className="sub-heading">Thank you for using MSG91</h1>
                <div className="small-heading p-3 w-md-75 w-100 mx-auto fw-normal">
                    In case you want to login again, <a href="https://control.msg91.com/signin/">Click here</a>
                </div>
                <div style={{'height':'200px'}}></div>
            </div>
        </>
    );
};
export default contactus;
