import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function TotalTable({ searchString, totalSentimentResult }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="total table">
        <TableHead>
          <TableRow>
            <TableCell>Search string</TableCell>
            {Object.keys(totalSentimentResult).map((key, i) => (
              <TableCell key={String(i)} align="center">
                {key}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{searchString}</TableCell>
            {Object.values(totalSentimentResult).map((value, i) => (
              <TableCell key={String(i)} align="center">
                {value}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
