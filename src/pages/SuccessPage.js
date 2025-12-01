import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { initPosterCreatorWidget, unmountWidget } from '../premagic-widgets/PremagicService';
import PremagicWidget from '../premagic-widgets/PremagicWidget';
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

  useEffect(() => {
    /**
     * PREMAGIC POSTER CREATOR WIDGET INITIALIZATION
     * 
     * This widget allows registered attendees to create and share event posters.
     * 
     * The configuration is handled by PremagicService. To customize:
     * 1. Update DEFAULT_CONFIG in PremagicService.js with your Premagic credentials
     * 2. Or pass custom config here: initPosterCreatorWidget({ shareId: "...", ... })
     * 
     * Make sure to use the same credentials as in RegistrationPage.js
     */
    initPosterCreatorWidget();
    
    // Cleanup function to handle component unmount
    return () => {
      unmountWidget();
    };
  }, []);

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
          <PremagicWidget 
            variant="poster"
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

