import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/application" element={<ApplicationPage />} />
        <Route path="/user/notifications" element={<NotificationsPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
      </Routes>
      
      <AuthModal />
    </Router>
  );
}

export default App;
