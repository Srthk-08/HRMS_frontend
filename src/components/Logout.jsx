import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout actions
    onLogout(); // Call the logout handler passed as a prop
    navigate('/login'); // Redirect to the login page
  }, [onLogout, navigate]);

  return null; // No UI needed for the logout route
}
