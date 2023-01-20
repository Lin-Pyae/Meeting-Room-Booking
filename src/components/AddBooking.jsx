import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const AddBooking = () => {
  const location = useLocation();
  let currentTime = Date.now();
  const { keycloak } = useKeycloak();

  const [bookings, setBookings] = useState(location.state.data);
  const title = useRef();
  const number = useRef();
  const date = useRef();
  const start_time = useRef();
  const end_time = useRef();
  console.log(location.state);
  let filtered = bookings.filter((x) => currentTime < x.end_time);

  const handleAdd = (event) => {
    event.preventDefault();
    let s = `${date.current.value}T${start_time.current.value}:00`;
    let e = `${date.current.value}T${end_time.current.value}:00`;

    console.log(s);
    console.log(e);
    console.log(date.current.value);
    console.log(start_time.current.value);
    console.log(keycloak.tokenParsed.sub);
    fetch("http://127.0.0.1:8000/bookroom", {
      method: "POST",
      body: JSON.stringify({
        meeting_room: location.state.roomId,
        userId: keycloak.tokenParsed.sub,
        meeting_title: title.current.value,
        attendess: number.current.value,
        start_time: Date.parse(s),
        end_time: Date.parse(e),
        booking_date: date.current.value,
      }),
      headers: {
        token: localStorage.getItem("keycloakToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === false) {
          setBookings(bookings);
          alert("Room already booked at that period");
        } else {
          setBookings([...bookings, data]);
        }
        if (data === "exceed") {
          setBookings(bookings);
          alert("Attendess exceed the meeting room capacity");
        } else {
          setBookings([...bookings, data]);
        }
      });
  };
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Meeting Room Name : {location.state.room_name}
      </h1>

      <form>
        <input ref={title} type="text" />
        <input ref={number} type="number" />
        <input ref={date} type="date" />
        <input ref={start_time} type="time" />
        <input ref={end_time} type="time" />
        <button onClick={handleAdd}>Book</button>
      </form>
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
          {filtered.map((room, index) => (
            <tr key={index}>
              <td>{room.meeting_title}</td>
              <td>{room.attendess}</td>
              <td>{room.booking_date}</td>
              <td>{new Date(room.start_time).toLocaleString()}</td>
              <td>{new Date(room.end_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AddBooking;
