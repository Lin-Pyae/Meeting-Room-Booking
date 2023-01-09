import React, { useEffect, useState } from "react";
import "./meetingRoom.css";

const MeetingRoom = () => {
  const [room, setRoom] = useState([]);
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
  });
  console.log(room);
  return (
    <>
      <div className="meetingRoomContainer">
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
      </div>
      <table>
        {room.map((roo, i) => (
          <p>{roo.room_name}</p>
        ))}
        {/* <thead>
          <tr>
            <td>Room Name</td>
            <td>Location</td>
            <td>Capacity</td>
            <td>Facilities</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5A</td>
            <td>5th floor</td>
            <td>5</td>
            <td>aircon</td>
            <td>True</td>
          </tr>
        </tbody> */}
      </table>
    </>
  );
};

export default MeetingRoom;
