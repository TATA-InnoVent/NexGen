


export const COMPONENT_PROMPT = `
  This component represents the hero section with a call-to-action and search bar.
  Use inline CSS for layout and minimal styling.

  {
  "componentName": "HeroSection",
  "type": "functional",
  "description": "This component renders the main hero section with a title, subtitle, and search bar.",
  "imports": [
    {
      "module": "React",
      "import": "import React from 'react';"
    },
    {
      "module": "./SearchBar",
      "import": "import SearchBar from './SearchBar';"
    }
  ],
  "structure": [
    {
      "tag": "section",
      "attributes": {
        "style": "{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px', backgroundColor: '#f9f9f9' }"
      },
      "children": [
        {
          "tag": "h2",
          "attributes": {
            "style": "{ fontSize: '36px', fontWeight: 'bold' }"
          },
          "text": "Find Your Dream House"
        },
        {
          "tag": "p",
          "attributes": {
            "style": "{ margin: '20px 0', fontSize: '16px', textAlign: 'center' }"
          },
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          "tag": "SearchBar",
          "attributes": {}
        }
      ]
    }
  ]
}
`


import React from 'react';
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>Find Your Dream House</h2>
      <p style={{ margin: '20px 0', fontSize: '16px', textAlign: 'center' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <SearchBar />
    </section>
  );
};

export default HeroSection;