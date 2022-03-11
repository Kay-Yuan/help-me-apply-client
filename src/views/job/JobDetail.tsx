import { useEffect, useState } from "react";
import { Button, Box, Modal, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useParams, useNavigate } from "react-router-dom";
import jobService from "@services/job";
import { useSnackbar } from "notistack";
import { Job } from "@global/job";

export default function JobDetail() {
  const [jobData, setJobData] = useState<Job>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const _jobData = await jobService.getJob(jobId);
      setJobData(_jobData);
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
      try {
        setIsDeleting(true);

        await jobService.deleteJob(jobId);
        navigate(-1);

        enqueueSnackbar("Job deleted successfully", { variant: "success" });
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } finally {
        setIsDeleting(false);
      }
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
        <LoadingButton
          onClick={handleDelete}
          variant="contained"
          color="error"
          loading={isDeleting}
        >
          Delete
        </LoadingButton>
      </Box>

      <Modal
        open={isOpenDeleteConfirmModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box p={2} style={{ marginLeft: "35%", marginTop: "20%" }}>
          <Box component="p" color={"white"} fontSize={30}>
            Do you want to delete this job?
          </Box>
          <Box component="span" ml={10}>
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

      {!isLoading && <Box component="h1">{jobData?.jobTitle}</Box>}

      {jobData?.jobLink && (
        <Box component="a" href={jobData?.jobLink} target="_blank">
          {jobData?.jobLink}
        </Box>
      )}
      {jobData?.jobLocation && (
        <Box component="h4">Job Address: {jobData?.jobLocation}</Box>
      )}
      {jobData?.jobDescription && (
        <Box component="div" pt={1}>
          Description: {jobData?.jobDescription}
        </Box>
      )}
      {jobData?.jobRequirement && (
        <Box component="div" pt={1}>
          Requirement: {jobData?.jobRequirement}
        </Box>
      )}
      {jobData?.jobSalaryRange && (
        <Box component="div" pt={1}>
          Salary: {jobData?.jobSalaryRange}
        </Box>
      )}

      {jobData?.jobStatus && (
        <Box component="div" pt={1}>
          Status: {jobData?.jobStatus === true ? "Active" : "Inactive"}
        </Box>
      )}
    </Box>
  );
}
