import { useEffect, useState } from "react";
import { Button, Box, Modal } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import companyService from "@services/company";
import { useSnackbar } from "notistack";
import { Company } from "@global/company";
import AddOrUpdateCompanyModal from "./AddOrUpdateCompanyModal";

export default function CompanyDetail() {
  const { enqueueSnackbar } = useSnackbar();
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState<Company>(null);
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);
  const [isOpenEditCompanyModal, setIsOpenEditCompanyModal] = useState(false);
  const [reload, setReload] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const _companyData = await companyService.getCompany(companyId);
        setCompanyData(_companyData);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    })();
  }, [reload]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    setIsOpenDeleteConfirmModal(true);
  };

  const handleOpenEditCompanyModal = () => {
    setIsOpenEditCompanyModal(true);
  };

  const handleCloseEditCompanyModal = () => {
    setIsOpenEditCompanyModal(false);
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
        <Button onClick={handleOpenEditCompanyModal} variant="contained">
          Edit
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

      {!isLoading && companyData?.companyName && (
        <Box component="h1">{companyData?.companyName}</Box>
      )}
      {!isLoading && companyData?.companyURL && (
        <Box component="div">
          <Box component="a" href={companyData?.companyURL} target="_blank">
            {companyData?.companyURL}
          </Box>
        </Box>
      )}
      {!isLoading && companyData?.companyAddress && (
        <Box component="h4">Company Address: {companyData?.companyAddress}</Box>
      )}
      {!isLoading && companyData?.recruiterName && (
        <Box component="div" pt={1}>
          Recruiter Name: {companyData?.recruiterName}
        </Box>
      )}
      {!isLoading && companyData?.recruiterEmail && (
        <Box component="div" pt={1}>
          Recruiter Email: {companyData?.recruiterEmail}
        </Box>
      )}
      {!isLoading && companyData?.recruiterNumber && (
        <Box component="div" pt={1}>
          recruiterNumber: {companyData?.recruiterNumber}
        </Box>
      )}

      {!isLoading && (companyData?.rate === 0 || companyData?.rate) && (
        <Box component="div" pt={1}>
          Rate: {companyData?.rate}
        </Box>
      )}

      {isOpenEditCompanyModal && (
        <AddOrUpdateCompanyModal
          companyData={companyData}
          onClose={handleCloseEditCompanyModal}
          reload={() => setReload({})}
        />
      )}
    </Box>
  );
}
