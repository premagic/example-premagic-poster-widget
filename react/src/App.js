import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EventPage from './pages/EventPage';
import RegistrationPage from './pages/RegistrationPage';
import SuccessPage from './pages/SuccessPage';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<EventPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
}

export default App;

