import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return navigate("/login");
  return children;
};

export default PrivateRoute;
