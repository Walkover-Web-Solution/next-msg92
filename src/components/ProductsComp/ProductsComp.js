export default function ProductsComp({data}) {
    
    return (
        <>
            {data.map((product, index) => (
                <div key={index}>
                    <img src={product.icon} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>{product.tagline}</p>
                    <p>{product.description}</p>
                    <img src={product.img} alt={product.name} />
                    <a href={product.link}>{product.linkText}</a>
                </div>
            ))}
        </>
    );
}
