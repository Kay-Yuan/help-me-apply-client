import { useState, useEffect, memo } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import JobList from "./JobList";
import AddJobModal from "./AddOrUpdateJobModal";
import JobService from "@services/job";
import { Job } from "@global/job";
import { useSnackbar } from "notistack";

const JobListMemo = memo(JobList);

export default function JobContainer() {
  const [isLoadingTableContent, setIsLoadingTableContent] = useState(true);
  const [jobs, setJobs] = useState<(Job & { companyName: string })[]>([]);

  const [reload, setReload] = useState({});
  const [isOpenAddJobModal, setIsOpenAddJobModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => setIsOpenAddJobModal(true);
  const handleClose = () => setIsOpenAddJobModal(false);

  useEffect(() => {
    (async () => {
      setIsLoadingTableContent(true);

      try {
        const response = await JobService.getJobListWithCompany(0);
        setJobs(response);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }

      setIsLoadingTableContent(false);
    })();
  }, [reload]);

  return (
    <div>
      <Box component="div" padding="30px">
        <Button
          variant="outlined"
          onClick={handleOpen}
          style={{ marginBottom: "10px" }}
        >
          Add Job
        </Button>
        <JobListMemo isLoading={isLoadingTableContent} jobs={jobs} />
        {isOpenAddJobModal && (
          <AddJobModal
            open={true}
            onClose={handleClose}
            reload={() => setReload({})}
          />
        )}
      </Box>
    </div>
  );
}
