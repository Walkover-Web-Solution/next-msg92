export default function ChannelsComp({data}) {
    return (
        <>
            <div>{data.heading}</div>
            <div>{data.subheading}</div>
            {data.channels.map((channel, index) => (
                <div key={index}>
                    <img src={channel.icon} alt={channel.name} />
                    <h2>{channel.name}</h2>                    
                    <p>{channel.description}</p>                    
                    <a href={channel.link}>{channel.linkText}</a>
                </div>
            ))}
        </>
    );
}
