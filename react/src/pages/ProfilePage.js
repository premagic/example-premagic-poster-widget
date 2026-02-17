import React from 'react';
import { useNavigate } from 'react-router-dom';
import PosterWidget from '../premagic-widgets/PosterWidget';
import '../styles.css';

/**
 * ATTENDEE PROFILE PAGE
 * 
 * Demonstrates the PosterWidget with prefillData -- used when you already
 * have user information from your own authentication/database and do NOT
 * need the LoginWidget (LinkedIn login).
 * 
 * The prefillData object pre-populates the poster with attendee details.
 */
const ProfilePage = () => {
  const navigate = useNavigate();

  // Simulated attendee data -- in a real app this would come from
  // your auth system, database, or API
  const attendee = {
    externalId: "ext_12345",
    userName: "John Doe",
    userTitle: "Senior Developer",
    userCompany: "Acme Corp",
    userPhoto: "https://i.pravatar.cc/200?img=12",
    email: "john@example.com",
    phone: "+1234567890",
    registrationId: "reg_67890",
    sessionTitle: "AI Everything Egypt 2025",
  };

  // Premagic configuration with prefillData
  const premagicConfig = {
    shareId: "AI-everything-Egypt",
    websiteId: "ai-everything-egypt",  // DEPRECATED: will be removed in Q2 2026
    domain: "aieverything",            // DEPRECATED: will be removed in Q2 2026
    prefillData: {
      externalId: attendee.externalId,
      userName: attendee.userName,
      userTitle: attendee.userTitle,
      userCompany: attendee.userCompany,
      userPhoto: attendee.userPhoto,
      email: attendee.email,
      phone: attendee.phone,
      registrationId: attendee.registrationId,
      sessionTitle: attendee.sessionTitle,
    }
  };

  return (
    <div className="success-page">
      <div className="page-container">
        <div className="success-content">
          <div className="success-header">
            <div className="profile-avatar">
              <img
                src={attendee.userPhoto}
                alt={attendee.userName}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #667eea'
                }}
              />
            </div>
            <h1>{attendee.userName}</h1>
            <p className="success-message">
              {attendee.userTitle} at <strong>{attendee.userCompany}</strong>
            </p>
            <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              {attendee.sessionTitle} &middot; Registration #{attendee.registrationId}
            </p>
          </div>

          <div style={{ margin: '2rem 0' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#333' }}>
              Create Your Event Poster
            </h3>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem' }}>
              Your profile info is already filled in. Personalize and share your poster!
            </p>
            <PosterWidget config={premagicConfig} />
          </div>

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

export default ProfilePage;
