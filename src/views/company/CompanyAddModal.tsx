import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { Modal, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import CompanyList from "./CompnayList";
import { FormControl, Grid, Rating, TextField } from "@mui/material";
import { send } from "process";

interface CompanyAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Company {
  // id: uuidv4;
  companyName: string;
  companyURL?: string;
  companyAddress?: string;
  recruiterName?: string;
  recruiterEmail?: string;
  recruiterNumber?: string;
  rate?: number;
}

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid gold",
  boxShadow: 24,
  p: 4,
};

export default function CompanyAddModal({
  isOpen,
  onClose,
}: CompanyAddModalProps) {
  const [rate, setRate] = useState<number>(0);
  const [newCompany, setNewCompany] = useState<Company>(null);

  const handleAddNewCompany = () => {
    console.log(newCompany);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Company
        </Typography>

        <hr />

        <Typography
          component="form"
          id="modal-modal-description"
          sx={{ mt: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                required
                id="modal-companyName"
                name="companyName"
                label="Company Name"
                variant="standard"
                fullWidth
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                required
                id="modal-companyURL"
                name="companyURL"
                label="Company URL"
                variant="standard"
                fullWidth
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="modal-companyAddress"
                name="companyAddress"
                label="Company Address"
                variant="standard"
                fullWidth
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="modal-recruiterName"
                name="recruiterName"
                label="Recruiter Name"
                variant="standard"
                fullWidth
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="modal-recruiterEmail"
                name="recruiterEmail"
                label="Recruiter Email"
                variant="standard"
                fullWidth
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="modal-recruiterNumber"
                name="recruiterNumber"
                label="Recruiter Number"
                variant="standard"
                fullWidth
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <h4>Rate: </h4>
              <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, newValue) => {
                  setRate(newValue);
                }}
              />
            </Grid>
          </Grid>
        </Typography>
        <hr />

        <Typography id="modal-modal-action" sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleAddNewCompany}
            autoFocus
            style={{ marginLeft: "15px" }}
          >
            Add
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
}
