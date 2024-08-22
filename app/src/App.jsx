'use ai:[gemini]'

import { useState } from 'react'

import { Link, Route, Routes } from "react-router-dom";

import Contact from "./pages/Contact.jsx";
import { UserProvider } from './userContext.jsx';

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

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <UserProvider>
//     <div >
//       <div style={{border:'1px solid black', padding:'10px 10px', gap:'10px', display:'flex', flexDirection:'column'}}>
//       <Link to="/contact" >
//       Contact
//       </Link>
//       <Link to="/about">
//         About
//       </Link>
//       </div>

//       <Routes>
//         <Route path="/contact" element={<Contact />}></Route>
//         <Route path="/about" element={<About />}></Route>
//       </Routes>
//     </div>
//     </UserProvider>
//   )
// }

// export default App

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