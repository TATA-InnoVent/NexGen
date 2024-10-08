


export const COMPONENT_PROMPT = `
  This component renders a search bar with options to buy, rent, or sell properties.
  Inline CSS is used for a clean layout and minimal styling.

  {
  "componentName": "SearchBar",
  "type": "functional",
  "description": "This component provides a search functionality for property searches.",
  "imports": [
    {
      "module": "React",
      "import": "import React from 'react';"
    }
  ],
  "structure": [
    {
      "tag": "div",
      "attributes": {
        "style": "{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }"
      },
      "children": [
        {
          "tag": "select",
          "attributes": {
            "style": "{ padding: '10px', marginRight: '10px' }"
          },
          "children": [
            {
              "tag": "option",
              "text": "Buy"
            },
            {
              "tag": "option",
              "text": "Rent"
            },
            {
              "tag": "option",
              "text": "Sell"
            }
          ]
        },
        {
          "tag": "input",
          "attributes": {
            "type": "text",
            "placeholder": "Enter Keyword",
            "style": "{ padding: '10px', width: '300px', marginRight: '10px' }"
          }
        },
        {
          "tag": "button",
          "attributes": {
            "style": "{ padding: '10px 20px', backgroundColor: '#ff6600', color: '#fff', border: 'none' }"
          },
          "text": "Search"
        }
      ]
    }
  ]
}
`


import React, { useState } from 'react';

const SearchBar = () => {
    const [searchType, setSearchType] = useState('Buy');
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        console.log(`Searching for ${keyword} to ${searchType}`);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <select 
                style={{ padding: '10px', marginRight: '10px' }}
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
            >
                <option>Buy</option>
                <option>Rent</option>
                <option>Sell</option>
            </select>
            <input 
                type="text" 
                placeholder="Enter Keyword" 
                style={{ padding: '10px', width: '300px', marginRight: '10px' }} 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button 
                style={{ padding: '10px 20px', backgroundColor: '#ff6600', color: '#fff', border: 'none' }} 
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;