import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventDesc: "",
    eventLink: "",
    eventCategory: "Workshop",
    eventLocation: "",
  });

  // Fetch Event Details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDoc = await getDoc(doc(db, "events", id));
        if (eventDoc.exists()) {
          setEventData(eventDoc.data());
        } else {
          alert("Event not found!");
          navigate("/admin"); // Redirect if event is not found
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  // Update Event
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "events", id), eventData);
      alert("Event updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Event</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Event Name</label>
          <input type="text" className="form-control" value={eventData.eventName} onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Event Date</label>
          <input type="date" className="form-control" value={eventData.eventDate} onChange={(e) => setEventData({ ...eventData, eventDate: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Event Time</label>
          <input type="time" className="form-control" value={eventData.eventTime} onChange={(e) => setEventData({ ...eventData, eventTime: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Event Location</label>
          <input type="text" className="form-control" value={eventData.eventLocation} onChange={(e) => setEventData({ ...eventData, eventLocation: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Event Category</label>
          <select className="form-control" value={eventData.eventCategory} onChange={(e) => setEventData({ ...eventData, eventCategory: e.target.value })} required>
            <option>Workshop</option>
            <option>Seminar</option>
            <option>Sports</option>
            <option>Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea className="form-control" value={eventData.eventDesc} onChange={(e) => setEventData({ ...eventData, eventDesc: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Event Link</label>
          <input type="url" className="form-control" value={eventData.eventLink} onChange={(e) => setEventData({ ...eventData, eventLink: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;
