import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    // If user is not logged in, redirect to home page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If user is logged in but hasn't completed the vocational test, force redirect to /onboarding
  if (!user.hasCompletedVocationalTest && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
