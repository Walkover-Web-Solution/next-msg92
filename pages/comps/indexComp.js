import { useRouter } from "next/router";
const indexComp = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <>
      <h1 className="text-primary">hello there</h1>
    </>
  );
};
export default indexComp;
