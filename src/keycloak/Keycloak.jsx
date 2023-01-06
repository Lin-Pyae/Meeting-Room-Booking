import Keycloak from "keycloak-js";

const cloak = new Keycloak({
  url: "http://localhost:8080/auth/",
  realm: "Meeting Room Booking",
  clientId: "Meeting-Room-Booking-System",
});

export default cloak;
