'use ai:[gemini]'


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

const App = () => {
  return (
    <div style={{width:'100vw'}}>
      <About />
    </div>
  );
};

export default App;
