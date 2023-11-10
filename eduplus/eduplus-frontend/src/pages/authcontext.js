// authcontext.js
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" || false
  );
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user.username);
    setCurrentUser({ ...user, role: user.role }); // Include the role in the currentUser

    // Save to localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user.username);
    localStorage.setItem("currentUser", JSON.stringify({ ...user, role: user.role }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setCurrentUser(null);

    // Remove from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("currentUser");

    navigate("/home");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
