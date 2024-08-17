'use ai:openai'


import React from "react";
import About from "./About.jsx";
import { useUserContext } from "./../userContext";
import { Link } from "react-router-dom";

const Contact = () => {
  const { user, updateUser } = useUserContext();
  return (
    <div>
      {user}
      <Link to="/about">About</Link>
      <About />
    </div>
  );
};

export default Contact;
