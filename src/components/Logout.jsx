import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({ onLogout }) {
  const navigate = useNavigate();
  useEffect(() => {
    // Call the backend logout API to clear the token from the server-side
    const logout = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/logout', {
          method: 'POST', // Assuming your logout route is a POST request
          credentials: 'include', // Important to include cookies if you're using them
        });

        if (response.ok) {
          // Call the logout handler passed as a prop
          onLogout();
          // Redirect to the login page
          navigate('/login');
        } else {
          console.error("Failed to log out.");
        }
      } catch (error) {
        console.error("Error during logout:", error.message);
      }
    };

    logout();
  }, [onLogout, navigate]);

  return null; // No UI needed for the logout route
}
