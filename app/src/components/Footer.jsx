


export const COMPONENT_PROMPT = `
  This component renders the footer section of the website, containing contact information, useful links, and social media icons.
  Inline CSS is used for layout and styling.

  {
  "componentName": "Footer",
  "type": "functional",
  "description": "This component displays the footer with contact info, useful links, and social media icons.",
  "imports": [
    {
      "module": "React",
      "import": "import React from 'react';"
    }
  ],
  "structure": [
    {
      "tag": "footer",
      "attributes": {
        "style": "{ backgroundColor: '#f5f5f5', padding: '40px 20px', display: 'flex', justifyContent: 'space-between' }"
      },
      "children": [
        {
          "tag": "div",
          "attributes": {
            "style": "{ width: '30%' }"
          },
          "children": [
            {
              "tag": "h3",
              "text": "Home City"
            },
            {
              "tag": "p",
              "text": "137 Bolman Court Buffalo, Logan Lane 2649"
            },
            {
              "tag": "div",
              "children": [
                {
                  "tag": "a",
                  "attributes": {
                    "href": "#",
                    "style": "{ marginRight: '10px' }"
                  },
                  "text": "Facebook"
                },
                {
                  "tag": "a",
                  "attributes": {
                    "href": "#",
                    "style": "{ marginRight: '10px' }"
                  },
                  "text": "LinkedIn"
                },
                {
                  "tag": "a",
                  "attributes": {
                    "href": "#"
                  },
                  "text": "Twitter"
                }
              ]
            }
          ]
        },
        {
          "tag": "div",
          "attributes": {
            "style": "{ width: '60%', display: 'flex', justifyContent: 'space-between' }"
          },
          "children": [
            {
              "tag": "div",
              "children": [
                {
                  "tag": "h4",
                  "text": "About"
                },
                {
                  "tag": "ul",
                  "children": [
                    {
                      "tag": "li",
                      "text": "Company"
                    },
                    {
                      "tag": "li",
                      "text": "Team"
                    },
                    {
                      "tag": "li",
                      "text": "Career"
                    },
                    {
                      "tag": "li",
                      "text": "Blogs"
                    }
                  ]
                }
              ]
            },
            {
              "tag": "div",
              "children": [
                {
                  "tag": "h4",
                  "text": "Support"
                },
                {
                  "tag": "ul",
                  "children": [
                    {
                      "tag": "li",
                      "text": "Help Center"
                    },
                    {
                      "tag": "li",
                      "text": "Loan Support"
                    },
                    {
                      "tag": "li",
                      "text": "Management"
                    },
                    {
                      "tag": "li",
                      "text": "Privacy Policy"
                    }
                  ]
                }
              ]
            },
            {
              "tag": "div",
              "children": [
                {
                  "tag": "h4",
                  "text": "Company"
                },
                {
                  "tag": "ul",
                  "children": [
                    {
                      "tag": "li",
                      "text": "Appraise"
                    },
                    {
                      "tag": "li",
                      "text": "Sell"
                    },
                    {
                      "tag": "li",
                      "text": "Mortgage"
                    },
                    {
                      "tag": "li",
                      "text": "Best Deal"
                    }
                  ]
                }
              ]
            },
            {
              "tag": "div",
              "children": [
                {
                  "tag": "h4",
                  "text": "More"
                },
                {
                  "tag": "ul",
                  "children": [
                    {
                      "tag": "li",
                      "text": "Airline Fees"
                    },
                    {
                      "tag": "li",
                      "text": "Airlines"
                    },
                    {
                      "tag": "li",
                      "text": "Low Fare Tips"
                    },
                    {
                      "tag": "li",
                      "text": "Badges"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
`


import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '40px 20px', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '30%' }}>
        <h3>Home City</h3>
        <p>137 Bolman Court Buffalo, Logan Lane 2649</p>
        <div>
          <a href="#" style={{ marginRight: '10px' }}>Facebook</a>
          <a href="#" style={{ marginRight: '10px' }}>LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
      </div>
      <div style={{ width: '60%', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h4>About</h4>
          <ul>
            <li>Company</li>
            <li>Team</li>
            <li>Career</li>
            <li>Blogs</li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Loan Support</li>
            <li>Management</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li>Appraise</li>
            <li>Sell</li>
            <li>Mortgage</li>
            <li>Best Deal</li>
          </ul>
        </div>
        <div>
          <h4>More</h4>
          <ul>
            <li>Airline Fees</li>
            <li>Airlines</li>
            <li>Low Fare Tips</li>
            <li>Badges</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;