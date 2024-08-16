

import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from "react-router-dom";
import About from './pages/About'
import Contact from "./pages/Contact";
import { UserProvider } from './userContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserProvider>
    <div >
      <div style={{border:'1px solid black', padding:'10px 10px', gap:'10px', display:'flex', flexDirection:'column'}}>
      <Link to="/contact" >
      Contact
      </Link>
      <Link to="/about">
        About
      </Link>
      </div>

      <Routes>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
    </UserProvider>
  )
}

export default App
