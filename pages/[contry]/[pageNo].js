import { useRouter } from "next/router";
import data from "../content.json";
const pageNo = () => {
  const router = useRouter();
  const pageNo = router.query.pageNo;
  const country = router.query.contry;
  const countryData = data[country] || {};
  const pageData = countryData[pageNo];
  if (!countryData || !pageData) {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The requested page was not found.</p>
      </div>
    );
  }
  return (
    <>
      <h1>{pageData.head}</h1>
    </>
  );
};
export default pageNo;
