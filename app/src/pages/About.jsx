'use ai:openai'



import React, {useState} from 'react'
import { Link, Route, Routes } from "react-router-dom";
import { useUserContext } from "./../userContext.jsx";

export const COMPONENT_PROMPT = `
  About
`

const About = () => {
  const { user, updateUser } = useUserContext();
  const [inputText, setInputText] = useState('')
  const handleUpdate = () =>{
    updateUser(inputText)
    // alert(inputText)
  }
  return (
    <div style={{border:'1px solid black', padding:'10px 10px'}}>
    <div>Hello World</div>
    <input value={inputText} onChange={(e)=>setInputText(e.target.value)}/>
    <br />
    <button onClick={handleUpdate}>Alert me</button>
    <br/>
    <br/>
    <Link to={'/Contact'}>Contact</Link>
    </div>
  )
}

export default About