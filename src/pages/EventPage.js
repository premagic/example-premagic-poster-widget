import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const EventPage = () => {
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState(null);

  const eventInfo = {
    title: 'AI Everything Egypt',
    date: 'March 15, 2024',
    time: '9:00 AM - 6:00 PM',
    location: 'Cairo Convention Center, Egypt',
    description: 'Join us for an exciting conference on Artificial Intelligence and its applications. Network with industry leaders, attend insightful sessions, and explore the future of AI.',
    image: 'https://via.placeholder.com/800x400?text=AI+Everything+Egypt'
  };

  const tickets = [
    {
      id: 1,
      name: 'Early Bird',
      price: 299,
      currency: 'EGP',
      description: 'Limited availability. Includes access to all sessions and networking events.',
      available: true
    },
    {
      id: 2,
      name: 'Standard',
      price: 499,
      currency: 'EGP',
      description: 'Full access to all sessions, networking events, and lunch.',
      available: true
    },
    {
      id: 3,
      name: 'VIP',
      price: 999,
      currency: 'EGP',
      description: 'VIP access with premium seating, exclusive networking dinner, and meet & greet with speakers.',
      available: true
    }
  ];

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleBuyTicket = () => {
    if (selectedTicket) {
      navigate('/register', { state: { ticket: selectedTicket } });
    }
  };

  return (
    <div className="event-page">
      <div className="page-container">
        <div className="event-header">
          <h1 className="event-title">{eventInfo.title}</h1>
          <div className="event-meta">
            <span className="event-date">📅 {eventInfo.date}</span>
            <span className="event-time">🕐 {eventInfo.time}</span>
            <span className="event-location">📍 {eventInfo.location}</span>
          </div>
        </div>

        <div className="event-content">
          <div className="event-image-container">
            <img src={eventInfo.image} alt={eventInfo.title} className="event-image" />
          </div>

          <div className="event-description">
            <h2>About the Event</h2>
            <p>{eventInfo.description}</p>
          </div>

          <div className="tickets-section">
            <h2>Select Your Ticket</h2>
            <div className="tickets-grid">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`ticket-card ${selectedTicket?.id === ticket.id ? 'selected' : ''} ${!ticket.available ? 'unavailable' : ''}`}
                  onClick={() => ticket.available && handleTicketSelect(ticket)}
                >
                  <h3 className="ticket-name">{ticket.name}</h3>
                  <div className="ticket-price">
                    <span className="price-amount">{ticket.price}</span>
                    <span className="price-currency">{ticket.currency}</span>
                  </div>
                  <p className="ticket-description">{ticket.description}</p>
                  {!ticket.available && (
                    <div className="ticket-unavailable">Sold Out</div>
                  )}
                </div>
              ))}
            </div>

            <button
              className="buy-button"
              onClick={handleBuyTicket}
              disabled={!selectedTicket}
            >
              {selectedTicket ? `Buy ${selectedTicket.name} Ticket` : 'Select a Ticket'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;

