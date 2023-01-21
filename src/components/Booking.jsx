import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [meetingRoom, setMeetingRoom] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/getAllRooms", {
      method: "GET",
      headers: {
        token: localStorage.getItem("keycloakToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setMeetingRoom(data));
  }, []);

  const handleBook = (id, name) => {
    fetch(`http://127.0.0.1:8000/getBookingsByRoomId/${id}`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("keycloakToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        navigate("/addBooking", {
          state: { data: data, room_name: name, roomId: id },
        })
      );
  };

  return (
    <table className="table table-success table-striped">
      <thead>
        <tr>
          <th>Room Name</th>
          <th>Location</th>
          <th>Capacity</th>
          <th>Facilities</th>
        </tr>
      </thead>
      <tbody>
        {meetingRoom.map((room, index) => (
          <tr key={index}>
            <td>{room.room_name}</td>
            <td>{room.location}</td>
            <td>{room.capacity}</td>
            <td>
              {room.facilities.map((facility, i) => (
                <p key={i}>{facility}</p>
              ))}
            </td>
            <td>
              {room.status === true ? (
                <b>Renovation In Process</b>
              ) : (
                <button
                  class="btn btn-success"
                  onClick={() => handleBook(room._id, room.room_name)}
                >
                  Book Room
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Booking;
