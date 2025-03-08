import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/StudentDashboard.css";
import { FaSearch } from "react-icons/fa";

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
        <div className="dashboard-container">
            {/* Hero Section */}
            <div className="content">
            <header className="hero-section">
                <div className="headeru">
                <h1 className="hero-title">Welcome to the Student Portal</h1>
                <p className="hero-subtitle">
                    Discover and register for exciting events happening in your campus!
                </p>
                </div>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by Event Name or Location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                <FaSearch className="search-icon" />
                
            </header>

            {/* Events Section */}
            <div className="events-section">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <div key={event.id} className="event-card">
                            <h3 className="event-title">{event.eventName}</h3>
                            <p className="event-category">{event.eventCategory}</p>
                            <p className="event-details">
                                📅 {event.eventDate} | ⏰ {event.eventTime}
                            </p>
                            <p className="event-location">📍 {event.eventLocation || "Not Specified"}</p>
                            <p className="event-description">{event.eventDesc}</p>
                            <button
                                className="register-btn"
                                onClick={() => window.open(event.eventLink, "_blank")}
                            >
                                Register Now
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-events">No events available.</p>
                )}
                </div>
                </div>
            <footer className="footer">
                <p className="footer-p">&copy; Created by Shivani &#128519; & Iniyaa &#128522;</p>
            </footer>
        </div>
    );
};

export default StudentDashboard;
