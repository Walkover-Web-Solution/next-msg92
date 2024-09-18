import { useRouter } from 'next/router';

export default function getPricingPath(path) {
    const countryList = ['in', 'br', 'br-pt', 'ae', 'ph', 'sg', 'es', 'gb', 'us'];
    const products = [
        "hello",
        "campaign",
        "segmento",
        "otpwidget",

        "sms",
        "otp",
        "email",
        "whatsapp",
        "voice",
        "rcs",        
    ];
    
    let pricingPath = '/pricing/hello';
    let country = '';
    let product = '';

    const router = useRouter();
    const rawPath = router.asPath;
    const split = rawPath.split('/');
        
    if (countryList.includes(split[1])) {
        country = `/${split[1]}`;
        pricingPath = `${country}/pricing/hello`
    }
    if (products.includes(split[2])) {
        product = `/${split[2]}`;
        pricingPath = `${country}/pricing${product}`
    }

    return pricingPath;
}
