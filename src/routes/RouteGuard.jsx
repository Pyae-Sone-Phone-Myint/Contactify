import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
  // const token = Cookies.get("token");
  const {token}=useSelector(state=>state.authSlice);

  if (!token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default RouteGuard;
