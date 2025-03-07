// EventForm.js


import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

const EventForm = () => {
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventDesc, setEventDesc] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "events"), { eventName, eventDate, eventDesc });
            setEventName("");
            setEventDate("");
            setEventDesc("");
            alert("Event added successfully!");
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Add New Event</h3>
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
                    <label>Description</label>
                    <textarea className="form-control" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-success">Add Event</button>
            </form>
        </div>
    );
};

export default EventForm;
