'use ai:[openai]'


import { useUserContext } from "./../userContext.jsx";
import Heading from "./../components/Heading.jsx";
import React from "react";
import { Link } from "react-router-dom";


export const COMPONENT_PROMPT = `
  Contact
`

const Contact = () => {
  const { user, updateUser } = useUserContext();
  return (
    <div>
      {user}
      <Link to="/about">About</Link>
      <Heading />
    </div>
  );
};

export default Contact;
