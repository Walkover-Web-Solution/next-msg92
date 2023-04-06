import { useRouter } from "next/router";
import data from "../content.json";
const pageNo = () =>{
  const router = useRouter();
  const page = router.query.pageNo;
  const contry = router.query.contry;
  return(
    <>
    <h1>
      {data[contry]?.[page]?.head}
    </h1>
    </>
  )
};
export default pageNo;