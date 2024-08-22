'use ai:[groq]'


export const COMPONENT_PROMPT = `
  This is the main entrypoint file
  This file does not contain any styling and structure except calling the component

  Use Inline CSS only and dont add more and excessive css with the external css


  {
  "componentName": "App",
  "type": "functional",
  "description": "Main application component that includes the About component.",
  "imports": [
    {
      "module": "React",
      "import": "import React from 'react';"
    },
    {
      "module": "./About",
      "import": "import About from './pages/About';"
    },
  ],
  }
}

`


import React from 'react';
import About from './pages/About';

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      <About />
    </div>
  );
}

export default App;