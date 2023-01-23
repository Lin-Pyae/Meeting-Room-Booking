import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [meetingRoom, setMeetingRoom] = useState([]);
  const [Room, setRoom] = useState([]);
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
        setMeetingRoom(data);
        setRoom(data);
      });
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

  const fdate = useRef();
  const fstart = useRef();
  const fend = useRef();
  const handleFilter = (event) => {
    event.preventDefault();
    let s = Date.parse(`${fdate.current.value}T${fstart.current.value}:00`);
    let e = Date.parse(`${fdate.current.value}T${fend.current.value}:00`);
    fetch("http://127.0.0.1:8000/getAllBooking", {
      method: "GET",
      headers: {
        token: localStorage.getItem("keycloakToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let filtered = data.filter(
          (room) => room.start_time === s && room.end_time === e
        );
        let rooms = filtered.map((room) => room.meeting_room);
        let final = Room.filter((x) => !rooms.includes(x._id));
        console.log(Room);
        console.log(rooms);
        console.log(final);
        setMeetingRoom(final);
      });
    console.log(s);
    console.log(e);
  };

  return (
    <>
      <form className="my-4">
        <div className="row">
          <div className="col">
            <input className="form-control" ref={fdate} type="date" />
          </div>
          <div className="col">
            <input className="form-control" ref={fstart} type="time" />
          </div>
          <div className="col">
            <input className="form-control" ref={fend} type="time" />
          </div>
          <div className="col">
            <button className="btn btn-success" onClick={handleFilter}>
              Filter
            </button>
          </div>
        </div>
      </form>

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
    </>
  );
};

export default Booking;
