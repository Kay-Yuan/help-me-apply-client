import { useState, useEffect, memo } from "react";
// import { Modal, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSnackbar } from "notistack";

import CompanyList from "./CompanyList";
import AddOrUpdateCompanyModal from "./AddOrUpdateCompanyModal";
import companyService from "@services/company";
import { Company } from "@global/company";

const CompanyListMemo = memo(CompanyList);

export default function CompanyContainer() {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoadingTableContent, setIsLoadingTableContent] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);

  const [reload, setReload] = useState({});
  const [isOpenAddCompanyModal, setIsOpenAddCompanyModal] = useState(false);

  const handleOpen = () => setIsOpenAddCompanyModal(true);
  const handleClose = () => setIsOpenAddCompanyModal(false);

  useEffect(() => {
    (async () => {
      setIsLoadingTableContent(true);

      try {
        const response = await companyService.getCompanies(0);

        setCompanies(response);

      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });    
      } finally {
        setIsLoadingTableContent(false);
      }
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
          Add Company
        </Button>

        <CompanyListMemo
          isLoading={isLoadingTableContent}
          companies={companies}
        />

        {isOpenAddCompanyModal && (
          <AddOrUpdateCompanyModal onClose={handleClose} reload={() => setReload({})} />
        )}
      </Box>
    </div>
  );
}
