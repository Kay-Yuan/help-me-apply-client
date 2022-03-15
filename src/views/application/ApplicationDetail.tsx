import { useEffect, useState } from "react";
import { Button, Box, Modal, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import applicationService from "@services/application";
import { useSnackbar } from "notistack";
import { Application } from "@global/application";

export default function ApplicationDetail() {
  const [applicationData, setApplicationData] = useState<Application>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const _applicationData = await applicationService.getApplication(
          applicationId
        );
        setApplicationData(_applicationData);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }

      setIsLoading(false);
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
      await applicationService.deleteApplication(applicationId);
      navigate(-1);

      enqueueSnackbar("Application deleted successfully", {
        variant: "success",
      });
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
            Do you want to delete this application?
          </Box>
          <Box component="span" ml={12}>
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

      {isLoading && (
        <Box
          component="div"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && <Box component="h1">{applicationData?.dateCreated}</Box>}

      {applicationData?.applicationStatus && (
        <Box component="h4">
          Application Status: {applicationData?.applicationStatus}
        </Box>
      )}
      {applicationData?.dateCreated && (
        <Box component="div" pt={1}>
          Description: {applicationData?.dateCreated}
        </Box>
      )}
      {applicationData?.expectedSalary && (
        <Box component="div" pt={1}>
          Requirement: {applicationData?.expectedSalary}
        </Box>
      )}
    </Box>
  );
}
