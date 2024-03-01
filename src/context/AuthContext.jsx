import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = localStorage.getItem("userData");
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

  const logIn = (userData) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
