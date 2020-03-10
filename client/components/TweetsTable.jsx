import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

const columns = [
  { id: 'id', label: 'ID', minWidth: 40 },
  { id: 'tweet', label: 'Tweet', minWidth: 300 },
  { id: 'score', label: 'Score', align: 'center', minWidth: 80 },
  {
    id: 'comparative',
    label: 'Comparative',
    minWidth: 80,
    align: 'center',
    format: value => value.toFixed(3)
  },
  {
    id: 'tokens',
    label: 'Total tokens',
    minWidth: 80,
    align: 'center',
    format: value => value.length
  },
  {
    id: 'positive',
    label: 'Positive tokens',
    minWidth: 170,
    align: 'right',
    format: value => value.join(', ')
  },
  {
    id: 'negative',
    label: 'Negative tokens',
    minWidth: 170,
    align: 'right',
    format: value => value.join(', ')
  }
];

const TweetsTable = ({ sentimentResults }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer className="tweets-table">
        <Table stickyHeader aria-label="tweets table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sentimentResults
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={String(i)}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={sentimentResults.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TweetsTable;
