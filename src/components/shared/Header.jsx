import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = () => {
    // Clear authentication data (if stored in state or localStorage)
    localStorage.removeItem('authToken'); // Example: Remove stored token
    sessionStorage.removeItem('authData'); // Example: Remove session data

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="bg-slate-800 h-20 px-4 flex justify-end items-center border-b border-slate-700">
      {/* Right Section: Notifications and Profile */}
      <div className="flex items-center gap-4">
        {/* Profile Section */}
        <div className="relative">
          <div
            className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center cursor-pointer"
            onClick={toggleProfileDropdown}
          >
            <img
              src="https://via.placeholder.com/150" // Replace with actual profile image
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Profile Dropdown */}
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded shadow-lg border border-slate-600 z-50">
              <div className="flex flex-col text-slate-200">
                <button className="px-4 py-2 hover:bg-slate-600 text-left">
                  Profile
                </button>
                <button className="px-4 py-2 hover:bg-slate-600 text-left">
                  Settings
                </button>
                <button className="px-4 py-2 hover:bg-red-600 text-left text-red-400" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
