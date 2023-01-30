import React, { useState, useEffect, useRef } from "react";
import { useKeycloak } from "@react-keycloak/web";

const Home = () => {
  const [bookings, setBookings] = useState(null);
  const { keycloak } = useKeycloak();
  const title = useRef();
  const date = useRef();
  const startTime = useRef();
  const endTime = useRef();
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

  const handleUpdate = (e) => {
    console.log(e.target.parentNode.parentNode.firstChild);
    document.getElementById("updateForm").classList = "d-block";
    document.getElementById("title").value =
      e.target.parentNode.parentNode.firstChild.innerHTML;
    document.getElementById("date").value =
      e.target.parentNode.parentNode.children[2].innerHTML;
    console.log(
      e.target.parentNode.parentNode.children[3].innerHTML.split(",")[1]
    );
    document.getElementById("startTime").value =
      e.target.parentNode.parentNode.children[3].innerHTML.split(",")[1];
  };
  //   let filtered = bookings.filter((x) => currentTime < x.end_time);

  console.log(bookings);
  return (
    <>
      <form id="updateForm" className="mb-4 d-none">
        <div className="row">
          <div className="col-2">
            <input
              ref={title}
              id="title"
              type="text"
              className="form-control"
              placeholder="Meeting Title"
            />
          </div>
          <div className="col-2">
            <input
              ref={date}
              id="date"
              type="date"
              className="form-control"
              placeholder="Date"
            />
          </div>
          <div className="col-2">
            <input
              ref={startTime}
              id="startTime"
              type="time"
              className="form-control"
              placeholder="Start Time"
            />
          </div>
          <div className="col-2">
            <input
              ref={endTime}
              type="time"
              className="form-control"
              placeholder="End Time"
            />
          </div>
        </div>
      </form>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th>Meeting Title</th>
            <th>Attendess</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Room Name</th>
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
                  <td>{booking.RoomName}</td>
                  <td>
                    <button onClick={handleUpdate}>Update</button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
