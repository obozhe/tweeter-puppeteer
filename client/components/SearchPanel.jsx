import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';

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
        <input onKeyPress={handleKeyPress} onChange={handleSearchInput} type="text" />
        <IconButton onClick={handleClickSearch} disabled={!searchValue}>
          <Search />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchPanel;
