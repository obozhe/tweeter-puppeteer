import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import TotalTable from './ui/TotalTable';
import TweetsTable from './ui/TweetsTable';
import Chart from './ui/Chart';
import SaveButtons from './ui/SaveButtons';
import RestController from '../../utils/RestController';

import './StatisticsPanel.scss';

export default function StatisticsPanel({
  analyzeResults: { sentimentResults, totalSentimentResult, searchString, createdAt },
}) {
  const saveToDb = () => {
    RestController.saveResults({
      searchString,
      sentimentResults,
      totalSentimentResult,
    }).then((res) => console.log(res));
  };

  const exportToCSV = (results, fileName) => {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const csvData = [...results].map((el) => {
      delete el.calculation;
      for (const key in el) {
        if (Array.isArray(el[key])) {
          el[key] = el[key].join(', ');
        }
      }
      return el;
    });
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div>
      <TotalTable searchString={searchString} totalSentimentResult={totalSentimentResult} />
      <div className="chart">
        <Chart sentimentResults={sentimentResults} total={totalSentimentResult} />
      </div>
      <SaveButtons
        dbAction={saveToDb}
        csvAction={() => exportToCSV(sentimentResults)}
        saved={createdAt ? true : false}
      />
      <TweetsTable sentimentResults={sentimentResults} />
    </div>
  );
}
