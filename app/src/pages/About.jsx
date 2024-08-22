'use ai:[gemini]'





export const COMPONENT_PROMPT = `
  Create a about component only which have a navbar and a footer with hero sections

  Use Inline CSS only and dont add more and excessive css with the external and internal css

  The hero section must have two parts seperated vertically having 50% width each from each other one side there must be a photo and the other side must have text related to the photo
`


// import React, {useState} from 'react'
// import { Link, Route, Routes } from "react-router-dom";
// import { useUserContext } from "./../userContext.jsx";

// const About = () => {
//   const { user, updateUser } = useUserContext();
//   const [inputText, setInputText] = useState('')
//   const handleUpdate = () =>{
//     updateUser(inputText)
//     // alert(inputText)
//   }
//   return (
//     <div style={{border:'1px solid black', padding:'10px 10px'}}>
//     <div>Hello World</div>
//     <input value={inputText} onChange={(e)=>setInputText(e.target.value)}/>
//     <br />
//     <button onClick={handleUpdate}>Alert me</button>
//     <br/>
//     <br/>
//     <Link to={'/Contact'}>Contact</Link>
//     </div>
//   )
// }

// export default About
import React from 'react';

const About = () => {
  return (
    <div>
      <nav style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
        <h1 style={{ margin: 0 }}>My Website</h1>
      </nav>
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        <div style={{ width: '50%', backgroundImage: 'url("https://via.placeholder.com/500")', backgroundSize: 'cover' }}></div>
        <div style={{ width: '50%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>About Me</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nisl vitae nisl.</p>
        </div>
      </div>
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <p>Copyright &copy; My Website</p>
      </footer>
    </div>
  );
};

export default About;