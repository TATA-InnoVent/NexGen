'use ai:[gemini]'


/**
 * This component is designed to render a search bar with a dropdown menu for selecting the search type (Buy, Rent, or Sell) 
 * and an input field for entering a keyword. When the search button is clicked, it logs a message to the console indicating 
 * the search type and keyword. The component uses the useState hook to manage the state of the search type and keyword. 
 * The component's structure is simple and easy to follow, with a clear separation of concerns between the state management, 
 * event handling, and rendering. However, there are some potential improvements that could be made, such as adding validation 
 * for the keyword input, handling errors, and implementing a more robust search functionality. Additionally, the component's 
 * styles are currently hardcoded, which could be extracted into a separate CSS file for better maintainability.
 * 
 * Add Proper Styling to it and make look beautifuly in dark theme
 */




import React, { useState } from 'react';

const SearchBar = () => {
  const [searchType, setSearchType] = useState('Buy');
  const [keyword, setKeyword] = useState('');

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    console.log(`Searching for ${searchType}: ${keyword}`);
  };

  return (
    <div style={{ minWidth:'40vw' ,display: 'flex', alignItems: 'center',justifyContent:'center', padding: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
      <select value={searchType} onChange={handleSearchTypeChange} style={{ backgroundColor: '#555', color: '#fff', border: 'none', padding: '8px', borderRadius: '3px', marginRight: '10px' }}>
        <option value="Buy">Buy</option>
        <option value="Rent">Rent</option>
        <option value="Sell">Sell</option>
      </select>
      <input
        type="text"
        placeholder="Enter keyword..."
        value={keyword}
        onChange={handleKeywordChange}
        style={{ flex: 1, padding: '8px', borderRadius: '3px', border: 'none', backgroundColor: '#444', color: '#fff' }}
      />
      <button onClick={handleSearch} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '3px', marginLeft: '10px', cursor: 'pointer' }}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
