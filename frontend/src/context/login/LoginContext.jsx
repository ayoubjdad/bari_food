import React, { createContext, useState, useContext } from "react";

// Create a Login Context
const LoginContext = createContext();

// Login Provider Component
export const LoginProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");

  const [logged, setLogged] = useState(Boolean(storedUser));
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null); // Add user state

  // Function to log in the user
  const login = (userData) => {
    setLogged(true);
    setUser(userData); // Set user data
    localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
  };

  // Function to log out the user
  const logout = () => {
    setLogged(false);
    setUser(null); // Clear user data
    localStorage.removeItem("user"); // Remove user from localStorage
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
