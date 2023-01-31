import React, { useState, useEffect, useRef } from "react";
import { useKeycloak } from "@react-keycloak/web";

const Home = () => {
  const [bookings, setBookings] = useState(null);
  const { keycloak } = useKeycloak();
  const title = useRef();
  const date = useRef();
  const startTime = useRef();
  const endTime = useRef();
  let currentTime = Date.now();

  // useEffect(() => {
  //   fetch(`http://localhost:8000/yourBooking/${keycloak.tokenParsed.sub}`, {
  //     method: "GET",
  //     headers: {
  //       token: localStorage.getItem("keycloakToken"),
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) =>
  //       setBookings(data.filter((x) => currentTime < x.end_time))
  //     );
  // }, []);

  const handleEdit = (e) => {
    document.getElementById("updateForm").classList = "d-block";
    document.getElementById("title").value =
      e.target.parentNode.parentNode.firstChild.innerHTML;
    document.getElementById("date").value =
      e.target.parentNode.parentNode.children[2].innerHTML;
    const startTime = new Date(
      Date.parse(e.target.parentNode.parentNode.children[3].innerHTML)
    );
    const endTime = new Date(
      Date.parse(e.target.parentNode.parentNode.children[4].innerHTML)
    );
    document.getElementById("startTime").value = startTime.toLocaleString(
      "en-US",
      {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }
    );

    document.getElementById("endTime").value = endTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
    document.getElementById("bookingId").value =
      e.target.parentNode.parentNode.lastChild.value;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(title.current.value);
    console.log(date.current.value);
    console.log(Date.parse(`${date.current.value}T${startTime.current.value}`));
    console.log(endTime.current.value);
    fetch(
      `http://127.0.0.1:8000/updateBooking/${e.target.parentNode.parentNode.lastChild.value}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: title.current.value,
          booking_date: date.current.value,
          startTime: Date.parse(
            `${date.current.value}T${startTime.current.value}`
          ),
          endTime: Date.parse(`${date.current.value}T${endTime.current.value}`),
        }),
        headers: {
          token: localStorage.getItem("keycloakToken"),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.target.parentNode.parentNode.parentNode.classList = "d-none";
  };

  useEffect(() => {
    fetch(`http://localhost:8000/yourBooking/${keycloak.tokenParsed.sub}`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("keycloakToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setBookings(data.filter((x) => currentTime < x.end_time))
      );
    console.log("Hello");
  }, []);

  return (
    <>
      <form id="updateForm" className="mb-4 d-none">
        <div className="row">
          <div className="col-2">
            <input
              ref={title}
              id="title"
              type="text"
              className="form-control"
              placeholder="Meeting Title"
            />
          </div>
          <div className="col-2">
            <input
              ref={date}
              id="date"
              type="date"
              className="form-control"
              placeholder="Date"
            />
          </div>
          <div className="col-2">
            <input
              ref={startTime}
              id="startTime"
              type="time"
              className="form-control"
              placeholder="Start Time"
            />
          </div>
          <div className="col-2">
            <input
              ref={endTime}
              id="endTime"
              type="time"
              className="form-control"
              placeholder="End Time"
            />
          </div>
          <div className="col-2">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </div>
          <div className="col-2">
            <button className="btn btn-primary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          <input type="hidden" id="bookingId" />
        </div>
      </form>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th>Meeting Title</th>
            <th>Attendess</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Room Name</th>
          </tr>
        </thead>
        <tbody>
          {bookings === null
            ? null
            : bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.meeting_title}</td>
                  <td>{booking.attendess}</td>
                  <td>{booking.booking_date}</td>
                  <td>{new Date(booking.start_time).toLocaleString()}</td>
                  <td>{new Date(booking.end_time).toLocaleString()}</td>
                  <td>{booking.RoomName}</td>
                  <td>
                    <button onClick={handleEdit} className="btn btn-success">
                      Edit
                    </button>
                  </td>
                  <input type="hidden" value={booking.id} />
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
