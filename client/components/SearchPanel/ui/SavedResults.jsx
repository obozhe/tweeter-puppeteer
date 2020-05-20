import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import RestController from '../../../utils/RestController';

import './SavedResults.scss';

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString();
};

export default function SavedResults({ savedResults, openResults, loadResults }) {
  const deleteResults = (id) => {
    RestController.deleteResultsById(id).then(loadResults);
  };

  return (
    <div className="saved-results">
      <table>
        <tbody>
          {savedResults.map((result, i) => (
            <tr className="row" key={String(i)}>
              <td className="cell">{result.searchString}</td>
              <td className="cell right">{result.total.score}</td>
              <td className="cell right">{formatDate(result.createdAt)}</td>
              <td className="cell button">
                <IconButton onClick={() => openResults(result.id)} aria-label="open">
                  <OpenIcon />
                </IconButton>
              </td>
              <td className="cell button">
                <IconButton
                  onClick={() => deleteResults(result.id)}
                  color="secondary"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
