import React from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(159, 145, 247)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const styleTable = {
  maxHeigth: "500px"
}

export default function CustomTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={styleTable}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Número de Ticket</StyledTableCell>
            <StyledTableCell>Creación</StyledTableCell>
            <StyledTableCell>Actualización</StyledTableCell>
            <StyledTableCell>Estatus</StyledTableCell>
            <StyledTableCell>Cliente</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map((row, indx) => (
            <StyledTableRow key={indx} onDoubleClick={() => props.onDoubleClick(row.id)}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.createdAt}</StyledTableCell>
              <StyledTableCell align="left">{row.updatedAt}</StyledTableCell>
              <StyledTableCell align="left">{row.status.name}</StyledTableCell>
              <StyledTableCell align="left">{row.client.name}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
