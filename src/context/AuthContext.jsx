import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = localStorage.getItem("userData");
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

  const navigate = useNavigate();

  const logIn = (userData) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logOut = () => {
    setUser(null);
    navigate("/");
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
