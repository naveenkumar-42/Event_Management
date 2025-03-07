import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";

const AdminDashboard = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventCategory, setEventCategory] = useState("Workshop");
  const [eventLocation, setEventLocation] = useState("");
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollection = await getDocs(collection(db, "events"));
      setEvents(eventCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchEvents();
  }, []);

  // Add or Update Event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName || !eventDate || !eventTime || !eventDesc || !eventLink || !eventLocation) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (editingEvent) {
        await updateDoc(doc(db, "events", editingEvent.id), {
          eventName, eventDate, eventTime, eventDesc, eventLink, eventCategory, eventLocation
        });
        setEditingEvent(null);
      } else {
        await addDoc(collection(db, "events"), {
          eventName, eventDate, eventTime, eventDesc, eventLink, eventCategory, eventLocation
        });
      }
      setEventName("");
      setEventDate("");
      setEventTime("");
      setEventDesc("");
      setEventLink("");
      setEventCategory("Workshop");
      setEventLocation("");
      alert(editingEvent ? "Event updated successfully!" : "Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Delete Event
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "events", id));
    setEvents(events.filter(event => event.id !== id));
    alert("Event deleted successfully!");
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <h2>{editingEvent ? "Edit Event" : "Add Event"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Event Name</label>
          <input type="text" className="form-control" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Event Date</label>
          <input type="date" className="form-control" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Event Time</label>
          <input type="time" className="form-control" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Event Location</label>
          <input type="text" className="form-control" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Event Category</label>
          <select className="form-control" value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} required>
            <option>Workshop</option>
            <option>Seminar</option>
            <option>Sports</option>
            <option>Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea className="form-control" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Event Link</label>
          <input type="url" className="form-control" value={eventLink} onChange={(e) => setEventLink(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">{editingEvent ? "Update Event" : "Add Event"}</button>
      </form>
      <h3 className="mt-5">Event List</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.eventName}</td>
              <td>{event.eventCategory}</td>
              <td>{event.eventDate}</td>
              <td>
                <Link to={`/admin/edit/${event.id}`} className="btn btn-warning me-2">Edit</Link>
                <button onClick={() => handleDelete(event.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;