import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import classNames from 'classnames';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed on mobile
  const [headData, setHeadData] = useState([]);
  const [positionData, setPositionData]=useState([]);
  const [graphData, setGraphData] = useState([]);
  const location = useLocation(); // Hook to track the current location/route


  // Function to toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // Check if the current path corresponds to the GraphHierarchy component
  const isGraphHierarchyPage = location.pathname.includes('graph');

  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200">

        {/* Header */}
        <Header toggleSidebar={toggleSidebar} isSidebarHidden={!isSidebarOpen} />

        {/* Content Section */}
        <div className={classNames('flex-grow p-6', {
          'overflow-y-hidden': isGraphHierarchyPage, // Apply the class if the current page is GraphHierarchy
        })}>
          <Outlet context={{ headData, setHeadData, positionData, setPositionData, graphData, setGraphData }} />
        </div>
      </div>
    </div>
  );
}