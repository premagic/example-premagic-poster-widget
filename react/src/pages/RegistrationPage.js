import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginWidget from '../premagic-widgets/LoginWidget';
import RegistrationForm from '../components/RegistrationForm';
import '../styles.css';

const FORM_FIELD_IDS = ['firstName', 'lastName', 'emailId', 'emailIdConfirmation', 'companyName', 'jobTitle', 'linkedinProfile'];

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
  const pollRef = useRef(null);

  // Premagic configuration
  const premagicConfig = {
    shareId: "AI-everything-Egypt",
    websiteId: "ai-everything-egypt",  // DEPRECATED: will be removed in Q2 2026
    domain: "aieverything"             // DEPRECATED: will be removed in Q2 2026
  };

  /**
   * EXTERNAL AUTOFILL SYNC
   *
   * The Premagic LoginWidget autofills form fields by setting DOM input .value
   * directly. React controlled inputs override DOM values on re-render, so
   * external autofill values get lost. This polling mechanism detects when DOM
   * input values differ from React state and syncs them.
   */
  const syncDomToState = useCallback(() => {
    setFormData(prev => {
      const updated = { ...prev };
      let changed = false;

      FORM_FIELD_IDS.forEach(id => {
        const input = document.getElementById(id);
        if (input && input.value !== prev[id]) {
          updated[id] = input.value;
          changed = true;
        }
      });

      return changed ? updated : prev;
    });
  }, []);

  useEffect(() => {
    pollRef.current = setInterval(syncDomToState, 500);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [syncDomToState]);

  // Stop polling once required fields are filled
  useEffect(() => {
    if (formData.firstName && formData.lastName && formData.emailId) {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }
  }, [formData.firstName, formData.lastName, formData.emailId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Final sync before submit
    syncDomToState();
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

