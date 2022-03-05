import { useParams } from "react-router-dom";

export default function CompanyDetail() {
  const { companyId } = useParams();

  //   return <div>hello </div>;
  return <div>hello {companyId} !</div>;
}
