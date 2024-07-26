export default function FactsComp({data}) {
    return (
        <>
        {data.map((fact, index) => (
            <div key={index}>
                <h2>{fact.fact}</h2>
                <p>{fact.about}</p>
            </div>
        ))}
        </>
    );
}
