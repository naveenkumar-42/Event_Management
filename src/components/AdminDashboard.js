import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

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

  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollection = await getDocs(collection(db, "events"));
      setEvents(eventCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchEvents();
  }, []);

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

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "events", id));
    setEvents(events.filter(event => event.id !== id));
    alert("Event deleted successfully!");
  };

  return (
    <div className="admin-dashboard">
      <div className="content">
      {/* Header Section */}
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="admin-main">
        
        <div className="admin-content">
          {/* Add/Edit Event Form */}
          <div className="form-card">
            <h3>{editingEvent ? "Edit Event" : "Add Event"}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
              <div className="datetime">
              <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required />
              </div>
              <input type="text" placeholder="Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required />
              <select value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} required>
                <option>Workshop</option>
                <option>Seminar</option>
                <option>Sports</option>
                <option>Other</option>
              </select>
              <textarea placeholder="Description" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} required />
              <input type="url" placeholder="Event Link" value={eventLink} onChange={(e) => setEventLink(e.target.value)} required />
              <button className="stat-card" type="submit">{editingEvent ? "Update Event" : "Add Event"}</button>
            </form>
          </div>

          {/* Event List */}
          <div className="event-cardu">
            <h3>Event List</h3>
            <table className="event-table">
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
                      <button className="edit-btn" ><Link className="a-tag" to={`/admin/edit/${event.id}`} >Edit</Link></button>
                      <button onClick={() => handleDelete(event.id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
      </div>
      <footer className="footer">
        <p className="footer-p">&copy; Created by Shivani &#128519; & Iniyaa &#128522;</p>
      </footer>
      </div>
  );
};

export default AdminDashboard;
