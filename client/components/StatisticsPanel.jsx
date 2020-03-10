import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TweetsTable from './TweetsTable';
import Chart from './Chart';

const StatisticsPanel = ({ analyzeResults: { sentimentResults, totalSentimentResult } }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="total table">
          <TableHead>
            <TableRow>
              {Object.keys(totalSentimentResult).map((key, i) => (
                <TableCell key={String(i)} align="center">
                  {key}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.values(totalSentimentResult).map((value, i) => (
                <TableCell key={String(i)} align="center">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="chart">
        <Chart sentimentResults={sentimentResults} />
      </div>
      <TweetsTable sentimentResults={sentimentResults} />
    </div>
  );
};

export default StatisticsPanel;
