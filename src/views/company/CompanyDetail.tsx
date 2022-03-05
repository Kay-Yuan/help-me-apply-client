import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import companyService from "@services/company";
import { useSnackbar } from "notistack";

interface Company {
  id: string;
  companyName: string;
  companyURL?: string;
  companyAddress?: string;
  recruiterName?: string;
  recruiterEmail?: string;
  recruiterNumber?: string;
  rate?: number;
}

export default function CompanyDetail() {
  const [companyData, setCompanyData] = useState<Company>(null);
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      const _companyData = await companyService.getCompany(companyId);
      setCompanyData(_companyData);
    })();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    (async () => {
      await companyService.deleteCompany(companyId);
      navigate(-1);

      enqueueSnackbar("Company deleted successfully", { variant: "success" });
    })();
  };

  //   return <div>hello </div>;
  return (
    <Box p={2}>
      <Box component="span">
        <Button onClick={handleGoBack} variant="outlined">
          Back
        </Button>
      </Box>
      <Box component="span" ml={2}>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </Box>

      <Box component="h1">{companyData?.companyName}</Box>
      <Box component="div">
        <Box component="a" href={companyData?.companyURL} target="_blank">
          {companyData?.companyURL}
        </Box>
      </Box>
      {companyData?.companyAddress && <Box component="h4">Company Address: {companyData?.companyAddress}</Box>}
      {companyData?.recruiterName && (
        <Box component="div" pt={1}>
          Recruiter Name: {companyData?.recruiterName}
        </Box>
      )}
      {companyData?.recruiterEmail && (
        <Box component="div" pt={1}>
          Recruiter Email: {companyData?.recruiterEmail}
        </Box>
      )}
      {companyData?.recruiterNumber && (
        <Box component="div" pt={1}>
          recruiterNumber: {companyData?.recruiterNumber}
        </Box>
      )}

      {(companyData?.rate === 0 || companyData?.rate) && (
        <Box component="div" pt={1}>
          Rate: {companyData?.rate}
        </Box>
      )}
    </Box>
  );
}
