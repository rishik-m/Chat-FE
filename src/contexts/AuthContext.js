import React, { createContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../utils/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const register = async (username, email, password) => {
    const data = await registerUser(username, email, password);
    const { jwt, user: newUser } = data;
    localStorage.setItem("user", JSON.stringify({ ...newUser, jwt }));
    setUser({ ...newUser, jwt });
  };

  const login = async (identifier, password) => {
    const data = await loginUser(identifier, password);
    const { jwt, user: loggedInUser } = data;
    localStorage.setItem("user", JSON.stringify({ ...loggedInUser, jwt }));
    setUser({ ...loggedInUser, jwt });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
