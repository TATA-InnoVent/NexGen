// userContext.js

import React, { createContext, useContext, useState } from "react";

// Create a new context object
const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);

// Create a provider component to wrap your application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('rohit'); // Initialize user state with null or initial user data

  // Example function to update user data
  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  // Value object that holds the context state and any methods you want to expose
  const contextValue = {
    user,
    updateUser,
  };

  // Return the provider with the provided context value
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
