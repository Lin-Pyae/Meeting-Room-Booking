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
        <div className="inputContainer">
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
        </div>
        <button
          onClick={
            location.state == null
              ? handleAdd
              : (e) => handleUpdate(e, change._id)
          }
        >
          {location.state == null ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default AddmeetingRoom;
