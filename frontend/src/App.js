import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/tracking" element={<TrackingPage />} />
        <Route path="/user/notifications" element={<NotificationsPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
      </Routes>
      
      <AuthModal />
    </Router>
  );
}

export default App;
