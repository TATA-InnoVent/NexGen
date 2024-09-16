


export const COMPONENT_PROMPT = `
  This component is responsible for the website's navigation bar.
  It contains inline CSS only for simplicity and minimal styling.

  {
  "componentName": "Navbar",
  "type": "functional",
  "description": "This component displays the navigation menu with links to different sections.",
  "imports": [
    {
      "module": "React",
      "import": "import React from 'react';"
    }
  ],
  "structure": [
    {
      "tag": "nav",
      "attributes": {
        "style": "{ display: 'flex', justifyContent: 'space-between', padding: '10px' }"
      },
      "children": [
        {
          "tag": "h1",
          "attributes": {
            "style": "{ fontSize: '24px' }"
          },
          "text": "Home City"
        },
        {
          "tag": "ul",
          "attributes": {
            "style": "{ display: 'flex', listStyle: 'none' }"
          },
          "children": [
            {
              "tag": "li",
              "attributes": {
                "style": "{ marginRight: '20px' }"
              },
              "text": "About"
            },
            {
              "tag": "li",
              "attributes": {
                "style": "{ marginRight: '20px' }"
              },
              "text": "Contact"
            },
            {
              "tag": "li",
              "text": "Services"
            }
          ]
        }
      ]
    }
  ]
}
`


import React from 'react';

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <h1 style={{ fontSize: '24px' }}>Home City</h1>
            <ul style={{ display: 'flex', listStyle: 'none' }}>
                <li style={{ marginRight: '20px' }}>About</li>
                <li style={{ marginRight: '20px' }}>Contact</li>
                <li>Services</li>
            </ul>
        </nav>
    );
};

export default Navbar;