import { useState, useEffect, memo } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ApplicationList from "./ApplicationList";
import AddApplicationModal from "./AddApplicationModal";
import ApplicationService from "@services/application";

interface Application {
  id: string;
  dateCreated: Date;
  applicationStatus?: string;
  expectedSalary?: string;
  jobId: string;
}

const ApplicationListMemo = memo(ApplicationList);

export default function ApplicationContainer() {
  const [isLoadingTableContent, setIsLoadingTableContent] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  const [reload, setReload] = useState({});
  const [isOpenAddApplicationModal, setIsOpenAddApplicationModal] =
    useState(false);

  const handleOpen = () => setIsOpenAddApplicationModal(true);
  const handleClose = () => setIsOpenAddApplicationModal(false);

  useEffect(() => {
    (async () => {
      setIsLoadingTableContent(true);

      const response = await ApplicationService.getApplications(0);
      setApplications(response);

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
          Add Application
        </Button>
        <ApplicationListMemo
          isLoading={isLoadingTableContent}
          applications={applications}
        />
        {isOpenAddApplicationModal && (
          <AddApplicationModal
            open={true}
            onClose={handleClose}
            reload={() => setReload({})}
          />
        )}
      </Box>
    </div>
  );
}
