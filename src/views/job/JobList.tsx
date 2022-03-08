import { useEffect, useState, memo } from "react";
import { Box, TablePagination, CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

import JobService from "@services/job";
import styled from "styled-components";
import { Job } from "@global/job";

const StyledTableRow = styled(TableRow)`
  &:hover {
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;
interface JobTableProps {
  JobData: Job[];
}

function BasicTable(props: JobTableProps) {
  const { JobData } = props;
  const navigate = useNavigate();

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Job Location</TableCell>
              <TableCell>Job Requirement</TableCell>
              <TableCell>Job Experience Level</TableCell>

              <TableCell>Job Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {JobData.map((Job) => (
              <StyledTableRow
                key={Job.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
                onClick={() => navigate(`/Job/${Job.id}`)}
              >
                <TableCell component="th" scope="row">
                  {Job.jobTitle}
                </TableCell>
                <TableCell>{Job.jobLocation}</TableCell>
                <TableCell style={{ wordWrap: "break-word", maxWidth: "1px" }}>
                  {Job.jobRequirement}
                </TableCell>
                <TableCell>{Job.jobExperienceLevel}</TableCell>
                <TableCell>{Job.jobStatus}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* 
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={100}
        rowsPerPage={10}
        page={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      /> */}
    </Paper>
  );
}

function JobList({ isLoading, jobs }: { isLoading: boolean; jobs: Job[] }) {
  return (
    <>
      {isLoading && (
        <Box
          component="div"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      )}

      {console.log("Job list render")}

      {!isLoading &&
        (jobs.length === 0 ? (
          <Box component="div" mt={2}>
            No companies found
          </Box>
        ) : (
          <BasicTable JobData={jobs} />
        ))}
    </>
  );
}

export default JobList;
