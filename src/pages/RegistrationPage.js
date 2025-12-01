import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { initLoginWidget } from '../premagic-widgets/PremagicService';
import PremagicWidget from '../premagic-widgets/PremagicWidget';
import RegistrationForm from '../components/RegistrationForm';
import '../styles.css';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticket = location.state?.ticket;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fullName: '',
    companyName: '',
    jobTitle: '',
    emailId: '',
    emailIdConfirmation: '',
    linkedinProfile: '',
    photo: ''
  });

  useEffect(() => {
    /**
     * PREMAGIC LOGIN WIDGET INITIALIZATION
     * 
     * This widget allows users to quickly log in and auto-fill the registration form.
     * 
     * The configuration is handled by PremagicService. To customize:
     * 1. Update DEFAULT_CONFIG in PremagicService.js with your Premagic credentials
     * 2. Or pass custom config here: PremagicService.initLoginWidget({ shareId: "...", ... })
     * 
     * The autofillerConfig.selectors map Premagic fields to your form field names.
     * Make sure the selectors (e.g., "[name='firstName']") match your HTML form field
     * name attributes exactly. Update DEFAULT_AUTOFILLER_CONFIG in PremagicService.js
     * if your form uses different field names.
     */
    initLoginWidget();
  }, []);

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
          <PremagicWidget variant="login" />

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

