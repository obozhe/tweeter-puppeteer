import React from 'react';
import ErrorIcon from '@material-ui/icons/ErrorOutlineRounded';

const Error = () => {
  return (
    <div className="error">
      <ErrorIcon />
      Something went wrong... Wait for reconnect or refresh the page.
    </div>
  );
};

export default Error;
