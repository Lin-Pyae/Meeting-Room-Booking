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
      <form className="meetingUpdateForm">
        <div class="form-floating mb-3">
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

        <div class="form-floating mb-3">
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

        <div class="form-floating mb-3">
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

        <div class="form-floating mb-3">
          <input
            type="text"
            name="facilities"
            className="form-control"
            id="Facilities"
            placeholder="Facilities"
            ref={facility}
          />
          <label htmlFor="Facilities">Facilities</label>
          <button onClick={addFacility}>Add Facility</button>
          {change === null
            ? ""
            : change.facilities.map((facility, index) => (
                <div key={index}>
                  <input
                    onClick={removeFacility}
                    type="checkbox"
                    id={facility}
                  />{" "}
                  <label className="cLabels" htmlFor={facility}>
                    {facility}
                  </label>
                </div>
              ))}
        </div>

        {/* <div className="inputContainer">
          <p className="labels">Room Name</p>
          <input
            type="text"
            value={change === null ? "" : change.room_name}
            name="room_name"
            onChange={handleChange}
          />
        </div>

        <div className="inputContainer">
          <p className="labels">Location</p>
          <input
            type="text"
            value={change === null ? "" : change.location}
            name="location"
            onChange={handleChange}
          />
        </div>

        <div className="inputContainer">
          <p className="labels">Capacity</p>
          <input
            type="number"
            value={change === null ? "" : change.capacity}
            name="capacity"
            onChange={handleChange}
          />
        </div>

        <div className="inputContainer">
          <p className="labels">Facilities</p>
          <div>
            <input type="text" ref={facility} />{" "}
            <button onClick={addFacility}>Add Facility</button>
          </div>
          {change === null
            ? ""
            : change.facilities.map((facility, index) => (
                <div key={index}>
                  <input
                    onClick={removeFacility}
                    type="checkbox"
                    id={facility}
                  />{" "}
                  <label className="cLabels" htmlFor={facility}>
                    {facility}
                  </label>
                </div>
              ))}
        </div> */}
        <button
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
