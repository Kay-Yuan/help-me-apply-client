import { useEffect, useState, memo } from "react";
import { Box, TablePagination, CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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

interface CompanyTableProps {
  companyData: Company[];
}

function BasicTable(props: CompanyTableProps) {
  const { companyData } = props;

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Recruiter Name</TableCell>
              <TableCell>Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData.map((company) => (
              <TableRow key={company.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {company.companyName}
                </TableCell>
                <TableCell>{company.recruiterName}</TableCell>
                <TableCell>{company.rate}</TableCell>
              </TableRow>
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

function CompanyList({ isLoading, companies }: { isLoading: boolean; companies: Company[] }) {
  return (
    <>
      {isLoading && (
        <Box component="div" display="flex" alignItems="center" justifyContent="center" height="300px">
          <CircularProgress />
        </Box>
      )}

      {console.log("company list render")}

      {!isLoading &&
        (companies.length === 0 ? (
          <Box component="div" mt={2}>
            No companies found
          </Box>
        ) : (
          <BasicTable companyData={companies} />
        ))}
    </>
  );
}

export default CompanyList;
