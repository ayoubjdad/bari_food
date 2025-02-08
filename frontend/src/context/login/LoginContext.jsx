import React, { createContext, useState, useContext } from "react";

// Create a Login Context
const LoginContext = createContext();

// Login Provider Component
export const LoginProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null); // Add user state

  // Function to log in the user
  const login = (userData) => {
    setLogged(true);
    setUser(userData); // Set user data
  };

  // Function to log out the user
  const logout = () => {
    setLogged(false);
    setUser(null); // Clear user data
  };

  return (
    <LoginContext.Provider value={{ logged, user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use login context
export const useLogin = () => {
  return useContext(LoginContext);
};
