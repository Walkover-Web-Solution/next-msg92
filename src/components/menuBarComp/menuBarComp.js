export default function MenuBarComp({data}) {
    const pageData = require(`@/data/${data.country}/menubar.json`);
    return (
        <div className="container">
            <div className="text">{pageData.title}</div>
        </div>
    );
}
