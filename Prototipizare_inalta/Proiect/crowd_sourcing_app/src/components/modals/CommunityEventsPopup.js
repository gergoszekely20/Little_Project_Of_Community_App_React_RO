import React, { useState, useEffect } from "react";
import "../../stylesheets/InfoPopup.css";

const CommunityEventsPopup = ({ onClose }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [subscriberName, setSubscriberName] = useState("");
  const [newEventName, setNewEventName] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("communityEvents")) || [
      {
        name: "Charity Run",
        description: "A 5K run to raise funds for local charities.",
      },
      {
        name: "Art Workshop",
        description: "An art workshop for beginners and enthusiasts.",
      },
    ];
    setEvents(storedEvents);
  }, []);

  const saveEventsToLocalStorage = (updatedEvents) => {
    localStorage.setItem("communityEvents", JSON.stringify(updatedEvents));
  };

  const handleSubscribe = () => {
    if (selectedEvent && subscriberName.trim()) {
      alert(
        `Mulțumim, ${subscriberName}, pentru abonare la evenimentul ${selectedEvent.name}!`
      );
      setSubscriberName(""); 
    } else {
      alert(
        "Te rugăm să selectezi un eveniment și să introduci numele pentru a te abona."
      );
    }
  };

  const handleCreateEvent = () => {
    if (newEventName.trim() && newEventDescription.trim()) {
      const newEvent = { name: newEventName, description: newEventDescription };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents); 
      saveEventsToLocalStorage(updatedEvents); 
      setNewEventName("");
      setNewEventDescription("");
      alert("Eveniment creat cu succes!");
    } else {
      alert(
        "Te rugăm să completezi atât numele evenimentului cât și descrierea."
      );
    }
  };

  const handleCloseEventPopup = () => {
    setSelectedEvent(null);
    setSubscriberName("");
  };

  return (
    <div className="info-popup">
      <div className="popup-content">
        <h2>Evenimente Comunitare</h2>
        
        <div className="event-list">
          <h3>Evenimente existente</h3>
          <ul>
            {events.map((event, index) => (
              <li
                key={index}
                onClick={() => setSelectedEvent(event)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedEvent === event ? "bold" : "normal",
                }}
              >
                {event.name}
              </li>
            ))}
          </ul>
        </div>

        {selectedEvent && (
          <div className="event-popup">
            <h3>Eveniment Selectat</h3>
            <p>
              <strong>Nume:</strong> {selectedEvent.name}
            </p>
            <p>
              <strong>Descriere:</strong> {selectedEvent.description}
            </p>
            <div className="subscribe-section">
              <input
                type="text"
                placeholder="Introdu numele tău pentru a te abona"
                value={subscriberName}
                onChange={(e) => setSubscriberName(e.target.value)}
              />
              <button onClick={handleSubscribe}>Abonează-te</button>
              <button onClick={handleCloseEventPopup}>Închide</button>
            </div>
          </div>
        )}

        <div className="create-event-section">
          <h3>Crează un eveniment nou</h3>
          <input
            type="text"
            placeholder="Numele Evenimentului"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
          />
          <textarea
            placeholder="Descrierea Evenimentului"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
          />
          <button onClick={handleCreateEvent}>Creează Eveniment</button>
        </div>

        <button className="close-button" onClick={onClose}>
          Închide
        </button>
      </div>
    </div>
  );
};

export default CommunityEventsPopup;
