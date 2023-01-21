import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

const NavBar = () => {
  const { keycloak } = useKeycloak();
  // const token = keycloak.token;
  // const [Token, setToken] = useState();

  // useEffect(() => {
  //   if (token) {
  //     setToken(jwt_decode(token));
  //   }
  // }, [token]);

  // let userRole = Token ? Token.realm_access.roles[0] : null;
  // console.log(userRole);
  const navigate = useNavigate();
  const isLoggedIn = keycloak.authenticated;
  const Logout = () => {
    localStorage.clear();
    navigate("/");
    keycloak.logout();
  };
  return (
    <div className="navContainer">
      <div className="pages">
        <div className="page">
          <NavLink to={"/home"} className="btn btn-outline-primary">
            Home
          </NavLink>
        </div>
        <div className="page">
          <NavLink to={"/booking"} className="btn btn-outline-primary">
            Booking
          </NavLink>
        </div>
        <div className="page">
          {keycloak.hasRealmRole("admin") ? (
            <NavLink to={"/meetingRoom"} className="btn btn-outline-primary">
              Meeting Rooms
            </NavLink>
          ) : null}
        </div>
        <div className="page">
          {keycloak.hasRealmRole("admin") ? (
            <NavLink to={"/addMeetingRoom"} className="btn btn-outline-primary">
              Add Meeting Rooms
            </NavLink>
          ) : null}
        </div>
      </div>

      <div className="loginout">
        <div className="loginoutBtn">
          {isLoggedIn ? (
            <button
              className="btn btn-danger"
              onClick={() => {
                Logout();
              }}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
