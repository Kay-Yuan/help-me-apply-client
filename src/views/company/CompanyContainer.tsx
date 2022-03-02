import { useState } from "react";
// import { Modal, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import CompanyList from "./CompnayList";
import AddCompanyModal from "./CompanyAddModal";

export default function CompanyContainer() {
  const [reload, setReload] = useState({});
  const [isOpenAddCompanyModal, setIsOpenAddCompanyModal] = useState(false);

  const handleOpen = () => setIsOpenAddCompanyModal(true);
  const handleClose = () => setIsOpenAddCompanyModal(false);

  return (
    <div>
      <Box component="div" padding="30px">
        <Button onClick={handleOpen}>Add Company</Button>

        <CompanyList reload={reload} />

        <AddCompanyModal isOpen={isOpenAddCompanyModal} onClose={handleClose} />
      </Box>
    </div>
  );
}
