import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import EventPage from './pages/EventPage';
import RegistrationPage from './pages/RegistrationPage';
import SuccessPage from './pages/SuccessPage';
import ProfilePage from './pages/ProfilePage';
import './styles.css';

function App() {
  const location = useLocation();
  const isRegisterFlow = location.pathname.startsWith('/register');

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="main-header-inner">
          <Link to="/register/select" className="main-header-brand">Premagic Demo</Link>
          <nav className="main-header-nav">
            <Link
              to="/register/select"
              className={`main-header-nav-item${isRegisterFlow ? ' active' : ''}`}
            >
              <span className="main-header-nav-label">Registration</span>
              <span className="main-header-nav-note">LoginWidget + form autofill</span>
            </Link>
            <Link
              to="/profile"
              className={`main-header-nav-item${location.pathname === '/profile' ? ' active' : ''}`}
            >
              <span className="main-header-nav-label">Profile</span>
              <span className="main-header-nav-note">PosterWidget with prefillData</span>
            </Link>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/register/select" replace />} />
        <Route path="/register/select" element={<EventPage />} />
        <Route path="/register/form" element={<RegistrationPage />} />
        <Route path="/register/success" element={<SuccessPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;

