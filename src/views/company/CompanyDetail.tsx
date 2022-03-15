import { useEffect, useState } from "react";
import { Button, Box, Modal } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import companyService from "@services/company";
import { useSnackbar } from "notistack";
import { Company } from "@global/company";

export default function CompanyDetail() {
  const [companyData, setCompanyData] = useState<Company>(null);
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);

  useEffect(() => {
    (async () => {
      try {
        const _companyData = await companyService.getCompany(companyId);
        setCompanyData(_companyData);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    })();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    setIsOpenDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    (async () => {
      await companyService.deleteCompany(companyId);
      navigate(-1);

      enqueueSnackbar("Company deleted successfully", { variant: "success" });
    })();
  };

  const handleClose = () => setIsOpenDeleteConfirmModal(false);

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

      <Modal
        open={isOpenDeleteConfirmModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box p={2} style={{ marginLeft: "35%", marginTop: "20%" }}>
          <Box component="p" color={"white"} fontSize={30}>
            Do you want to delete {companyData?.companyName} company?
          </Box>
          <Box component="span" ml={18}>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
          </Box>
          <Box component="span" ml={2}>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box component="h1">{companyData?.companyName}</Box>
      <Box component="div">
        <Box component="a" href={companyData?.companyURL} target="_blank">
          {companyData?.companyURL}
        </Box>
      </Box>
      {companyData?.companyAddress && (
        <Box component="h4">Company Address: {companyData?.companyAddress}</Box>
      )}
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
