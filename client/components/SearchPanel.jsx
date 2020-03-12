import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import { CSSTransition } from 'react-transition-group';

const SearchPanel = ({ start }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  const handleClickSearch = () => {
    setCollapsed(true);
    start(searchValue);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      setCollapsed(true);
      start(searchValue);
    }
  };

  const handleSearchInput = e => setSearchValue(e.target.value);

  return (
    <div className={collapsed ? 'search-panel-wrapper collapsed' : 'search-panel-wrapper'}>
      <div className="search-panel">
        <CSSTransition in={!collapsed} classNames="fade" timeout={500} mountOnEnter unmountOnExit>
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
      </div>
    </div>
  );
};

export default SearchPanel;
