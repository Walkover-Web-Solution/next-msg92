export default function MenuBar({data}) {
    const imgs = [
            {
                "name":"Razorpay",
                "url":"/img/trusted/razorpay.svg"
            },
            {
                "name":"Xiaomi",
                "url":"/img/trusted/xiaomi.svg"
            },
            {
                "name":"Unacademy",
                "url":"/img/trusted/unacademy.svg"
            },
            {
                "name":"Dream11",
                "url":"/img/trusted/dream11.svg"
            },
            {
                "name":"Indeed",
                "url":"/img/trusted/indeed.svg"
            },
            {
                "name":"IndianOil",
                "url":"/img/trusted/indian-oil.svg"
            },
            {
                "name":"Ixigo",
                "url":"/img/trusted/ixigo.svg"
            }
        ]    
    return (
        <>
            <div>{data.heading}</div>
            {imgs.map((img, index) => (
                <img key={index} src={img.url} alt={img.name} width={100} />
            ))}
        </>
    );
}
