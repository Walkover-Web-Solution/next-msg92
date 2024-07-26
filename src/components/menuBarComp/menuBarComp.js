export default function MenuBarComp({data}) {
    const pageData = require(`@/data/${data?.country}/common.json`);
    const componentData = pageData?.menu;
    return (
        <div className="container">
         <div className='text'>{componentData?.title}</div>
        </div>
    );
}
