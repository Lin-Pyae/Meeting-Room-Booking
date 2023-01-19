import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
const AddBooking = () => {
  const location = useLocation();
  let currentTime = Date.now();

  const [bookings, setBookings] = useState(location.state.data);
  const title = useRef();
  const number = useRef();
  const date = useRef();
  const start_time = useRef();
  const end_time = useRef();
  console.log(location.state);
  let test = bookings.filter((x) => currentTime < x.start_time);
  console.log(test);
  const handleAdd = (event) => {
    event.preventDefault();
    let s = `${date.current.value} ${start_time.current.value} GMT`;
    let e = `${date.current.value} ${end_time.current.value} GMT`;
    console.log(s);
    console.log(e);
    console.log(start_time.current.value);
    fetch("http://127.0.0.1:8000/bookroom", {
      method: "POST",
      body: JSON.stringify({
        meeting_room: location.state.roomId,
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
        <button onClick={handleAdd}>Add Room</button>
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
          {bookings.map((room, index) => (
            <tr key={index}>
              <td>{room.meeting_title}</td>
              <td>{room.attendess}</td>
              <td>{room.booking_date}</td>
              <td>{`${new Date(room.start_time).getUTCHours()}:${new Date(
                room.start_time
              ).getUTCMinutes()}`}</td>
              <td>{`${new Date(room.end_time).getUTCHours()}:${new Date(
                room.end_time
              ).getUTCMinutes()}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AddBooking;
