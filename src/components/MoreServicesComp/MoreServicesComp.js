export default function MoreServicesComp({data}) {
    return (
        <>
        {data.map((service, index) => (
            <div key={index} className="service-item">
                <img src={service.icon} alt={`${service.name} icon`} />
                <span>{service.name}</span>
                <h2>{service.heading}</h2>
                <p>{service.description}</p>
                <a href={service.link}>{service.linkText}</a>
            </div>
        ))}
        </>
    );
}
