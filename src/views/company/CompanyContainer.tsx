import { useState, useEffect } from "react";
// import { Modal, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import CompanyList from "./CompnayList";
import AddCompanyModal from "./CompanyAddModal";
import companyService from "@services/company";

interface Company {
  id: string;
  companyName: string;
  companyURL?: string;
  companyAddress?: string;
  recruiterName?: string;
  recruiterEmail?: string;
  recruiterNumber?: string;
  rate?: number;
}

export default function CompanyContainer() {
  const [isLoadingTableContent, setIsLoadingTableContent] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);

  const [reload, setReload] = useState({});
  const [isOpenAddCompanyModal, setIsOpenAddCompanyModal] = useState(false);

  const handleOpen = () => setIsOpenAddCompanyModal(true);
  const handleClose = () => setIsOpenAddCompanyModal(false);

  useEffect(() => {
    (async () => {
      setIsLoadingTableContent(true);

      const response = await companyService.getCompanies(0);
      setCompanies(response);

      setIsLoadingTableContent(false);
    })();
  }, [reload]);

  return (
    <div>
      <Box component="div" padding="30px">
        <Button variant="outlined" onClick={handleOpen} style={{ marginBottom: "10px" }}>
          Add Company
        </Button>

        <CompanyList isLoading={isLoadingTableContent} companies={companies} />

        {isOpenAddCompanyModal && <AddCompanyModal onClose={handleClose} reload={() => setReload({})} />}
      </Box>
    </div>
  );
}
