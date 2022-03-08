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

import ApplicationService from "@services/application";
import styled from "styled-components";
import { Application } from "@global/application";

const StyledTableRow = styled(TableRow)`
  &:hover {
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;

interface ApplicationTableProps {
  ApplicationData: Application[];
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
              <TableCell>Application Create Time</TableCell>
              <TableCell>Application Experience Level</TableCell>
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
                  {Application.dateCreated}
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
  applications: Application[];
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

      {console.log("Application list render")}

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
