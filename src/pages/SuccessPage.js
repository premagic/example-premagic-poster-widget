import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PosterWidget from '../premagic-widgets/PosterWidget';
import '../styles.css';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  /**
   * DATA RETRIEVAL FOR HARD NAVIGATION
   * 
   * This component supports both soft navigation (React Router state) and
   * hard navigation (full page reload via sessionStorage).
   * 
   * How it works:
   * 1. First tries to get data from location.state (soft navigation)
   * 2. Falls back to sessionStorage (hard navigation - full page reload)
   * 3. Cleans up sessionStorage after reading to prevent stale data
   * 
   * This dual approach ensures compatibility with both navigation methods.
   */
  const stateData = location.state || {};
  const storageData = (() => {
    try {
      const stored = sessionStorage.getItem('registrationData');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  })();
  
  // Use state data if available, otherwise use storage data
  const { ticket, formData } = stateData.ticket ? stateData : (storageData || {});
  
  // Clean up sessionStorage after reading (prevents stale data on page refresh)
  useEffect(() => {
    if (sessionStorage.getItem('registrationData')) {
      sessionStorage.removeItem('registrationData');
    }
  }, []);

  // Premagic configuration
  const premagicConfig = {
    shareId: "AI-everything-Egypt",
    projectId: "e8NkvbWmTxc",
    eventId: "0a9b5b6e-b303-46cc-b48c-4b62c4e0f011",
    websiteId: "ai-everything-egypt",
    domain: "aieverything"
  };

  if (!ticket || !formData) {
    return (
      <div className="success-page">
        <div className="page-container">
          <div className="error-message">
            <h2>Invalid registration</h2>
            <p>Please complete the registration form first.</p>
            <button onClick={() => navigate('/')}>Go to Event Page</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="page-container">
        <div className="success-content">
          <div className="success-header">
            <div className="success-icon">✓</div>
            <h1>Registration Successful!</h1>
            <p className="success-message">
              Thank you, {formData.firstName || 'there'}! Your registration for <strong>{ticket.name} Ticket</strong> has been confirmed.
            </p>
          </div>

          
          {/* Premagic Poster Creator Widget */}
          <PosterWidget 
            config={premagicConfig}
            title="Create Your Event Poster"
            description="Personalize and share a poster to let your network know you're attending!"
          />

          <div className="success-actions">
            <button className="btn-primary" onClick={() => navigate('/')}>
              Back to Event Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

