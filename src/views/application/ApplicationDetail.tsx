import { useEffect, useState } from "react";
import { Button, Box, Modal } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import applicationService from "@services/application";
import { useSnackbar } from "notistack";
interface Application {
  id: string;
  dateCreated: Date;
  applicationStatus?: string;
  expectedSalary?: string;
  jobId: string;
}

export default function ApplicationDetail() {
  const [applicationData, setApplicationData] = useState<Application>(null);
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);

  useEffect(() => {
    (async () => {
      const _applicationData = await applicationService.getApplication(
        applicationId
      );
      setApplicationData(_applicationData);
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
        <Box p={2} style={{ marginLeft: "45%", marginTop: "20%" }}>
          <Box component="span">
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

      <Box component="h1">{applicationData?.dateCreated}</Box>

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
