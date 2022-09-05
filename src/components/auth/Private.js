import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticate } from "./helper/auth";

const Private = ({ Component }) => {
  return isAuthenticate() ? <Component /> : <Navigate to="/signin" />;
};

export default Private;
