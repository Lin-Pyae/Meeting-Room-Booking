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
    navigate("/");
    keycloak.logout();
  };
  return (
    <div className="navContainer">
      <div className="pages">
        <div className="page">
          <NavLink to={"/home"}>Home</NavLink>
        </div>
        <div className="page">
          <NavLink to={"/booking"}>Booking</NavLink>
        </div>
        <div className="page">
          <NavLink to={"/meetingRoom"}>Meeting Rooms</NavLink>
        </div>
      </div>

      <div className="loginout">
        <div className="loginoutBtn">
          {isLoggedIn ? (
            <button
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
