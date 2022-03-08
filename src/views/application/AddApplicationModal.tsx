import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { Modal, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSnackbar } from "notistack";

import { LoadingButton } from "@mui/lab";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import JobService from "@services/job";
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
} from "@mui/material";

import applicationService from "@services/application";
import { minWidth } from "@mui/lab/node_modules/@mui/system";

interface ApplicationAddModalProps {
  open: boolean;
  onClose: () => void;
  reload: () => void;
}

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid gold",
  boxShadow: 24,
  p: 4,
};

const addApplicationModalSchema = Joi.object().keys({
  dateCreated: Joi.date().timestamp().required().messages({
    "string.empty": "Application title is required",
  }),
  applicationStatus: Joi.string().optional().min(0).max(150).messages({
    "string.empty": "Application URL is required",
    "string.max": "Please input characters less than 150",
  }),
  expectedSalary: Joi.number().optional().min(0).max(255).messages({
    "string.max": "Please input characters less than 255",
  }),
});

export default function ApplicationAddModal({
  onClose,
  reload,
}: ApplicationAddModalProps) {
  const {
    getValues,
    control,
    register,
    formState: { errors },
    setValue,
    reset,
    trigger,
  } = useForm({
    resolver: joiResolver(addApplicationModalSchema),
    defaultValues: {
      jobId: undefined,
      dateCreated: undefined,
      applicationStatus: undefined,
      expectedSalary: undefined,
    },
    mode: "all",
  });

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jobOptions, setJobOptions] = useState([]);
  const [searchJobByTitle, setSearchJobByTitle] = useState<string>("");

  useEffect(() => {
    if (searchJobByTitle !== "") {
      (async () => {
        const response = await JobService.getJobByTitle(searchJobByTitle);
        // console.log(response);
        const _remaprJobOptions = response.length
          ? response.map((job) => ({
              label: job.jobTitle,
              id: job.id,
            }))
          : [];
        setJobOptions(_remaprJobOptions);
      })();
    }
  }, [searchJobByTitle]);

  const handleCreate = async () => {
    setIsLoading(true);

    const response = await applicationService.addApplication(getValues());

    setIsLoading(false);

    onClose();
    reset();
    enqueueSnackbar("Application added successfully", { variant: "success" });
    reload();
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Application
        </Typography>

        <hr />

        <Autocomplete
          disablePortal
          options={jobOptions}
          sx={{ width: 500 }}
          onChange={(_, newValue, reason) => {
            if (reason === "selectOption") setValue("jobId", newValue.id);
          }}
          onInputChange={(_, newInputValue) => {
            setSearchJobByTitle(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} required label="Job" variant="standard" />
          )}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            );
          }}
        />

        <Typography
          component="form"
          id="modal-modal-description"
          sx={{ mt: 2, mb: 4 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Controller
                name="applicationStatus"
                control={control}
                render={({ field }) => (
                  <TextField
                    onBlur={field.onBlur}
                    {...register("applicationStatus")}
                    label="Application Status"
                    variant="standard"
                    fullWidth
                    error={!!errors.applicationStatus}
                    helperText={errors.applicationStatus?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="expectedSalary"
                control={control}
                render={({ field }) => (
                  <TextField
                    onBlur={() => {
                      field.onBlur();
                    }}
                    {...register("expectedSalary")}
                    label="Expected Salary"
                    variant="standard"
                    fullWidth
                    error={!!errors.expectedSalary}
                    helperText={errors.expectedSalary?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Typography>
        <hr />

        <Typography id="modal-modal-action" sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            onClick={handleCreate}
            loading={isLoading}
            variant="contained"
            color="success"
            // onClick={handleAddNewApplication}
            autoFocus
            style={{ marginLeft: "15px" }}
            disabled={isLoading}
          >
            Add
          </LoadingButton>
        </Typography>

        {/* <CircularProgress /> */}
      </Box>
    </Modal>
  );
}
