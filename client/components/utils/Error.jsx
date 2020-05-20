import React from 'react';
import ErrorIcon from '@material-ui/icons/ErrorOutlineRounded';

import './Error.scss';

export default function Error() {
  return (
    <div className="error">
      <ErrorIcon />
      Something went wrong... Wait for reconnect or refresh the page.
    </div>
  );
}
