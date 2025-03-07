// EventList.js

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollection = await getDocs(collection(db, "events"));
      setEvents(eventCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Upcoming Events</h3>
      <ul className="list-group">
        {events.length > 0 ? (
          events.map(event => (
            <li key={event.id} className="list-group-item">
              <h5>{event.eventName}</h5>
              <p><strong>Date:</strong> {event.eventDate}</p>
              <p><strong>Description:</strong> {event.eventDesc}</p>
              <button className="btn btn-primary">Register</button>
            </li>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </ul>
    </div>
  );
};

export default EventList;
