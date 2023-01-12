import React, { useEffect, useState } from "react";
import "./meetingRoom.css";
import { useNavigate } from "react-router-dom";

const MeetingRoom = () => {
  const [room, setRoom] = useState([]);
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
      .then((data) => {
        setRoom(data);
      });
  }, []);
  console.log(room);

  const handleStatusChange = (room) => {
    fetch(`http://localhost:8000/updateRoom/${room._id}`, {
      method: "PUT",
      body: JSON.stringify({ ...room, status: !room.status }),
      headers: {
        token: localStorage.getItem("keycloakToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setRoom(data));
  };

  const handleDelete = (roomId) => {
    fetch(`http://localhost:8000/deleteRoom/${roomId}`, {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("keycloakToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setRoom(data));
  };

  const handleUpdate = (roomId) => {
    fetch(`http://localhost:8000/getOneRoom/${roomId}`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("keycloakToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => navigate("/addMeetingRoom", { state: data }));
  };

  const handleAdd = () => {
    navigate("/addMeetingRoom");
  };

  return (
    <>
      <button onClick={handleAdd}>Add Meeting Room</button>
      <table className="meetingRoomTable">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Facilities</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {room.map((roo, i) => (
            <tr key={roo._id}>
              <td>{roo.room_name}</td>
              <td>{roo.location}</td>
              <td>{roo.capacity}</td>
              <td>
                {roo.facilities.map((facility, i) => (
                  <p key={i}>{facility}</p>
                ))}
              </td>
              <td>
                {roo.status === true ? <p>Engage</p> : <p>available</p>}
                <button onClick={() => handleStatusChange(roo)}>
                  Change Status
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(roo._id)}>Delete</button>
                <button onClick={() => handleUpdate(roo._id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MeetingRoom;
