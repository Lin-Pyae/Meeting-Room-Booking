import React from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Home from "./components/Home";
import Booking from "./components/Booking";
import MeetingRoom from "./components/MeetingRoom";
import Err from "./components/Err";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import cloak from "./keycloak/Keycloak";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import PrivateRoute from "./keycloak/PrivateRoute";

const App = () => {
  return (
    <ReactKeycloakProvider authClient={cloak}>
      <Router>
        <NavBar />
        <SetRoutes />
      </Router>
    </ReactKeycloakProvider>
  );
};

const SetRoutes = () => {
  const { keycloak } = useKeycloak();
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/booking"
        element={
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="/meetingRoom"
        element={
          keycloak.authenticated ? (
            keycloak.hasRealmRole("admin") ? (
              <PrivateRoute>
                <MeetingRoom />
              </PrivateRoute>
            ) : (
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            )
          ) : (
            <PrivateRoute>
              <MeetingRoom />
            </PrivateRoute>
          )
        }
      ></Route>

      <Route
        path="*"
        element={
          <PrivateRoute>
            <Err />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};
export default App;
