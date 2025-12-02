import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginWidget from '../premagic-widgets/LoginWidget';
import RegistrationForm from '../components/RegistrationForm';
import '../styles.css';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticket = location.state?.ticket;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    jobTitle: '',
    emailId: '',
    emailIdConfirmation: '',
    linkedinProfile: '',
    photo: ''
  });

  // Premagic configuration
  const premagicConfig = {
    shareId: "AI-everything-Egypt",
    projectId: "e8NkvbWmTxc",
    eventId: "0a9b5b6e-b303-46cc-b48c-4b62c4e0f011",
    websiteId: "ai-everything-egypt",
    domain: "aieverything"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('registrationData', JSON.stringify({ ticket, formData }));
    window.location.href = '/success';
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!ticket) {
    return (
      <div className="registration-page">
        <div className="page-container">
          <div className="error-message">
            <h2>No ticket selected</h2>
            <p>Please go back and select a ticket first.</p>
            <button onClick={() => navigate('/')}>Go Back</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-page">
      <div className="page-container">
        <div className="registration-header">
          <h1>Complete Your Registration</h1>
          <div className="ticket-summary">
            <span className="ticket-type">{ticket.name} Ticket</span>
            <span className="ticket-price">{ticket.price} {ticket.currency}</span>
          </div>
        </div>

        <div className="registration-content">
          {/* Premagic Login Widget */}
          <LoginWidget config={premagicConfig} />

          <RegistrationForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

