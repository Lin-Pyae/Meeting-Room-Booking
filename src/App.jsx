import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Home from "./components/Home";
import Booking from "./components/Booking";
import MeetingRoom from "./components/MeetingRoom";
import Err from "./components/Err";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import cloak from "./keycloak/Keycloak";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import PrivateRoute from "./keycloak/PrivateRoute";
import AddmeetingRoom from "./components/AddmeetingRoom";
import AddBooking from "./components/AddBooking";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
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

  useEffect(() => {
    localStorage.setItem("keycloakToken", keycloak.token);
  }, [keycloak.token]);

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
              <Navigate to={-1} />
            )
          ) : (
            <PrivateRoute>
              <MeetingRoom />
            </PrivateRoute>
          )
        }
      ></Route>

      <Route
        path="/addMeetingRoom"
        element={
          <PrivateRoute>
            <AddmeetingRoom />
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="/addBooking"
        element={
          <PrivateRoute>
            <AddBooking />
          </PrivateRoute>
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
