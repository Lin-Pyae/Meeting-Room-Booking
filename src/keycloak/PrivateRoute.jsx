import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return isLoggedIn ? children : <Navigate to={-1} />;
};

export default PrivateRoute;
