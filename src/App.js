import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import PrivateRoute from "./components/PrivateRoute";
import useAuth from "./hooks/useAuth";

const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

const Main = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} />
    </Routes>
  );
};

export default App;
