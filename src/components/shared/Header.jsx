import React, { useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi';

export default function Header() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  return (
    <div className="bg-cyan-950 h-16 px-4 flex justify-end items-center border-b border-cyan-800">
      {/* Right Section: Notifications and Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <HiOutlineBell
          fontSize={24}
          className="cursor-pointer text-white hover:text-cyan-300 transition-colors duration-300"
        />

        {/* Profile Section */}
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
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
            <div className="absolute right-0 mt-2 w-48 bg-cyan-950 rounded shadow-lg border border-cyan-800 z-50">
              <div className="flex flex-col text-white">
                <button className="px-4 py-2 hover:bg-cyan-800 text-left">
                  Profile
                </button>
                <button className="px-4 py-2 hover:bg-cyan-800 text-left">
                  Settings
                </button>
                <button className="px-4 py-2 hover:bg-red-600 text-left text-red-400">
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
