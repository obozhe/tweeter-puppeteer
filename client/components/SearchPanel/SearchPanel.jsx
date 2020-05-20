import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import { CSSTransition } from 'react-transition-group';

import SavedResults from './ui/SavedResults';

import './SearchPanel.scss';

export default function SearchPanel({
  start,
  savedResults,
  openResults,
  close,
  loadResults,
  backToInit,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  const handleClickSearch = () => {
    setCollapsed(true);
    start(searchValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setCollapsed(true);
      start(searchValue);
    }
  };

  const handleSearchInput = (e) => setSearchValue(e.target.value);
  return (
    <div className={collapsed || close ? 'search-panel-wrapper collapsed' : 'search-panel-wrapper'}>
      <div className="search-panel">
        <CSSTransition
          in={!(collapsed || close)}
          classNames="fade"
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          <span className="search-panel-text">
            Find out how people feel on Twitter about different subjects
          </span>
        </CSSTransition>
        <div className="search-panel-input">
          <input onKeyPress={handleKeyPress} onChange={handleSearchInput} type="text" />
          <IconButton onClick={handleClickSearch} disabled={!searchValue}>
            <Search />
          </IconButton>
        </div>
        {(collapsed || close) && (
          <div className="back-button">
            <IconButton onClick={backToInit}>
              <BackIcon />
            </IconButton>
          </div>
        )}
        <CSSTransition
          in={!(collapsed || close)}
          classNames="fade"
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          <>
            {savedResults.length !== 0 && (
              <SavedResults
                savedResults={savedResults}
                openResults={openResults}
                loadResults={loadResults}
              />
            )}
          </>
        </CSSTransition>
      </div>
    </div>
  );
}
