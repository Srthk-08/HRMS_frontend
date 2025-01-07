import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed on mobile

  // Function to toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200">

        {/* Header */}
        <Header toggleSidebar={toggleSidebar} isSidebarHidden={!isSidebarOpen} />

        {/* Content Section */}
        <div className="flex-grow p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
