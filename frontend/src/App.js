import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import VocationalTestPage from './pages/VocationalTestPage';
import ProtectedRoute from './components/ProtectedRoute';
import useWakeUpBackend from './hooks/useWakeUpBackend';

function App() {
  useWakeUpBackend();

  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <VocationalTestPage />
          </ProtectedRoute>
        } />
        <Route path="/user/application" element={
          <ProtectedRoute>
            <ApplicationPage />
          </ProtectedRoute>
        } />
        <Route path="/user/notifications" element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        } />
        <Route path="/user/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Routes>
      
      <AuthModal />
    </Router>
  );
}

export default App;
