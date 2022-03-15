import { useState, useEffect, memo } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ApplicationList from "./ApplicationList";
import AddApplicationModal from "./AddApplicationModal";
import ApplicationService from "@services/application";
import { Application } from "@global/application";
import { useSnackbar } from "notistack";

interface ApplicationWithCompanyJobTitle extends Application {
  companyName: string;
  jobTitle: string;
}

const ApplicationListMemo = memo(ApplicationList);

export default function ApplicationContainer() {
  const [isLoadingTableContent, setIsLoadingTableContent] = useState(true);
  const [applications, setApplications] = useState<
    ApplicationWithCompanyJobTitle[]
  >([]);

  const [reload, setReload] = useState({});
  const [isOpenAddApplicationModal, setIsOpenAddApplicationModal] =
    useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => setIsOpenAddApplicationModal(true);
  const handleClose = () => setIsOpenAddApplicationModal(false);

  useEffect(() => {
    (async () => {
      setIsLoadingTableContent(true);

      try {
        const response =
          await ApplicationService.applicationListsWithCompanyNameJobTitle();
        setApplications(response);
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
