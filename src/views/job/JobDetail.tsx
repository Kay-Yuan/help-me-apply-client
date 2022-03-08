import { useEffect, useState } from "react";
import { Button, Box, Modal } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import jobService from "@services/job";
import { useSnackbar } from "notistack";
import { Job } from "@global/job";

export default function JobDetail() {
  const [jobData, setJobData] = useState<Job>(null);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);

  useEffect(() => {
    (async () => {
      const _jobData = await jobService.getJob(jobId);
      setJobData(_jobData);
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
      await jobService.deleteJob(jobId);
      navigate(-1);

      enqueueSnackbar("Job deleted successfully", { variant: "success" });
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

      <Box component="h1">{jobData?.jobTitle}</Box>

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
          Status: {jobData?.jobStatus}
        </Box>
      )}
    </Box>
  );
}
