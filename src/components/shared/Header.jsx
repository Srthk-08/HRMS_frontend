import React, { useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Header({ toggleSidebar, isSidebarHidden }) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authData');

    // Redirect to login page
    navigate('/login');
  };

  const handleMenuClick = () => {
    toggleSidebar(); // Toggle the sidebar visibility
  };

  return (
    <div className="bg-slate-800 h-20 px-4 flex items-center border-b border-slate-700">
      {/* Left Section: Logo and Menu Icon */}
      <div className="flex items-center space-x-4">
        {/* Show Logo and Menu Icon when Sidebar is Hidden */}
        {isSidebarHidden ? (
          <>
            <img src={logo} alt="Logo" className="h-8 hidden md:block" />
            <HiOutlineMenu
              className="text-white text-2xl cursor-pointer md:hidden" // Show on mobile
              onClick={handleMenuClick} // Trigger sidebar toggle on click
            />
          </>
        ) : (
          // Show Menu Icon when Sidebar is Open (on mobile)
          <HiOutlineMenu
            className="text-white text-2xl cursor-pointer md:hidden" // Always show on mobile
            onClick={handleMenuClick} // Trigger sidebar toggle on click
          />
        )}
      </div>

      {/* Right Section: Profile and Logout */}
      <div className="ml-auto flex items-center gap-4">
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
                <button className="px-4 py-2 hover:bg-slate-600 text-left" onClick={handleProfile}>
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
