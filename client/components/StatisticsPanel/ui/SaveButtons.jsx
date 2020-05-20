import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import TableIcon from '@material-ui/icons/TableChart';
import Button from '@material-ui/core/Button';

import './SaveButtons.scss';

export default function SaveButtons({ dbAction, csvAction, saved }) {
  return (
    <div className="save-buttons">
      <div className="save-buttons-bg">
        {!saved && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={dbAction}
          >
            Save in DB
          </Button>
        )}

        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<TableIcon />}
          onClick={csvAction}
        >
          Export to Excel
        </Button>
      </div>
    </div>
  );
}
