import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { Modal, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import CompanyList from "./CompnayList";
import { FormControl, Grid, Rating, TextField } from "@mui/material";
import { send } from "process";
import companyService from "@services/company";

interface CompanyAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Company {
  id: string;
  companyName: string;
  companyURL: string;
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

const addCompanyModalSchema = Joi.object().keys({
  companyName: Joi.string().max(100).required().messages({
    "string.empty": "Company name is required",
    "string.max": "Please input characters less than 100",
  }),
  companyURL: Joi.string()
    .max(150)
    .uri({ scheme: ["https"] })
    .required()
    .messages({
      "string.empty": "Company URL is required",
      "string.max": "Please input characters less than 150",
      "string.uri": "Please input valid(full url with https://) URL",
    }),
  companyAddress: Joi.string().optional().min(0).max(255).messages({
    "string.max": "Please input characters less than 255",
  }),
  recruiterName: Joi.string()
    .optional()
    .min(0)
    .max(100)
    .messages({ "string.max": "Please input characters less than 100" }),
  recruiterEmail: Joi.string()
    .optional()
    .allow("")
    .email({ tlds: { allow: false }, ignoreLength: true })
    .min(0)
    .max(150)
    .messages({
      "string.max": "Please input characters less than 150",
      "string.email": "Please input valid email",
    }),
  recruiterNumber: Joi.string().optional().min(0).max(50).messages({
    "string.max": "Please input characters less than 50",
  }),
});

export default function CompanyAddModal({
  isOpen,
  onClose,
}: CompanyAddModalProps) {
  const {
    getValues,
    control,
    register,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: joiResolver(addCompanyModalSchema),
    defaultValues: {
      companyName: undefined,
      companyURL: undefined,
      companyAddress: undefined,
      recruiterName: undefined,
      recruiterEmail: undefined,
      recruiterNumber: undefined,
    },
    mode: "all",
  });

  const [rate, setRate] = useState<number>(0);
  const [newCompany, setNewCompany] = useState<Company>({});

  // const handleAddNewCompany = () => {
  //   setNewCompany({ ...getValues(), id: uuidv4(), rate });
  //   console.log(newCompany);
  //   (async () => {
  //     const response = await companyService.addCompany(newCompany);

  //     console.log(response);
  //   })();
  // };

  // const handleInputChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setNewCompany({ ...newCompany, [name]: value });
  // };

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
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextField
                    onBlur={() => {
                      field.onBlur();
                    }}
                    {...register("companyName")}
                    required
                    label="Company Name"
                    variant="standard"
                    fullWidth
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={7}>
              <Controller
                name="companyURL"
                control={control}
                render={({ field }) => (
                  <TextField
                    onBlur={() => {
                      field.onBlur();
                    }}
                    {...register("companyURL")}
                    required
                    label="Company URL"
                    variant="standard"
                    fullWidth
                    error={!!errors.companyURL}
                    helperText={errors.companyURL?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="companyAddress"
                control={control}
                render={({ field }) => (
                  <TextField
                    onBlur={() => {
                      field.onBlur();
                    }}
                    {...register("companyAddress")}
                    label="Company Address"
                    variant="standard"
                    fullWidth
                    error={!!errors.companyAddress}
                    helperText={errors.companyAddress?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                name="recruiterName"
                control={control}
                render={({ field }) => (
                  <TextField
                    onBlur={() => {
                      field.onBlur();
                    }}
                    {...register("recruiterName")}
                    label="Recruiter Name"
                    variant="standard"
                    fullWidth
                    error={!!errors.recruiterName}
                    helperText={errors.recruiterName?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                name="recruiterEmail"
                control={control}
                render={({ field }) => (
                  <TextField
                    onBlur={() => {
                      field.onBlur();
                    }}
                    {...register("recruiterEmail")}
                    label="Recruiter Email"
                    variant="standard"
                    fullWidth
                    error={!!errors.recruiterEmail}
                    helperText={errors.recruiterEmail?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                name="recruiterNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    onBlur={() => {
                      field.onBlur();
                    }}
                    {...register("recruiterNumber")}
                    label="Recruiter Number"
                    variant="standard"
                    fullWidth
                    error={!!errors.recruiterNumber}
                    helperText={errors.recruiterNumber?.message}
                    {...field}
                  />
                )}
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
            onClick={async () => {
              // const result = await trigger();

              // console.log(getValues());
              // setNewCompany();
              const response = await companyService.addCompany({
                ...getValues(),
                id: uuidv4(),
                rate,
              });
              console.log(response);
            }}
            variant="contained"
            color="success"
            // onClick={handleAddNewCompany}
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
