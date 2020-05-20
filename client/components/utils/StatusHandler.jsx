import React, { useState } from 'react';
import Spinner from '@material-ui/icons/DonutLargeRounded';
import Done from '@material-ui/icons/DoneOutlineRounded';
import Error from '@material-ui/icons/Error';

import './StatusHandler.scss';

export default function StatusHandler({ statuses }) {
  return (
    <div className="status-wrapper">
      <ul className="status-list">
        {statuses.map((status, i) => {
          return i + 1 !== statuses.length || status.done ? (
            <li key={String(i)} className="done">
              <Done />
              <span>{status.message}</span>
            </li>
          ) : status.error ? (
            <li key={String(i)}>
              <Error style={{ color: '#d44545' }} />
              <span>{status.message}</span>
            </li>
          ) : (
            <li key={String(i)}>
              <Spinner className="spin" />
              <span>{status.message}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
