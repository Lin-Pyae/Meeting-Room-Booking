import React, { useEffect, useState } from "react";
import "./meetingRoom.css";

const MeetingRoom = () => {
  const [room, setRoom] = useState([]);
  const [updateRoom, setupdateRoom] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/getAllRooms", {
      method: "GET",
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZXMiOiJ1c2VyIn0.Y7eueui2xsh8rhVaa-nHjxestvcpJYEc8Y5qfU8HziM",
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
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setupdateRoom(data));
  };

  const changeUpdate = (event) => {
    setupdateRoom({ ...updateRoom, room_name: event.target.value });
    console.log(updateRoom);
  };

  return (
    <>
      {/* <div className="meetingRoomContainer">
        <form>
          <fieldset>
            <legend>Meeting Room</legend>

            <div className="inputContainer">
              <p className="labels">Room Name</p>
              <input type="text" />
            </div>

            <div className="inputContainer">
              <p className="labels">Location</p>
              <input type="text" />
            </div>

            <div className="inputContainer">
              <p className="labels">Capacity</p>
              <select name="capacity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="inputContainer">
              <p className="labels">Facilities</p>
              <input type="checkbox" id="microphone" />
              <label className="cLabels" htmlFor="microphone">
                Microphone
              </label>
              <input type="checkbox" id="projector" />
              <label className="cLabels" htmlFor="projector">
                Projector
              </label>
              <input type="checkbox" id="aircon" />
              <label className="cLabels" htmlFor="aircon">
                Aircon
              </label>
            </div>
            <button>Add</button>
          </fieldset>
        </form>
      </div> */}
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

      <form className="meetingUpdateForm">
        <fieldset>
          <legend>Meeting Room</legend>

          <div className="inputContainer">
            <p className="labels">Room Name</p>
            <input
              type="text"
              value={
                JSON.stringify(updateRoom) === "" ? "" : updateRoom.room_name
              }
              onChange={changeUpdate}
            />
          </div>

          <div className="inputContainer">
            <p className="labels">Location</p>
            <input
              type="text"
              value={
                JSON.stringify(updateRoom) === "" ? "" : updateRoom.location
              }
            />
          </div>

          <div className="inputContainer">
            <p className="labels">Capacity</p>
            <input
              type="number"
              value={
                JSON.stringify(updateRoom) === "" ? "" : updateRoom.capacity
              }
            />
          </div>

          <div className="inputContainer">
            <p className="labels">Facilities</p>
            <input type="checkbox" id="microphone" />
            <label className="cLabels" htmlFor="microphone">
              Microphone
            </label>
            <input type="checkbox" id="projector" />
            <label className="cLabels" htmlFor="projector">
              Projector
            </label>
            <input type="checkbox" id="aircon" />
            <label className="cLabels" htmlFor="aircon">
              Aircon
            </label>
          </div>
          <button>Add</button>
        </fieldset>
      </form>
    </>
  );
};

export default MeetingRoom;
