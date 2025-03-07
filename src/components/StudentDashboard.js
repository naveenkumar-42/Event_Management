import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";

const StudentDashboard = () => {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            const eventCollection = await getDocs(collection(db, "events"));
            setEvents(eventCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchEvents();
    }, []);

    // Filter events based on search input (case insensitive)
    const filteredEvents = events.filter(event => {
        const eventName = event.eventName ? event.eventName.toLowerCase() : "";
        const eventLocation = event.eventLocation ? event.eventLocation.toLowerCase() : "";
        const query = searchQuery.toLowerCase();

        return eventName.includes(query) || eventLocation.includes(query);
    });

    return (
        <div className="container mt-5">
            <h2>Available Events</h2>

            {/* Search Input */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by Event Name or Location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Event Table */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Register</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <tr key={event.id}>
                                <td>{event.eventName}</td>
                                <td>{event.eventCategory}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.eventTime}</td>
                                <td>{event.eventLocation || "Not Specified"}</td>
                                <td>{event.eventDesc}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => window.open(event.eventLink, "_blank")}
                                    >
                                        Register
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No events available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentDashboard;
