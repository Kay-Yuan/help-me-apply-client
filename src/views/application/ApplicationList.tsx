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
import styled from "styled-components";

import ApplicationService from "@services/application";
import { Application } from "@global/application";

const StyledTableHead = styled(TableCell)`
  font-weight: bold;
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;

interface ApplicationWithCompanyJobTitle extends Application {
  companyName: string;
  jobTitle: string;
}

interface ApplicationTableProps {
  ApplicationData: ApplicationWithCompanyJobTitle[];
}

function BasicTable(props: ApplicationTableProps) {
  const { ApplicationData } = props;
  const navigate = useNavigate();

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHead>Company Name</StyledTableHead>
              <StyledTableHead>Job Name</StyledTableHead>
              <StyledTableHead>Application Create Time</StyledTableHead>
              <StyledTableHead>Application Status</StyledTableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {ApplicationData.map((Application) => (
              <StyledTableRow
                key={Application.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
                onClick={() => navigate(`/Application/${Application.id}`)}
              >
                <TableCell component="th" scope="row">
                  {Application.companyName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {Application.jobTitle}
                </TableCell>
                <TableCell component="th" scope="row">
                  {new Date(Application.dateCreated).toLocaleString()}
                </TableCell>
                <TableCell>{Application.applicationStatus}</TableCell>
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

function ApplicationList({
  isLoading,
  applications,
}: {
  isLoading: boolean;
  applications: ApplicationWithCompanyJobTitle[];
}) {
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

      {!isLoading &&
        (applications.length === 0 ? (
          <Box component="div" mt={2}>
            No application found
          </Box>
        ) : (
          <BasicTable ApplicationData={applications} />
        ))}
    </>
  );
}

export default ApplicationList;
