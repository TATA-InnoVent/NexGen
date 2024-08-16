import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { UserProvider } from "./userContext";

ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    {/* <UserProvider> */}
    <BrowserRouter>
    
    <App />
    
    </BrowserRouter>
    {/* </UserProvider> */}
  </React.StrictMode>
);
