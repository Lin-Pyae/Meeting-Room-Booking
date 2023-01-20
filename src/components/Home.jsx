import React, { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";

const Home = () => {
  const [bookings, setBookings] = useState(null);
  const { keycloak } = useKeycloak();
  let currentTime = Date.now();

  useEffect(() => {
    fetch(`http://localhost:8000/yourBooking/${keycloak.tokenParsed.sub}`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("keycloakToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setBookings(data.filter((x) => currentTime < x.end_time))
      );
  }, []);

  //   let filtered = bookings.filter((x) => currentTime < x.end_time);

  console.log(bookings);
  return (
    <table>
      <thead>
        <tr>
          <th>Meeting Title</th>
          <th>Attendess</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
        {bookings === null
          ? null
          : bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.meeting_title}</td>
                <td>{booking.attendess}</td>
                <td>{booking.booking_date}</td>
                <td>{new Date(booking.start_time).toLocaleString()}</td>
                <td>{new Date(booking.end_time).toLocaleString()}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default Home;
