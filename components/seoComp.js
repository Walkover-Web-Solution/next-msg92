import IndexSeoComp from "./seo/inIndex"
import SmsSeoComp from "./seo/inSms"
const seo = ({path,pageData})=>{
    console.log(path,pageData)
    // console.log(pageData)
    return(
        <>
        <IndexSeoComp/>
        <SmsSeoComp/>
        </>
    );
}
export default seo;