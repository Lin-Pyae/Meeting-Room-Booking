import React from "react";
import "./Login.css";
import logo from "../photos/keycloak.png";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const Login = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  if (keycloak.authenticated) navigate("/home");
  return (
    <div className="loginContainer">
      <button className="keycloakLoginBtn" onClick={() => keycloak.login()}>
        Login with keycloak
      </button>
      <img src={logo} alt="" id="logo" />
    </div>
  );
};

export default Login;
