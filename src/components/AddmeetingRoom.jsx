import React from "react";
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddmeetingRoom = () => {
  const location = useLocation();
  const [change, setChange] = useState(
    location.state !== null ? location.state : { facilities: [] }
  );
  // const [add, setAdd] = useState({});
  const facility = useRef();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setChange({ ...change, [event.target.name]: event.target.value });
  };

  const handleUpdate = (event, roomId) => {
    event.preventDefault();
    fetch(`http://localhost:8000/updateRoom/${roomId}`, {
      method: "PUT",
      body: JSON.stringify(change),
      headers: {
        token: localStorage.getItem("keycloakToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => navigate("/meetingRoom"));
  };

  const removeFacility = (event) => {
    console.log(event.target.id);
    setChange({
      ...change,
      facilities: change.facilities.filter((f) => f !== event.target.id),
    });
  };

  const addFacility = (event) => {
    event.preventDefault();
    if (facility.current.value !== "") {
      setChange({
        ...change,
        facilities: [...change.facilities, facility.current.value],
      });
      facility.current.value = "";
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/createRoom", {
      method: "POST",
      body: JSON.stringify(change),
      headers: {
        token: localStorage.getItem("keycloakToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => navigate("/meetingRoom"));
  };

  console.log(change);

  return (
    <div>
      <form className="meetingUpdateForm w-25 m-auto mt-5">
        <div className="form-floating mb-3">
          <input
            type="text"
            value={change === null ? "" : change.room_name}
            name="room_name"
            className="form-control"
            id="roomName"
            placeholder="Room Name"
            onChange={handleChange}
          />
          <label htmlFor="roomName">Room Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            value={change === null ? "" : change.location}
            name="location"
            className="form-control"
            id="Location"
            placeholder="Location"
            onChange={handleChange}
          />
          <label htmlFor="Location">Location</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            value={change === null ? "" : change.capacity}
            name="capacity"
            className="form-control"
            id="Capacity"
            placeholder="Capacity"
            onChange={handleChange}
          />
          <label htmlFor="Capacity">Capacity</label>
        </div>

        <div className="input-group mb-3">
          <input
            ref={facility}
            type="text"
            className="form-control"
            placeholder="Facilities"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={addFacility}
          >
            Add
          </button>
        </div>

        {change === null
          ? ""
          : change.facilities.map((facility, index) => (
              <div key={index}>
                <input onClick={removeFacility} type="checkbox" id={facility} />{" "}
                <label htmlFor={facility}>{facility}</label>
              </div>
            ))}

        <button
          className="mt-3 btn btn-success"
          onClick={
            location.state == null
              ? handleAdd
              : (e) => handleUpdate(e, change._id)
          }
        >
          {location.state == null ? "Add Room" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default AddmeetingRoom;
